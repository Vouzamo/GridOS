// namespace
var vouzamo = vouzamo || {};

function Item(layer, settings) {
    this.layer = layer;
    this.container = {}
    this.item = settings;

    this.initialize();
}

Item.prototype = {
    constructor: Item,

    replace: function (animate) {
        var x = this.item.position.x * this.layer.spacing;
        var y = this.item.position.y * this.layer.spacing;

        var duration = animate ? 500 : 0;
        createjs.Tween.get(this.container, { override: true }).to({ x: x, y: y }, duration, createjs.Ease.quadInOut);
    },

    setEventListeners: function() {
        this.container.addEventListener("click", this.invoke.bind(this));
    },

    invoke: function () {
        var self = this;

        $.ajax({
            url: self.layer.grid.api + "world/item/",
            method: "POST",
            contentType: 'application/json',
            data: JSON.stringify(self.item),
            success: function (data) {
                if (data.type === 0) {
                    window.location.href = data.url;
                }
            }
        });
    },

    initialize: function () {
        this.container = new createjs.Container();
        this.container.cursor = "pointer";

        this.layer.container.addChild(this.container);

        this.replace(false);

        // icon
        var shape = new createjs.Shape();
        shape.graphics.beginFill("#fff").drawCircle(0, 0, 10);
        this.container.addChild(shape);

        // text
        var text = new createjs.Text(this.item.name, "11px sans-serif", "#fff");
        text.y = 20;
        text.textAlign = "center";
        this.container.addChild(text);

        this.setEventListeners();
    }
}