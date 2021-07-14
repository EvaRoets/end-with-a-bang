const battlefield = document.querySelector('.battlefield');
const scoreDisplay = document.querySelector('.scoreDisplay');
let currentShooterIndex = 202;
let width = 15;
let direction = 1;
let invadersId;
let goingRight = true;
let aliensRemoved = [];
let score = 0;

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

draw()

const remove = () => {
  for (let i = 0; i < invaders.length; i++) {
    tiles[invaders[i]].classList.remove('invader');
  }
}

tiles[currentShooterIndex].classList.add('shooter');


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
document.addEventListener('keydown', moveShooter);

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
    clearInterval(invadersId);
  }

  for (let i = 0; i < invaders.length; i++) {
    if(invaders[i] > (tiles.length)) {
      scoreDisplay.innerHTML = 'GAME OVER';
      clearInterval(invadersId);
    }
  }
  if (aliensRemoved.length == invaders.length) {
    scoreDisplay.innerHTML = 'YOU WIN';
    clearInterval(invadersId);
  }
}
invadersId = setInterval(moveInvaders, 600);

const shoot = (e) => {
  let laserId;
  let currentLaserIndex = currentShooterIndex;
  const moveLaser = () => {
    tiles[currentLaserIndex].classList.remove('laser');
    currentLaserIndex -= width;
    tiles[currentLaserIndex].classList.add('laser');

    if (tiles[currentLaserIndex].classList.contains('invader')) {
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
      laserId = setInterval(moveLaser, 100);
  }
}

document.addEventListener('keydown', shoot);