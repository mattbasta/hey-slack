let canvas = document.querySelector('.slide-love-your-work canvas');
let ctx = canvas.getContext('2d');


function getImage(src) {
    var img = new Image();
    img.src = src;
    return img;
}

let images = [
    {
        img: getImage('img/idle2.png'),
        width: 64,
        height: 125,
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 0, 0, 0],
    },
    {
        img: getImage('img/happy.png'),
        width: 74,
        height: 123,
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 12, 11, 10, 11, 12, 13, 12, 11, 10, 11, 12, 13, 12, 11, 10, 11, 12, 13, 12, 11, 10, 11, 12, 13, 12, 11, 10, 11, 12, 13, 12, 11, 10, 11, 12, 13, 12, 11, 10, 11, 12, 13, 12, 11, 10, 11, 12, 13, 14, 15, 16, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, 19, 20, 0],
    },
];
let currentImg = 0;

let startTick = Date.now();
let frameDuration = 1000 / 30;
let shouldDoHappy = false;
let pauseTimeout = null;
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
            pauseTimeout = setTimeout(() => {
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
    ctx.drawImage(
        img.img,
        img.frames[frame] * img.width,
        0,
        img.width,
        img.height,
        canvas.width / 2 - img.width / 2,
        canvas.height / 2 - img.height / 2,
        img.width,
        img.height
    );

    requestAnimationFrame(render);
}

function giggle() {
    shouldDoHappy = true;
    clearTimeout(pauseTimeout);
    render();
}
canvas.addEventListener('click', giggle);
canvas.addEventListener('touchend', giggle);

Promise.all(images.map(i => new Promise(r => (i.img.onload = r)))).then(render);
