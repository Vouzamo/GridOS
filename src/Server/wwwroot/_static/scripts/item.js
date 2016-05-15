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

        var duration = animate ? 1000 : 0;
        createjs.Tween.get(this.container, { override: true }).to({ x: x, y: y }, duration, createjs.Ease.quadInOut);
    },

    initialize: function () {
        this.container = new createjs.Container();

        this.layer.container.addChild(this.container);

        this.replace(false);

        var shape = new createjs.Shape();
        shape.graphics.beginFill("#fff").drawCircle(0, 0, 10);
        this.container.addChild(shape);
    }
}