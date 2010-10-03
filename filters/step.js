function(doc, req) { 
  var waitType = req.query.wait_step_type;
  var isEvenStep = (parseInt(doc.step_count) % 2 == 0);
  var stepType = isEvenStep ? 'evn' : 'odd';


  if(doc._id == req.query.doc_id && doc.start && waitType == stepType) { 
    return true; 
  } else {
    return false;
  }
}
