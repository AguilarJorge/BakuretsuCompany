//Alerta tipo modal
const alertaModal = function (config) {
  config = jQuery.extend({
    acciones: {
      aprov: 'Aceptar',
      cancel: 'Cancelar'
    },
    closable: false,
    closeOnActions: true,
    redondeado: true,
    encabezado: 'Encabezado de la modal',
    mensaje: 'Mensaje de la modal...',
    ocultar: false,
    tipo: 'warning',
    // onAprov, onCancel //Callbacks
  }, config);
  var acciones = '';
  if (config.acciones) {
    $.each(config.acciones, function (k, v) {
      acciones += '<div class="accion ' + k + '">' + v + '</div>';
    })
  } else {
    config.autoclose = '3000';
  }
  if (config.ocultar) {
    $(document).off('click', '.bakuretsu_alertaModal .accion');
    $('.bakuretsu_alertaModal').fadeOut(function () { $(this).remove() });
    return false;
  }
  var svgIcon;
  switch (config.tipo) {
    case 'error':
      svgIcon = `<svg class="icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32.001" cy="32" r="30" transform="rotate(-45 32.001 32)"></circle><path d="M42.999 21.001l-22 22m22 0L21 21"></path></svg>`;
      break;
    case 'exito':
      svgIcon = `<svg class="icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" transform="rotate(-45 32 32)"></circle><path d="M20.998 32.015l8.992 8.992 16.011-16.011"></path></svg>`;
      break;
    case 'warning':
      svgIcon = `<svg class="icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30"></circle><path d="M32 15v24"></path><circle cx="32" cy="47" r="2"></circle></svg>`;
      break;
  }
  if ($('.bakuretsu_alertaModal').length == 0) {
    $('body').append(`
    <div class="bakuretsu_alertaModal">
      <div class="contenedor ${config.tipo} ${config.redondeado && 'rounded'}">
        ${svgIcon || ''}
        <p class="encabezado">${config.encabezado}</p>
        <p class="mensaje">${config.mensaje}</p>
        <div class="acciones">${acciones}</div>
      </div>
    </div>
  `);
    if (config.closable) $('.bakuretsu_alertaModal').prepend('<div class="closable"></div>');
    $('.bakuretsu_alertaModal').fadeIn().css('display', 'flex');
    $(document).on('click', '.bakuretsu_alertaModal .accion', function (e) {
      if ($(this).hasClass('aprov') && config.onAprov) {
        config.onAprov(e);
      } else if ($(this).hasClass('cancel') && config.onCancel) {
        config.onCancel(e);
      }
      if (config.closeOnActions) {
        $(document).off('click', '.bakuretsu_alertaModal .accion');
        $('.bakuretsu_alertaModal').fadeOut(function () { $(this).remove() });
      }
    })
    if (config.hasOwnProperty('autoclose')) {
      setTimeout(function () {
        $(document).off('click', '.bakuretsu_alertaModal .accion');
        $('.bakuretsu_alertaModal').fadeOut(function () { $(this).remove() });
      }, config.autoclose)
    }
  } else {
    $(document).off('click', '.bakuretsu_alertaModal .accion');
  }
  $(document).on('click', '.bakuretsu_alertaModal .closable', function () {
    $(document).off('click', '.bakuretsu_alertaModal .accion');
    $('.bakuretsu_alertaModal').fadeOut(function () { $(this).remove() });
  })
}
const responsivImg = function (img, convFac) {
  var a = img.width() / convFac;
  img.css('height', a);
}
const autoSlider = function (slider, totalSlides, indicadores, avanzar = true) {
  var posicion = slider.find('.bakuretsu_slide.activo').index();
  if (avanzar) {
    posicion == (totalSlides - 1) ? posicion = 0 : posicion++;
  } else {
    posicion == 0 ? posicion = (totalSlides - 1) : posicion--;
  }
  slider.find('.bakuretsu_slide.activo').removeClass('activo');
  slider.find('.bakuretsu_slide').eq(posicion).addClass('activo');
  if (indicadores) {
    slider.find('.bakuretsu_dot.activo').removeClass('activo');
    slider.find('.bakuretsu_dot').eq(posicion).addClass('activo');
  }
}
const toTopSmoth = (offset, callback) => {
  const fixedOffset = offset.toFixed();
  const onScroll = function () {
    if (window.pageYOffset.toFixed() === fixedOffset) {
      window.removeEventListener('scroll', onScroll);
      if (typeof callback === 'function') callback();
    };
  };
  window.addEventListener('scroll', onScroll);
  onScroll();
  window.scrollTo({ top: offset, behavior: 'smooth' });
}

$(function(){
  //Modal para confirmar la edad
  if ($('.bakuretsu_censored').length) {
    if (localStorage.getItem('edadStatus') !== 'uncensored') {
      alertaModal({
        encabezado: 'Contenido gráfico',
        mensaje: 'Este sitio incluye contenido gráfico que algunas personas pueden considerar ofensivo o molesto. Es necesario que confirmes que eres mayor de edad para acceder a dicho contenido.',
        acciones: { aprov: 'Si, tengo más de 18 años', cancel: 'Cancelar' },
        onAprov: function(){
          localStorage.setItem('edadStatus', 'uncensored');
          $('.bakuretsu_censored').each(function (i, censored) { $(censored).removeClass('bakuretsu_censored') });
        }
      });
    } else {
      $('.bakuretsu_censored').each(function (i, censored) { $(censored).removeClass('bakuretsu_censored') });
    }
  }

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
  //Galeria preview
  $('.bakuretsu_galeria').each(function(i, galeria){
    if ($(galeria).find('.galeriaThumb').length > 3) {
      $(galeria).addClass('hasMany');
    }
  })
  $('.bakuretsu_galeria .galeriaThumb').click(function(){
    var index = $(this).index();
    var array = [];
    $(this).parent().find('.galeriaImagen').each(function (i, img) { array.push($(img).attr('src')) });
    if ($('.bakuretsu_galeriaPreview').length <= 0) {
      $('body').append(`
        <div class="bakuretsu_galeriaPreview">
          <div class="bakuretsu_galeriaPreviewClose"></div>
          <img class="previwImg" src="${array[index]}">
          <div class="bakuretsu_control anterior"></div>
          <div class="bakuretsu_control siguiente"></div>
          <div class="labelDetalle">Imagen ${index + 1} de ${array.length}</div>
        </div>`
      );
      $('.bakuretsu_galeriaPreview').fadeIn().css('display', 'flex');
    }
    $(document).off('click', '.bakuretsu_galeriaPreview .bakuretsu_control');
    $(document).on('click', '.bakuretsu_galeriaPreview .bakuretsu_control', function(){
      var $galeria = $(this).parents('.bakuretsu_galeriaPreview');
      if ($(this).hasClass('anterior')) {
        index = (index == 0) ? array.length - 1 : index - 1;
      } else {
        index = (index == array.length - 1) ? 0 : index + 1;
      }
      $galeria.addClass('anim');
      setTimeout(function () {
        $galeria.removeClass('anim');
        $galeria.find('.previwImg').attr('src', array[index]);
        $galeria.find('.labelDetalle').html(`Imagen ${index + 1} de ${array.length}`);
      }, 100)
    })
  })
  $(document).on('click', '.bakuretsu_galeriaPreview .bakuretsu_galeriaPreviewClose', function(){
    $(this).parent().fadeOut(function(){
      $(this).remove();
    });
  })
  //Imagen responsiva
  if ($('.bakuretsu_responsiv').length) {
    $('.bakuretsu_responsiv').each(function (i, img) {
      var fc = parseInt($(img).css('max-width')) / $(img).height();
      responsivImg($(img), fc);
      $(window).resize(function () { responsivImg($(img), fc) });
    })
  }
  //Slider
  if ($('.bakuretsu_slider').length) {
    $('.bakuretsu_slider').each(function (i, slider) {
      var { sliderAutomatico, sliderDuracion, sliderControls } = $(slider).data();
      var slide = $(slider).find('.bakuretsu_slide');
      var totales = slide.length;
      if (totales > 0) slide.first().addClass('activo');
      if (totales > 1) {
        if (sliderControls) {
          var wrapperDots = $(slider).find('.bakuretsu_dots');
          $(slider).append('<div class="manualControls"><div class="bakuretsu_control control circular at"></div><div class="bakuretsu_control control circular av"></div></div>');
          if (wrapperDots.length) {
            var dots = wrapperDots;
          } else {
            $(slider).append('<div class="bakuretsu_dots"></div>');
            var dots = $(slider).children('.bakuretsu_dots');
          }
          for (var i = 0; i < totales; i++) {
            dots.append('<div class="bakuretsu_dot"></div>');
          }
          dots.children('.bakuretsu_dot').first().addClass('activo');
          $(slider).on('click', '.manualControls .bakuretsu_control', function () {
            if ($(this).hasClass('at')) {
              autoSlider($(slider), totales, sliderControls, false)
            } else if ($(this).hasClass('av')) {
              autoSlider($(slider), totales, sliderControls)
            }
            if (automatico) {
              clearInterval(automatico);
              automatico = setInterval(function () {
                autoSlider($(slider), totales, sliderControls)
              }, sliderDuracion || 5000);
            }
          })
          $(slider).on('click', '.bakuretsu_dots .bakuretsu_dot', function () {
            $(this).siblings().removeClass('activo');
            $(this).addClass('activo');
            $(slider).find('.bakuretsu_slide.activo').removeClass('activo');
            $(slider).find('.bakuretsu_slide').eq($(this).index()).addClass('activo');
            if (automatico) {
              clearInterval(automatico);
              automatico = setInterval(function () {
                autoSlider($(slider), totales, sliderControls)
              }, sliderDuracion || 5000);
            }
          })
        }
        if (sliderAutomatico) {
          var automatico = setInterval(function () {
            autoSlider($(slider), totales, sliderControls)
          }, sliderDuracion || 5000);
        }
      } else {
        $(slide).css('transition', 'none')
      }
    })
  }
  //Drops Slidables
  $('.bakuretsu_slidable .slidableTitle').click(function(){
    $(this).parent().siblings().removeClass('active');
    $(this).parent().toggleClass('active');
    $(this).parent().siblings().find('.slidableContent:visible').slideUp('fast');
    $(this).siblings('.slidableContent').slideToggle('fast');
  })
  //Animar inputs
  $('.animForm .field input').focusin(function () {
    if ($(this).val().length <= 0) {
      $(this).parent().addClass('focused');
    }
  });
  $('.animForm .field input').focusout(function () {
    if ($(this).val().length <= 0) {
      $(this).parent().removeClass('focused');
    }
  });
})
