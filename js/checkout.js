$(function(){
  let alturaMenu = 0;
  if ($('.bakuretsu_menu').length) {
    alturaMenu = $('.bakuretsu_menu .fixedWrapper').outerHeight(true);
  }
  $('.bakuretsu_checkout .bakuretsu_container').css('min-height', `calc(100vh - ${alturaMenu}px)`);
  $('.bakuretsu_checkout .bakuretsu_container .areaTabs').css('max-height', `calc(100vh - ${alturaMenu}px)`);
  if ($('.bakuretsu_menu').length) {
    $(window).resize(function(){
      alturaMenu = $('.bakuretsu_menu .fixedWrapper').outerHeight(true);
      $('.bakuretsu_checkout .bakuretsu_container').css('min-height', `calc(100vh - ${alturaMenu}px)`);
      $('.bakuretsu_checkout .bakuretsu_container .areaTabs').css('max-height', `calc(100vh - ${alturaMenu}px)`);
    })
  }

  if ($('.bakuretsu_tabs').length) {
    $('.bakuretsu_tabs').each(function(i, tabs){
      $(tabs).find('.tabsTitles .tabTitleOption').eq(0).addClass('active');
      $(tabs).find('.tabsContent .tabContentOption').eq(0).show().addClass('active');
    })
    $('.bakuretsu_tabs .tabsTitles .tabTitleOption').click(function(){
      if ($(this).hasClass('active') || $(this).hasClass('disabled')) return false;
      let prevActivo = $(this).siblings('.active').index();
      let currActivo = $(this).index();
      let animClass = prevActivo > currActivo ? 'movL' : 'movR';
      $(this).parent().children().removeClass('movL movR').addClass(animClass);
      $(this).siblings('.active').removeClass('active');
      $(this).addClass('active');
      
      $(this).parents('.bakuretsu_tabs').find('.tabsContent .tabContentOption:visible').fadeOut('fast', function(){
        $(this).parents('.bakuretsu_tabs').find('.tabsContent .tabContentOption').eq(currActivo).fadeIn('fast');
      });
    })
  }
  $('.bakuretsu_checkout .unlockForm').click(function(){
    const form = $(this).parents('.datos').children('#formDatos');
    form.find('.field').each(function (i, field) {
      $(field).removeClass('disabled');
      $(field).children('input').removeAttr('readonly');
    });
    scrollSmoth(0, function () {
      const input = form.find('.field').first().children('input');
      const inputVal = input.val();
      input.focus().val('').val(inputVal);
    });
  })
  $('.bakuretsu_checkout .nextStep').click(function(){
    let index = $(this).parents('.tabContentOption').index();
    $('.bakuretsu_checkout .areaTabs .tabsTitles .tabTitleOption').eq(index + 1).removeClass('disabled').trigger('click');
  })
  // Seleccionar courier
  $('.bakuretsu_checkout .listaCouriers .courier').click(function(){
    $(this).siblings().removeClass('seleccionado');
    $(this).addClass('seleccionado');
  });
  // Modal para cambiar la direccion seleccionada
  $('.bakuretsu_checkout .listaDeirecciones .direccion .changeDir').click(function(){
    if ($('.bakuretsu_changeDirModal').length == 0) {
      /* Este array de direcciones es de prueba para llenar los datos, aqui deberias consultar tu api 
      para que te devuelva las direcciones correctas y en base a eso renderizarlas */
      const direcciones = [
        {
          'id': 1,
          'alias': 'Casa de mi mamá',
          'nombre': 'Maria del Carmen Torres Gomez',
          'direccion': 'Galeana, 142 Victoria, ADOLFO LOPEZ MATEOS VICTORIA, 87025, Mexico, TAMAULIPAS',
          'telefono': '834 - 255 - 7085'
        },
        {
          'id': 18,
          'alias': 'Mi oficina',
          'nombre': 'Jorge Luis Aguilar',
          'direccion': 'Francisco Villa, 142 Victoria, ADOLFO LOPEZ MATEOS VICTORIA, 87025, Mexico, TAMAULIPAS',
          'telefono': '123 - 456 - 7890'
        },
        {
          'id': 23,
          'alias': 'Departamento principal',
          'nombre': 'Jose Perez de Leon',
          'direccion': 'Calle Hidalgo, 756, Zona Centro, 87025, Mexico, TAMAULIPAS',
          'telefono': '123 - 423 - 9674'
        },
        {
          'id': 576,
          'alias': 'Casa de mi abuelita',
          'nombre': 'Ines Gamez Leiva',
          'direccion': 'Av. Constitución, #9787, Naucalpan, 99321, CDMX, México',
          'telefono': '555 - 912 - 8873'
        }
      ];
      let estructuraDirs = '';
      for (let index = 0; index < direcciones.length; index++) {
        const { id, alias, nombre, direccion, telefono } = direcciones[index];
        estructuraDirs += `
          <div class="direccion" data-id="${id}">
            <div class="grupo"><p class="hBold alias">${alias}</p></div>
            <div class="grupo"><p class="hBold">${nombre}</p><p>${direccion}</p></div>
            <div class="grupo"><p class="hBold">Teléfono:</p><p>${telefono}</p></div>
          </div>
        `;
      }
      $('body').append(`
        <div class="bakuretsu_changeDirModal">
          <div class="bakuretsu_container">
            <div class="closeModal"></div>
            <p class="tit">Selecciona una dirección</p>
            <div class="listaDeirecciones">
              ${estructuraDirs}
            </div>
            <div class="bakuretsu_customButton guardarDirModal disabled">Guardar selección</div>
          </div>
        </div>
      `);
      $('.bakuretsu_changeDirModal').fadeIn('fast').css('display', 'flex');
    }
  })
  // Seleccionar una nueva direccion desde la modal
  $('body').on('click', '.bakuretsu_changeDirModal .listaDeirecciones .direccion', function(){
    if ($('.bakuretsu_changeDirModal .guardarDirModal').hasClass('disabled')) {
      $('.bakuretsu_changeDirModal .guardarDirModal').removeClass('disabled');
    }
    $(this).siblings().removeClass('seleccionada');
    $(this).addClass('seleccionada');
  });
  // Guardar direccion seleccionada desde la modal
  $('body').on('click', '.bakuretsu_changeDirModal .guardarDirModal', function(){
    $(this).parents('.bakuretsu_changeDirModal').fadeOut('fast', function(){ $(this).remove() });
    const idDireccion = $('.bakuretsu_changeDirModal .listaDeirecciones .direccion.seleccionada').data('id');
  });
  // Cancelar y cerrar la modal
  $('body').on('click', '.bakuretsu_changeDirModal .closeModal', function(){
    $(this).parents('.bakuretsu_changeDirModal').fadeOut('fast', function(){ $(this).remove() });
  });
  // Modal para agregar una nueva direccion
  $('.bakuretsu_checkout .listaDeirecciones .direccion.addNueva').click(function(){
    if ($('.bakuretsu_newDirModal').length == 0) {
      $('body').append(`
        <div class="bakuretsu_newDirModal">
          <div class="bakuretsu_container">
            <div class="closeModal"></div>
            <p class="tit">Agregar nueva dirección</p>
            <form id="formDireccion" class="animForm">
              <p class="formTitle">Datos del destinatario</p>
              <div class="field animable required" data-msj-error="Este campo es obligatorio">
                <label for="nombreCorto">Alias de la dirección</label>
                <input id="nombreCorto" type="text" name="nombreCorto">
              </div>
              <div class="field animable required" data-msj-error="Este campo es obligatorio">
                <label for="nombreDestinatario">Nombre(s)</label>
                <input id="nombreDestinatario" type="text" name="nombreDestinatario">
              </div>
              <div class="field animable w50 required" data-msj-error="Este campo es obligatorio">
                <label for="paternoDestinatario">Apellido paterno</label>
                <input id="paternoDestinatario" type="text" name="paternoDestinatario">
              </div>
              <div class="field animable w50 required" data-msj-error="Este campo es obligatorio">
                <label for="maternoDestinatario">Apellido materno</label>
                <input id="maternoDestinatario" type="text" name="maternoDestinatario">
              </div>
              <p class="formTitle">Dirección de envío</p>
              <div class="field animable w50 required formDrop">
                <label for="pais">País</label>
                <input id="pais" type="text" name="pais" readonly>
                <div class="dropContent">
                  <div class="wrapper">
                    <li class="dropOpc" data-val="México">México</li>
                    <li class="dropOpc" data-val="Alemania">Alemania</li>
                    <li class="dropOpc" data-val="Rusia">Rusia</li>
                    <li class="dropOpc" data-val="Estados Unidos">Estados Unidos</li>
                    <li class="dropOpc" data-val="China">China</li>
                  </div>
                </div>
              </div>
              <div class="field animable w50 required" data-msj-error="Este campo es obligatorio">
                <label for="cp">Codigo postal</label>
                <input id="cp" type="text" name="cp">
              </div>
              <div class="field w50 required focused disabled" data-msj-error="Este campo es obligatorio">
                <label for="estado">Estado</label>
                <input id="estado" type="text" name="estado">
              </div>
              <div class="field w50 required focused disabled" data-msj-error="Este campo es obligatorio">
                <label for="ciudad">Ciudad</label>
                <input id="ciudad" type="text" name="ciudad">
              </div>
              <div class="field w50 required focused disabled" data-msj-error="Este campo es obligatorio">
                <label for="municipio">Municipio</label>
                <input id="municipio" type="text" name="municipio">
              </div>
              <div class="field w50 required focused disabled" data-msj-error="Este campo es obligatorio">
                <label for="colonia">Colonia</label>
                <input id="colonia" type="text" name="colonia">
              </div>
              <div class="field animable required" data-msj-error="Este campo es obligatorio">
                <label for="calle">Calle</label>
                <input id="calle" type="text" name="calle">
              </div>
              <div class="field animable w30 required" data-msj-error="Este campo es obligatorio">
                <label for="numInterior">Número exterior</label>
                <input id="numInterior" type="text" name="numInterior">
              </div>
              <div class="field animable w30" data-msj-error="Este campo es obligatorio">
                <label for="numExterior">Número interior</label>
                <input id="numExterior" type="text" name="numExterior">
              </div>
              <div class="field animable w30" data-msj-error="Este campo es obligatorio">
                <label for="edificio">Edificio</label>
                <input id="edificio" type="text" name="edificio">
              </div>
              <div class="field animable w50" data-msj-error="Este campo es obligatorio">
                <label for="calle1">Entre calle</label>
                <input id="calle1" type="text" name="calle1">
              </div>
              <div class="field animable w50" data-msj-error="Este campo es obligatorio">
                <label for="calle2">y calle</label>
                <input id="calle2" type="text" name="calle2">
              </div>
              <p class="formTitle">Contacto</p>
              <div class="field animable w50 required" data-msj-error="Este campo es obligatorio">
                <label for="telefono">Telefono / celular</label>
                <input id="telefono" type="tel" name="telefono">
              </div>
              <div class="field animable w50" data-msj-error="Este campo es obligatorio">
                <label for="telefonoAlternativo">Telefono / celular alternativo</label>
                <input id="telefonoAlternativo" type="tel" name="telefonoAlternativo">
              </div>
              <div class="buttons">
                <div class="button guardarDirModal">
                  <span class="secondLabel">Guardar datos</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      `);
      $('.bakuretsu_newDirModal').fadeIn('fast').css('display', 'flex');
    }
  })
  //Guardar nueva direccion desde la modal
  $('body').on('click', '.bakuretsu_newDirModal .guardarDirModal', function(){
    console.warn('Aqui se deberia llamar la API para guardar la nueva direccion');
    var boton = $(this);
    $(this).addClass('louder');
    setTimeout(() => {
      console.warn('Simulacion de llamada a la API');
      boton.removeClass('louder');
      alertaModal({
        acciones: '',
        closable: true,
        tipo: 'exito', // exito || error
        encabezado: 'Nueva direccion agregada',
        mensaje: 'Se ha agregado una nueva direccion con exito. Ahora puedes cambiar tu direccion predeterminada si asi lo deseas.'
      });
      $('.bakuretsu_newDirModal').fadeOut('fast', function(){ $(this).remove() });
    }, 3000);
  })
  // Cancelar y cerrar la modal
  $('body').on('click', '.bakuretsu_newDirModal .closeModal', function(){
    $(this).parents('.bakuretsu_newDirModal').fadeOut('fast', function(){ $(this).remove() });
  });
  // Init card area
  function initCard(selector){
    const cardType = getCardType();
    const numberMask = cardType == 'cardAmex' ? 'XXXX XXXXXX XXXXX' : 'XXXX XXXX XXXX XXXX';
    selector.find('.cardWrapper .frontSide .logo').css('background-image', `url(./img/${cardType}.png)`);
    selector.find('.cardWrapper .frontSide .cardNumber').text(numberMask);
    selector.find('#nombreTitular').keyup(function(){
      selector.find('.nombreTitular').text($(this).val());
    });
  };
  const getCardType = (cardNumber = '') => {
    let re = new RegExp("^4");
    if (cardNumber.match(re) != null) return "cardVisa";
    re = new RegExp("^(34|37)");
    if (cardNumber.match(re) != null) return "cardAmex";
    re = new RegExp("^5[1-5]");
    if (cardNumber.match(re) != null) return "cardMastercard";
    return "cardVisa";
  }
  initCard($('.cardArea'));
})