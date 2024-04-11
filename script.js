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

function animateNumber(finalNumber, duration = 3000, startNumber = 0, id) {
  let currentNumber = startNumber
  const stepTime = Math.abs(Math.floor(duration / (finalNumber - startNumber)));

  const obj = document.getElementById(id);
  const timer = setInterval(function() {
      currentNumber++;
      obj.innerHTML = currentNumber;
      if (currentNumber == finalNumber) {
          clearInterval(timer);
      }
  }, stepTime);
}

animateNumber(12, 1500, 0, 'number-1');
animateNumber(8, 1500, 0, 'number-2');
animateNumber(183, 1500, 0, 'number-3');
animateNumber(504, 1500, 0, 'number-4');


function handleIntersection(entries, observer) {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
      }
  });
}


const observer = new IntersectionObserver(handleIntersection);

const numbers = document.querySelectorAll('#number-1, #number-2, #number-3, #number-4');
numbers.forEach(number => observer.observe(number));