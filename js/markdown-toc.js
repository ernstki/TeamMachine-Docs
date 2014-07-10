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

				var toc = $("#toc").tocify({
					context: "#preview",
					selectors: "h1, h2, h3, h4",
					showEffect: "slideDown",
					hideEffect: "slideUp",
					scrollTo: 55,
					theme: "jqueryui",
					hashGenerator: "pretty",
					highlightOffset: 40});

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

