const battlefield = document.querySelector('.battlefield');
const scoreDisplay = document.querySelector('.scoreDisplay');
let currentShooterIndex = 202;
let width = 15;
let direction = 1;
let invadersId;
let goingRight = true;
let aliensRemoved = [];
let score = 0;
const gameTheme = new Audio("../audio/spaceinvaders1.wav");
const laserSound = new Audio("../audio/shoot.wav");
const boomSound = new Audio("../audio/boom.wav");
const gameOver = new Audio("../audio/game-over.wav");
const winner = new Audio("../audio/winner-sound-effect.mp3");

for (let i = 0; i < 225; i++) {
  const tile = document.createElement('div');
  battlefield.appendChild(tile);
}

const tiles = Array.from(document.querySelectorAll('.battlefield div'));

const invaders = [
  0,1,2,3,4,5,6,7,8,9,
  15,16,17,18,19,20,21,22,23,24,
  30,31,32,33,34,35,36,37,38,39
]

const draw = () => {
  for (let i = 0; i < invaders.length; i++) {
    if(!aliensRemoved.includes(i)) {
      tiles[invaders[i]].classList.add('invader');
    }
  }
}

const remove = () => {
  for (let i = 0; i < invaders.length; i++) {
    tiles[invaders[i]].classList.remove('invader');
  }
}

const moveShooter = (e) => {
  tiles[currentShooterIndex].classList.remove('shooter');
  switch(e.key) {
    case 'ArrowLeft':
      if (currentShooterIndex % width !== 0) currentShooterIndex -=1;
      break;
    case 'ArrowRight' :
      if (currentShooterIndex % width < width -1) currentShooterIndex +=1;
      break;
  }
  tiles[currentShooterIndex].classList.add('shooter');
}

const moveInvaders = () => {
  const leftEdge = invaders[0] % width == 0;
  const rightEdge = invaders[invaders.length - 1] % width == width -1;
  remove();

  if (rightEdge && goingRight) {
    for (let i = 0; i < invaders.length; i++) {
      invaders[i] += width +1;
      direction = -1;
      goingRight = false;
    }
  }

  if(leftEdge && !goingRight) {
    for (let i = 0; i < invaders.length; i++) {
      invaders[i] += width -1;
      direction = 1;
      goingRight = true;
    }
  }

  for (let i = 0; i < invaders.length; i++) {
    invaders[i] += direction;
  }

  draw();

  if (tiles[currentShooterIndex].classList.contains('invader', 'shooter')) {
    scoreDisplay.innerHTML = 'GAME OVER';
    gameTheme.pause();
    gameOver.play();
    clearInterval(invadersId);
  }

  for (let i = 0; i < invaders.length; i++) {
    if(invaders[i] > (tiles.length)) {
      scoreDisplay.innerHTML = 'GAME OVER';
      gameTheme.pause();
      gameOver.play();
      clearInterval(invadersId);
      break;
    }
  }
  if (aliensRemoved.length == invaders.length) {
    scoreDisplay.innerHTML = 'YOU WIN';
    gameTheme.pause();
    winner.play();
    clearInterval(invadersId);
  }
}

const shoot = (e) => {
  let laserId;
  let currentLaserIndex = currentShooterIndex;

  const moveLaser = () => {
    tiles[currentLaserIndex].classList.remove('laser');
    currentLaserIndex -= width;
    tiles[currentLaserIndex].classList.add('laser');

    if (tiles[currentLaserIndex].classList.contains('invader')) {
      boomSound.play();
      tiles[currentLaserIndex].classList.remove('laser');
      tiles[currentLaserIndex].classList.remove('invader');
      tiles[currentLaserIndex].classList.add('boom');

      setTimeout(()=> tiles[currentLaserIndex].classList.remove('boom'), 300);
      clearInterval(laserId);

      const alienRemoved = invaders.indexOf(currentLaserIndex);
      aliensRemoved.push(alienRemoved);
      score++;
      scoreDisplay.innerHTML = score;
      console.log(aliensRemoved);

    }

  }
  switch(e.key) {
    case 'ArrowUp':
      laserSound.play();
      laserId = setInterval(moveLaser, 100);
  }
}

const startGame = () => {
  gameTheme.currentTime = 0;
  gameTheme.play();
  draw();
  tiles[currentShooterIndex].classList.add('shooter');
  invadersId = setInterval(moveInvaders, 600);
}

document.getElementById('startGame').addEventListener('click', startGame);

document.addEventListener('keydown', moveShooter);
document.addEventListener('keydown', shoot);