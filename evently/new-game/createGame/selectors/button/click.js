function(e) {
  var self = this;

  Game.createNew(function(code) {
    $.pathbinder.go(code);
    $(self).trigger('waitingPartner');
  });
}
