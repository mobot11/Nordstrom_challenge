$( document ).ready(function() {

	var floors = {
		1: "900px",
		2: "600px",
		3: "300px",
		4: "0px"
	}

	var floorPanels = {
		1: "#floorOne",
		2: "#floorTwo",
		3: "#floorThree",
		4: "#floorFour"
	}

  var panel = $("#mainSection");

  var Elevator = function() {
  	this.floors = [1, 2, 3, 4];
  	this.startingFloor = 1; 
  	this.travelTime = 2000; 
  	this.queue = [];
  }
 
	Elevator.prototype.moveElevator = function() {
		var queue = this.queue
	  for (var i = 0; i < queue.length; i ++) {
	  	var el = queue[i];
	  	var scroll = Number(el.html());
	  	var margin = floors[scroll];
	  	var scrollPanel = floorPanels[scroll]
	  	el.addClass("selected");
	    panel.animate({marginTop: margin }, this.travelTime);
	    $("html, body").animate({
	    	scrollTop: $(scrollPanel).offset().top
	    }, 2000);
	    setTimeout(function() {
	    	el.removeClass("selected");

	    }, 2000);
	        $('#floor').html(scroll);
	    if (scroll > this.startingFloor) {
	    	$('#greenButton').addClass("greenShadow")
	    	$("#redButton").removeClass("redShadow");
	    	this.startingFloor = scroll;
	    }
	    if(scroll < this.startingFloor) {
	    	$("#redButton").addClass("redShadow");
	    	$("#greenButton").removeClass("greenShadow");
	    	this.startingFloor = scroll;
	    }
	    queue.splice(el);
	  }
	}

	var elevator = new Elevator();

	$(".numbers").on("click", function() {
	  elevator.queue.push($(this));
	  elevator.moveElevator();
	});

});