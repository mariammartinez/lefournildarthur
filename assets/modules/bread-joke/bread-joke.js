"use strict";

/**
 * @var {jquery} $
 */

require('./bread-joke.scss');

$(function(){

	let body = $('body');

	// ***** params
	// temps entre chaque apparition
	let minWait = 2000;
	let maxWait = 10000;

	// taille image
	let minWidth = 75;
	let maxWidth = 250;

	// durée spin
	let minSpinDuration = 1500;
	let maxSpinDuration = 6000;

	// durée translation
	let minTranslationDuration = 5000;
	let maxTranslationDuration = 15000;

	// ***** fin params

	const elFooter = $('footer');




	function getRnd(min, max) {
		return min + Math.floor(Math.random() * Math.floor(max-min+1));
	}

	// 0: top, 1: right, 2: bottom, 3: left
	function getRndPosition(el, fromSide) {
		let side = getRnd(0,3);
		while(side === fromSide){
			side = getRnd(0,3);
		}
		let x = 0;
		let y = 0;
		if(side === 0){
			x = getRnd(0-el.width(),body.width());
			y = 0-el.height()*2;
		}else if(side === 2){
			x = body.width();
			y = getRnd(0-el.height(), body.height());
		}else if(side === 3){
			x = getRnd(0-el.width(),body.width());
			y = body.height();
		}else{
			x = 0-el.width()*2;
			y = getRnd(0-el.height(), body.height());
		}
		return {side: side,x: x, y: y};
	}

	function startJoke() {
		let width = getRnd(minWidth, maxWidth);
		let spin = getRnd(minSpinDuration, maxSpinDuration);
		let spinDirection = getRnd(0, 1);

		// on créé l'image
		let el = $('<img />');
		el.addClass(spinDirection === 0 ? 'joke' : 'joke2');
		el.attr('src', '/img/pan.png');
		el.css('width', width);
		el.css('animation-duration', spin);
		elFooter.append(el);
		let positionFrom = getRndPosition(el);
		el.css('left', `${positionFrom.x}px`);
		el.css('top', `${positionFrom.y}px`);

		// on créé l'animation
		let positionTo = getRndPosition(el, positionFrom.side);
		let duration = getRnd(minTranslationDuration,maxTranslationDuration);
		el.animate({
			left: `${positionTo.x}px`,
			top: `${positionTo.y}px`,
		}, duration, 'linear', function() {
			el.remove();
		});

		// récursion
		setTimeout(() => {
			startJoke();
		}, getRnd(minWait, maxWait));
	}

	// first
	setTimeout(() => {
		startJoke();
	}, getRnd(minWait, maxWait));

});
