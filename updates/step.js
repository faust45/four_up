function(doc, req) {
  var x = req.query.x, y = req.query.y;
  var message = 'ok x:' + x + ', y:' + y + ' user: ' + req.userCtx.name;

  doc.board[x + 'x' + y] = true;
  doc.last_step = {x: x, y: y};
  doc.last_step_by = req.query.player_key;

  return [doc, message];
}
