$(function(){
  //Checar storage para ver si activo el dark theme
  if (localStorage.getItem('theme') === 'dark') {
    $('body').addClass('darken');
  }
  //Dark Theme
  $('.themeToggle').click(function(){
    $('body').toggleClass('darken');
    if ($('body').hasClass('darken')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.removeItem('theme');
    }
  })
  //Si existe el menu agregamos sus eventos
  if ($('.bakuretsu_menu').length) {
    //Calcular altura del menu fixed para compensar margen del body
    let alturaMenu = $('.bakuretsu_menu .fixedWrapper').outerHeight(true);
    $('body').css('margin-top', alturaMenu);
    $(window).resize(function(){
      alturaMenu = $('.bakuretsu_menu .fixedWrapper').outerHeight(true);
      $('body').css('margin-top', alturaMenu);
    })
    //Agregar icono (+) a los links que tienen submenu
    $('.bakuretsu_menu .menuLinks .link').each(function(i, e){
      if ($(e).has('.subMenu').length) {
        $(e).append(`
          <div class="bakuretsu_icono showSubmenu">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
              <path d="M39 20.006L25 32l14 12.006"></path>
            </svg>
          </div>
        `);
      }
    })
    //Abrir submenu
    $('.bakuretsu_menu .menuLinks .link').on('click', '.showSubmenu', function(){
      $(this).toggleClass('openSub');
      $(this).siblings('.subMenu').slideToggle('fast');
    })
    //Abrir menu responsivo
    $('.bakuretsu_menu .topBar .launcherMenuResponsive').click(function(){
      $(this).parents('.topBar').addClass('openMenu');
      $('body').addClass('movedX');
    })
    //Cerrar menu responsivo
    $('.bakuretsu_menu .topBar .closeMenuResponsive').click(function(){
      $(this).parents('.topBar').removeClass('openMenu');
      $('body').removeClass('movedX');
    })
    //Animacion del buscador
    $('.bakuretsu_menu .topBar .buscador').focusin(function(){
      $(this).addClass('activ');
    })
    $('.bakuretsu_menu .topBar .buscador').focusout(function(){
      $(this).removeClass('activ');
    })
    //Buscador en responsive
    $('.bakuretsu_menu .topBar .launcherBuscadorResponsive').click(function(){
      $(this).siblings('.buscador').addClass('activ');
      $(this).siblings('.buscador').find('.txtBuscador').focus();
    })
  }
  //Producto a favoritos
  $('.bakuretsu_prod .aFavs').click(function(){
    $(this).parents('.bakuretsu_prod').toggleClass('esFav');
  })
  //Producto al carrito
  $('.bakuretsu_prod .alCarrito').click(function(){
    $(this).parents('.bakuretsu_prod').toggleClass('enCarrito');
  })
  //Animacion e incremento/decremento de la cantidad de articulos
  if ($('.bakuretsu_numIncrements').length) {
    $('.bakuretsu_numIncrements .botonIncDec').click(function () {
      var numero = $(this).parents('.bakuretsu_numIncrements').find('.num');
      if ($(this).hasClass('resta')) {
        if (parseInt(numero.text()) == 1) return false;
        if (parseInt(numero.text() - 1) == 1) $(this).addClass('disabled');
        numero.text(parseInt(numero.text()) - 1);
      } else if ($(this).hasClass('suma')) {
        $(this).siblings('.botonIncDec.disabled').removeClass('disabled');
        numero.text(parseInt(numero.text()) + 1);
      }
      numero.addClass('animacion');
      numero.one('animationend', function () {
        numero.removeClass('animacion');
      });
    });
  }
  //Dropdowns
  if ($('.bakuretsu_drop').length) {
    $('.bakuretsu_drop').click(function(e){
      e.stopPropagation();
      $('.bakuretsu_drop.activo').not($(this)).find('.dropContent').slideUp('fast');
      $('.bakuretsu_drop.activo').not($(this)).removeClass('activo');
      $(this).toggleClass('activo');
      $(this).find('.dropContent').slideToggle('fast');
    })
  }
  $('body').click(function(){
    $('.bakuretsu_drop.activo').find('.dropContent').slideUp('fast');
    $('.bakuretsu_drop.activo').removeClass('activo');
  })
})