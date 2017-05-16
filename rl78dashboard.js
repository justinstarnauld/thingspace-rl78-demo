window.targetThing = "";
$.support.cors = true;

setTimeout(function(){	
	
	var presetThing = freeboard.getDatasourceSettings("RL78 Dev Board").thing_id;
	if (presetThing !=='') {
		window.setThing(presetThing);
	}
	
	$('button#buzzerButton').click(function(e){
		window.sendBuzz();	
	});
	
		
},3000);

window.setThing = function(thingname) {
	window.targetThing = thingname;
}

window.sendBuzz = function() {
	if (window.targetThing == "") {
		freeboard.showDialog($("<div align='center'>Error: Please set thing name!</div>"),"Error!","OK",null,function(){}); 	
		return;	
	}
	dweetio.dweet_for(window.targetThing+'-send', {"beep":true}, function(err, dweet){});
 	freeboard.showLoadingIndicator(true);
	setTimeout(function(){	
		freeboard.showLoadingIndicator(false);
		freeboard.showDialog($("<div align='center'>Buzzer activated on RL78 "+window.targetThing+"</div>"),"Success!","OK",null,function(){}); 
	},750);	
}
