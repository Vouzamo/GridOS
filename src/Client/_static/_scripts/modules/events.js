var grid = grid ? grid : {};

(function ($) {

    $.extend(grid, {
        ready: function () {
            var self = this;

            $.publish('ready');
        },
        update: function () {
            var self = this;

            setTimeout(function () {
                console.log('updating');
                $.publish('update');
            }, 1000);
        },
        resize: function () {
            var self = this;

            $.publish('resize');
        }
    });

    $.subscribe('ready', grid.update);
    $.subscribe('ready', grid.resize);

}(jQuery));