function() {
  $.log('click td');

  var x = $(this).attr('data-x');
  Game.step(x)
}
