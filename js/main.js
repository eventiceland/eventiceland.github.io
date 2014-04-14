$(document).ready(function() {
	//$("html").niceScroll();
});

var scrollPos;
(function() {
    var hidden = "hidden";

    // Standards:
    if (hidden in document)
        document.addEventListener("visibilitychange", onchange);
    else if ((hidden = "mozHidden") in document)
        document.addEventListener("mozvisibilitychange", onchange);
    else if ((hidden = "webkitHidden") in document)
        document.addEventListener("webkitvisibilitychange", onchange);
    else if ((hidden = "msHidden") in document)
        document.addEventListener("msvisibilitychange", onchange);
    // IE 9 and lower:
    else if ('onfocusin' in document)
        document.onfocusin = document.onfocusout = onchange;
    // All others:
    else
        window.onpageshow = window.onpagehide 
            = window.onfocus = window.onblur = onchange;

    function onchange (evt) {
        var v = 'visible', h = 'hidden',
            evtMap = { 
                focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h 
            };

        var scroll = false;
        evt = evt || window.event;
        if (evt.type in evtMap) {
            if (evtMap[evt.type] == "hidden")  {
            	window.clearInterval(headerInterval);
            	scrollPos = $(document).scrollTop();
            } else if (evtMap[evt.type] == "visible" && change == true) {
            	headerInterval = setInterval(owlPlay, speed);
            	scroll = true;
            }
            document.body.className = evtMap[evt.type];
        } else {
            if (this[hidden] ? "hidden" : "visible" == "hidden") {
                console.log("here1")
            	window.clearInterval(headerInterval);
            	scrollPos = $(document).scrollTop();
            } else if (this[hidden] ? "hidden" : "visible" == "visible" && change == true) {
                console.log("here2")
            	headerInterval = setInterval(owlPlay, speed);
            	//$(document).scrollTop(scrollPos);
            	scroll = true;
            }
            document.body.className = this[hidden] ? "hidden" : "visible";
        }
        console.log(scrollPos);
        if (scroll) {
            $(document).scrollTop(scrollPos);
        }
    }
})();