const menuBtn = document.querySelector('.menu-container');
const nav = document.querySelector('.nav');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
    if (!menuOpen) {
        menuBtn.classList.add('open');
        nav.style.display = 'block';
        menuOpen = true;
        return;
    }
    menuBtn.classList.remove('open');
    nav.style.display = 'none';
    nav.style.transform = 'translateX(0)';
    menuOpen = false;
});

window.addEventListener('resize', () => {
    if (window.matchMedia("(min-width: 991px)").matches) {
        menuBtn.classList.remove('open');
        menuOpen = false;
        nav.style.display = 'block';
    } else {
        nav.style.display = 'none';
        menuBtn.classList.remove('open');
        menuOpen = false;
    }
})



