// namespace
var vouzamo = vouzamo || {};

function Layer(grid, layerId) {
    this.Container_constructor();

    this.grid = grid;
    this.layerId = layerId;
    this.spacing = 100;
    this.isDragging = false;
    this.dragOffset = new createjs.Point();
    this.matrix = new Matrix2D();

    this.initialize();
}

createjs.extend(Layer, createjs.Container);

Layer.prototype.center = function (duration) {
    var x = window.innerWidth / 2;
    var y = window.innerHeight / 2;

    createjs.Tween.get(this, { override: true }).to({ x: x, y: y }, duration, createjs.Ease.quadInOut);
};

Layer.prototype.updateSpacing = function(spacing, duration) {
    this.spacing = spacing;

    var items = this.matrix.getAll();

    items.forEach(function(item) {
        item.replace(duration);
    });
};

Layer.prototype.setEventListeners = function () {
    var self = this;
    var stage = self.grid;

    // Resize / Orientation Change
    window.addEventListener("resize", function () {
        self.center(false);
    }.bind(self));

    // Start Drag
    stage.addEventListener("stagemousedown", function (event) {
        self.isDragging = true;
        self.canDrag = true;

        self.dragOffset.x = stage.mouseX - self.x;
        self.dragOffset.y = stage.mouseY - self.y;
    }.bind(self));

    // Dragging
    stage.addEventListener("stagemousemove", function (event) {
        if (self.isDragging && self.canDrag) {
            self.x = event.stageX - self.dragOffset.x;
            self.y = event.stageY - self.dragOffset.y;
        }
    }.bind(self));

    // End Drag
    stage.addEventListener("stagemouseup", function (event) {
        self.isDragging = false;
    }.bind(self));
};

Layer.prototype.clearItems = function() {
    var self = this;

    self.matrix.clearAll();
    self.removeAllChildren();

    self.addChild(new Placeholders({
        x: -1000,
        y: -800,
        width: 2000,
        height: 1600
    }, self.spacing));
};

Layer.prototype.loadItems = function () {
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
};

Layer.prototype.initialize = function () {
    this.center();

    this.loadItems();

    this.setEventListeners();
};

createjs.promote(Layer, "Container");