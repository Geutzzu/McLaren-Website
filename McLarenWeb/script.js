const menuToggle = document.querySelector('.toggle');
const body = document.querySelector('body');
const hamburgerMenu = document.querySelector('.hamburger-menu');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  body.classList.toggle('active');
  hamburgerMenu.classList.toggle('active');
})

var mediaQuery = window.matchMedia("(min-width: 768px)");
mediaQuery.addListener(function () {
    if (mediaQuery.matches) {
        body.classList.remove('active');
        hamburgerMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});