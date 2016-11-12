window.hold = true;

function log(desc, value)
{
    var log_el = document.querySelector("#log");
    
    log_el.innerHTML += desc;
    log_el.innerHTML += ": ";
    log_el.innerHTML += value;
    log_el.innerHTML += "<br>";
}

function deviceOrientationHandler(event)
{
    if (window.hold)
    {
        window.hold = !window.hold;
        
        log("Gamma", event.gamma);
        log("Beta", event.beta);
        log("Alpha", event.alpha);
    }
}

function deviceMotionHandler(event)
{
    if (window.hold)
    {
        window.hold = !window.hold;
        
        log("X", event.acceleration.x);
        log("Y", event.acceleration.y);
        log("Z", event.acceleration.z);
    }
}


function initialize() {
    
    window.setInterval(function(){
        window.hold = !window.hold;
    }, 100);
    
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', deviceOrientationHandler, false);
        log("Device Orientation", "Supported!");
    }
    
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', deviceMotionHandler, false);
        log("Device Motion", "Supported!");
    }
}

document.addEventListener('DOMContentLoaded', initialize);