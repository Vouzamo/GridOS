var grid = grid ? grid : {};

(function ($, $$) {

    $.extend(grid, {
        input: {
            pinchDelta: 0,
            swipeDelta: {
                x: 0,
                y: 0
            },
            init: function () {
                var self = grid.input;

                var gestures = ['swiping', 'swipe', 'pinching', 'pinch'];

                gestures.forEach(function (type) {

                    $$('canvas').on(type, function (ev) {

                        if (type == 'swiping') {
                            ev.preventDefault();

                            var delta = {
                                x: self.swipeDelta.x - ev.touch.delta.x,
                                y: self.swipeDelta.y - ev.touch.delta.y
                            }

                            var worldDelta = grid.world.viewport.toWorldPosition(delta);

                            grid.world.viewport.pan(worldDelta);

                            self.swipeDelta = ev.touch.delta;
                        }

                        if (type == 'swipe') {
                            ev.preventDefault();

                            self.swipeDelta = {
                                x: 0,
                                y: 0
                            }
                        }

                        if (type == 'pinching') {
                            ev.preventDefault();

                            var magnitude = self.pinchDelta - ev.touch.delta;

                            self.pinchDelta = ev.touch.delta;

                            if (magnitude > 0) {
                                grid.world.viewport.zoomIn();
                            }
                            else if (magnitude < 0) {
                                grid.world.viewport.zoomOut();
                            }
                        }

                        if (type == 'pinch') {
                            ev.preventDefault();

                            self.pinchDelta = 0;
                        }
                    });

                });
            },
            wheel: function (evt) {
                if (!evt) evt = event;
                var direction = (evt.detail < 0 || evt.wheelDelta > 0) ? 1 : -1;

                if (direction > 0)
                {
                    grid.world.viewport.zoomIn();
                } else if (direction < 0) {
                    grid.world.viewport.zoomOut();
                }

                return false;
            },
            update: function () {
                
            }
        }
    });

    $.subscribe('ready', grid.input.init);
    $.subscribe('update', grid.input.update);

    window.addEventListener("mousewheel", grid.input.wheel, false);
    window.addEventListener('DOMMouseScroll', grid.input.wheel, false);

}(jQuery, $$));