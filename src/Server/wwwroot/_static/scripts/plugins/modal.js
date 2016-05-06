var modal = (function () {
    var
    method = {},
    $overlay,
    $modal,
    $content,
    $title,
    $close;

    // Center the modal in the viewport
    method.center = function () {
        var top, left;

        top = Math.max(document.body.offsetHeight - $modal.outerHeight(), 0) / 2;
        left = Math.max(document.body.offsetWidth - $modal.outerWidth(), 0) / 2;

        $modal.css({
            top: top + $(window).scrollTop(),
            left: left + $(window).scrollLeft()
        });
    };

    // Open the modal
    method.open = function (settings) {
        if (settings) {
            $title.empty().append(settings.title);
            $content.empty().append(settings.content);

            var $imgs = $content.find('img');

            $imgs.each(function() {
                var img = new Image();
                img.src = this.src;
                img.onload = function() {
                    method.center();
                }
            });
        }
        

        $modal.css({
            width: settings.width || 'auto',
            height: settings.height || 'auto'
        });

        method.center();
        $(window).bind('resize.modal', method.center);
        $modal.show();
        $overlay.show();
    };

    // Close the modal
    method.close = function () {
        $modal.hide();
        $overlay.hide();
        $content.empty();
        $(window).unbind('resize.modal');
    };

    // Generate the HTML and add it to the document
    $overlay = $('<div id="overlay"></div>');
    $modal = $('<div id="modal"></div>');
    $content = $('<div id="content"></div>');
    $title = $('<h2></h2>');
    $close = $('<i id="close" class="fa fa-close fa-inverse"></i>');

    $modal.hide();
    $overlay.hide();
    $modal.append($title, $content, $close);

    $(document).ready(function () {
        $('body').append($overlay, $modal);
    });

    return method;
}());
