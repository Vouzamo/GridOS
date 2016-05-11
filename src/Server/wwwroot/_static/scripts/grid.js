var grid = grid ? grid : {};

(function (grid, createjs) {

    grid.canvas = document.getElementById("grid");
    grid.stage = new createjs.Stage(grid.canvas);
    grid.container = new createjs.Container();

    grid.initStage = function () {
        var stage = new createjs.Stage(grid.canvas);

        // enable touch interactions if supported on the current device:
        createjs.Touch.enable(stage);

        grid.stage = stage;
    };

    grid.initContainer = function () {
        var container = new createjs.Container();

        container.x = grid.stage.canvas.width / 2;
        container.y = grid.stage.canvas.height / 2;

        var shape = new createjs.Shape();
        shape.graphics.beginFill("#fff").drawCircle(0, 0, 20);
        shape.addEventListener("click", function() {
            alert('click!');
        });
        container.addChild(shape);

        grid.stage.addChild(container);
        grid.container = container;
    };

    grid.initEvents = function () {
        // Resize
        window.addEventListener("resize", grid.resize, false);

        // Update tick(s)
        createjs.Ticker.setFPS(24);
        createjs.Ticker.addEventListener("tick", function (event) {
            grid.stage.update(event);
        });

        // Stage dragging
        var offset = new createjs.Point();
        var dragging = function (event) {
            event.preventDefault();
            grid.container.x = event.stageX - offset.x;
            grid.container.y = event.stageY - offset.y;
        }

        grid.stage.addEventListener("stagemousedown", function () {
            offset.x = grid.stage.mouseX - grid.container.x;
            offset.y = grid.stage.mouseY - grid.container.y;
            grid.stage.addEventListener("stagemousemove", dragging);
        });

        grid.stage.addEventListener("stagemouseup", function () {
            grid.stage.removeEventListener("stagemousemove", dragging);
        });
    };

    grid.resize = function () {
        var width = window.innerWidth;
        var height = window.innerHeight;

        // Stage
        grid.stage.canvas.width = width;
        grid.stage.canvas.height = height;

        // Container
        grid.container.x = width / 2;
        grid.container.y = height / 2;
    };

    grid.init = function() {
        grid.initStage();
        grid.initContainer();
        grid.initEvents();
        grid.resize();
    };
}(grid, createjs));