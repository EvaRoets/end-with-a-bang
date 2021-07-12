const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d'); // here we ask the canvas for a 2d context. we can ask for a 3d as well. 
let speed = 7;
let tileCount = 20; // 20 tiles horiwontally and vertically accros the canvas.
let tileSize = canvas.width / tileCount - 2;
let headX = 10; // head of the snake 
let headY = 10; // tail of the snake 



// here we set the game loop: We will use setTimeOut : This will give us help us change how often our screen gets updated. 

// game loop:
function drawGame() {
   clearScreen();
   setTimeout(drawGame, 1000 / speed) // 1000 = 1 second
}

drawGame();

//clearScreen function's job is to just clear the screen. 

function clearScreen() {
   ctx.fillStyle = '#0f0101';
   ctx.fillRect(0, 0, canvas.width, canvas.height);
}

clearScreen();




