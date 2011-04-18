function Card(c, owner) {

    this.id = c;
    this.name = CARD.name(this.id);
    this.number = CARD.number(this.id);
    this.suit = CARD.suit(this.id);
    this.isRed = CARD.isRed(this.id);
    this.isBlack = CARD.isBlack(this.id);
    this.owner = owner;
    this.currentState = "down";
    this.coordinates = {"x": 462, "y": 300};
    this.upUrl = "http://s2.staticworldofsolitaire.com/decks/anglo/4/"+this.id+".png";
    this.downUrl = "http://s2.staticworldofsolitaire.com/decks/anglo/4/back.png";
    this.up = r.image(this.upUrl, 462, 300, 0, 154).hide();
    this.up.name = this.id;
    this.down = r.image(this.downUrl, 462, 300, 99, 154);
    this.down.name = this.id;
    this.both = r.set().push(this.up, this.down);

}

Card.prototype = {
	
    turnFaceUp: function () {
      this.down.animate({width: 99+99*0.08, height: 154+154*0.08}, 200, function () {
          this.down.animate({width: 0}, 200, function () {
              this.up.attr({height: 154+154*0.08});
              this.up.show();
              this.up.animate({width: 99, height: 154}, 200);
              this.down.hide();
              this.down.attr({width: 99, height: 154});
          }.bind(this));
      }.bind(this));
    },
    
    moveTo: function (x, y, callback) {
        this.coordinates.x = x;
        this.coordinates.y = y;
        this.both.animate(this.coordinates, 1000, callback);
    },
    
    moveToPot: function (callback) {
        //this.coordinates.x = POT.x;
        //this.coordinates.y = POT.y;
        this.up.animate({x: POT.x, y: POT.y}, 600, callback);
    },
    
    turnFaceUpAndMove: function(x, y, rotation, callback) {
        this.down.animate({width: 0}, 200, function () {
        	var t = this;
            this.up.show().toFront();
            if (this.owner.rotation !== 0 && rotation === 0) {
            	this.up.animate({width: 99}, 200, function() {
            		t.up.animate({rotation: rotation}, 200, function() {
            			t.up.animate({x: x, y: y}, 750, callback);
            		});
            	});
            }
            else {
           	 this.up.animate({width: 99}, 200, function() {
            			t.up.animate({x: x, y: y}, 750, callback);
            	});
            }
            this.down.hide();
        }.bind(this));
    },
    
    remove: function() {
        this.owner.removeCard(this.id);
        this.owner = false;
    }
    
};


function Player(params, rotation) {

     this.dealLocation = params.dealLocation;
     this.chipLocation = params.chipLocation;
     this.cards = [];
     this.nodesSet = r.set();

     this.secondDeck = [];
     this.secondNodesSet = r.set();
    
     rotation = rotation ? this.rotation = rotation : this.rotation = 0;

}

Player.prototype = {

    hasCard: function (cc) {
        return this.cards.indexOf(c);
    },
    
    hasMoneyCards: function () {
        return CARD.hasMoneyCards(this.cards);
    },
    
    removeCard: function (c) {
        this.cards.splice(this.cards.indexOf(c), 1);
    },
    
    getLowestBlack : function () {
        var suits = CARD.toSuits(this.cards);
        var cardsArray = suits.c.concat(suits.s);
            cardsArray.sortAscend();
        return (cardsArray[0] ? [cardsArray[0]] : false);
    },
    
    getLowBlacks: function () {
          var b = [], s = CARD.toSuits(this.cards);
		  s = s.c.concat(s.s);
		  s.sortAscend();
		  for (var c = 0; b.length < 3 && c < s.length; c++) {
				b.push(s[c]);
		  }
		  if(b.length < 1) {
				return false;
		  }
		  return b;
    },
    
    getLowReds: function () {
		  var b = [], s = CARD.toSuits(this.cards);
		  s = s.d.concat(s.h);
		  s.sortAscend();
		  for (var c = 0; b.length < 3 && c < s.length; c++) {
				b.push(s[c]);
		  }
		  if(b.length < 1) {
				return false;
		  }
		  return b;
    },
    
    flipCards: function(delay) {
        this.cards.forEach(function(c, i) {
              setTimeout(function() {
					cards[c].turnFaceUp();
              }, i*delay);
        });
    }
};
