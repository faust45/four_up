GameModule = function(app) {
  //init
  var boardMaxX = 6, boardMaxY = 7;
  var board = {};
  var privateKey = genRand();
  var gameDoc = {
      type: 'Game'
  };

  var iamGameStarter = isBlank(getIDfromPath());
  var init;
  
  if (iamGameStarter) {
    var myTool = 'heart', partnerTool = 'star';
  } else {
    var myTool = 'star', partnerTool = 'heart';
    gameDoc._id = getIDfromPath();

    init = function() {
      listenPartnerFeed();
      loadBoard();
    }
  }

  //private
  var gameCode = function() {
    return gameDoc._id;
  },
  
  updateBoard = function(x, y, tool) {
    x = parseInt(x);
    y = parseInt(y);
  
    board[x + 'x' + y] = true;
    $('#play-board').trigger('update', [x, y, tool]);
    isGameOver();
  },

  isGameOver = function() {
  },

  whenPartnerStepCome = function(resp) {
    var doc = resp.results[0].doc;
    var x = doc.last_step.x;
    var y = doc.last_step.y;
 
    updateBoard(x, y, partnerTool);
  },
 
  listenPartnerFeed = function() {
    var feed = app.db.changes(null, {
          filter: 'four_up/partner_step', 
          include_docs: true,
          doc_id: gameCode(), 
          key: privateKey
        });
 
    feed.onChange(whenPartnerStepCome);
  },

  isPlaceFree = function(x, y) {
    return isNull(board[x + 'x' + y]) ? true : false;
  },

  getFreeY = function(x) {
     for(var y = boardMaxY; y >= 1; y = y-1) {
       if (isPlaceFree(x, y)) {
         return y;
       }
     }
  },
  
  loadBoard = function() {
    app.db.openDoc(gameCode(), {
      success: function(doc) {
        var lastStep = doc.last_step;
        if (lastStep) {
          updateBoard(lastStep.x, lastStep.y, partnerTool);
        }
      }
    });
  };

  if (init) {
    init();
  }

  //public
  return {
    createNew: function(fun) {
      app.db.saveDoc(gameDoc, {
        success: function(doc) {
          $.pathbinder.go(gameCode());
          listenPartnerFeed();
          $('#play-board').trigger('myStep');
        }
      });
    },
  
    iamEnterGame: function() {
      return !iamGameStarter;
    },

    step: function(x, fun) {
      var y = getFreeY(x);
      dbUpdate(app, 'step', gameCode(), {x: x, y: y, key: privateKey}, function(resp) {
        if (resp == 'ok') {
          updateBoard(x, y, myTool);
        }
      });

      //$('#play-board').trigger('partnerStep');
    },

    boardMaxX: function() { return boardMaxX },
    boardMaxY: function() { return boardMaxY },
    myTool: myTool
  }
};
