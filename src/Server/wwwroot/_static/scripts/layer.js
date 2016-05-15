// namespace
var vouzamo = vouzamo || {};

function Layer(grid, layerId) {
    this.grid = grid;
    this.layerId = layerId;
    this.spacing = 100;
    this.dragOffset = new createjs.Point();
    this.container = {};
    this.items = [];

    this.initialize();
}

Layer.prototype = {
    constructor: Layer,

    center: function (animate) {
        var x = window.innerWidth / 2;
        var y = window.innerHeight / 2;

        var duration = animate ? 1000 : 0;
        createjs.Tween.get(this.container, { override: true }).to({ x: x, y: y }, duration, createjs.Ease.quadInOut);
    },

    updateSpacing(spacing) {
        this.spacing = spacing;

        this.items.forEach(function(item) {
            item.replace(true);
        });
    },

    setEventListeners: function () {
        // Resize / Orientation Change
        window.addEventListener("resize", function () {
            this.center(false);
        }.bind(this));
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

        this.center(false);

        this.loadItems();

        this.setEventListeners();
    }
}