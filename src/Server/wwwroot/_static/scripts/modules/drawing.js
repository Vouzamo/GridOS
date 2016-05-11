var grid = grid ? grid : {};

(function ($) {

    $.extend(grid, {
        drawing: {
            context: null,
            background: new Image(),
            init: function () {
                var self = grid.drawing;

                self.context = grid.settings.$canvas.get(0).getContext('2d');
                self.resize();

                self.background.src = 'http://www.twitrcovers.com/wp-content/uploads/2013/12/Abstract-Backgrounds-Textures-l.jpg';
                self.background.onload = function () {
                    self.draw();
                }
            },
            resize: function () {
                var self = grid.drawing;

                var w = document.body.offsetWidth;
                var h = document.body.offsetHeight;

                self.context.canvas.width = w;
                self.context.canvas.height = h;

                // Centered Origin
                self.context.translate(w / 2, h / 2);

                // Context Defaults
                self.context.strokeStyle = '#fff';
                self.context.fillStyle = '#fff';
                self.context.shadowColor = '#000';
                self.context.font = "12px sans-serif";
                self.context.textAlign = "center";

                self.draw();
            },
            draw: function () {
                var self = this;
                var ctx = self.context;

                // clear screen    
                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                ctx.restore();

                // add background
                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                self.drawBackground(ctx, self.background);
                ctx.restore();

                // add opacity layer
                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.globalAlpha = 0.1;
                ctx.fillStyle = '#000';
                ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                ctx.restore();

                if (grid.world) {
                    self.drawWorld(grid.world);
                }
            },
            drawBackground: function (ctx, img, x, y, w, h, offsetX, offsetY) {

                if (arguments.length === 2) {
                    x = y = 0;
                    w = ctx.canvas.width;
                    h = ctx.canvas.height;
                }

                /// default offset is center
                offsetX = offsetX ? offsetX : 0.5;
                offsetY = offsetY ? offsetY : 0.5;

                /// keep bounds [0.0, 1.0]
                if (offsetX < 0) offsetX = 0;
                if (offsetY < 0) offsetY = 0;
                if (offsetX > 1) offsetX = 1;
                if (offsetY > 1) offsetY = 1;

                var iw = img.width,
                    ih = img.height,
                    r = Math.min(w / iw, h / ih),
                    nw = iw * r,   /// new prop. width
                    nh = ih * r,   /// new prop. height
                    cx, cy, cw, ch, ar = 1;

                /// decide which gap to fill    
                if (nw < w) ar = w / nw;
                if (nh < h) ar = h / nh;
                nw *= ar;
                nh *= ar;

                /// calc source rectangle
                cw = iw / (nw / w);
                ch = ih / (nh / h);

                cx = (iw - cw) * offsetX;
                cy = (ih - ch) * offsetY;

                /// make sure source rectangle is valid
                if (cx < 0) cx = 0;
                if (cy < 0) cy = 0;
                if (cw > iw) cw = iw;
                if (ch > ih) ch = ih;

                /// fill image in dest. rectangle
                ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
            },
            drawWorld: function (world) {
                var self = this;

                self.drawGrid(world.viewport);
                self.drawWorldItems(world.data.items, world.viewport);
            },
            drawGrid: function (viewport) {
                var self = this;

                for (x = -15; x < 16; x++) {
                    for (y = -10; y < 11; y++) {
                        var position = {
                            x: x,
                            y: y
                        }
                        self.drawPoint(position, viewport);
                    }
                }
            },
            drawWorldItems: function (items, viewport) {
                var self = this;

                for (var i = 0; i < items.length; i++) {
                    self.drawWorldItem(items[i], viewport);
                }
            },
            drawWorldItem: function (item, viewport) {
                var self = this;

                var screenPosition = viewport.toScreenPosition(item.position);

                //self.drawCircle(screenPosition, 1);
                if (item.icon == '') {
                    self.context.save();

                    self.context.shadowBlur = 20;
                    self.context.drawImage(item.iconImg,
                        0,
                        0,
                        item.iconImg.width,
                        item.iconImg.height,
                        screenPosition.x - 15,
                        screenPosition.y - 15,
                        30,
                        30);

                    self.context.restore();
                }

                // Label
                self.context.save();

                self.context.shadowBlur = 20;
                self.context.fillText(item.name, screenPosition.x, screenPosition.y + 30);

                self.context.restore();
            },
            drawPoint(position, viewport) {
                var self = this;

                var screenPosition = viewport.toScreenPosition(position);

                self.drawCircle(screenPosition, 0.1);
            },
            drawCircle: function (position, alpha) {
                var self = this;

                self.context.save();

                self.context.globalAlpha = alpha;
                self.context.shadowBlur = 20;

                self.context.beginPath();
                self.context.arc(position.x, position.y, 5, 0, 2 * Math.PI);
                self.context.fill();

                self.context.restore();
            }
        }
    });

    $.subscribe('ready', grid.drawing.init);
    $.subscribe('resize', grid.drawing.resize);

}(jQuery));