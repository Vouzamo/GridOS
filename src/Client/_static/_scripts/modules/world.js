var grid = grid ? grid : {};

(function ($) {

    $.extend(grid, {
        world: {
            context: {
                world: grid.utils.http.host,
                layer: grid.utils.http.path,
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

                    var screenPosition = {
                        x: (worldPosition.x) * self.spacing.total(),
                        y: (worldPosition.y) * self.spacing.total()
                    };

                    return screenPosition;
                },
                toWorldPosition: function (screenPosition) {
                    var self = this;

                    var worldPosition = {
                        x: (screenPosition.x / self.spacing.total()),
                        y: (screenPosition.y / self.spacing.total())
                    }

                    return worldPosition;
                }
            },
            data: {
                items: []
            },
            init: function () {
                var self = this;

                self.loadData();
            },
            loadData: function () {
                var self = this;
                var apiRoot = 'http://localhost:51364/_api/'
                var apiEndpoint = 'world/data';
                
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
                    success: function (data) {
                        self.data.items = data;
                        grid.drawing.draw();
                    }
                });
            }
        }
    });

    $.subscribe('ready', grid.world.init());

}(jQuery));