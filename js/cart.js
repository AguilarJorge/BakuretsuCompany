$(function(){
  if ($('.bakuretsu_cart .cartWrapper .tClone').length) {
    let wrapper = $('.cartWrapper');
    let clon = wrapper.find('.tClone').clone();
    wrapper.prepend(clon.toggleClass('tClone aClone'));
  }
})