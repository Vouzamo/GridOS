// namespace
var vouzamo = vouzamo || {};

function Layer(grid, layerId) {
    this.grid = grid;
    this.layerId = layerId;
    this.spacing = 100;
    this.isDragging = false;
    this.dragOffset = new createjs.Point();
    this.placeholders = {};
    this.container = {};
    this.placeholdersMatrix = new Matrix2D();
    this.matrix = new Matrix2D();

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

        var items = this.matrix.getAll();

        items.forEach(function(item) {
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

    clearItems: function() {
        this.matrix.clearAll();
        this.container.removeAllChildren();
        this.container.addChild(this.placeholders);
    },

    addPlaceholderItems: function() {
        for (var x = -7; x <= 7; x++) {
            for (var y = -4; y <= 4; y++) {
                if (this.matrix.isEmpty(x, y)) {
                    var placeholder = new createjs.Shape();
                    placeholder.x = x * this.spacing;
                    placeholder.y = y * this.spacing;
                    placeholder.alpha = 0.1;
                    placeholder.graphics.beginFill("#000").drawCircle(0, 0, 5);

                    this.placeholders.addChild(placeholder);
                    this.placeholdersMatrix.set(x, y, placeholder);
                }
            }
        }
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
            success: function (data) {
                self.clearItems();
                data.forEach(function (item) {
                    self.matrix.set(item.position.x, item.position.y, new Item(self, item));
                });
            }
        });

        // items.push(new Item(layer, settings));
    },

    initialize: function () {
        this.placeholders = new createjs.Container();
        this.container = new createjs.Container();

        this.grid.stage.addChild(this.container);

        this.center();

        this.addPlaceholderItems();

        this.loadItems();

        this.setEventListeners();
    }
}