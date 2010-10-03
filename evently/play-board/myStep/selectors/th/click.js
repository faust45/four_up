function() {
  $.log('click td');

  if (!Game.partnerStep) {
    var x = $(this).attr('data-x');
    Game.step(x)
  }
}
