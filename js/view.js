$(window).scroll(function(e){
  parallax();
});

function parallax(){
  var scrolled = $(window).scrollTop();
  $('#header').css('background-position','center ' + -(scrolled*0.2)+'px');
  $('#header').css('opacity', 1-scrolled*(1/1000));
}

$("#header").css("opacity", 0.0);
$("#header").delay(1000).animate({"opacity": 1.0}, {duration: 2000})

$("#book").click(function() {
	$("#booking_form").slideDown("fast");
})

var active = {"workshop": true,
			  "tour-fixdate": true,
			  "tour-tailor": true};
function filter() {
	for (key in active) {
		if (active[key]) {
			$("#view #cards .column."+key).fadeIn();
		} else {
			$("#view #cards .column."+key).fadeOut();
		}
	}
}
$("#view .sub-nav dd").click(function() {
	if ($(this).attr("class") == "active") {
		$(this).attr("class", "");
	} else {
		$(this).attr("class", "active");
	}
	var id = $(this).attr("id");
	if (id == "workshops_filter") {
		active["workshop"] = !(active["workshop"]);
	} else if(id =="tour_fixdate_filter") {
		active["tour-fixdate"] = !(active["tour-fixdate"]);
	} else if(id = "tour_tailor_filter") {
		active["tour-tailor"] = !(active["tour-tailor"]);
	}
	filter();
})

$("#view_package").hide();
function showPack() {
	var offset = $(currentImg).offset();
	var width = $(currentImg).width();
	var height = $(currentImg).height();
	$("#view_package").show();
	$("#view_package").css("top", offset.top);
	$("#view_package").css("left", offset.left);
	$("#view_package").css("width", width);
	$("#view_package").css("height", height);
	$("#view_package").animate({width: "100%", height: "100%", top: 0, left: 0}, {duration: 500, complete: function() {
		$(window).trigger("resize");
		$(this).css("height", "auto");
	}})
	.css("height", "auto");
	$("#close_pack").click(function() {
		currentImg = undefined;
		$("#overlay").hide();
		$("#overlay_icon").hide();
		$("#view_package").fadeOut("slow", function() {
			$("#view_package").css("width", "0px");
			$("#view_package").css("height", "0px");
		});
		//$("#view_package").animate({width: "0%", height: "0%", top: window.innerHeight/2, left: window.innerWidth/2}, {duration: 500})
	});
}
$("#overlay").click(function() {
	showPack();
})
$("#overlay_icon").click(function() {
	showPack();
})

//Overlay Code//
//Hack: fixes a problem where the first hover doesn't cause a "fade in" but a "show"
$("#overlay").show();
$("#overlay_icon").show();
$("#overlay").hide();
$("#overlay_icon").hide();
function setOverlay(img) {
	var offset = $(img).offset();
	var height = $(img).height();
	var width = $(img).width();

	$("#overlay").finish();
	$("#overlay_icon").finish();
	$("#overlay").fadeIn("fast")
	$("#overlay_icon").fadeIn("fast").delay(1000);

	$("#overlay").css("height", height+"px");
	$("#overlay").css("width", width+"px");
	$("#overlay").offset({ top: offset.top, left: offset.left})
	$("#overlay_icon").offset({ top: offset.top+height/2-66/2, left: offset.left+width/2-55/2})

}
var currentImg;
//var outing = false;
$("#view #cards img").mouseover(function() {
	currentImg = this;
	setOverlay(this);
})
$("#overlay").mouseout(function() {
	var offset = $(this).offset();
	var x1 = offset.left;
	var y1 = offset.top;
	var x2 = x1+$(this).width();
	var y2 = y1+$(this).height();
	var mouse = currentMousePos;

	var boxIn = 40;
	if (mouse.x < x1+boxIn || mouse.x > x2-boxIn || mouse.y < y1+boxIn || mouse.y > y2-boxIn) {
		currentImg = undefined;
		$("#overlay").fadeOut("fast");
		$("#overlay_icon").fadeOut("fast");
	}
})
$("#overlay_icon").hover(function() {
	//
}, function() {
	//
})
$(window).resize(function() {
	if (currentImg != undefined) {
		setOverlay(currentImg);
	}
})
var currentMousePos = { x: -1, y: -1 };
$(document).mousemove(function(event) {
    currentMousePos.x = event.pageX;
    currentMousePos.y = event.pageY;
});