function() {
  var self = $(this);

  Game.waitingPartner(function() {
    self.trigger('gameStart');
  });
}

