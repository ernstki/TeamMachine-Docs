/**
 * User: powerumc
 * Date: 2014. 5. 18.
 */


$(function() {
    $(function () {
        $.ajax({
            url: "Requirements.md",
            type: "GET",
            success: function (data) {
                var html = marked(data);
                $("#preview").html(html);

                $("#toc").tocify({
                    context: "#preview",
                    selectors: "h1, h2, h3, h4",
                    showEffect: "slideDown",
                    hideEffect: "slideUp",
                    scrollTo: 55,
                    theme: "jqueryui",
                    hashGenerator: "pretty",
                    highlightOffset: 40
                });
                
                // Add '.even' class to even <tr>s:
                $('tbody > tr:even').addClass('even');
                $('tbody > tr:odd').addClass('odd');
                
                // Wrap all images in a link to the img src and add the 
                // "popupimg" class for Colorbox and styling in
                // 'local-tweaks.css'. Also pull the 'alt' attribute off
                // of the image and apply it as the 'title' on the anchor.
                $('img').wrap(function() {
                    return '<a title="' + $(this).prop('alt') + '" href="' +
                    $(this).prop('src') + '" class="popupimg"></a>';
                });
                
                // Activate colorbox for a.colorbox anchors:
                $('a.popupimg').each(function() {
                    $(this).colorbox({
                        maxWidth:'100%',
                        maxHeight:'100%',
                        title:'Viewing \'' + $(this).prop('title') + '.\' Press ESC to close.'
                    });
                    // Now wrap with HTML5 figure tags and add a figcaption:
                    $(this).wrap('<figure>');
                    $(this).after('<figcaption>' + $(this).prop('title') + '</figcaption>');
                });
                
                $("code").addClass("prettyprint");
                prettyPrint();

                $(document).ready(function () {
                    $('[data-toggle=offcanvas]').click(function () {
                        $('.row-offcanvas').toggleClass('active');
                    });
                });

                $("#title").text($("#preview h1:first").text());
            }
        });
    });

});

