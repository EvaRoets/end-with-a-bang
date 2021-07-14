const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d'); // here we ask the canvas for a 2d context. we can ask for a 3d as well. 

/**** To track the length of the snake we will use Class ****/
class SnakePart {
   constructor(x, y) {
      this.x = x;
      this.y = y;
   }
}


let speed = 10;
let tileCount = 20; // 25 tiles horiwontally and vertically accros the canvas.
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




// here we set the game loop: We will use setTimeOut : This will give us help us change how often our screen gets updated. 

// game loop:
function drawGame() {
   changeSnakePosition();
   let result = isGameOver();
   if (result) {
      result;
   }
   clearScreen();
   checkAppleCollision();
   drawApple();
   drawSnake();
   drawScore();
   setTimeout(drawGame, 1000 / speed) // 1000 = 1 second
}

// Result:
function isGameOver() {
   let gameOver = false;
}


// here we set the score:
function drawScore() {
   ctx.fillStyle = 'black';
   ctx.font = '10px Verdana';
   ctx.fillText('Score ' + score, canvas.width - 50, 10);
}



//clearScreen function's job is to just clear the screen. 

function clearScreen() {
   ctx.fillStyle = 'salmon';
   ctx.fillRect(0, 0, canvas.width, canvas.height);
}


function drawSnake() {
   // body parts that will grow upon collision
   ctx.fillStyle = 'blue';
   for (let i = 0; i < snakeParts.length; i++) {
      let part = snakeParts[i];
      ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
   }
   snakeParts.push(new SnakePart(headX, headY)); // We put an item at the end of list next to the head 
   if (snakeParts.length > tailLength) {
      snakeParts.shift(); // here we remove the furthest item from the snake parts if have more than our tail size.
   }
   ctx.fillStyle = 'purple';
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




