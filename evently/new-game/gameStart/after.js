function() {
  Game.start();

  if (Game.iamGameStarter()) {
    $('#play-board').trigger('myStep');
  }
}
