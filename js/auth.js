$(function(){
  //Animar inputs
  $('.animForm .field input').focusin(function() {
    if($(this).val().length <= 0){
      $(this).parent().addClass('focused');
    }
  });
  $('.animForm .field input').focusout(function() {
    if($(this).val().length <= 0){
      $(this).parent().removeClass('focused');
    }
  });
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