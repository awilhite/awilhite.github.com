function log(desc, value)
{
    var log_el = document.querySelector("#log");
    
    log_el.innerHTML += desc;
    log_el.innerHTML += ": ";
    log_el.innerHTML += value;
    log_el.innerHTML += "<br>";
}


function initialize() {

	var has_touch = 'ontouchstart' in document.documentElement;
	var accX, accY, width, height, xA, yA, movement;
	
	if (has_touch) {
		
		window.ondevicemotion = function(event) {
		  	
		    accX = Math.round(event.accelerationIncludingGravity.x*10) / 10;  
		    accY = Math.round(event.accelerationIncludingGravity.y*10) / 10;  
		    
		    movement = 10;
		    
		    xA = -(accX / 10) * movement;
		    yA = -(accY / 10) * movement;
            
            log("xA", xA);
            log("xA", yA);
		    
		}  
		
	}
	
}

document.addEventListener('DOMContentLoaded', initialize);