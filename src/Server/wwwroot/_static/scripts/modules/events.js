var grid = grid ? grid : {};

(function ($) {

    $.extend(grid, {
        ready: function () {
            $.publish('ready');
            $(window).resize(grid.resize);
            grid.resize();
        },
        update: function () {
            setInterval(function () {
                $.publish('update');
            }, 1000);
        },
        resize: function () {
            $.publish('resize');
        }
    });

    $.subscribe('ready', grid.update);
    $.subscribe('ready', grid.resize);

}(jQuery));