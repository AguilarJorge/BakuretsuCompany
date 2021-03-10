$(function(){
  $('.bakuretsu_profileArea .datos .button').click(function(){
    let boton = $(this);
    let form = $(this).parent();
    if ($(this).hasClass('editar')) {
      form.find('.field').each(function(i, field) {
        $(field).removeClass('disabled');
        $(field).children('input').removeAttr('readonly');
      });
      toTopSmoth(0, function(){
        const input = form.find('.field').first().children('input');
        const inputVal = input.val();
        input.focus().val('').val(inputVal);
      });
    } else if ($(this).hasClass('guardar')) {
      console.warn('Aqui se deberia llamar la API para guardar los datos');
      form.find('.field').each(function(i, field) {
        $(field).addClass('disabled');
        $(field).children('input')[0].setAttribute('readonly', '');
      });
      $(this).addClass('louder');
      setTimeout(() => {
        console.warn('Simulacion de llamada a la API');
        boton.removeClass('louder');
        alertaModal({
          acciones: '',
          closable: true,
          tipo: 'exito', // exito || error
          encabezado: 'Datos actualizados con exito',
          mensaje: 'Los datos del usuario se han editado con exito!'
        });
      }, 3000);
    }
    $(this).toggleClass('editar guardar');
  })
})

