const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d'); // here we ask the canvas for a 2d context. we can ask for a 3d as well. 

/**** To track the length of the snake we will use Class ****/
class SnakePart {
   constructor(x, y) {
      this.x = x;
      this.y = y;
   }
}

let speed = 8;
let tileCount = 20; // 20 tiles horiwontally and vertically accros the canvas.
let tileSize = canvas.width / tileCount - 2;
let headX = 10; // head of the snake 
let headY = 10; // tail of the snake 

const snakeParts = []; // for the length of the snake
let tailLength = 2;

let yVelocity = 0; // for vertical movements (up & down)
let xVelocity = 0; // for horizontal movements (left & right)
let appleX = 5;
let appleY = 5;
let score = 0;

// adding audio:
const gulpSound = new Audio('/audio/gulp.mp3');
const gameOverSound = new Audio('/audio/over.wav');

// here we set the game loop: We will use setTimeOut : This will give us help us change how often our screen gets updated. 

// game loop:
function drawGame() {
   changeSnakePosition();
   let result = isGameOver();
   if (result) {
      return;
   }
   clearScreen();
   checkAppleCollision();
   drawApple();
   drawSnake();
   drawScore();

   // Here we add speed to the game. Upon reaching higher score the snake will move faster. 
   if (score > 5) {
      speed = 12;
   }
   if (score > 10) {
      speed = 15;
   }
   if (score > 15) {
      speed = 18;
   }

   setTimeout(drawGame, 1000 / speed) // 1000 = 1 second
}

// GAME END: This is where we define when will the game end and what will happen if it touches any of the walls. 
function isGameOver() {
   let gameOver = false;
   
   // here we set our y & x velocities to 0.
   if (yVelocity === 0 && xVelocity === 0) {
      return false;
   }

   // This is for walls: game will end if u hit any wall

   // wall left:
   if (headX < 0) {
      gameOver = true;
      gameOverSound.play();
   }

   // wall right:
   else if (headX === tileCount) {
      gameOver = true;
      gameOverSound.play();
   }

   // wall bottom:
   else if (headY < 0) {
      gameOver = true;
      gameOverSound.play();
   }
      
   // wall top:
   else if (headY === tileCount) {
      gameOver = true;
      gameOverSound.play();
   }
   
   // This is for snake body. If u hit your own body game will end
   for (let i = 0; i < snakeParts.length; i++) {
      let part = snakeParts[i];

      if (part.x === headX && part.y === headY) {
         gameOver = true;
         gameOverSound.play();
         break;
      }
   }

   // Game Over Text:
   if (gameOver) {
      ctx.fillStyle = 'white';
      ctx.font = "50px Verdana";
      ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
    }
   return gameOver;
}


// here we set the score:
function drawScore() {
   ctx.fillStyle = 'white';
   ctx.font = '10px Verdana';
   ctx.fillText('Score ' + score, canvas.width - 50, 10);
}


//clearScreen function's job is to just clear the screen. 

function clearScreen() {
   ctx.fillStyle = 'black';
   ctx.fillRect(0, 0, canvas.width, canvas.height);
}


function drawSnake() {
   // body parts that will grow upon collision
   ctx.fillStyle = 'green';
   for (let i = 0; i < snakeParts.length; i++) {
      let part = snakeParts[i];
      ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
   }
   snakeParts.push(new SnakePart(headX, headY)); // We put an item at the end of list next to the head 
   if (snakeParts.length > tailLength) {
      snakeParts.shift(); // here we remove the furthest item from the snake parts if have more than our tail size.
   }
   ctx.fillStyle = 'white';
   ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}



function changeSnakePosition() {
   headX = headX + xVelocity; // for moving left or right
   headY = headY + yVelocity; // for moving up or down
}

function drawApple() {
   ctx.fillStyle = 'red';
   ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision() {
   if (appleX === headX && appleY == headY) {
      appleX = Math.floor(Math.random() * tileCount);
      appleY = Math.floor(Math.random() * tileCount);
      tailLength++;
      score++;
      gulpSound.play();
   }
}


document.body.addEventListener('keydown', keyDown);
// the Keydown function will listen to for key presses. like arrow up, down, left & right. 

function keyDown(event) {
   // UP
   //When pressed on UP key it will change the Y velocity.
   if (event.keyCode == 38) {
      if (yVelocity == 1)
      return;
      yVelocity = -1;
      xVelocity = 0;
   }

   // DOWN
   if (event.keyCode == 40) {
      if (yVelocity == -1)
      return;
      yVelocity = 1;
      xVelocity = 0;
   }

   // LEFT
   if (event.keyCode == 37) {
      if (xVelocity == 1)
      return;
      yVelocity = 0;
      xVelocity = -1;
   }

   // RIGHT
   if (event.keyCode == 39) {
      if (xVelocity == -1)
      return;
      yVelocity = 0;
      xVelocity = 1;
   }
}

drawGame();




