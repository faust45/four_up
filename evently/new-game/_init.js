function() {
  if (Game.iamEnterGame()) {
    $('#play-board').trigger('myStep');
    $(this).trigger('gameStart');
  } else {
    $(this).trigger('createGame');
  }
}
