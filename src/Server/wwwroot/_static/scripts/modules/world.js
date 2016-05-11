var grid = grid ? grid : {};

(function ($) {

    $.extend(grid, {
        world: {
            context: {
                world: grid.utils.http.host,
                layer: grid.utils.http.current(),
                parent: grid.utils.http.parent()
            },
            viewport: {
                position: {
                    x: 0,
                    y: 0
                },
                spacing: {
                    absolute: 25,
                    relative: 50,
                    multiplier: 3,
                    total: function () {
                        var self = this;
                        
                        return self.absolute + (self.relative * self.multiplier);
                    }
                },
                pan: function (vector) {
                    var self = this;

                    self.position.x += vector.x;
                    self.position.y += vector.y;

                    grid.drawing.draw();
                },
                zoomIn: function () {
                    var self = this;

                    var multiplier = self.spacing.multiplier;
                    multiplier += 0.25;

                    self.spacing.multiplier = Math.max(Math.min((multiplier), 5), 1);

                    grid.drawing.draw();
                },
                zoomOut: function () {
                    var self = this;

                    var multiplier = self.spacing.multiplier;
                    multiplier -= 0.25;

                    self.spacing.multiplier = Math.max(Math.min((multiplier), 5), 1);

                    grid.drawing.draw();
                },
                toScreenPosition: function (worldPosition) {
                    var self = this;

                    var viewportPosition = {
                        x: worldPosition.x - self.position.x,
                        y: worldPosition.y - self.position.y
                    }

                    var screenPosition = {
                        x: (viewportPosition.x) * self.spacing.total(),
                        y: (viewportPosition.y) * self.spacing.total()
                    };

                    return screenPosition;
                },
                toWorldPosition: function (screenPosition) {
                    var self = this;

                    var viewportPosition = {
                        x: screenPosition.x + self.position.x,
                        y: screenPosition.y + self.position.y
                    }

                    var worldPosition = {
                        x: (viewportPosition.x / self.spacing.total()),
                        y: (viewportPosition.y / self.spacing.total())
                    }

                    return worldPosition;
                }
            },
            data: {
                items: []
            },
            init: function () {
                var self = grid.world;

                self.loadData();
            },
            loadData: function () {
                var self = this;
                var apiRoot = grid.settings.api;
                var apiEndpoint = 'world/references';
                
                $.ajax({
                    type: "POST",
                    url: apiRoot + apiEndpoint,
                    data: {
                        world: self.context.world,
                        layer: self.context.layer,
                        position: {
                            x: Math.floor(self.viewport.position.x),
                            y: Math.floor(self.viewport.position.y)
                        }
                    },
                    success: function(data) {
                        self.data.items = data;

                        self.data.items.forEach(function(item) {
                            item.iconImg = new Image();
                            item.iconImg.src = item.icon;
                            item.iconImg.onload = function() {
                                item.icon = '';
                                grid.drawing.draw();
                            }
                        });

                        grid.drawing.draw();
                    }
                });
            },
            invoke: function(ref) {
                var self = this;
                var apiRoot = grid.settings.api;
                var apiEndpoint = 'world/item';

                $.ajax({
                    type: 'POST',
                    url: apiRoot + apiEndpoint,
                    data: JSON.stringify(ref),
                    contentType: 'application/json;charset=utf-8',
                    success: function(data) {
                        if (data && data.type == 0) {
                            window.location.href = data.url;
                        } else if (data && data.type == 1) {
                            modal.open({ title: data.title, content: data.html });
                        }
                    }
                });
            }
        }
    });

    $.subscribe('ready', grid.world.init);

}(jQuery));