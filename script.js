



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
  const stepTime = Math.abs(Math.floor(duration / (finalNumber - startNumber))); /// takes longer for bigger numbers

  const obj = document.getElementById(id);
  if (!obj) {
    console.log(`Element with id "${id}" not found`);
    return;
  }
  const timer = setInterval(function() { /// another setInterval
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

/// pentru animatia de la numere
function handleIntersection(entries, observer) { /// entries is an array of all the elements that are being observed
  /// observer takes care of the intersection between the viewport and the element
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('in-view'); /// we add this class if the element is in view
          observer.unobserve(entry.target); /// we stop observing the element
      }
  });
}


const observer = new IntersectionObserver(handleIntersection); /// api for observing elements

const numbers = document.querySelectorAll('#number-1, #number-2, #number-3, #number-4');
numbers.forEach(number => observer.observe(number)); /// we observe each number


/// parte 2 proiect - pagina extra


/// ca sa ne bage pe bagina corecta daca suntem logati
document.addEventListener('DOMContentLoaded', function() {
  // Get the current URL path
  var path = window.location.pathname;


  var page = path.split("/").pop();


  if (page === "extra.html") {
    if (!localStorage.getItem("username")) {
        window.location.href = "loginMenu.html";
        console.log("nu esti logat");

    }
  }
});





/// ca sa iesim de pe bagina de extras cand dam logout
var logoutButton = document.getElementById("logout-button");
if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("username");
        window.location.href = "index.html";
    });
}



// pentru validarea parolei
function validatePassword() {
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const errorMessage = document.getElementById('error-message');

  if (password !== confirmPassword) {
      errorMessage.textContent = 'Passwords do not match.';
      return false;
  } else {
      errorMessage.textContent = '';
      return true;
  }
}



/// joc

let canvas = document.getElementById('game-canvas');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
let ctx = canvas.getContext('2d');
let username = localStorage.getItem('username');

let gameIsFinished = false;

let score = 0;
let bestScore = localStorage.getItem('bestScore') || 0;



let reactionTimeElement = document.getElementById('reaction-time');
let bestReactionTimeElement = document.getElementById('best-reaction-time');
let timerElement = document.getElementById('timer');

bestReactionTimeElement.textContent = `${bestScore} points`;

let squares = [];
let gameDuration = 60000; // 60 seconds
let gameEndTime = Date.now() + gameDuration;

function createScoreElement(username, score, timeElapsed) {
  let scoreElement = document.createElement('div');

  scoreElement.textContent = `User ${username} has obtained a score of ${score} in ${timeElapsed} seconds !` ;

  let scoresElement = document.getElementById('scores-achieved');
  if (scoresElement) {
    scoresElement.appendChild(scoreElement);
  } else {
    console.log("Element with id 'scores' not found");
  }
}


function createSquare() {
  let size, x, y, overlap;
  do {
      size = Math.random() * 50 + 50;
      x = Math.random() * (canvas.width - size);
      y = Math.random() * (canvas.height - size);
      overlap = squares.some(square => {
          let dx = x - square.x;
          let dy = y - square.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          return distance < (size + square.size) / 2;
      });
  } while (overlap);
  squares.push({ x, y, size });
}

function update() {
    // Check if game time has ended
    if (Date.now() > gameEndTime || timerElement.textContent === '60') {
        // Game over, save best score
        if (score > bestScore) {
            bestScore = score;
            localStorage.setItem('bestScore', bestScore);
        }
        reactionTimeElement.textContent = `${score}`;
        bestReactionTimeElement.textContent = `${bestScore}`;
        squares = [];

        if(!gameIsFinished){
          createScoreElement(username, score, 60 - timerElement.textContent);
        }


        gameIsFinished = true;



        return;
    }

    // Update scores
    reactionTimeElement.textContent = `${score}`;
    bestReactionTimeElement.textContent = `${bestScore}`;

    // Check if any squares are out of bounds
    for (let i = squares.length - 1; i >= 0; i--) {
      let square = squares[i];
      if (square.x + square.size < 0 || square.x > canvas.width || square.y + square.size < 0 || square.y > canvas.height) {
          // Square is out of bounds, remove it
          squares.splice(i, 1);
          setTimeout(createSquare, 100);
      }
    }

    timerElement.textContent = `${((gameEndTime - Date.now()) / 1000).toFixed(1)}`;
}

function render() {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Square render
    for (let square of squares) {
        ctx.fillStyle = '#FF8700';
        ctx.fillRect(square.x, square.y, square.size, square.size);
    }
}

function gameLoop() {
    update();
    render();
    if (Date.now() <= gameEndTime) {
        requestAnimationFrame(gameLoop);
    }
}

canvas.addEventListener('mousedown', function(e) {
  let rect = canvas.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;

  // Check if a square was clicked
  for (let i = 0; i < squares.length; i++) {
      let square = squares[i];
      if (x >= square.x && x <= square.x + square.size && y >= square.y && y <= square.y + square.size) {
          // point scored
          score++;
          squares.splice(i, 1);
          setTimeout(createSquare, 100);
          break;
      }
  }
});

function startGame() {
  // Reset score
  score = 0;

  // Reset squares
  squares = [];

  timerElement.textContent = `59.9`;

  // Reset game end time
  gameEndTime = Date.now() + gameDuration;

  // Create initial squares
  createSquare();
  createSquare();
  createSquare();
  createSquare();
  createSquare();
  createSquare();

  gameIsFinished = false;

  // Start game loop
  gameLoop();
}

function resetGame() {
  /// update stats
  if(!gameIsFinished){
    createScoreElement(username, score, (60 - timerElement.textContent).toFixed(1));
  }

  // Reset score
  score = 0;

  // Reset squares
  squares = [];

  // Update scores


  gameIsFinished = true;
  


  timerElement.textContent = `60`;
  reactionTimeElement.textContent = `${score}`;
  bestReactionTimeElement.textContent = `${bestScore} `;

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/// starting the game and resetting it from the buttons
let startGameButton = document.getElementById('start-game');
let resetGameButton = document.getElementById('reset-game');




startGameButton.addEventListener('click', startGame);
resetGameButton.addEventListener('click', resetGame);

window.addEventListener('resize', function() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});


/// code for stop propogation

// Array of colors to cycle through
const colors = ['white', 'lightgray', 'darkgray', 'gray'];

// Current color index
let colorIndex = 0;

// Function to change the background color
function changeBackgroundColor() {
    document.body.style.backgroundColor = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length; // Move to the next color, loop back to the start if necessary
}

// Add event listener to the document
document.addEventListener('click', changeBackgroundColor);

// Add event listeners to the canvas and buttons to stop propagation
canvas.addEventListener('click', function(event) {
    event.stopPropagation();
});

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});