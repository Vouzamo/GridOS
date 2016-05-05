﻿var grid = grid ? grid : {};

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

                var gestures = ['doubleTap', 'swiping', 'swipe', 'pinching', 'pinch'];

                gestures.forEach(function (type) {

                    $$('canvas').on(type, function (ev) {

                        if (type == 'doubleTap') {
                            ev.preventDefault();

                            var clickPosition = ev.touch;

                            grid.world.data.items.forEach(function(item) {
                                var viewportPosition = {
                                    x: item.position.x - grid.world.viewport.position.x,
                                    y: item.position.y - grid.world.viewport.position.y
                                }

                                var screenPosition = grid.world.viewport.toScreenPosition(viewportPosition);
                                screenPosition.x += grid.drawing.context.canvas.width / 2;
                                screenPosition.y += grid.drawing.context.canvas.height / 2;

                                if (grid.utils.geometry.isInCircleBounds(screenPosition, 20, clickPosition)) {
                                    console.log('Collision with...');
                                    console.log(item);
                                    if (item.name != 'back') {
                                        window.location.href = grid.utils.http.current() + item.name + '/';
                                    } else {
                                        window.location.href = grid.utils.http.parent();
                                    }
                                }
                            });
                        }

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