var speed = 4500;

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
  		if (fade != undefined) fade.stop();
  		//console.log("innnnnn3")
  		var bp = Math.round(-(scrolled*0.25));
  		//console.log(bp)
  		var opacity = parseFloat(1-scrolled*(1/mpos)).toFixed(3);
  		//console.log(opacity)
  		//$("#colorfade").css("top", -bp + "px");
		$('#header1').css('background-position','center ' + bp + "px" );
		$('#header2').css('background-position','center ' + bp + "px" );
		if (current == "header2") {
			//$('#header1').css('opacity', 1.0);
			$('#header2').css('opacity', opacity);
		} else if (current == "header1") {
			$('#header1').css('opacity', opacity);
			//$('#header2').css('opacity', opacity);
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
var change = true;
$(document).ready(function() {
	//$("#owl-example").owlCarousel();
	$("#owl-demo").owlCarousel({
		items: 5,
		autoPlay: false, //3000
		navigation: false,
		pagination: false,
		itemsScaleUp: true,
		stopOnHover: false,
		afterMove: function(elem) {
			var next = false;
			if (change) {
				$('#owl-demo .item').each(function() {
					if (next) {
						setImg($(this));
					}
					if ($(this).offset().left < 20 && $(this).offset().left > 0) {
						next = true;
					} else {
						next = false;
					}
				})
			}
		},
		startDragging: function(elem) {
			change = false;
			doOwl = false;
		}
	});
	owl = $("#owl-demo").data('owlCarousel');
	$('#owl-demo .item').on('click', function(event){
		change = false;
		doOwl = false;
		setImg($(this));
	});
});

function owlPlay() {
	if (doOwl) {
		var last = $($('#owl-demo .item')[$('#owl-demo .item').length-1]);		if (last.hasClass("active")) {
			change = false;
			owl.next()
			setImg($($('#owl-demo .item')[0]));
			change = true;
		} else if (window.innerWidth > last.offset().left+20) {
			var next = false;
			var more = true;
			if (change) {
				$('#owl-demo .item').each(function() {
					if (more) {
						if ($(this).hasClass("active")) {
							next = true;
						} else if (next) {
							more = false;
							setImg($(this));
						} else {
							next = false;
						}
					}

				})
			}
			more = true;
		} else {
			owl.next();
		}
	}
}

var doOwl = true;
var headerInterval = setInterval(owlPlay, speed)

var current = "header1";
var select = "header2";
var fade;
parallax()
$("#"+select).fadeTo(0 , 0.0);
function setImg(that) {
	if (current == "header2") {
		select = "header1";
	} else {
		select = "header2";
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

	var scrolled = $(document).scrollTop();
	var opacity = parseFloat(1-scrolled*(1/1000)).toFixed(3);
	//opacity = 1.0
	if (select == "header2") {
		$("#header1").fadeTo("normal" , 0.0);
		fade = $("#header2").fadeTo("normal" , opacity);
		current = "header2";
	} else if (select == "header1") {
		fade = $("#header1").fadeTo("normal" , opacity);
		$("#header2").fadeTo("normal" , 0.0);
		current = "header1";
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