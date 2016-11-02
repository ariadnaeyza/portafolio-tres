function maquina(contenedor,texto,intervalo){
    // Calculamos la longitud del texto
    longitud = texto.length;
    // Obtenemos referencia del div donde se va a alojar el texto.
    cnt = document.getElementById(contenedor);
    var i=0;
    // Creamos el timer
    timer = setInterval(function(){
        // Vamos añadiendo letra por letra y la _ al final.
        cnt.innerHTML = cnt.innerHTML.substr(0,cnt.innerHTML.length-1) + texto.charAt(i) + "|";
        // Si hemos llegado al final del texto..
        if(i >= longitud){
            // Salimos del Timer y quitamos la barra baja (!)
            clearInterval(timer);
            cnt.innerHTML = cnt.innerHTML.substr(0,longitud);
        } else {
            // En caso contrario.. seguimos
            i++;
        }
    },intervalo);
};

var texto = "FRONT - END DEVELOPER";
// 100 es el intervalo de minisegundos en el que se escribirá cada letra.
maquina("maquinas",texto,120);

jQuery(document).ready(function(){
    jQuery('.skillbar').each(function(){
        jQuery(this).find('.skillbar-bar').animate({
            width:jQuery(this).attr('data-percent')
        },10000);
    });
});