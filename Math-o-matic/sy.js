function Factors(number) {
    var factors = [];
    var max = Math.sqrt(number);  //round down
    for(factor = 1; factor <= max; factor++) { //test from 1 to the square root, or the int below it, inclusive.
        if (number % factor === 0) {
            factors.push(factor);
            if(factor != max) { // Don't add the square root twice!  Thanks Jon
                factors.push(number/factor);
            }
        }
    }
    return factors;
}

var syn = function(coefficients) {	
	
	var p = Factors(Math.abs(coefficients[coefficients.length-1]));
	var q = Factors(Math.abs(coefficients[0]));
	var pq = [];
	var matched = ["<br><br><br>"];
	
	for (i = 0; i < q.length; i++) {	
		for (j = 0; j < p.length; j++) {
				pq.push(p[j]/q[i]);
				pq.push(-(p[j]/q[i]));
	    }						
	}
	
	for (i = 0; i < pq.length; i++) {
			
			var current = coefficients[0];
			
			var currentCoefficients = [];
			currentCoefficients.push(current);
			
			for (j = 1; j < coefficients.length; j++) {
					
				current = pq[i] * current + coefficients[j];
				currentCoefficients.push(current);
				
				if (j == coefficients.length-1 && current === 0) {
				
					matched.push(currentCoefficients+" : " +pq[i]+ "<br>");
					
				}
			}
			document.getElementById("log").innerHTML+=(currentCoefficients)+" : " +pq[i]+"<br>";
	}
	
	document.getElementById("log").innerHTML+=(matched)+"<br>";
	
};

window.onload = function() {
	syn();
};