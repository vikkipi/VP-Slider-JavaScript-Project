$(document).ready(function(){ 

	var display = $('#display');

	var slider = new VPSlider({
		id  			: 'slider-container',
		handleClass 	: 'handle-class',
		handlePadding 	: 4
	}); 

	slider.onChange(function(value){
		var maxValue = 800
		display.text(Math.round(value * maxValue))
	});

});