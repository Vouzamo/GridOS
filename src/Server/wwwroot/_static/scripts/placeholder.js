// namespace
var vouzamo = vouzamo || {};

function Placeholder(layer, position) {
    this.layer = layer;
    this.container = {}

    this.initialize(position);
}

Placeholder.prototype = {
    constructor: Placeholder,

    setEventListeners: function() {

    },

    initialize: function (position) {
        this.container = new createjs.Container();
        this.container.x = position.x;
        this.container.y = position.y;
        this.container.alpha = 0.1;
        //this.container.cursor = "pointer";

        this.layer.placeholders.addChild(this.container);

        var shape = new createjs.Shape();
        shape.graphics.beginFill("#000").drawCircle(0, 0, 5);

        var hitArea = new createjs.Shape();
        hitArea.graphics.beginFill("#000").drawRect(-10, -10, 20, 20);
        shape.hitArea = hitArea;

        this.container.addChild(shape);

        this.setEventListeners();
    }
}