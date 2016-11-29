(function($){
    $.fn.galeria = function(options){

        var defaults = { // Opciones por defecto
            selectorElementoGaleria: '.elemento-galeria'
            ,selectorElementoGaleriaInterior: '.elemento-galeria-interior'
            ,selectorEnlace: '.enlace-elemento a'
            ,selectorDetalle: '.detalle-elemento'
            ,claseJs: 'js-galeria-ampliable'
            ,claseElementoActivo: 'elemento-galeria-activo'
            ,selectorLinea: '.linea'
            ,htmlLinea: '<div class="linea"></div>'
        }

        var op = $.extend(defaults, options);

        return this.each(function(){
            var galeria = $(this);
            galeria.addClass(op.claseJs);
            var elementosGaleria = galeria.find(op.selectorElementoGaleria);
            redimensionar(galeria,elementosGaleria);
        });


        function lineas (galeria,elementosGaleria) {
            var anchoGaleria = galeria.width();
            var anchoLinea = 0;
            elementosGaleria.eq(0).before(op.htmlLinea);
            var elementoLinea = galeria.find(op.selectorLinea+':last');
            elementosGaleria.each(function () {
                var elementoGaleria = $(this);
                anchoLinea = anchoLinea+(elementoGaleria.innerWidth())+parseInt(elementoGaleria.css('margin-left'))+parseInt(elementoGaleria.css('margin-right'));

                elementoGaleria.appendTo(elementoLinea);


                if (anchoLinea>anchoGaleria) {
                    corregirDimensionesElementosLinea(elementoLinea,anchoLinea,anchoGaleria);
                    elementoLinea.after(op.htmlLinea);
                    elementoLinea = galeria.find(op.selectorLinea+':last');
                    anchoLinea=0;
                }
            });
            elementosGaleria.appendTo(galeria);
            galeria.find(op.selectorLinea).remove();
        }

        function corregirDimensionesElementosLinea (elementoLinea,anchoLinea,anchoGaleria) {
            var elementosGaleriaEnLinea = elementoLinea.find(op.selectorElementoGaleria);
            var numeroElementosGaleriaEnLinea = elementosGaleriaEnLinea.length;
            var diferencia = anchoLinea-anchoGaleria;
            var correccion = parseInt(diferencia/numeroElementosGaleriaEnLinea);
            var resto = diferencia-(correccion*numeroElementosGaleriaEnLinea);


            elementosGaleriaEnLinea.each(function () {
                var elementoGaleriaEnLinea = $(this);
                var elementoGaleriaEnLineaInterior = elementoGaleriaEnLinea.find(op.selectorElementoGaleriaInterior).eq(0);
                var enlaceEnLinea = elementoGaleriaEnLinea.find(op.selectorEnlace).eq(0);
                var anchoElemento = elementoGaleriaEnLinea.innerWidth();
                var correccionElemento = correccion;
                if (elementoGaleriaEnLinea.is(':first-child')) {
                    correccionElemento += resto;
                }
                var anchoFinal = anchoElemento-correccionElemento;
                elementoGaleriaEnLinea.css({'width':anchoFinal+'px'});
                elementoGaleriaEnLineaInterior.css({'width':anchoFinal+'px'});
                enlaceEnLinea.css({'width':anchoFinal+'px'}).attr('data-dimensiones-ancho',anchoFinal);

            });

        }

        function redimensionar (galeria,elementosGaleria) {
            elementosGaleria.each(function () {
                var elementoGaleria = $(this);
                var elementoGaleriaInterior = elementoGaleria.find(op.selectorElementoGaleriaInterior).eq(0);
                var enlace = $(this).find(op.selectorEnlace).eq(0);
                var imagen = enlace.find('img').eq(0);

                // Se hallan las dimensiones del elemento de galería
                var anchoElementoGaleria = elementoGaleria.innerWidth();
                var altoElementoGaleria = elementoGaleria.innerHeight();

                // Dimensiones originales de la imagen
                var anchoImagen = imagen.width();
                var altoImagen = imagen.height();

                // Nuevas dimensiones de imagen
                var nuevoAnchoImagen = parseInt(anchoImagen*0.6);
                var nuevoAltoImagen = parseInt(altoImagen*0.6);
                if (nuevoAltoImagen<altoElementoGaleria) {
                    nuevoAltoImagen=altoElementoGaleria;
                    var nuevoFactorRedimension = nuevoAltoImagen/altoImagen;
                    nuevoAnchoImagen = parseInt(anchoImagen*nuevoFactorRedimension);
                }

                // Se aplica el ancho de la nueva imagen a los contenedores del elemento de galería
                elementoGaleria.css({'width':nuevoAnchoImagen+'px'});
                elementoGaleriaInterior.css({'width':nuevoAnchoImagen+'px'});


                // Se hallan las posiciones necesarias para centrar la imagen
                var posicionHorizontalImagen = parseInt((nuevoAnchoImagen-anchoElementoGaleria)/2)*(-1);
                var posicionVerticalImagen = parseInt((nuevoAltoImagen-altoElementoGaleria)/2)*(-1);

                // Se dan estilos a la imagen y atributos data-* de tamaño original y nuevo tamaño
                imagen.css({'width':nuevoAnchoImagen+'px','height':nuevoAltoImagen+'px','left':posicionHorizontalImagen+'px','top':posicionVerticalImagen+'px'})
                    .attr('data-dimensiones-ancho',nuevoAnchoImagen)
                    .attr('data-dimensiones-alto',nuevoAltoImagen)
                    .attr('data-dimensiones-ancho-original',anchoImagen)
                    .attr('data-dimensiones-alto-original',altoImagen);

                // Se dan estilos al enlace y atributos data-* de tamaño
                enlace.css('width',nuevoAnchoImagen+'px').attr('data-dimensiones-ancho',nuevoAnchoImagen);

            });

            // Ajuste de anchos de línea
            lineas(galeria,elementosGaleria);


            elementosGaleria.each(function () {
                var elementoGaleria = $(this);
                var elementoGaleriaInterior = elementoGaleria.find(op.selectorElementoGaleriaInterior).eq(0);
                var enlace = $(this).find(op.selectorEnlace).eq(0);
                var imagen = enlace.find('img').eq(0);

                // Corrección de la posición horizontal de la imagen para volver a centrarla
                var posicionHorizontalImagen = parseInt((imagen.innerWidth()-elementoGaleria.innerWidth())/2)*(-1);
                imagen.css({'left':posicionHorizontalImagen+'px'})

                // Muestra de detalle
                detallar(elementoGaleria,elementoGaleriaInterior,enlace,imagen);
            });
        }

        function detallar (elementoGaleria,elementoGaleriaInterior,enlace,imagen) {
            var altoImagen = imagen.attr('data-dimensiones-alto');
            var anchoImagen = imagen.attr('data-dimensiones-ancho');
            var altoImagenOriginal = imagen.attr('data-dimensiones-alto-original');
            var anchoImagenOriginal = imagen.attr('data-dimensiones-ancho-original');
            var anchoEnlace = enlace.attr('data-dimensiones-ancho');


            var anchoElemento = elementoGaleria.width();
            var altoElemento = elementoGaleria.height();

            elementoGaleria.hover(
                function () {

                    elementoGaleria.addClass(op.claseElementoActivo); // Se activa el elemento de galería

                    // Se quitan los estilos del estado inactivo
                    imagen.css({width:anchoImagenOriginal+'px',height:altoImagenOriginal+'px'});
                    enlace.css({'width':'auto'});
                    elementoGaleriaInterior.css({'width':'','height':''});

                    // Dimensiones: alto y ancho del activo (incluyendo bordes)
                    var anchoBordesHorizontales = parseInt(elementoGaleriaInterior.css('border-left-width'))+parseInt(elementoGaleriaInterior.css('border-right-width'));
                    var anchoBordesVerticales = parseInt(elementoGaleriaInterior.css('border-top-width'))+parseInt(elementoGaleriaInterior.css('border-bottom-width'));
                    var anchoActivo = elementoGaleriaInterior.innerWidth()+anchoBordesHorizontales;
                    var altoActivo = elementoGaleriaInterior.innerHeight()+anchoBordesVerticales;

                    // Posicionamiento absoluto centrado (sin corrección)
                    var posicionVerticalInicial = parseInt((altoActivo-altoElemento)/-2);
                    var posicionHorizontalInicial = parseInt((anchoActivo-anchoElemento)/-2);

                    // Posicion desde el inicio del documento y dimensiones del área visible
                    var posicionVerticalViewport = $(window).scrollTop();
                    var posicionHorizontalViewport = $(window).scrollLeft();
                    var altoViewport = $(window).height();
                    var anchoViewport = $(window).width();

                    // Posicion desde el inicio del documento del activo
                    var posicionElementoGaleria = elementoGaleriaInterior.offset();
                    var posicionVerticalElementoGaleria = parseInt(posicionElementoGaleria.top);
                    var posicionHorizontalElementoGaleria = parseInt(posicionElementoGaleria.left);

                    // Correcciones verticales
                    var correccionVertical = 0;
                    var sumaPosicionesSuperiores = posicionVerticalViewport-posicionVerticalElementoGaleria-posicionVerticalInicial;
                    var sumaPosicionesInferiores = (posicionVerticalElementoGaleria+altoActivo+posicionVerticalInicial)-(posicionVerticalViewport+altoViewport)
                    if (sumaPosicionesSuperiores>0) {correccionVertical=sumaPosicionesSuperiores;}
                    else if (sumaPosicionesInferiores>0) {correccionVertical=sumaPosicionesInferiores*(-1);}


                    // Correcciones horizontales
                    var correccionHorizontal = 0;
                    var sumaPosicionesIzquierdas = posicionHorizontalViewport-posicionHorizontalElementoGaleria-posicionHorizontalInicial;
                    var sumaPosicionesDerechas = (posicionHorizontalElementoGaleria+anchoActivo+posicionHorizontalInicial)-(posicionHorizontalViewport+anchoViewport)
                    if (sumaPosicionesIzquierdas>0) {correccionHorizontal=sumaPosicionesIzquierdas;}
                    else if (sumaPosicionesDerechas>0) {correccionHorizontal=sumaPosicionesDerechas*(-1);}


                    // Posicionamiento elemento activo
                    var posicionVertical = posicionVerticalInicial+correccionVertical;
                    var posicionHorizontal = posicionHorizontalInicial+correccionHorizontal;
                    elementoGaleriaInterior.css({'top':posicionVertical+'px','left':posicionHorizontal+'px'});


                }
                ,function () {
                    $(this).removeClass(op.claseElementoActivo);  // Se desactiva el elemento de galería

                    // Vuelta a los estilos de estado inactivo
                    imagen.css({'width':anchoImagen+'px','height':altoImagen+'px'});
                    enlace.css({'width':anchoEnlace+'px'});
                    elementoGaleriaInterior.css({'width':anchoImagen+'px','top':'','bottom':'','left':''})
                }
            );
        }

    }
})(jQuery);