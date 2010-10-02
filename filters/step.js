function(doc, req) { 
  if(doc._id == req.query.doc_id && doc.start && doc.last_step_by != req.query.player_key) { 
    return true; 
  } else {
    return false;
  }
}
