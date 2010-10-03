Game = {
  app: null,
  doc: {
    type: 'Game', 
    board: {} 
  },

  boardMaxX: 6,
  boardMaxY: 7, 

  init: function(app) {
    this.app = app;
    var path = $.pathbinder.currentPath();
    if (path) {
      this.gameCode = path.replace('#', '');
    }

    if (this.iamGameStarter()) {
      this.myTool = 'heart';
      this.partnerTool = 'star';
      this.waitStepType = 'evn';
    } else {
      this.myTool = 'star';
      this.partnerTool = 'heart';
      this.waitStepType = 'odd';
    }
  },

  createNew: function(fun) {
    var self = this;

    this.app.db.saveDoc(this.doc, {
      success: function(doc) {
        self.gameStarter = true;
        self.gameCode = doc.id;

        fun(self.gameCode);
      }
    });
  },

  waitingPartner: function(fun) {
    var feed = this.app.db.changes(null, {
        filter: 'four_up/partner_enter', 
        doc_id: this.gameCode
    });

    feed.onChange(function(resp) {
      feed.stop();
      $('#play-board').trigger('myStep');
      fun();
    });
  },

  start: function() {
    var feed = 
        Game.app.db.changes(null, {
          filter: 'four_up/step', 
          doc_id: Game.gameCode, 
          wait_step_type: this.waitStepType, 
          include_docs: true
        });

    feed.onChange(function(resp) {
      var doc = resp.results[0].doc;
      var x = doc.last_step.x;
      var y = doc.last_step.y;

      $.log('step come');
      $.log(x, y, doc.last_step_by);
       
      Game.partnerStep = false;
      Game.updateBoard(x, y, Game.partnerTool);
      $('#play-board').trigger('myStep');
      $.log('step end');
    });
  },

  enter: function(fun) {
    dbUpdate(this.app, 'enter_game', this.gameCode, {}, function() {
      fun();
    });
  },

  iamEnterGame: function() {
    if (this.gameCode) {
      return true;
    } else {
      return false;
    }
  },

  iamGameStarter: function() {
    return !this.iamEnterGame();
  },

  step: function(x, fun) {
    for(var y = this.boardMaxY; y >= 1; y = y-1) {
      if (Game.isPlaceFree(x, y)) {
        dbUpdate(Game.app, 'step', Game.gameCode, {x: x, y: y}, function(resp) {
          Game.updateBoard(x, y, Game.myTool);
          Game.partnerStep = true;
        });

        return;
      }
    }
  },

  isPlaceFree: function(x, y) {
    var isFree =  (this.doc.board[x + 'x' + y] == null ? true : false);

    return isFree; 
  },

  updateBoard: function(x, y, tool) {
    x = parseInt(x);
    y = parseInt(y);
    this.doc.board[x + 'x' + y] = true;
    $('#play-board tr:eq('+ (y + 1) +') td:eq('+ (x - 1) +')').trigger('update', [tool]);
  }

}
