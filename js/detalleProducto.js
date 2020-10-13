$(function(){
  //Crear dots para las imagenes y activar la primer imagen
  if ($('.bakuretsu_detalleProducto .preview').length) {
    let preview = $('.bakuretsu_detalleProducto .preview');
    let totalImgs = preview.find('.imagenProd').length;
    preview.find('.imagenProd').first().addClass('activa');
    if (totalImgs > 1) {
      let dots = '';
      for (let i = 1; i <= totalImgs; i++) {
        dots += `<div class="dot ${i == 1 ? 'activa':''}"></div>`;
      }
      $(`
        <div class="controls">
          <div class="control left">
            <div class="bakuretsu_icono">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                <path d="M14 31.998h36"></path>
                <path d="M28 18L14 32l14 14"></path>
              </svg>
            </div>
          </div>
          <div class="dots">${dots}</div>
          <div class="control right">
            <div class="bakuretsu_icono">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                <path d="M50 31.998H14"></path>
                <path d="M36 18l14 14-14 14"></path>
              </svg>
            </div>
          </div>
        </div>`
      ).insertAfter(preview.children('.imagenesContainer'));
      preview.on('click', '.control', function(){
        var imgActiva = preview.find('.imagenProd.activa');
        var indexActiva = imgActiva.index();
        imgActiva.removeClass('activa');
        preview.find('.dot').removeClass('activa');
        if ($(this).hasClass('left')) {
          if (indexActiva == 0) {
            preview.find('.imagenProd').last().addClass('activa');
            preview.find('.dot').last().addClass('activa');
          } else {
            preview.find('.imagenProd').eq(indexActiva - 1).addClass('activa');
            preview.find('.dot').eq(indexActiva - 1).addClass('activa');
          }
        } else if ($(this).hasClass('right')) {
          if (indexActiva < (totalImgs - 1)) {
            preview.find('.imagenProd').eq(indexActiva + 1).addClass('activa');
            preview.find('.dot').eq(indexActiva + 1).addClass('activa');
          } else {
            preview.find('.imagenProd').first().addClass('activa');
            preview.find('.dot').first().addClass('activa');
          }
        }
      })
      preview.on('click', '.dot', function(){
        var index = $(this).index();
        $(this).siblings('.activa').removeClass('activa');
        preview.find('.imagenProd.activa').removeClass('activa');
        $(this).addClass('activa');
        preview.find('.imagenProd').eq(index).addClass('activa');
      })
    }
  }
  //Agregar a favoritos
  $('.bakuretsu_detalleProducto .aFavs').click(function () {
    $(this).toggleClass('esFav');
  })
  //100vh height Detalle producto estilo3
  if ($('.bakuretsu_menu').length && $('.bakuretsu_detalleProducto.sty3').length) {
    let altura = $('.bakuretsu_menu .fixedWrapper').outerHeight(true);
    $('.bakuretsu_detalleProducto .imagenWrapper').css('min-height', `calc(100vh - ${altura}px)`);
  }
  //...
  if ($('.bakuretsu_detalleProducto.orig').length) {
    let seccion = $('.bakuretsu_detalleProducto.orig');
    let tit = seccion.find('.infClone').clone();
    let prc = seccion.find('.toClone').clone();
    seccion.find('.detalleWrapper').prepend(tit);
    seccion.find('.detalleWrapper .leftSide .preview').append(prc);
  }
})