var grid = grid ? grid : {};

(function ($) {

    $.extend(grid, {
        utils: {
            http: {
                protocol: window.location.protocol,
                host: window.location.host,
                port: window.location.port,
                path: '/' + window.location.pathname.substr(0, window.location.pathname.lastIndexOf('/')),
                parent: function () {
                    var parts = grid.utils.http.path.split('/');
                    var parent = '';

                    if (parts.length > 1) {
                        for (var i = 0; i <= parts.length - 1; i++) {
                            if (parts[i].length > 0) {
                                parent += '/' + parts[i];
                            }
                        }
                    } else {
                        parent = '/';
                    }

                    return parent.substr(0, parent.lastIndexOf('/')) + '/';
                },
                query: [],
                url: function() {
                    return grid.utils.http.protocol + '//' + grid.utils.http.host + (grid.utils.http.port != 80 ? ':' + grid.utils.http.port : '') + grid.utils.http.path;
                }
            },
            init: function () {

            }
        }
    });

    $.subscribe('ready', grid.utils.init);

}(jQuery));