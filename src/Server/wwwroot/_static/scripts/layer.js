// namespace
var vouzamo = vouzamo || {};

function Layer(grid, layerId) {
    this.grid = grid;
    this.layerId = layerId;
    this.spacing = 100;
    this.isDragging = false;
    this.dragOffset = new createjs.Point();
    this.container = {};
    this.items = [];

    this.initialize();
}

Layer.prototype = {
    constructor: Layer,

    center: function (duration) {
        var x = window.innerWidth / 2;
        var y = window.innerHeight / 2;

        createjs.Tween.get(this.container, { override: true }).to({ x: x, y: y }, duration, createjs.Ease.quadInOut);
    },

    updateSpacing(spacing, duration) {
        this.spacing = spacing;

        this.items.forEach(function(item) {
            item.replace(duration);
        });
    },

    setEventListeners: function () {
        var self = this;
        var stage = self.grid.stage;

        // Resize / Orientation Change
        window.addEventListener("resize", function () {
            self.center(self);
        }.bind(self));

        // Start Drag
        stage.addEventListener("stagemousedown", function (event) {
            self.isDragging = true;
            self.canDrag = true;

            self.dragOffset.x = stage.mouseX - self.container.x;
            self.dragOffset.y = stage.mouseY - self.container.y;
        }.bind(self));

        // Dragging
        stage.addEventListener("stagemousemove", function (event) {
            if (self.isDragging && self.canDrag) {
                self.container.x = event.stageX - self.dragOffset.x;
                self.container.y = event.stageY - self.dragOffset.y;
            }
        }.bind(self));

        // End Drag
        stage.addEventListener("stagemouseup", function (event) {
            self.isDragging = false;
        }.bind(self));
    },

    loadItems: function () {
        var self = this;

        // determine the boundries to load
        $.ajax({
            url: self.grid.api + 'world/references/',
            method: "POST",
            data: {
                world: window.location.host,
                layer: self.layerId,
                position: {
                    x: 0,
                    y: 0
                }
            },
            success: function(data)
            {
                data.forEach(function (item) {
                    self.items.push(new Item(self, item));
                });
            }
        });

        // items.push(new Item(layer, settings));
    },

    initialize: function() {
        this.container = new createjs.Container();

        this.grid.stage.addChild(this.container);

        this.center();

        this.loadItems();

        this.setEventListeners();
    }
}