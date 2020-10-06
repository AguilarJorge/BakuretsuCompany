$(function(){
    //Calcular altura del menu fixed para compensar margen del body
    if ($('.bakuretsu_menu').length) {
        let alturaMenu = $('.bakuretsu_menu .fixedWrapper').outerHeight(true);
        $('body').css('margin-top', alturaMenu);
    }
})