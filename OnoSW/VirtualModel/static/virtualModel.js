var knobx = 0.5;
var knoby = 0.5;
var r_factor = 0.4;
var w;
var dof1 = 0;



function resizeCanvas(){
	w = $("#virtualModel").width();

	$("#virtualModel").attr("width", w);
	$("#virtualModel").attr("height", w);

	updateVirtualModel();
}

$.jCanvas.extend({
name: 'drawMouth',
type: 'mouth',
props: {},
fn: function(ctx, params) {
	// Just to keep our lines short
	var p = params;
	// Enable layer transformations like scale and rotate
	$.jCanvas.transformShape(this, ctx, p);
	// Draw mouth
	ctx.beginPath();
    ctx.moveTo(p.x-8*p.size, p.y+(3*p.size*p.rightCorner));
    ctx.bezierCurveTo(
	  p.x-8*p.size, p.y+(3*p.size*p.rightCorner)-1*p.size,
      p.x-4*p.size, p.y,
      p.x, p.y
      );
      ctx.bezierCurveTo(
      p.x+4*p.size, p.y,
      p.x+8*p.size, p.y+(3*p.size*p.leftCorner)-1*p.size,
      p.x+8*p.size, p.y+(3*p.size*p.leftCorner)
    );
    ctx.bezierCurveTo(
      p.x+8*p.size, p.y+(3*p.size*p.leftCorner)+1*p.size,
      p.x+4*p.size, p.y+(7*p.size*p.mouthOpen),
      p.x, p.y+(7*p.size*p.mouthOpen)
    );
    ctx.bezierCurveTo(
      p.x-4*p.size, p.y+(7*p.size*p.mouthOpen),
      p.x-8*p.size, p.y+(3*p.size*p.rightCorner)+1*p.size,
      p.x-8*p.size, p.y+(3*p.size*p.rightCorner)
    );
	ctx.closePath();
	// Call the detectEvents() function to enable jCanvas events
	// Be sure to pass it these arguments, too!
	$.jCanvas.detectEvents(this, ctx, p);
	// Call the closePath() functions to fill, stroke, and close the path
	// This function also enables masking support and events
	// It accepts the same arguments as detectEvents()
	$.jCanvas.closePath(this, ctx, p);
}
});

$.jCanvas.extend({
name: 'drawEyeLid',
type: 'eyeLid',
props: {},
fn: function(ctx, params) {
	// Just to keep our lines short
	var p = params;
	// Enable layer transformations like scale and rotate
	$.jCanvas.transformShape(this, ctx, p);
	// Draw mouth
	ctx.beginPath();
    ctx.moveTo(p.x-4*p.size, p.y+p.size);
    ctx.bezierCurveTo(
	  	p.x-4*p.size, p.y,
      p.x-2*p.size, p.y,
      p.x, p.y
      );
      ctx.bezierCurveTo(
      p.x+2*p.size, p.y,
      p.x+4*p.size, p.y,
      p.x+4*p.size, p.y+p.size
    );
    ctx.bezierCurveTo(
      p.x+4*p.size, p.y+p.size,
      p.x+4*p.size, p.y+2*p.size,
      p.x+4*p.size, p.y+2*p.size
    );
		ctx.bezierCurveTo(
      p.x+4*p.size, p.y+5*p.size,
      p.x+3*p.size, p.y+4*p.size+3.5*p.size*p.eyeLidOpen,
      p.x, p.y+4*p.size+3.5*p.size*p.eyeLidOpen
    );
		ctx.bezierCurveTo(
      p.x-3*p.size, p.y+4*p.size+3.5*p.size*p.eyeLidOpen,
      p.x-4*p.size, p.y+5*p.size,
      p.x-4*p.size, p.y+2*p.size
    );
		ctx.bezierCurveTo(
      p.x-4*p.size, p.y+2*p.size,
      p.x-4*p.size, p.y+p.size,
      p.x-4*p.size, p.y+p.size
    );
	ctx.closePath();
	// Call the detectEvents() function to enable jCanvas events
	// Be sure to pass it these arguments, too!
	$.jCanvas.detectEvents(this, ctx, p);
	// Call the closePath() functions to fill, stroke, and close the path
	// This function also enables masking support and events
	// It accepts the same arguments as detectEvents()
	$.jCanvas.closePath(this, ctx, p);
}
});

$.jCanvas.extend({
name: 'drawEyeBrow',
type: 'eyeBrow',
props: {},
fn: function(ctx, params) {
	// Just to keep our lines short
	var p = params;
	// Enable layer transformations like scale and rotate
	$.jCanvas.transformShape(this, ctx, p);
	// Draw mouth
	ctx.beginPath();
    ctx.moveTo(p.x-2*p.size, p.y-p.size);
    ctx.bezierCurveTo(
	  	p.x-p.size, p.y-p.size,
      p.x+4*p.size, p.y-p.size,
      p.x+4*p.size, p.y
      );
      ctx.bezierCurveTo(
      p.x+4*p.size, p.y+p.size,
      p.x-p.size, p.y+p.size,
      p.x-2*p.size, p.y+p.size
    );
    ctx.bezierCurveTo(
      p.x-3*p.size, p.y+p.size,
      p.x-4*p.size, p.y+p.size,
      p.x-4*p.size, p.y
    );
		ctx.bezierCurveTo(
      p.x-4*p.size, p.y-p.size,
      p.x-3*p.size, p.y-p.size,
      p.x-2*p.size, p.y-p.size
    );
	ctx.closePath();
	// Call the detectEvents() function to enable jCanvas events
	// Be sure to pass it these arguments, too!
	$.jCanvas.detectEvents(this, ctx, p);
	// Call the closePath() functions to fill, stroke, and close the path
	// This function also enables masking support and events
	// It accepts the same arguments as detectEvents()
	$.jCanvas.closePath(this, ctx, p);
}
});

function setupVirtualModel(){

	$("[data-slider]").on("change.fndtn.slider", function(){
		if( $(this).attr("data-slider") != $(this).data("lastpos") ){
			var dofpos = $(this).attr("data-slider");
			var dofmin = $(this).data("dofmin");
			var dofmid = $(this).data("dofmid");
			var dofmax = $(this).data("dofmax");
			var dofus = dofmid;

			$(this).closest(".sliderrow").find("[data-dof]").html(numeral(dofpos/100).format("+0.00"));

			if(dofpos < 0){
				dofus += (-dofpos / 100) * dofmin
			}else if(dofpos > 0){
				dofus += (dofpos / 100) * dofmax
			}
			$(this).closest(".sliderrow").find("[data-us]").html(numeral(dofus).format("0"));


			$(this).data("lastpos", dofpos);
			$("#dof1").html(numeral(dofpos/100).format("+0.00"));
			dof1 = dofpos/100;
			updateVirtualModel();
		}
	});


	$("#virtualModel")
	.drawImage({
		layer: true,
		name: "bg",
		source: "VirtualModel/static/Ono_empty_face.svg",
		x: 0, y: 0,
		width: w,
		height: w,
		fromCenter: false,
	})
	.drawMouth({
  layer: true,
	name:"mouthlayer",
	strokeStyle: '#c00',
	strokeWidth: 4,
  fillStyle: '#000000',
  size: w/60,
	mouthOpen: 1,
  x: w/2, y: w*0.375,
  leftCorner:0,
	rightCorner:0
	})
//right eye
	.drawEllipse({
	layer:true,
	name:"rightEyePupil",
  fillStyle: '#000000',
  x: w*0.405, y: w*0.25,
  width: w/30, height: w/30
	})
	.drawEllipse({
	layer:true,
	name:"rightEyePupil",
  fillStyle: '#ffffff',
  x: w*0.404, y: w*0.248,
  width: w/60, height: w/60
	})
	.drawEyeLid({
  layer: true,
	name:"rightEyeLidlayer",
  fillStyle: '#FFD63D',
  size: w/65,
	x: w*0.405, y: w*0.2,
	eyeLidOpen:0
	})
	.drawEyeBrow({
  layer: true,
	name:"rightEyeBrowlayer",
  fillStyle: '#000000',
  size: w/65,
	x: w*0.405, y: w*0.16,
	rotate:180
	})
//left eye
	.drawEllipse({
	layer:true,
	name:"leftEyePupil",
  fillStyle: '#000000',
  x: w*0.605, y: w*0.25,
  width: w/30, height: w/30
	})
	.drawEyeLid({
  layer: true,
	name:"leftEyeLidlayer",
  fillStyle: '#FFD63D',
  size: w/65,
	x: w*0.605, y: w*0.2,
	eyeLidOpen:0
	})
	.drawEyeBrow({
  layer: true,
	name:"leftEyeBrowlayer",
  fillStyle: '#000000',
  size: w/65,
	x: w*0.605, y: w*0.16,
	rotate:0
	})

}

function updateVirtualModel(){
	$("#virtualModel")
	.setLayer("bg", {
		width: w,
		height: w
	})
	.setLayer("mouthlayer", {
  x: w/2, y: w*0.375,
	size: w/60,
	mouthOpen:1,
	leftCorner: 0,
	rightCorner: 0
	})
	.setLayer("rightEyePupil", {
		x: w*0.405, y: w*0.25,
		width: w/30, height: w/30
	})
	.setLayer("rightEyeLidlayer", {
		size: w/65,
		x: w*0.405, y: w*0.2,
		eyeLidOpen: dof1
	})
	.setLayer("leftEyePupil", {
		x: w*0.605, y: w*0.25,
		width: w/30, height: w/30
	})
	.setLayer("leftEyeLidlayer", {
		size: w/65,
		x: w*0.605, y: w*0.2,
		eyeLidOpen: dof1
	})
	.drawLayers();
}




function addError(msg){
	$("#errors").append("<div data-alert class=\"alert-box alert\">" + msg + "<a href=\"#\" class=\"close\">&times;</a></div>");
	$(document).foundation("alert", "reflow");
}

$(document).ready(function(){
	$(window).resize(resizeCanvas);

	w = $("#virtualModel").width();
	$("#virtualModel").attr("width", w);
	$("#virtualModel").attr("height", w);

	setupVirtualModel();

	$("#virtualModel").drawLayers();

	$("#btnEnable").click(function(){
		$.ajax({
			dataType: "json",
			url: "servos/enable",
			success: function(data){
				if(data.status == "error"){
					addError(data.message);
				}
			}
		});
	});
	$("#btnDisable").click(function(){
		$.ajax({
			dataType: "json",
			url: "servos/disable",
			success: function(data){
				if(data.status == "error"){
					addError(data.message);
				}
			}
		});
	});
});
