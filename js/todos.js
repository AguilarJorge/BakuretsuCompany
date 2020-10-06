$(function(){
    //Filtros
    $('.bakuretsu_filtros').on('click', '.grupo .headerGrupo', function(){
        $(this).parent().toggleClass('show');
        $(this).siblings('.contenidoGrupo').slideToggle('fast');
    })
    //Filtro activo
    $('.bakuretsu_filtros').on('click', '.grupo .contenidoGrupo .filtro', function(){
        $(this).toggleClass('seleccionado');
    })
    //Limpiar filtros por grupo
    $('.bakuretsu_filtros').on('click', '.grupo .headerGrupo .limpiarFiltro', function(e){
        e.stopPropagation();
        $(this).parents('.grupo').find('.filtro.seleccionado').removeClass('seleccionado');
    })
    //Limpiar todos los grupos
    $('.bakuretsu_filtros').on('click', '.filtrosHeader .borrarFiltros', function(){
        $(this).parents('.bakuretsu_filtros').find('.filtro.seleccionado').removeClass('seleccionado');
    })
})