function Int(number) {
	
	return parseInt(number, 10);

}

Array.prototype.shuffle = function () {
    for (var a = this.length - 1; a > 0; a--) {
        var b = Math.floor(Math.random() * (a + 1)),
            c = this[a];
        this[a] = this[b];
        this[b] = c;
    }
};

Array.prototype.sortAscend = function () {
    return this.sort(function (a, b) {
		var number1 = Int(cards[a].number);
		if (number1 == 1) number = 14;
		var number2 = Int(cards[b].number);
		if (number2 == 1) number2 = 14;   	
		return number1 - number2;
    });
};

Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
};

var CARD = {
	name : function(cardID) {
            var n = CARD.number(cardID);
			n==1 &&(n = "Ace");
			n==11 &&(n = "Jack");
			n==12 &&(n = "Queen");
			n==13 &&(n = "King");

			     if (cardID.indexOf("c")!=-1) return n + " of Clubs";
			else if (cardID.indexOf("h")!=-1) return n + " of Hearts";
			else if (cardID.indexOf("d")!=-1) return n + " of Diamonds";
			else if (cardID.indexOf("s")!=-1) return n + " of Spades";
		    return "Unknown Card";
	},
	suit : function(cardID)
	{
			if(cardID.indexOf("c")!=-1) return "c";
			else if(cardID.indexOf("h")!=-1) return "h";
			else if(cardID.indexOf("d")!=-1) return "d";
			else if(cardID.indexOf("s")!=-1) return "s";
		return "";
	},
	isRed : function(cardID)
	{
		return cardID.indexOf("d") != -1 || cardID.indexOf("h") != -1;
	},
	isBlack : function(cardID)
	{
		return cardID.indexOf("s") != -1 || cardID.indexOf("c") != -1;
	},
	number : function(c)
	{
                for (var n = "", a = 0; a < c.length; a++) {
                  isNaN( Int( c[a] ) ) || ( n += "" + c[a] );
                }
                n = Int(n);
                return n;
	},
	toSuits : function(cardsArray)
        {
                var C = [], D = [], S = [], H = [];

                cardsArray.forEach(function(c) {
	                  CARD.suit(c) == "h" && (H.push(c));
	                  CARD.suit(c) == "s" && (S.push(c));
	                  CARD.suit(c) == "d" && (D.push(c));
	                  CARD.suit(c) == "c" && (C.push(c));	
                });
                
                return (e = {h: H, s: S, d: D, c: C});
        },
        hasMoneyCards : function(cardsArray) 
        {
        	    b = CARD.toSuits(cardsArray).h;
        	    b.map(function(a, d) {
                  Int(cards[a].number) > 1 && Int(cards[a].number) < 10 && b.splice(d, 1);
                });
                return b.length;
        }

};