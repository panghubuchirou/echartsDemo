{
    window.onresize = getRem;
    getRem();

    function getRem() {
        let html = document.documentElement;
        let width = html.clientWidth;
        if (width <= 1200) {
            width = 1200;
        }
        if (width >= 1920) {
            width = 1920;
        }
        let rem = width / 80;
        html.style.fontSize = rem + 'px';
    }
}