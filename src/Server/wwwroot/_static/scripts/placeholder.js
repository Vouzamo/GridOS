// namespace
var vouzamo = vouzamo || {};

function Placeholder(position) {
    this.Shape_constructor();

    this.initialize(position);
}

createjs.extend(Placeholder, createjs.Shape);

Placeholder.prototype.setEventListeners = function() {

};

Placeholder.prototype.initialize = function (position) {
    this.x = position.x;
    this.y = position.y;
    this.alpha = 0.1;

    this.graphics.beginFill("#000").drawCircle(0, 0, 5);

    var hitArea = new createjs.Shape();
    hitArea.graphics.beginFill("#000").drawRect(-10, -10, 20, 20);
    this.hitArea = hitArea;

    this.setEventListeners();
};

createjs.promote(Placeholder, "Shape");