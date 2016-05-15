// namespace
var vouzamo = vouzamo || {};

function Grid(apiUrl, canvasId) {
    this.api = apiUrl;
    this.stage = {};
    this.activeLayer = {};

    this.initialize(canvasId);
}

Grid.prototype = {
    constructor: Grid,

    resize: function() {
        var width = window.innerWidth;
        var height = window.innerHeight;

        this.stage.canvas.width = width;
        this.stage.canvas.height = height;
    },

    setEventListeners: function () {
        // Resize / Orientation Change
        window.addEventListener("resize", function () {
            this.resize();
        }.bind(this));

        // Stage Update / Tick
        createjs.Ticker.addEventListener("tick", function (event) {
            this.stage.update(event);
        }.bind(this));

        // Start Drag
        this.stage.addEventListener("stagemousedown", function (event) {
            this.stage.isDragging = true;

            this.activeLayer.dragOffset.x = this.stage.mouseX - this.activeLayer.container.x;
            this.activeLayer.dragOffset.y = this.stage.mouseY - this.activeLayer.container.y;
        }.bind(this));

        // Dragging
        this.stage.addEventListener("stagemousemove", function (event) {
            if (this.stage.isDragging) {
                this.activeLayer.container.x = event.stageX - this.activeLayer.dragOffset.x;
                this.activeLayer.container.y = event.stageY - this.activeLayer.dragOffset.y;
            }
        }.bind(this));

        // End Drag
        this.stage.addEventListener("stagemouseup", function (event) {
            this.stage.isDragging = false;
        }.bind(this));
    },

    createStage(canvasId) {
        var canvas = document.getElementById(canvasId);
        var stage = new createjs.Stage(canvas);

        stage.enableMouseOver();
        createjs.Touch.enable(stage);

        this.stage = stage;

        this.resize();

        this.loadLayer("/");
    },

    loadLayer: function(layerId) {
        // Transition(s)?
        this.activeLayer = new Layer(this, layerId);
    },

    initialize: function (canvasId) {
        // Frames Per Second
        createjs.Ticker.setFPS(24);

        this.createStage(canvasId);

        this.setEventListeners();
    }
}

//var grid = grid ? grid : {};

//// events
//var mouseDown = false;
//var mouseHeld = false;
//var mouseTarget;
//var mouseTimerDuration = 400;
//var mouseTimer;

//function mouseDownHandler() {
//    mouseDown = true;
//    mouseHeld = false;
//    mouseTarget = this;
//    clearTimeout(mouseTimer);
//    mouseTimer = setTimeout(mouseHeldHandler, mouseTimerDuration)
//}

//function mouseUpHandler(e) {
//    if(mouseDown && mouseHeld) {
//        mouseDown = false;
//        e.preventDefault();
//        return
//    }

//    if(mouseDown) {
//        clearTimeout(mouseTimer);
//        mouseDown = false;
        
//        this.dispatchEvent("shortpress");

//        mouseTarget = null;
//    }
//}

//function mouseHeldHandler() {
//    mouseHeld = true;

//    this.dispatchEvent("longpress");
//}

//window.addEventListener("mouseup", mouseUpHandler);

//(function (grid, createjs) {

//    grid.canvas = null;
//    grid.stage = null;
//    grid.container = null;
//    grid.points = null;
//    grid.spacing = 100;
//    grid.offset = {
//        x: 0,
//        y: 0
//    };
//    grid.canDrag = true;

//    grid.createStage = function (canvasId) {
//        grid.canvas = document.getElementById(canvasId);
//        var stage = new createjs.Stage(grid.canvas);

//        stage.enableMouseOver();

//        // enable touch interactions if supported on the current device:
//        createjs.Touch.enable(stage);

//        grid.stage = stage;
//    };

//    grid.createContainer = function () {
//        // Points
//        var points = new createjs.Container();
//        points.alpha = 0.1;

//        grid.stage.addChild(points);
//        grid.points = points;

//        // Main container
//        var container = new createjs.Container();

//        container.x = grid.stage.canvas.width / 2;
//        container.y = grid.stage.canvas.height / 2;

//        grid.stage.addChild(container);
//        grid.container = container;
//    };

//    grid.addEvents = function () {
//        // Resize
//        window.addEventListener("resize", function() {
//            grid.resize();
//        });

//        // Update tick(s)
//        createjs.Ticker.setFPS(24);
//        createjs.Ticker.addEventListener("tick", function (event) {
//            grid.stage.update(event);
//        });

//        // Stage dragging
//        var offset = new createjs.Point();
//        var dragging = function (event) {
//            if (grid.canDrag) {
//                grid.container.x = event.stageX - offset.x;
//                grid.container.y = event.stageY - offset.y;
//            }
//        }

//        grid.stage.addEventListener("stagemousedown", function (event) {
//            if (grid.canDrag) {
//                offset.x = grid.stage.mouseX - grid.container.x;
//                offset.y = grid.stage.mouseY - grid.container.y;
//                grid.stage.addEventListener("stagemousemove", dragging);
//            }
//        });

//        grid.stage.addEventListener("stagemouseup", function (event) {
//            grid.stage.removeEventListener("stagemousemove", dragging);

//            var x = grid.container.x - grid.offset.x;
//            var y = grid.container.y - grid.offset.y;

//            if (x % grid.spacing !== 0 || y % grid.spacing !== 0) {
//                grid.animateTo(grid.container,
//                    (Math.round(x / grid.spacing) * grid.spacing) + grid.offset.x,
//                    (Math.round(y / grid.spacing) * grid.spacing) + grid.offset.y
//                );
//            }

//            grid.canDrag = true;
//        });

//        grid.container.addEventListener("mousedown", mouseDownHandler);
//    };

//    grid.animateTo = function (item, x, y) {

//        createjs.Tween.get(item, { override: true }).to({ x: x, y: y }, 1000, createjs.Ease.quadInOut);
//    }

//    grid.resize = function () {
//        var width = window.innerWidth;
//        var height = window.innerHeight;

//        // Stage
//        grid.stage.canvas.width = width;
//        grid.stage.canvas.height = height;

//        // Container
//        grid.container.x = width / 2;
//        grid.container.y = height / 2;

//        // Offset
//        grid.offset = {
//            x: width / 2,
//            y: height / 2
//        };

//        // Points
//        grid.points.removeAllChildren();

//        var overlap = {
//            x: (Math.ceil(grid.offset.x / grid.spacing) * grid.spacing) - grid.offset.x,
//            y: (Math.ceil(grid.offset.y / grid.spacing) * grid.spacing) - grid.offset.y
//        };

//        var bounds = {
//            x: 0 - overlap.x,
//            y: 0 - overlap.y,
//            width: grid.stage.canvas.width + (2 * overlap.x),
//            height: grid.stage.canvas.height + (2 * overlap.y)
//        };

//        for (var x = bounds.x; x <= bounds.width; x += grid.spacing) {
//            for (var y = bounds.y; y <= bounds.height; y += grid.spacing) {
//                var point = new createjs.Shape();
//                point.x = x;
//                point.y = y;
//                point.graphics.beginFill("#000").drawCircle(0, 0, 5);
//                grid.points.addChild(point);
//            }
//        }
//    };

//    grid.fetchData = function (x, y) {

//        function getCurrentLayer() {
//            var path = "/" + window.location.pathname.substr(0, window.location.pathname.lastIndexOf("/"));
//            var parts = path.split("/");
//            var current = "";

//            if (parts.length > 1) {
//                for (var i = 0; i <= parts.length - 1; i++) {
//                    if (parts[i].length > 0) {
//                        current += "/" + parts[i];
//                    }
//                }
//            } else {
//                return "/";
//            }

//            return current + "/";
//        }

//        var payload = {
//            world: window.location.host,
//            layer: getCurrentLayer(),
//            position: {
//                x: x,
//                y: y
//            }
//        }

//        $.ajax({
//            url: "/_api/world/references/",
//            method: "POST",
//            data: payload,
//            success: function (data) {
//                grid.plotData(data);
//            }
//        });
//    }

//    grid.plotData = function (items) {
//        items.forEach(function(item) {
//            var itemContainer = new createjs.Container();
//            itemContainer.x = item.position.x * grid.spacing;
//            itemContainer.y = item.position.y * grid.spacing;
//            itemContainer.cursor = "pointer";

//            var longPress = false;

//            var offset = new createjs.Point();
//            var dragging = function (event) {
//                itemContainer.x = event.stageX - offset.x;
//                itemContainer.y = event.stageY - offset.y;
//            }

//            itemContainer.addEventListener("shortpress", function () {
//                grid.invoke(item);
//            });

//            itemContainer.addEventListener("longpress", function () {
//                console.log('ready to move!');
//            });

//            grid.container.addChild(itemContainer);

//            // Icon
//            var shape = new createjs.Shape();
//            shape.graphics.beginFill("#fff").drawCircle(0, 0, 10);
//            itemContainer.addChild(shape);

//            // Label
//            var text = new createjs.Text(item.name, "11px sans-serif", "#fff");
//            text.y = 20;
//            text.textAlign = "center";
//            itemContainer.addChild(text);

//            itemContainer.addEventListener("mousedown", mouseDownHandler);
//        });
//    };

//    grid.invoke = function(item) {
//        $.ajax({
//            url: "/_api/world/item/",
//            method: "POST",
//            data: JSON.stringify(item),
//            contentType: 'application/json;charset=utf-8',
//            success: function (data) {
//                grid.applyAction(data);
//            }
//        });
//    };

//    grid.applyAction = function(action) {
//        if (action && action.type === 0) {
//            window.location.href = action.url;
//        } else if (action && action.type === 1) {
//            console.log('modal');
//        }
//    }

//    grid.init = function(canvasId) {
//        grid.createStage(canvasId);
//        grid.createContainer();
//        grid.addEvents();
//        grid.resize();
//        grid.fetchData(0, 0);
//    };
//}(grid, createjs));