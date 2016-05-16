﻿// namespace
var vouzamo = vouzamo || {};

function Item(layer, settings) {
    this.layer = layer;
    this.isDragging = false;
    this.dragOffset = new createjs.Point();
    this.dragTarget = null;
    this.container = {}
    this.item = settings;

    this.initialize();
}

Item.prototype = {
    constructor: Item,

    replace: function (duration) {
        var x = this.item.position.x * this.layer.spacing;
        var y = this.item.position.y * this.layer.spacing;

        createjs.Tween.get(this.container, { override: true }).to({ x: x, y: y }, duration, createjs.Ease.quadInOut);
    },

    setEventListeners: function () {
        var self = this;
        var stage = self.layer.grid.stage;
        var mouseDown, mouseHeld = false;
        var mouseTimer;

        self.container.addEventListener("mousedown", function (event) {
            self.layer.canDrag = false;
            self.dragOffset.x = stage.mouseX;
            self.dragOffset.y = stage.mouseY;
            mouseDown = true;
            mouseHeld = false;
            clearTimeout(mouseTimer);
            mouseTimer = setTimeout(function () {
                mouseHeld = true;
                // Start Drag
                if (Math.abs(self.dragOffset.x - stage.mouseX) <= 5 && Math.abs(self.dragOffset.y - stage.mouseY) <= 5) {
                    self.isDragging = true;
                    self.dragTarget = null;
                    self.dragOffset.x = stage.mouseX - self.container.x;
                    self.dragOffset.y = stage.mouseY - self.container.y;
                    createjs.Tween.get(self.container, { override: true }).to({ scaleX: 2, scaleY: 2 }, 500, createjs.Ease.elasticOut);
                }
            }.bind(self), 400)
        }.bind(self));

        // Dragging
        stage.addEventListener("stagemousemove", function (event) {
            if (self.isDragging) {
                self.container.x = event.stageX - self.dragOffset.x;
                self.container.y = event.stageY - self.dragOffset.y;

                var snappedX = Math.round(self.container.x / self.layer.spacing);
                var snappedY = Math.round(self.container.y / self.layer.spacing);

                var dragTarget = self.layer.placeholdersMatrix.get(snappedX, snappedY);

                if (self.dragTarget !== dragTarget) {
                    if (self.dragTarget !== null) {
                        createjs.Tween.get(self.dragTarget, { override: true }).to({ scaleX: 1, scaleY: 1, alpha: .1 }, 500, createjs.Ease.elasticOut);
                    }

                    if (dragTarget !== null && self.layer.matrix.isEmpty(snappedX, snappedY)) {
                        createjs.Tween.get(dragTarget, { override: true }).to({ scaleX: 3, scaleY: 3, alpha: .3 }, 500, createjs.Ease.elasticOut);
                    }

                    self.dragTarget = dragTarget;
                }
            }
        }.bind(self));

        stage.addEventListener("stagemouseup", function (e) {
            if(mouseDown && mouseHeld) {
                mouseDown = false;
                if (self.isDragging) {
                    // End Drag
                    createjs.Tween.get(self.container, { override: true }).to({ scaleX: 1, scaleY: 1 }, 500, createjs.Ease.elasticOut);
                    self.snapToGrid();
                }
                self.isDragging = false;
                e.preventDefault();
                return;
            }

            if(mouseDown) {
                clearTimeout(mouseTimer);
                mouseDown = false;
                // Click
                self.invoke();
            }
        }.bind(self));
    },

    snapToGrid: function () {
        var snappedX = Math.round(this.container.x / this.layer.spacing);
        var snappedY = Math.round(this.container.y / this.layer.spacing);

        var originX = this.item.position.x;
        var originY = this.item.position.y;

        var canMove = this.layer.matrix.isEmpty(snappedX, snappedY);

        if (canMove) {
            createjs.Tween.get(this.container, { override: false }).to({ x: snappedX * this.layer.spacing, y: snappedY * this.layer.spacing }, 500, createjs.Ease.elasticOut);
            // Save new position
            this.layer.matrix.move(originX, originY, snappedX, snappedY);
            this.item.position.x = snappedX;
            this.item.position.y = snappedY;
        } else {
            // Revert
            createjs.Tween.get(this.container, { override: false }).to({ x: originX * this.layer.spacing, y: originY * this.layer.spacing }, 500, createjs.Ease.elasticOut);
        }

        createjs.Tween.get(this.dragTarget, { override: true }).to({ scaleX: 1, scaleY: 1, alpha: .1 }, 500, createjs.Ease.elasticOut);
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

        this.replace();

        // icon
        var shape = new createjs.Shape();
        shape.graphics.beginFill("#fff").drawCircle(0, 0, 10);

        var hitArea = new createjs.Shape();
        hitArea.graphics.beginFill("#000").drawRect(-45, -45, 90, 90);
        shape.hitArea = hitArea;

        this.container.addChild(shape);

        // text
        var text = new createjs.Text(this.item.name, "11px sans-serif", "#fff");
        text.y = 20;
        text.textAlign = "center";
        this.container.addChild(text);

        this.setEventListeners();
    }
}