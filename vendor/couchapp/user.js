
User = function(key) {
  var hashed = V.Security.md5(key);

  return {
    hashedKey: function() { return hashed; },
    publicKey: function() { return this.hashedKey(); }
  };
};

Game = function(doc) {
  if (!doc.keys) {
    doc.keys = [];
  }

  if (!doc.board) {
    doc.board = {};
  }

  //private
  var isBothUsersEnter = function() {
    return (doc.keys.length == 2);
  },

  isUserEnter = function(user) {
    return (doc.keys.indexOf(user.publicKey()) != -1);
  },

  enter = function(user) {
    doc.keys.push(user.publicKey());
  };

  //public
  return {
    tryEnter: function(user) {
      if (!isBothUsersEnter() && !isUserEnter(user)) {
        enter(user);
      }
    },

    auth: function(user) {
      if (!isUserEnter(user)) {
        throw({forbidden: "Dude you try access for pentagon data."}); 
      }
    },

    step: function(user, x, y) {
      doc.last_step_public_key = user.publicKey();
      doc.last_step = {x: x, y: y};
      doc.board[x + 'x' + y] = true;
    },

    isStart: function() {
      return (doc.last_step_public_key != null);
    },

    isMyLastStep: function(user) {
      return (user.publicKey() == doc.last_step_public_key);
    }
  }
};
