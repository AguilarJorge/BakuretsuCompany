$(function () {
  $('.toCart').click(function(){
    $(this).addClass('animando');
    console.warn('Aqui se deberia llamar a la API para agregar el producto al carrito');
    setTimeout(() => {
      console.warn('Simulacion de llamada a la API');
      $(this).addClass('exito');
      setTimeout(() => $(this).removeClass('animando exito'), 500);
    }, 2000);
  })
})