function(doc, req) { 
  // !code vendor/couchapp/md5.js
  // !code vendor/couchapp/user.js
  
  if (doc._id == req.query.doc_id) {
    var game = Game(doc);
    var currentUser = User(req.query.key);

    if (game.isStart() && !game.isMyLastStep(currentUser)) {
      return true; 
    } 
  }

  return false;
}
