function(doc, req) {
  var x = req.query.x, y = req.query.y;
  var message = 'ok x:' + x + ', y:' + y + ' user: ' + req.userCtx.name;

  doc.board[x + 'x' + y] = true;
  doc.last_step = {x: x, y: y};
  if (!doc.step_count) {
    doc.step_count = 0
  }

  doc.step_count = parseInt(doc.step_count) + 1;

  return [doc, message];
}
