function round(n) {

    return Math.round(n * 10000) / 10000;

}

function $(selector) {

    function convert (collection) {
        var a = [];
        for (var i = 0, length = collection.length; i < length; i++) {
            a.push(collection[i]);
        }
        return a;
    }
	
    var query = document.querySelectorAll(selector);
	return convert(query);
}

function LCM() {   
	
	var o = $("form[name='lcm'] input[type='text']")[0].value.split(", ");

function lcm(o){
    for(var i, j, n, d, r = 1; (n = o.pop()) !== undefined;)
        while(n > 1){
            if(n % 2){
                for (i = 3, j = Math.floor(Math.sqrt(n)); i <= j && n % i; i += 2);
                d = i <= j ? i : n;
            }
            else
                d = 2;
            for(n /= d, r *= d, i = o.length; i; !(o[--i] % d) && (o[i] /= d) == 1 && o.splice(i, 1));
        }
    return r;
}

   
    $(".solution")[0].innerHTML = lcm(o);;    
}

function Factors() {
	
	var number = $("form[name='factors'] input[type='text']")[0].value;
	
	
    var factors = [];
    var max = Math.sqrt(number);  
    for(factor = 1; factor <= max; factor++) { 
        if (number % factor === 0) {
            factors.push(factor);
            if (factor != max) { 
                factors.push(number/factor);
            }
        }
    }
    $(".solution")[0].innerHTML = "<span>"+factors+"</span>";
}

function Quadratic() {
	
	var quadratic = /^(\-?\d*)[a-z]{1}\^2([+\-]{1}\-?\d*)[a-z]{1}([+\-]{1}\-?\d*)$/i;
    
    var input = $("form[name='poly'] input[type='text']")[0];

	str.replace(polynomial, "$1, $2, $3")

	var input = $("form[name='quadratic'] input[type='text']")[0];
    var discriminant = (b * b) - (4 * a * c);
    var sq;
    var plus;
	var go = true;	
	var a, b, c;

    if (!polynomial.test(input.value)) {
        go = false;
        input.style.border = "1px solid red";
    }
    else {
    	input.value.replace(polynomial, function (str, p1, p2, p3) {
			a = p1;
			b = p2;
			c = p3;
            return str;
		});
		input.style.border = "1px solid green";
    }

    if (discriminant > 0 && go === true) {

        sq = Math.sqrt(discriminant);
        var minus = round((-b - sq) / (2 * a));
        plus = round((-b + sq) / (2 * a));

        $(".solution")[0].innerHTML = "<h3>Two Real Solutions</h3><span class='answer'>" + plus + "</span><br><span class='answer'>" + minus + "</span><h3>Discriminant</h3><span class='answer'>" + discriminant + "</span>";
    }

    if (discriminant === 0 && go === true) {

        sq = Math.sqrt(discriminant);
        plus = round((-b + sq) / (2 * a));

        $(".solution")[0].innerHTML = "<h3>One Real Solution</h3><span class='answer'>" + plus + "</span><h3>Discriminant</h3><span class='answer'>" + discriminant + "</span>";
    }

    if (discriminant < 0 && go === true) {

        sq = Math.sqrt(Math.abs(discriminant));
        real = round(-b / (2 * a));
        imaginary = round(sq / (2 * a)) + "i";

        $(".solution")[0].innerHTML = "<h3>Two Complex Roots</h3><span class='answer'>" + real + " + " + imaginary + "</span><br><span class='answer'>" + real + " - " + imaginary + "</span><h3>Discriminant</h3><span class='answer'>" + discriminant + "</span>";
    }
}

function Polynomial() {		

	console.log(coefficients);
	
	function F(number) {	
	    var fact = [];
	    var max = Math.sqrt(number);  
	    for (factor = 1; factor <= max; factor++) { 
	        if (number % factor === 0) {
	            fact.push(factor);
	            if (factor != max) { 
	                fact.push(number/factor);
	            }
	        }
	    }
	    return fact;
    }
	
	var p = F(Math.abs(coefficients[coefficients.length-1]));
	var q = F(Math.abs(coefficients[0]));
	var pq = [];
	var matched = [];
	
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
				$(".solution")[0].innerHTML += (currentCoefficients)+"<br>";
				if (j == coefficients.length-1 && current === 0) {
				
					matched.push(currentCoefficients+" : " +pq[i]+ "<br>");

				}
			}
	}
	console.log(matched);
	$(".solution")[0].innerHTML += (matched)+"<br>";
	
}

window.onload = function() {
	
	$("form[name='quad'] input[type='text']").forEach(function(element) {
		element.addEventListener("click", Quadratic);
		element.addEventListener("keyup", Quadratic);
	});
	
	$("form[name='poly'] input[type='text']").forEach(function(element) {
		element.addEventListener("click", Polynomial);
		element.addEventListener("keyup", Polynomial);
	});
	
	$("form[name='factors'] input[type='text']").forEach(function(element) {
		element.addEventListener("click", Factors);
		element.addEventListener("keyup", Factors);
	});
	
	$("form[name='lcm'] input[type='text']").forEach(function(element) {
		element.addEventListener("click", LCM);
		element.addEventListener("keyup", LCM);
	});
	
};

