// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var win = window;
var mpos = $("#message").position().top;
var ticking = false;
win.addEventListener('scroll', onScroll, false);
function onScroll (evt) {
	if (!ticking) {
	  ticking = true;
	  requestAnimFrame(parallax);
	  lastScrollY = win.scrollY;
	}
}

function parallax(){
  var scrolled = $(document).scrollTop();
  if (scrolled < mpos) {
  		//console.log("innnnnn3")
  		var bp = Math.round(-(scrolled*0.25));
  		//console.log(bp)
  		var opacity = parseFloat(1-scrolled*(1/1000)).toFixed(3);
  		//console.log(opacity)
  		//$("#colorfade").css("top", -bp + "px");
		$('#header').css('background-position','center ' + bp + "px" );
		$('#header').css('opacity', opacity);
  }
  ticking = false;
}


/*$(document).ready(function($) {
	// init controller
	var controller = new ScrollMagic();
	var bp = -248;

	// build tween
	var tween = TweenMax.fromTo("#header", 0.5, 
			{"backgroundPosition": "center 0px"},
			{"backgroundPosition": "center " + bp + "px"}
		);

	// build scene
	var elements = $("#message #view");
	var scene = new ScrollScene({duration: 1200})
					.addTo(controller)
					.triggerElement(elements[0])
					.setTween(tween);
					
	// show indicators (requires debug extension)
	scene.addIndicators();
});*/