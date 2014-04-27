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
	var offset2 = $("#view").offset();
	var offset3 = $("#footer").offset();
	var headerHeight = $("#colorfade").height()+$("#owl-demo").height();
	var width = $(currentImg).width();
	var height = $(currentImg).height();
	$("#view_package").show();
	$("#view_package").css("top", offset.top);
	$("#view_package").css("left", offset.left);
	$("#view_package").css("width", width);
	$("#view_package").css("height", height);
	$("#view_package").transition({ width: "100%", height:  offset3.top-headerHeight+1, top: offset2.top-1, left: 0, complete: function() {
		hideOverlay(true)
		$(this).css("height", "auto");
		$(this).css("min-height", $("#content").outerHeight()+"px");
		var margin = Math.abs($(this).outerHeight()-$("#content").outerHeight());
		//$("#footer").css("margin-top", margin+"px");
		$("#footer").transition({"margin-top": margin});
		$(window).trigger("resize");
		//$("#view").css("height", $(this).height()-$("#message").height());
	} }, 500);
	$("#view_package ."+pack).show();
	$("#view_package ."+pack).css("opacity", 0.0)
	$("#view_package ."+pack).transition({opacity: 1.0, delay: 400}, 1000);
	/*$("#view_package").animate({width: "100%", height: offset3.top-headerHeight, top: offset2.top, left: 0}, {duration: 700, complete: function() {
		hideOverlay(true)
		$(window).trigger("resize");
		$(this).css("height", "auto");
		$(this).css("min-height", $("#content").outerHeight()+"px");
		var margin = Math.abs($(this).outerHeight()-$("#content").outerHeight());
		$("#footer").css("margin-top", margin+"px");
		//$("#view").css("height", $(this).height()-$("#message").height());
	}});*/
	$('body,html').animate({scrollTop: offset2.top-65}, 700);
	$("#close_pack").click(function() {
		currentImg = undefined;
		$("#view_package").fadeOut("slow", function() {
			$("#view_package").css("min-height", "0px")
			$("#view_package").css("width", "0px");
			$("#view_package").css("height", "0px");
		});
		$("#footer").css("margin-top", "0px");
		//$("#view_package").animate({width: "0%", height: "0%", top: window.innerHeight/2, left: window.innerWidth/2}, {duration: 500})
	});
}
$("#overlay").click(function() {
	$("#view_package .pack").hide();
	//$("#view_package ."+pack).show();
	showPack();
})
$("#overlay_icon").click(function() {
	$("#view_package .pack").hide();
	//$("#view_package ."+pack).show();
	showPack();
})

$("#view_package .tabs dd a").click(function() {
	setFooterMargin();
})

//Overlay Code//
//Hack: fixes a problem where the first hover doesn't cause a "fade in" but a "show"
$("#overlay").show();
$("#overlay_icon").show();
$("#overlay").hide();
$("#overlay_icon").hide();
var pack;
function setOverlay(img) {
	pack = img.className.split(/\s+/)[1];
	var offset = $(img).offset();
	var height = $(img).height();
	var width = $(img).width();

	$("#overlay").finish();
	$("#overlay_icon").finish();
	$("#overlay").fadeIn("fast");
	$("#overlay_icon").fadeIn("fast");

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

function hideOverlay(force) {
	var offset = $("#overlay").offset();
	var x1 = offset.left;
	var y1 = offset.top;
	var x2 = x1+$("#overlay").width();
	var y2 = y1+$("#overlay").height();
	var mouse = currentMousePos;

	var boxIn = 40;
	if (force || mouse.x < x1 || mouse.x > x2 || mouse.y < y1 || mouse.y > y2) {
		currentImg = undefined;
		$("#overlay").fadeOut("fast");
		$("#overlay_icon").fadeOut("fast");
	}
}  

$("#overlay").mouseout(function() {
	hideOverlay()
})
$("#overlay_icon").hover(function() {
	//
}, function() {
	//
})

function setFooterMargin() {
	var offset = $("#view").offset();
	//$("#view_package").css("top", offset.top);
	if ($("#view_package").is(":visible")) {
		setTimeout(function() {
			var margin = Math.abs($("#view_package").outerHeight()-$("#content").outerHeight());
			$("#footer").css("margin-top", margin-1+"px");
		}, 200);
	}
}

$(window).resize(function() {
	if (currentImg != undefined) {
		setOverlay(currentImg);
	}
	setFooterMargin();
})
var currentMousePos = { x: -1, y: -1 };
$(document).mousemove(function(event) {
    currentMousePos.x = event.pageX;
    currentMousePos.y = event.pageY;

	if ($("#overlay").is(":visible")) {
		hideOverlay()
	}
});