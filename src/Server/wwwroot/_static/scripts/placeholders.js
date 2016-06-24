// namespace
var vouzamo = vouzamo || {};

function Placeholders(bounds, spacing) {
    this.Container_constructor();

    this.initialize(bounds, spacing);
}

createjs.extend(Placeholders, createjs.Container);

Placeholders.prototype.setEventListeners = function () {

};

Placeholders.prototype.refresh = function (bounds, spacing) {
    var self = this;

    self.removeAllChildren();

    for (var x = bounds.x; x <= (bounds.x + bounds.width); x += spacing) {
        for (var y = bounds.y; y <= (bounds.y + bounds.width) ; y += spacing) {
            var placeholder = new Placeholder({ x: x, y: y });

            self.addChild(placeholder)
        }
    }
}

Placeholders.prototype.initialize = function (bounds, spacing) {
    this.refresh(bounds, spacing);
    this.setEventListeners();
};

createjs.promote(Placeholders, "Container");