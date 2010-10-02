Game = {
  app: null,
  playerKey: null,
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
  },

  createNew: function(fun) {
    var self = this;

    this.app.db.saveDoc(this.doc, {
      success: function(doc) {
        self.gameStarter = true;
        self.gameCode = doc.id;
        self.playerKey = 'red';

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
      fun();
    });
  },

  start: function() {
    var feed = 
        Game.app.db.changes(null, {
          filter: 'four_up/step', 
          doc_id: Game.gameCode, 
          player_key: this.playerKey, 
          include_docs: true
        });

    feed.onChange(function(resp) {
      var doc = resp.results[0].doc;
      Game.waitPartnerStep = false;
      Game.updateBoard(doc.last_step);
      $.log(doc.last_step, doc.last_step_by);
    });
  },

  enter: function(fun) {
    dbUpdate(this.app, 'enter_game', this.gameCode, {}, function() {
      Game.playerKey = 'black';
      Game.waitPartnerStep = true;
      fun();
    });
  },

  iamEnterGame: function() {
    if (!this.gameStarter && this.gameCode) {
      return true;
    } else {
      return false;
    }
  },

  iamGameStarter: function() {
    return this.gameStarter;
  },

  isMyStep: function() {
    return (Game.waitPartnerStep ? false : true);
  },

  step: function(x) {
    return timesDown(this.boardMaxY, function(y) {
      if (Game.isPlaceFree(x, y)) {
        var coords = {x: x, y: y};

        Game.doc.board[x + 'x' + y] = true;
        Game.waitPartnerStep = true
        Game.sendStep(x, y);

        return coords; 
      }
    });
  },

  isPlaceFree: function(x, y) {
    var isFree =  (this.doc.board[x + 'x' + y] == null ? true : false);

    return isFree; 
  },

  sendStep: function(x, y) {
    dbUpdate(this.app, 'step', this.gameCode, {x: x, y: y, player_key: this.playerKey}, function(resp) {
      $.log('in resp updateStep');
      $.log(resp);
    });
  },

  updateBoard: function(lastStep) {
    $.log('in updateBoard');
    $.log(lastStep);
    $('#play-board').trigger('update', lastStep);
  }
}
