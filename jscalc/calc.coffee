funcEditLined = false
roundAfter = 0.0000009
digitsAfterPoint = 11

storage = ->
	if arguments.length < 2 localstorage.getItem(s) else localStorage.setItem(arguments[0], arguments[1])

$ = (ID) ->
	document.querySelector(ID)

init = ->
	input = $("#caalc")
	history = $("#output")
	$("#func-edit").value = storage("customFuncs")
	try 
		eval storage("customFuncs")
	history.innerHTML = storage("history")
	if $("#output").innerHTML is "" then $("#clean").style.display = "none"
  
input.onkeydown = (a) ->
    if input.value.length > 24 then input.style.font = "bold 40px 'Century Gothic', Helvetica, sans" else input.style.fontSize = "64px"
    if a.keyCode == 13 || a == "manual"
		if valid = /^[a-z0-9A-Z\-\*\+\/\(\)\.\,=,\^,!,#,\s,\%]+$/.test(input.value)
	        original = input.value
	        input.value = inputFormatter(input)
	        output = "E"
	        try
	          	output = eval( input.value )
	        catch
	   		   	input.value = "E"
	        if output == original
	        	input.value = ""
	        else if output isnt "E" 
	        	if Math.abs ( output - Math.round ( output ) ) > 0 
                	digits = Math.pow( 10, digitsAfterPoint )
                    output = Math.round( output * digits ) / digits
                if Math.abs( output - Math.round( output ) ) < roundAfter
                    output = Math.round( output )
                history.innerHTML = "#{original} = #{output} #{$('output').innerHTML}"
                input.value = output        
	        updateHistory()
		else 
	        input.value = "E"

$("#func-edit").onkeydown (a) ->
    if a.keyCode == 27
        hideCustomFuncEdit()
    else if a.keyCode == 9
        return false

$("#output").onmousewheel (a, c) = ->
    direction = if c > 0 then -1 else 1
    change = Math.abs(c)
    sT = $(this).scrollTop()
    $(this).scrollTop(sT + change * direction * 20)
    return false

$("#scroll-down").onmousemove = ->
    $("#output").scrollTop($("#output").scrollTop() + 15)
		
    
$("#wrench").onclick = ->
	$("func-box")style.display = "block"
	$("input-box").style.opacity = "0.2"
	$("output-box").style.opacity = "0.2"

$("#closeFuncEdit").onclick = ->
	saveCustomFuncs()
	customFuncs = $("func-edit").value
	try 
		eval( customFuncs )
		$("func-box")style.display = "none"
		$("input-box").style.opacity = "1"
		$("output-box").style.opacity = "1"
	catch
		alert("There is an error in your custom functions")

$("#func-edit").onchange = ->
	storage("customFuncs", $("func-edit").value)

updateHistory ->
	storage("history", $("#output").value)
	if $("#output").value isnt "" then $("#clean").style.display = "block"

selectAll = (id) ->
	$(id).focus()
	$(id).select()
  
cleanOutput ->
	$("#output").innerHTML = ""
	$("#output").value = ""
	storage("history", "")
	$("#clean").style.display = "none"

factorial = (n) ->
	r = 1
	for i in [1..n]
	    r *= i
	return r

gradToRad = (a) ->
	a * Math.PI / 180

logab = (a, b) ->
	Math.log(a) / Math.log(b)

lgn = (a) ->
	Math.log(a) / Math.log(10)
  
base = (a, b, c) ->
	parseInt(a, c || 10).toString(b)

bin = (a) ->
	base(a, 2, 10)

dec = (a) ->
	base(a, 10, 2)

mod = (a, b) ->
	a % b
	
round = (int) ->
	digits = Math.pow( 10, digitsAfterPoint )
    Math.round( int * digits ) / digits
	
solveQuad = (str) ->
	quadratic = /^(\-?\d*)[a-z]{1}\^2([+\-]{1}\-?\d*)[a-z]{1}([+\-]{1}\-?\d*)$/i
	a = 0; b = 0; c = 0

	discriminant = (b * b) - (4 * a * c)	
	
	if discriminant > 0
        sq = Math.sqrt( discriminant )
        minus = round (-b - sq) / (2 * a)
        plus = round (-b + sq) / (2 * a)
        return "{ #{plus}, #{minus} }"
        
    if discriminant === 0 
        sq = Math.sqrt(discriminant)
        plus = round (-b + sq) / (2 * a)
        return "{ #{plus} }"

    if discriminant < 0
        sq = Math.sqrt Math.abs( discriminant )
        real = round(-b / (2 * a))
        imaginary = round(sq / (2 * a)) + "i"
        return "{ #{real}+#{imaginary}, #{real}-#{imaginary} }"

solvePoly = ->
	polynomial = /^(\-?\d*\/?\.?\d*)[a-z]{1}\^(\-?\d+\/?\.?\d*)[+-]{1}(?:(\-?\d*\/?\.?\d*)(?:[a-z]{1}\^(\d*\/?\.?\d*))?(?:[+-]{1})?)+(\-?\d*\/?\.?\d*)?$/i
	
	#matches a possible "-" -> a possible number (int, float, frac) -> one letter a required "^" -> 
	#{ an optional "-" -> a required number -> required "+" or "-"
	#-> an optional number -> an optional letter^number -> an optional "+" or "-" } repeat as desired
	#-> an optional number
	#not necessarily desirable but prevents monotonous repetition - test for match against /^\-?\d*\/?\.?\d*[a-z]{1}\^\-?\d+\/?\.?\d*[+-]{1}$/

	
	
	