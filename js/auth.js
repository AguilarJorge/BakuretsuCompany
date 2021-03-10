$(function(){
  //Cambiar formulario
  $('.toggleForm').click(function(){
    $(this).toggleClass('loginShow');
    $('.bakuretsu_auth .forms form').toggleClass('hidden');
    $('.bakuretsu_auth .forms form').each(function(i, form){
      form.reset();
      $(form).find('.field').removeClass('focused error');
    })
  })
})