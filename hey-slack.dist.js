/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	__webpack_require__(2);

	__webpack_require__(3);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var dotCount = window.innerWidth > 500 ? 60 : 20;
	var depthCount = 5;

	var slide = document.querySelector('.slide-hey-slack');

	var smallestSide = Math.min(window.innerWidth, window.innerHeight);
	var maxDotSize = smallestSide * 0.03;
	var minDotSize = smallestSide * 0.0005;

	var Dot = (function () {
	    function Dot() {
	        _classCallCheck(this, Dot);

	        this.x = Math.random() * (window.innerWidth / 3) - window.innerWidth / 6;
	        this.y = Math.random() * (window.innerWidth / 3) - window.innerWidth / 6;
	        this.age = 0;
	        this.depth = Math.random() * depthCount | 0;
	        this.radius = Math.random() * maxDotSize + minDotSize | 0;
	        this.color = 'hsl(' + Math.random() * 255 + ', 80%, 70%)';
	        this.direction = Math.random() * 2 * Math.PI;
	        this.energy = 1;

	        var elem = document.createElement('i');
	        elem.className = 'dot';
	        elem.style.filter = elem.style.webkitFilter = 'blur(' + this.depth * 1.5 + 'px)';
	        elem.style.opacity = 1 / (this.depth + 1);
	        elem.style.backgroundColor = this.color;
	        elem.style.height = this.radius * 2 + 'px';
	        elem.style.width = this.radius * 2 + 'px';
	        elem.style.left = (window.innerWidth / 2 - this.radius + this.x | 0) + 'px';
	        elem.style.top = (window.innerHeight / 2 - this.radius + this.y | 0) + 'px';
	        elem.style.zIndex = depthCount - this.depth;
	        this.elem = elem;
	        slide.appendChild(elem);
	    }

	    _createClass(Dot, [{
	        key: 'tick',
	        value: function tick(delta, ratio) {
	            this.age += delta / 1000;
	            this.energy = 1 / this.age + 0.25;

	            this.x += Math.cos(this.direction) * this.energy;
	            this.y += Math.sin(this.direction) * this.energy;
	            this.direction += (Math.random() * 2 - 1) * ratio / 20;

	            this.setPosition(this.x, this.y);
	        }
	    }, {
	        key: 'setPosition',
	        value: function setPosition(x, y) {
	            var isVisible = x + this.radius > window.innerWidth / 2 || y + this.radius > window.innerHeight / 2 || x - this.radius < window.innerWidth / 2 || y - this.radius < window.innerHeight / 2;
	            var newDisplay = isVisible ? 'block' : 'none';
	            if (isVisible || newDisplay !== this.elem.style.display) {
	                this.elem.style.transform = 'translate(' + (x - this.radius | 0) + 'px, ' + (y - this.radius | 0) + 'px)';
	            }
	            this.elem.style.display = newDisplay;
	        }
	    }]);

	    return Dot;
	})();

	var dots = [];
	for (var i = 0; i < dotCount; i++) {
	    dots.push(new Dot());
	}

	var lastTick = Date.now();
	function render() {
	    if (window.scrollY > window.innerHeight) {
	        requestAnimationFrame(render);
	        return;
	    }

	    var now = Date.now();
	    var delta = now - lastTick;
	    var ratio = delta / (1000 / 60);
	    lastTick = now;

	    for (i = 0; i < dotCount; i++) {
	        dots[i].tick(delta, ratio);
	    }

	    requestAnimationFrame(render);
	}

	requestAnimationFrame(render);

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var canvas = document.querySelector('.slide-love-your-work canvas');
	var ctx = canvas.getContext('2d');

	function getImage(src) {
	    var img = new Image();
	    img.src = src;
	    return img;
	}

	var images = [{
	    img: getImage('img/idle2.png'),
	    width: 64,
	    height: 125,
	    frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 0, 0, 0]
	}, {
	    img: getImage('img/happy.png'),
	    width: 74,
	    height: 123,
	    frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 12, 11, 10, 11, 12, 13, 12, 11, 10, 11, 12, 13, 12, 11, 10, 11, 12, 13, 12, 11, 10, 11, 12, 13, 12, 11, 10, 11, 12, 13, 12, 11, 10, 11, 12, 13, 12, 11, 10, 11, 12, 13, 12, 11, 10, 11, 12, 13, 14, 15, 16, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, 19, 20, 0]
	}];
	var currentImg = 0;

	var startTick = Date.now();
	var frameDuration = 1000 / 30;
	var shouldDoHappy = false;
	var pauseTimeout = null;
	function render() {
	    var now = Date.now();

	    var frame = (now - startTick) / frameDuration | 0;
	    var img = images[currentImg];

	    if (frame >= img.frames.length) {
	        if (shouldDoHappy) {
	            shouldDoHappy = false;
	            frame = 0;
	            startTick = now;
	            currentImg = 1;
	        } else {
	            pauseTimeout = setTimeout(function () {
	                frame = 0;
	                currentImg = 0;
	                pauseTimeout = null;
	                startTick = Date.now();
	                render();
	            }, 2000);
	            return;
	        }
	    }

	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	    ctx.drawImage(img.img, img.frames[frame] * img.width, 0, img.width, img.height, canvas.width / 2 - img.width / 2, canvas.height / 2 - img.height / 2, img.width, img.height);

	    requestAnimationFrame(render);
	}

	function giggle() {
	    shouldDoHappy = true;
	    clearTimeout(pauseTimeout);
	    render();
	}
	canvas.addEventListener('click', giggle);
	canvas.addEventListener('touchend', giggle);

	Promise.all(images.map(function (i) {
	    return new Promise(function (r) {
	        return i.img.onload = r;
	    });
	})).then(render);

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	var elem = document.querySelector('.slide-contact .message strong');

	setInterval(function () {
	    var now = new Date();
	    var min = now.getMinutes().toString();
	    if (min.length === 1) min = '0' + min;
	    elem.setAttribute('data-timestamp', (now.getHours() % 12 || 12) + ':' + min + ' ' + (now.getHours() > 12 ? 'PM' : 'AM'));
	}, 1000);

	document.querySelector('.slide-contact textarea').addEventListener('input', function (e) {
	    e.target.className = e.target.value ? 'filled' : 'empty';
	    e.target.style.height = (e.target.value.split(/\n/).length - 1) * 19 + 42 + 'px';
	});
	document.querySelector('.slide-contact textarea').addEventListener('keydown', function (e) {
	    if (e.keyCode !== 13) return;
	    if (e.shiftKey) return;
	    e.preventDefault();
	    window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent('@mattbasta ' + e.target.value));
	});

/***/ }
/******/ ]);