"use strict";

require("../css/app.scss");
const $ = require("jquery");
require("bootstrap");
require('../modules/bread-joke/bread-joke');



$(function() {
	/**
    * Smooth scrolling to page anchor on click
    **/
	$("a[href*='#']:not([href='#'])").click(function() {
		if (
			location.hostname == this.hostname
            && this.pathname.replace(/^\//,"") == location.pathname.replace(/^\//,"")
		) {
			let anchor = $(this.hash);
			anchor = anchor.length ? anchor : $(`[name=${  this.hash.slice(1) }]`);
			if ( anchor.length ) {
				$("html, body").animate( { scrollTop: anchor.offset().top }, 1500);
			}
		}
	});
});
