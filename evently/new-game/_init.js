function() {
  var self = this;

  if (Game.iamEnterGame()) {
    Game.enter(function() {
      $(self).trigger('enterGame');
      $(self).trigger('partnerStep');
      $(self).trigger('gameStart');
    });
  } else {
    $(this).trigger('createGame');
  }
}
