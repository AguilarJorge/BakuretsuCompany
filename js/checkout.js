$(function(){
  let alturaMenu = 0;
  if ($('.bakuretsu_menu').length) {
    alturaMenu = $('.bakuretsu_menu .fixedWrapper').outerHeight(true);
  }
  $('.bakuretsu_checkout .bakuretsu_container').css('min-height', `calc(100vh - ${alturaMenu}px)`);
  if ($('.bakuretsu_menu').length) {
    $(window).resize(function(){
      alturaMenu = $('.bakuretsu_menu .fixedWrapper').outerHeight(true);
      $('.bakuretsu_checkout .bakuretsu_container').css('min-height', `calc(100vh - ${alturaMenu}px)`);
    })
  }

  if ($('.bakuretsu_tabs').length) {
    $('.bakuretsu_tabs').each(function(i, tabs){
      $(tabs).find('.tabsTitles .tabTitleOption').eq(0).addClass('active');
      $(tabs).find('.tabsContent .tabContentOption').eq(0).show().addClass('active');
    })
    $('.bakuretsu_tabs .tabsTitles .tabTitleOption').click(function(){
      if ($(this).hasClass('active')) return false;
      let prevActivo = $(this).siblings('.active').index();
      let currActivo = $(this).index();
      let animClass = prevActivo > currActivo ? 'movL' : 'movR';
      $(this).parent().children().removeClass('movL movR').addClass(animClass);
      $(this).siblings('.active').removeClass('active');
      $(this).addClass('active');
      
      $(this).parents('.bakuretsu_tabs').find('.tabsContent .tabContentOption:visible').slideUp('fast', function(){
        $(this).parents('.bakuretsu_tabs').find('.tabsContent .tabContentOption').eq(currActivo).slideDown('fast');
      });
    })
  }
})