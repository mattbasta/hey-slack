const dotCount = window.innerWidth > 500 ? 60 : 20;
const depthCount = 5;

let slide = document.querySelector('.slide-hey-slack');

const smallestSide = Math.min(window.innerWidth, window.innerHeight);
const maxDotSize = smallestSide * 0.03;
const minDotSize = smallestSide * 0.0005;

class Dot {
    constructor() {
        this.x = Math.random() * (window.innerWidth / 3) - window.innerWidth / 6;
        this.y = Math.random() * (window.innerWidth / 3) - window.innerWidth / 6;
        this.age = 0;
        this.depth = Math.random() * depthCount | 0;
        this.radius = Math.random() * maxDotSize + minDotSize | 0;
        this.color = 'hsl(' + (Math.random() * 255) + ', 80%, 70%)';
        this.direction = Math.random() * 2 * Math.PI;
        this.energy = 1;

        var elem = document.createElement('i');
        elem.className = 'dot';
        elem.style.filter = elem.style.webkitFilter = 'blur(' + (this.depth * 1.5) + 'px)';
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

    tick(delta, ratio) {
        this.age += delta / 1000;
        this.energy = 1 / this.age + 0.25;

        this.x += Math.cos(this.direction) * this.energy;
        this.y += Math.sin(this.direction) * this.energy;
        this.direction += (Math.random() * 2 - 1) * ratio / 20;

        this.setPosition(this.x, this.y);
    }

    setPosition(x, y) {
        var isVisible = x + this.radius > window.innerWidth / 2 ||
            y + this.radius > window.innerHeight / 2 ||
            x - this.radius < window.innerWidth / 2 ||
            y - this.radius < window.innerHeight / 2;
        var newDisplay = isVisible ? 'block' : 'none';
        if (isVisible || newDisplay !== this.elem.style.display) {
            this.elem.style.transform = 'translate(' + (x - this.radius | 0) + 'px, ' + (y - this.radius | 0) + 'px)';
        }
        this.elem.style.display = newDisplay;
    }
}


let dots = [];
for (var i = 0; i < dotCount; i++) {
    dots.push(new Dot());
}

let lastTick = Date.now();
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
