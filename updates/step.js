function(doc, req) {
  // !code vendor/couchapp/md5.js
  // !code vendor/couchapp/user.js
  

  if (req.query.key) {
    var x = req.query.x, y = req.query.y;
    var message = "ok";

    var game = Game(doc);
    var currentUser = User(req.query.key);

    game.tryEnter(currentUser);
    game.auth(currentUser);

    if (!game.isMyLastStep(currentUser)) {
      game.step(currentUser, x, y);
      message = 'ok';
    } else {
      doc = null
      message = 'waiting partner step';
    }
  } else {
    doc = null;
  }

  return [doc, message];
}
