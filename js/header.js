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
  		//var bp = Math.round(-(scrolled*0.2));
  		var opacity = parseFloat(1-scrolled*(1/1000)).toFixed(3);
  		//console.log(opacity)
  		//$("#colorfade").css("top", -bp + "px");
		//$('#header').css('background-position','center ' + );
		$('#header').css('opacity', opacity);
  }
  ticking = false;
}
