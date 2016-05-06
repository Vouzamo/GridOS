var grid = grid ? grid : {};

(function ($) {

    $.extend(grid,
    {
        settings: {
            // DOM
            $html: $('html'),
            $body: $('body'),            
            $canvas: $('canvas'),
            api: $('canvas').data('grid')
        }
    });

}(jQuery));