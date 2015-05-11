/*********************************

 * VP Slider
 * Code by Viktoriia Pshenychko
 * http://www.vizhually.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2015

*********************************/

function VPSlider (hash) {
    this.id 				= hash.id;
    this.handleClass 		= hash.handleClass 		? hash.handleClass 		: 'vp-slider-handle' 
    this.handlePadding 		= hash.handlePadding 	? hash.handlePadding 	: 0
    this.value 				= 0;
    this.startLeft 			= this.handlePadding;
    this.mousedown 			= false;
    this.changeFunctions 	= [];

    setupSlider.apply(this)
    bindEvents.apply(this)
}

function setupSlider() {

	this.container 	= $('#' + this.id)
	this.handle 	= $('<div>')

	var handleHeight 	= this.container.height() - ( 2 * this.handlePadding );
	var handleWidth 	= handleHeight;
	var handleTop 		= this.handlePadding;

	this.handle.css({
		'position'			: 'absolute',
		'height'			: handleHeight,
		'width'				: handleWidth,
		'top'				: handleTop,
		'left'				: this.startLeft,
		'cursor'			: 'pointer'
	});

	this.handle.addClass(this.handleClass);
	this.container.append(this.handle);

	this.minLeft = this.handlePadding;
	this.maxLeft = this.container.width() - this.handle.width() - ( 2 * this.handlePadding ) + this.minLeft;
}

function bindEvents() {
	this.handle.bind('mousedown', function(evt){
		this.mousedown = true;
		this.startX = evt.pageX;
	}.bind(this) );

	var win = $(window)

	win.bind('mousemove', function(evt){
		if ( this.mousedown ) {

			evt.preventDefault();
			evt.stopPropagation();

			var currentX	= evt.pageX;
			var changeX 	= currentX - this.startX;

			var newLeft = this.startLeft + changeX;

			if ( newLeft < this.minLeft) newLeft = this.minLeft
			if ( newLeft > this.maxLeft) newLeft = this.maxLeft

			this.value = ( newLeft - this.minLeft) / (this.maxLeft - this.minLeft);

			for (var i = 0; i < this.changeFunctions.length; i++) {
				var changeFunction = this.changeFunctions[i]
				changeFunction(this.value);
			};

			this.handle.css({
				'left' : newLeft
			});
		}
	}.bind(this) );

	win.bind('mouseup', function(evt){

		this.mousedown 	= false;

		var currentX 	= evt.pageX;
		var changeX 	= currentX - this.startX;

		var newLeft 	= this.startLeft + changeX;

		if ( newLeft < this.minLeft) newLeft = this.minLeft
		if ( newLeft > this.maxLeft) newLeft = this.maxLeft

		this.startLeft = newLeft;
	}.bind(this) );
}

VPSlider.prototype.getValue = function() {
    return this.value;
};

VPSlider.prototype.onChange = function(changeFunction) {
	this.changeFunctions.push(changeFunction)
}
