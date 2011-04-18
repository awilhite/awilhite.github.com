//////////////
// TODOS
//
// Edit spreadDeck function to stagger card dealing in that of a traditional manner
//
//
//
//////////////

var allCards = ["1c","1d","1h","1s","2c","2d","2h","2s","3c","3d","3h","3s","4c","4d","4h","4s","5c",      //list of all cards for shuffling/distributing process
"5d","5h","5s","6c","6d","6h","6s","7c","7d","7h","7s","8c","8d","8h","8s","9c","9d","9h","9s",
"10c","10d","10h","10s","11c","11d","11h","11s","12c","12d","12h","12s","13c","13d","13h","13s"];

var shapes = {
      "diamond": "M 33,0 C 24,16 13,31 01,44 C 13,58 24,73 33,89 M 33,0 C 42,16 53,31 65,44 C 53,58 42,73 33,89",
      "heart": "M 387,145 C 167,-111 -52,168 104,370 C 100,370 306,600 387,800 M 387,145 C 607,-111 826,168 670,370 C 674,370 468,600 387,800",
      "spade": "M 233.67878,387.99261 C 232.46008,393.05519 230.58508,397.60206 228.05378,401.58636 C 225.52259,405.5708 221.01477,410.48486 214.52253,416.36761 C 208.03039,422.25048 203.91323,426.75828 202.17878,429.89886 C 200.44449,433.03952 199.58509,436.22702 199.58503,439.46136 C 199.58511,443.96139 201.08509,447.71138 204.08503,450.71136 C 207.08511,453.71138 210.74134,455.21137 215.05378,455.21136 C 222.77369,455.21135 228.74469,449.57456 232.67878,443.43011 C 232.37984,450.14857 231.27283,455.52721 229.33503,459.55511 C 227.24915,463.89104 224.05522,467.47909 219.74128,470.33636 C 216.83647,472.26031 211.60073,473.94574 204.05378,475.39886 L 203.49128,477.80511 L 233.64753,477.80511 L 263.83503,477.80511 L 263.27253,475.39886 C 255.72557,473.94573 250.48983,472.26031 247.58503,470.33636 C 243.27109,467.47907 240.07717,463.89105 237.99128,459.55511 C 236.05637,455.53321 234.94845,450.1658 234.64753,443.46136 C 238.58188,449.59723 244.59308,455.21135 252.30378,455.21136 C 256.61623,455.21137 260.27245,453.71138 263.27253,450.71136 C 266.27244,447.71138 267.77245,443.96139 267.77253,439.46136 C 267.77244,436.22702 266.91307,433.03952 265.17878,429.89886 C 263.44431,426.75828 259.32716,422.25048 252.83503,416.36761 C 246.3428,410.48486 241.83498,405.5708 239.30378,401.58636 C 236.77249,397.60206 234.89749,393.05519 233.67878,387.99261 z ",
      "club": "M 345.40263,491.68441 C 339.87144,491.68448 335.23863,493.54387 331.46513,497.24691 C 327.69176,500.9501 325.80894,505.35635 325.80888,510.46566 C 325.80894,514.63758 327.41832,518.99697 330.65263,523.59066 C 327.85077,521.25613 325.05715,519.87191 319.74638,519.87191 C 309.35517,519.8719 301.90263,528.4017 301.90263,539.05941 C 301.9026,550.3605 310.15028,558.96567 321.15263,558.96566 C 332.16833,558.96564 340.4344,551.45174 344.49638,542.30941 C 344.30893,549.76255 343.17611,555.661 341.09013,559.99691 C 339.00425,564.33286 335.80894,567.9188 331.49638,570.77816 C 328.59019,572.70003 323.35583,574.38754 315.80888,575.84066 L 315.24638,578.24691 L 345.40263,578.24691 L 375.59013,578.24691 L 375.02763,575.84066 C 367.48068,574.38754 362.24631,572.70003 359.34013,570.77816 C 355.02757,567.9188 351.83227,564.33286 349.74638,559.99691 C 347.6604,555.661 346.52757,549.76255 346.34013,542.30941 C 350.40211,551.45174 358.66817,558.96564 369.68388,558.96566 C 380.68623,558.96567 388.9339,550.3605 388.93388,539.05941 C 388.93388,528.4017 381.48133,519.8719 371.09013,519.87191 C 365.77936,519.87191 362.98573,521.25613 360.18388,523.59066 C 363.41819,518.99697 365.02758,514.63758 365.02763,510.46566 C 365.02757,505.35635 363.14475,500.9501 359.37138,497.24691 C 355.59788,493.54387 350.93382,491.68448 345.40263,491.68441 z "
};

var textLabels = {
      "0": "Kitty",
      "45": "King-Queen",
      "90": "All One Suit",
      "135": "Ace",
      "180": "King",
      "225": "Queen",
      "270": "Jack",
      "315": "10"
};

var r,
playerDealer,
cards = {}, 
players = [], 
POT = {
	x: 462, 
	y: 300
},
playerConfig = [{dealLocation: {center:{x:462, y:604}, left:{x:350, y:604}, right:{x:575, y:604}}, chipsLocation: {x: 712 , y: 605 } }, {dealLocation: {center:{x:40, y:300}, left:{x:40, y:375}, right:{x:40, y:225}}, chipsLocation: {x: 100 , y: 200 } }, {dealLocation: {center:{x:462, y:10}, left:{x:350, y:10}, right:{x:575, y:10}}, chipsLocation: {x: 312 , y: 100} }, {dealLocation: {center:{x:890, y:300}, left:{x:890, y:375}, right:{x:890, y:225}}, chipsLocation: {x: 970 , y: 200} }],
playedCards = [], 
currentConditional, 
humanPlayer, 
start = function () {
    this.oc = {
        x: this.attr("x"),
        y: this.attr("y")
    };
}, move = function (dx, dy) {
    this.attr({
        x: this.oc.x + dx,
        y: this.oc.y + dy
    });

}, up = function () {
    var c = this.name;
    this.undrag();
    if (currentConditional.indexOf(c) != -1) {
        cards[c].up.toFront();
        cards[c].moveToPot(function () {
            cards[c].remove();
            GAME.spreadCards();
            GAME.findNextCard(cards[c]);
        });
    } else {
        cards[c].moveTo(this.oc.x, this.oc.y);
    }

};

var GAME = {

    shuffle: function () {
        allCards.shuffle();
        var playerCount = 0;
        allCards.forEach(function (c) {
            if (playerCount == 4) {
                playerDealer.secondDeck.push(c);
                cards[c] = new Card(c, playerDealer);
                playerCount = 0;
            } else {
                cards[c] = new Card(c, players[playerCount]);
                players[playerCount].cards.push(c);
                playerCount++;
            }
        });
        players.forEach(function (p) {
            p.cards.forEach(function (c) {
                p.nodesSet.push(cards[c].up, cards[c].down);
            });
        });
        playerDealer.secondDeck.forEach(function (c) {
            playerDealer.secondNodesSet.push(cards[c].up, cards[c].down);
        });
    },

    deal: function () {

        players.forEach(function (p) {
            var d = p.dealLocation;
            if (p == playerDealer) {
                p.nodesSet.animate({
                    "x": d.left.x,
                    "y": d.left.y,
                    "rotation": p.rotation
                }, 2000, "<>");
                p.secondNodesSet.animate({
                    "x": d.right.x,
                    "y": d.right.y,
                    "rotation": p.rotation
                }, 2000, "<>");
            } else if (p == players[3]) {
                p.nodesSet.animate({
                    "x": d.center.x,
                    "y": d.center.y,
                    "rotation": p.rotation
                }, 2000, ">", GAME.onDeal);
            } else {
                p.nodesSet.animate({
                    "x": d.center.x,
                    "y": d.center.y,
                    "rotation": p.rotation
                }, 2000, ">");
            }
        });

    },

    promptDeck: function () {
        if (playerDealer == humanPlayer) {
            console.log("Human Dealer");

            var left = cards[playerDealer.cards[0]].down;
            var right = cards[playerDealer.secondDeck[0]].down;

            left.tooltip("create", {
                content: "Select this deck",
                direction: "left",
                offset: 10,
                opacity: .8
            });
            right.tooltip("create", {
                content: "Select this deck",
                direction: "right",
                offset: 10,
                opacity: .8
            });

            left.toFront().hover(

            function (event) {
                this.animate({
                    scale: "1.1,1.1"
                }, 300, function () {
                    this.tooltip("show")
                });
                this.attr({
                    cursor: "pointer"
                });
            }, function (event) {
                this.animate({
                    scale: "1,1"
                }, 300, function () {
                    this.tooltip("hide")
                });
            }).click(function (event) {
                this.unclick().unhover().toBack().attr({
                    cursor: "default",
                    scale: "1,1"
                }).tooltip("destroy");

                playerDealer.secondDeck.forEach(function (c) {
                    cards[c].owner = false;
                });

                var animateRemoveDeck = function () {
                    playerDealer.secondNodesSet.animate({
                        y: 800
                    }, 1000, "<>")
                };
                GAME.onSelectedDeck(animateRemoveDeck);
            });

            right.toFront().hover(

            function (event) {
                this.animate({
                    scale: "1.1,1.1"
                }, 300, function () {
                    this.tooltip("show")
                });
                this.attr({
                    cursor: "pointer"
                });
            }, function (event) {
                this.animate({
                    scale: "1,1"
                }, 300, function () {
                    this.tooltip("hide")
                });
            }).click(

            function (event) {
                this.unclick().unhover().toBack().attr({
                    cursor: "default",
                    scale: "1,1"
                }).tooltip("destroy");

                playerDealer.cards.forEach(function (c) {
                    cards[c].owner = false;
                });
                playerDealer.cards = playerDealer.secondDeck;

                var animateRemoveDeck = function () {
                    playerDealer.nodesSet.animate({
                        y: 800
                    }, 1000, "<>", function () {
                        playerDealer.nodesSet = playerDealer.secondNodesSet;
                    });
                };
                GAME.onSelectedDeck(animateRemoveDeck);
            });

        }
    },

    draw: function () {

        diamond = r.path(shapes.diamond).rotate(45).attr({
            translation: "915,35",
            scale: "2,2",
            stroke: "#d40000",
            fill: "#d40000",
            opacity: 0.3
        });
        heart = r.path(shapes.heart).rotate(-135).attr({
            translation: "-290,250",
            scale: ".2,.2",
            stroke: "#d40000",
            fill: "#d40000",
            opacity: 0.3
        });
        spade = r.path(shapes.spade).rotate(-45).attr({
            translation: "-160,-360",
            scale: "1.75,1.75",
            stroke: "#000",
            fill: "#000",
            opacity: 0.3
        });
        club = r.path(shapes.club).rotate(-225).attr({
            translation: "605,160",
            scale: "1.75,1.75",
            stroke: "#000",
            fill: "#000",
            opacity: 0.3
        });
        pot = r.circle(512, 384, 100).attr({
            stroke: "#fff",
            "stroke-width": 3,
            opacity: 0.2
        });
        pot2 = r.circle(512, 384, 200).attr({
            stroke: "#fff",
            "stroke-width": 3,
            opacity: .2
        });
        pot3 = r.text(512, 384, "POT").attr({
            stroke: "none",
            fill: "#fff",
            "font-family": "arial",
            "font-size": 40,
            opacity: .5
        });
        var rad = Math.PI / 180;

        function sector(cx, cy, radius, startAngle, endAngle, params) {
            var x1 = cx + radius * Math.cos(-startAngle * rad),
                x2 = cx + radius * Math.cos(-endAngle * rad),
                y1 = cy + radius * Math.sin(-startAngle * rad),
                y2 = cy + radius * Math.sin(-endAngle * rad),
                x3 = cx + 100 * Math.cos(-startAngle * rad),
                y3 = cy + 100 * Math.sin(-startAngle * rad),
                x4 = cx + 100 * Math.cos(-endAngle * rad),
                y4 = cy + 100 * Math.sin(-endAngle * rad);
            r.path(["M", x3, y3, "L", x1, y1, "A", radius, radius, 0, +(endAngle - startAngle > 180), 0, x2, y2, "L", x4, y4, "A", 100, 100, 0, +(endAngle - startAngle < 180), 0, x3, y3, "z"]).attr(params);
            return r.path(["M", x1, y1, "A", 200, 200, 0, +(endAngle - startAngle > 180), 0, x2, y2]);
        }

        for (i = 0; i < 8; i++) {
            var curve = sector(512, 384, 200, 0 + i * 45, 45 + i * 45, {
                "stroke-width": 3,
                stroke: "#fff",
                opacity: 0.2
            }).hide();
            curve.node.id = "curve" + (0 + i * 45);
            var text = r.textPath("#curve" + (0 + i * 45), textLabels[0 + i * 45]).configTextPath("setAttribute", "startOffset", "50%").attr({
                "font-size": 25,
                "opacity": ".5",
                "stroke": "none",
                fill: "#fff"
            });
        }
        chip = r.image("images/1.svg", 779, 705, 60, 60);
        chip = r.image("images/1.svg", 780, 704, 60, 60);
        chip = r.image("images/1.svg", 781, 703, 60, 60);
        chip = r.image("images/1.svg", 783, 702, 60, 60);
        chip = r.image("images/1.svg", 784, 701, 60, 60);
        chip = r.image("images/1.svg", 785, 700, 60, 60);
    },

    spreadCards: function () {
        players.forEach(function (p) {
            var x, y;
            if (p.rotation) {
                y = (768 - ((p.cards.length + 1) * 19 + 154)) / 2;
                x = p.dealLocation.center.x;
            } else {
                x = (1024 - ((p.cards.length - 1) * 19 + 99)) / 2;
                y = p.dealLocation.center.y;
            }
            p.cards.forEach(function (c) {
                cards[c].moveTo(x, y);
                p.rotation ? y += 19 : x += 19;
            });
        });
    },

    findNextCard: function (lastCard) {
    	
        console.log("Just played:" + lastCard.id);
        
        nextCard = new function () {
            this.isStartCard = lastCard.start || false;
            this.id = function() {
            	var number = parseInt(lastCard.number);
				if (number === 13) return "1" + lastCard.suit; //last card was king, this one is Ace
				else return (number += 1) + lastCard.suit;	
            }();
            this.Card = cards[this.id];
            this.cardArray = [this.id];
            this.owner = (this.isStartCard === true ? false : cards[this.id].owner);
            this.isRemoved = (this.owner === false ? true : false);

        };
        nextPlayer = new function () {
            var playerIndex = (players.indexOf(lastCard.owner) + 1) % 4;
				console.log(playerIndex);
            this.Player = players[playerIndex];
            this.add = function (number) {
                var added = ((playerIndex + number) === 0 ? 1 : (playerIndex + number));
                playerIndex = added % 4;
                this.Player = players[playerIndex];
            };
        };
        var thisCard;

        function goNext() {
        	console.log(thisCard);

            if (cards[thisCard[0]].owner == humanPlayer) { //Player is a human
            	
                console.log("-- waiting for Human input --");
                return (currentConditional = thisCard);
                
            } else { //Player is a Computer
            	
                console.log("------ Card played by Computer ------");
                var goCard = cards[thisCard.random()];
                return goCard.turnFaceUpAndMove(POT.x, POT.y, 0, function () {
                    goCard.remove();
                    GAME.spreadCards();
                    GAME.findNextCard(goCard);
                });
                
            }
        }


        if (nextCard.isStartCard) {
            console.log("This card is a startCard");
            while (!thisCard) {
                thisCard = nextPlayer.Player.getLowestBlack();
                nextPlayer.add(1);
            }
            return goNext();
        } else if (lastCard.number == 1) {
            console.log("The last card was an Ace - find lowBlack or lowRed");
            while (!thisCard) {
                lastCard.isRed ? thisCard = nextPlayer.Player.getLowBlacks() : thisCard = nextPlayer.Player.getLowReds();
                nextPlayer.add(1);
            }
            return goNext();
        }
		else if (nextCard.isRemoved) {
               console.log("The next card " + nextCard.id +" is a \"removed card\" - find lowBlack or lowRed");
               while (!thisCard) {
                 lastCard.isRed ? thisCard = nextPlayer.Player.getLowBlacks() : thisCard = nextPlayer.Player.getLowReds();
                 nextPlayer.add(1);
               }
               return goNext();
         }
        else {
            console.log("The next card " + nextCard.id + " is a \"normal\" card - play it");
            thisCard = nextCard.cardArray;
            return goNext();
        }

    }
};


window.onload = function () {

    r = Raphael("holder", 1024, 768);
    GAME.draw();
    players.push(new Player(playerConfig[0], 0), new Player(playerConfig[1], 90), new Player(playerConfig[2], 0), new Player(playerConfig[3], 90));
    playerDealer = humanPlayer = players[0];
    GAME.shuffle();
    setTimeout(function () {
        GAME.deal();
    }, 1000);
    GAME.onDeal = function () {
        GAME.promptDeck();
    };
    GAME.onSelectedDeck = function (animate) {
        animate();
        GAME.spreadCards();
        setTimeout(function () {
            players[0].flipCards(100);
        }, 1500);
        setTimeout(function () {
            GAME.findNextCard({
                owner: playerDealer,
                start: true,
                number: 0,
                suit: "start",
                id: 0
            });
            players[0].nodesSet.drag(move, start, up);
        }, 3500);
    };

};