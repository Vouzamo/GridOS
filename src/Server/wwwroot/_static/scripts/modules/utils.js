var grid = grid ? grid : {};

(function ($) {

    $.extend(grid, {
        utils: {
            http: {
                protocol: window.location.protocol,
                host: window.location.host,
                port: window.location.port,
                path: '/' + window.location.pathname.substr(0, window.location.pathname.lastIndexOf('/')),
                current: function() {
                    var parts = grid.utils.http.path.split('/');
                    var current = '';

                    if (parts.length > 1) {
                        for (var i = 0; i <= parts.length - 1; i++) {
                            if (parts[i].length > 0) {
                                current += '/' + parts[i];
                            }
                        }
                    } else {
                        return '/';
                    }

                    return current + '/';
                },
                parent: function () {
                    var current = grid.utils.http.current();

                    var parent = current.substr(0, current.lastIndexOf('/'));
                    parent = parent.substr(0, parent.lastIndexOf('/')) + '/';

                    return parent;
                },
                query: [],
                url: function() {
                    return grid.utils.http.protocol + '//' + grid.utils.http.host + (grid.utils.http.port != 80 ? ':' + grid.utils.http.port : '') + grid.utils.http.path;
                }
            },
            geometry: {
                isInCircleBounds: function (aPosition, aRadius, bPosition) {

                    var dx = aPosition.x - bPosition.x;
                    var dy = aPosition.y - bPosition.y;

                    var distance = Math.sqrt(dx * dx + dy * dy);

                    return (distance <= aRadius);
                }
            },
            init: function () {

            }
        }
    });

    $.subscribe('ready', grid.utils.init);

}(jQuery));