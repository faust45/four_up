function(doc, req) { 
  if(doc._id == req.query.doc_id && doc.start) { 
    return true; 
  } else {
    return false;
  }
}
