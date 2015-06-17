let elem = document.querySelector('.slide-contact .message strong');

setInterval(() => {
    var now = new Date();
    var min = now.getMinutes().toString();
    if (min.length === 1) min = '0' + min;
    elem.setAttribute(
        'data-timestamp',
        (now.getHours() % 12 || 12) + ':' + min + ' ' + (now.getHours() > 12 ? 'PM' : 'AM')
    );
}, 1000);

document.querySelector('.slide-contact textarea').addEventListener('input', (e) => {
    e.target.className = e.target.value ? 'filled' : 'empty';
    e.target.style.height = (e.target.value.split(/\n/).length - 1) * 19 + 42 + 'px';
});
document.querySelector('.slide-contact textarea').addEventListener('keydown', (e) => {
    if (e.keyCode !== 13) return;
    if (e.shiftKey) return;
    e.preventDefault();
    window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent('@mattbasta ' + e.target.value));
});
