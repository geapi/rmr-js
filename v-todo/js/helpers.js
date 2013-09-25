(function (window) {
	'use strict';

	// Cache the querySelector/All for easier and faster reuse
	window.$ = document.querySelectorAll.bind(document);
	window.$$ = document.querySelector.bind(document);
})(window);
