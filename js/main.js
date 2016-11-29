/*WOW*/
new WOW().init();

/*SCROLL*/
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

/*TOP*/
jQuery(function( $ ){
    var scrollDiv = document.createElement("div");
    jQuery(scrollDiv).attr("id", "toTop").attr("data-toggle", "tooltip").attr("data-placement", "left").attr("title", "Back to Top").html("<i class='fa  fa-chevron-up'></i>").appendTo("body");    
    jQuery(window).scroll(function () {
        if (jQuery(this).scrollTop() != 0) {
            jQuery("#toTop").fadeIn();
        } else {
            jQuery("#toTop").fadeOut();
        }
    });
    jQuery("#toTop").click(function () {
        jQuery("body,html").animate({
            scrollTop: 0
        },800);
    });
});

/*SKILL*/
$(function () {
    $('.chart').waypoint(function () {
        $('.chart').each(function () {
            $(this).easyPieChart({
                easing: 'easeOutBounce',
                onStep: function (from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }, 
                size: 100,
                animate: 5000,
                lineCap: 'butt',
                scaleColor: false,
                barColor: '#FFEB3B',
                trackColor: 'transparent',
                lineWidth: 10
            });
        });
    }, {
        offset: '80%'
    });
});



jQuery(document).ready(function () { // Para añadir una capa de 'Cargando' y ocultar la galería mientras cargan sus imágenes
    jQuery('.galeria-ampliable').addClass('indentado').before('<div id="cargando"><p>Cargando...</p></div>');
});
jQuery(window).load(function () { // Generación de la galería
    jQuery('.galeria-ampliable').galeria({}).hide().removeClass('indentado').fadeIn(1000).prev().remove();
});