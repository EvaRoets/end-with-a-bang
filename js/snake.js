const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d'); // here we ask the canvas for a 2d context. we can ask for a 3d as well. 
let speed = 14;
let tileCount = 25; // 25 tiles horiwontally and vertically accros the canvas.
let tileSize = canvas.width / tileCount - 2;
let headX = 10; // head of the snake 
let headY = 10; // tail of the snake 

let xVelocity = 0;
let yVelocity = 0;



// here we set the game loop: We will use setTimeOut : This will give us help us change how often our screen gets updated. 

// game loop:
function drawGame() {
   clearScreen();
   changeSnakePosition();
   drawSnake();
   setTimeout(drawGame, 1000 / speed) // 1000 = 1 second
}

//clearScreen function's job is to just clear the screen. 

function clearScreen() {
   ctx.fillStyle = 'salmon';
   ctx.fillRect(0, 0, canvas.width, canvas.height);
}


function drawSnake() {
   ctx.fillStyle = 'purple';
   ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}


function changeSnakePosition() {
   headX = headX + xVelocity; // for moving left or right
   headY = headY + yVelocity; // for moving up or down
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




