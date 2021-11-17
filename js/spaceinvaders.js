const battlefield = document.querySelector('.battlefield');
const scoreDisplay = document.querySelector('.scoreDisplay');
let currentShooterIndex;
let width = 15;
let direction = 1;
let invadersId;
let invaders = [];
let goingRight = true;
let aliensRemoved = [];
let score = 0;
let level = 1;
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
    document.getElementById('playAgain').style.display = 'block';
    level = 1;
    score = 0;
  }

  for (let i = 0; i < invaders.length; i++) {
    if(invaders[i] > 209) {
      clearInterval(invadersId);
      scoreDisplay.innerHTML = 'GAME OVER';
      gameTheme.pause();
      gameOver.play();
      document.getElementById('playAgain').style.display = 'block';
      level = 1;
      score = 0;
    }
  }
  if (aliensRemoved.length == invaders.length) {
    scoreDisplay.innerHTML = 'YOU WIN';
    gameTheme.pause();
    winner.play();
    clearInterval(invadersId);
    document.getElementById('nextLevel').style.display = 'block';
    level++;
  }
}

const shoot = (e) => {
  let laserId;
  let currentLaserIndex = currentShooterIndex;

  const moveLaser = () => {
    if(currentLaserIndex < 15){
      tiles[currentLaserIndex].classList.remove('laser');
      clearInterval(laserId);
    }
    else{
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
        scoreDisplay.innerHTML = 'Score : ' + score;
      }
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
  
  for(let i = 0; i < 10; i++){
    invaders.push(i);
  }
  for(let i = 15; i < 25; i++){
    invaders.push(i);
  }
  for(let i = 30; i < 40; i++){
    invaders.push(i);
  }

  for (let i = 0; i < invaders.length; i++) {
      tiles[invaders[i]].classList.add('invader');
  }
  currentShooterIndex = 202;
  tiles[currentShooterIndex].classList.add('shooter');
  invadersId = setInterval(moveInvaders, 600/ (level/2));
}

const resetInvaders = () => {
  for(let i = 0; i < tiles.length; i++){
    if(tiles[i].classList.contains('invader')){
      tiles[i].classList.remove('invader');
    }
    else if(tiles[i].classList.contains('shooter')){
      tiles[i].classList.remove('shooter');
    }
  }
  
  invaders = [];
  aliensRemoved = [];
}

document.getElementById('startGame').addEventListener('click', () => {
  document.getElementById('startGame').style.display = 'none';
  startGame();
});

document.getElementById('playAgain').addEventListener('click', () => {
  resetInvaders();
  startGame();
  document.getElementById('playAgain').style.display = 'none';
  document.querySelector('.level').innerHTML = 'Level ' + level;
  scoreDisplay.innerHTML = 'Score : ' + score;
});

document.getElementById('nextLevel').addEventListener('click', () => {
  resetInvaders();
  startGame();
  document.querySelector('.level').innerHTML = 'Level ' + level;
  document.getElementById('nextLevel').style.display = 'none';
});

document.addEventListener('keydown', moveShooter);
document.addEventListener('keydown', shoot);