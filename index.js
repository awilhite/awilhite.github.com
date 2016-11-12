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
    if (hold)
    {
        log("Gamma", event.gamma);
        log("Beta", event.beta);
        log("Alpha", event.alpha);
    }
}

function deviceMotionHandler(event)
{
    if (hold)
    {
        log("X", event.acceleration.x);
        log("Y", event.acceleration.y);
        log("Z", event.acceleration.z);
    }
}


function initialize() {
    
    window.setInterval(function(){
        window.hold = !window.hold;
    }, 1000);
    
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', deviceOrientationHandler, false);
        log("Device Orientation", "Supported!");
    }
    
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', deviceMotionHandler);
        log("Device Motion", "Supported!");
    }
}

document.addEventListener('DOMContentLoaded', initialize);