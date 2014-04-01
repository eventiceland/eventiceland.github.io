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
  var mpos = $("#message").position().top;
  if (scrolled < mpos) {
  		//console.log("innnnnn3")
  		var bp = Math.round(-(scrolled*0.25));
  		//console.log(bp)
  		var opacity = parseFloat(1-scrolled*(1/1000)).toFixed(3);
  		//console.log(opacity)
  		//$("#colorfade").css("top", -bp + "px");
		$('#header').css('background-position','center ' + bp + "px" );
		$('#header_inner').css('background-position','center ' + bp + "px" );
		if (current == "header_inner") {
			$('#header').css('opacity', 1.0);
			$('#header_inner').css('opacity', opacity);
		} else if (current == "header") {
			$('#header').css('opacity', opacity);
			//$('#header_inner').css('opacity', opacity);
		}
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



//Carousel
var owl;
$(document).ready(function() {
	var change = true;
	//$("#owl-example").owlCarousel();
	$("#owl-demo").owlCarousel({
		autoPlay: 3000,
		navigation: false,
		pagination: false,
		itemsScaleUp: true,
		stopOnHover: false,
		afterMove: function(elem, t) {
			var next = false;
			if (change) {
				$('#owl-demo .item').each(function() {
					if (next) {
						setImg($(this));
					}
					if ($(this).offset().left == 0) {
						next = true;
					} else {
						next = false;
					}
				})
			}
		}
	});
	owl = $("#owl-demo").data('owlCarousel');
	$('#owl-demo .item').on('click', function(event){
		change = false;
		owl.stop();
		setImg($(this));
	});
});

var current = "header_inner";
var select = "header";
function setImg(that) {
	if (current == "header_inner") {
		select = "header";
	} else {
		select = "header_inner";
	}

	$('#owl-demo .item').removeClass("active");
	that.addClass('active');
	$("#"+select).removeClass("hitem0");
	$("#"+select).removeClass("hitem1");
	$("#"+select).removeClass("hitem2");
	$("#"+select).removeClass("hitem3");
	$("#"+select).removeClass("hitem4");
	$("#"+select).removeClass("hcover");
	var i = 0;
	while (true) {
		if (that.hasClass("item"+i)) {
			$("#"+select).addClass("hitem"+i);
			break;
		}
		i++;
	}
	$("#"+select).addClass("hcover");

	if (select == "header_inner") {
		$("#header_inner").fadeTo( "normal" , 1.0, function() {
			$("#header").removeClass("hitem0");
			$("#header").removeClass("hitem1");
			$("#header").removeClass("hitem2");
			$("#header").removeClass("hitem3");
			$("#header").removeClass("hitem4");
			$("#header").removeClass("hcover");
		});
		current = "header_inner";
	} else if (select == "header") {
		$("#header_inner").fadeTo( "normal" , 0.0);
		current = "header";
	}
}

function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
        // Alternatively you could use:
        // (new Image()).src = this;
    });
}

var imgs = [];
var x = 0;
while (x != 5) {
	imgs.push("/img/header/large-"+x+".jpg")
	x++;
}
preload(imgs);