function genRand() {
  return Math.floor(Math.random()*10000000);
}

function getIDfromPath() {
  var path = $.pathbinder.currentPath();
  var id = path.replace('#', '');

  return id;
}

function isBlank(value) {
  return (value == null || value == '' || value == []);
}

function isNull(value) {
  return (value == null);
}

function isDefined(value) {
  return (value == null);
}

function range(start, end) {
   var arr = [];

   for(var i = start; i <= end; i = i+1) {
     arr.push(i);
   }

   return arr;
}

function times(count, fun) {
  for(var i = 0; i < count; i = i+1) {
    fun(i);
  }
}

function timesDown(count, fun) {
  for(var i = count - 1; i >= 0; i = i-1) {
    var value = fun(i);
    if (value != null) {
      return value;
    }
  }
}

function dbUpdate(app, handler, id, options, fun) {
  $.log('in dbUpdate');
  var path = app.db.uri + app.ddoc._id + "/_update/" + handler + "/" + id + encodeOptions(options);
  $.log(path);

  $.ajax({
    type: 'PUT', 
    url: path,
    success: fun
  });
}

function encodeOptions(options) {
  var buf = [];
  if (typeof(options) === "object" && options !== null) {
    for (var name in options) {
      if ($.inArray(name, ["error", "success", "beforeSuccess", "ajaxStart"]) >= 0)
        continue;
      var value = options[name];
      if ($.inArray(name, ["key", "startkey", "endkey"]) >= 0) {
        value = toJSON(value);
      }
      buf.push(encodeURIComponent(name) + "=" + encodeURIComponent(value));
    }
  }
  return buf.length ? "?" + buf.join("&") : "";
}

function toJSON(obj) {
  return obj !== null ? JSON.stringify(obj) : null;
}
