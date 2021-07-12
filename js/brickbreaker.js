//**VARIABLES**
//Phase 1
//TODO create html canvas + enable drawing
let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");

//TODO create moving ball  / define a drawing loop
//define starting point in canvas in variables x and y
let x = canvas.width / 2;
let y = canvas.height - 30;

//define the position + directs the circle is drawn
let xDrawn = 5; // negative = left, positive = right // also changes speed!
let yDrawn = -5; // negative = up, positive = down

// make ball
let ballRadius = 5;

//Phase 2
//TODO create paddle
let paddleHeight = 5 ;
let paddleWidth = 50;
let paddleX = (canvas.width-paddleWidth) / 2; // CHECK how to make this appear in window




//**FUNCTIONS**
//TODO create moving ball/ define a drawing loop
function drawBall() {
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI * 2);
    context.fillStyle = "#ff0000";
    context.fill();
    context.closePath();
}

function drawPaddle() {
    context.beginPath();
    context.rect(paddleX, canvas.height-paddleHeight-3, paddleWidth, paddleHeight);
    context.fillStyle = "#0095DD";
    context.fill();
    context.closePath();
}

function draw() {
    // clear frame after every interval to make ball instead of line
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    //TODO make ball bounce off the walls/ define start + end canvas
    // x = min 5 max 295
    // y = min 5 max 145

    //top + bottom wall
    if (y + yDrawn <= 1 //if vertical starting point on y axis < 0 (it goes outside top canvas wall)
        || y + yDrawn > canvas.height - 1) {  //if vertical starting point on y axis > canvas height (it goes outside bottom canvas wall)
        yDrawn = -yDrawn; //reverse direction on y axis = bounce
    }

    //left + right wall
    if (x + xDrawn <= 1 //if horizontal starting point on x axis < 0 (it goes outside left canvas wall)
        || x + xDrawn > canvas.width - 1) {  //if horizontal starting point on x axis > canvas width (it goes outside right canvas wall)
        xDrawn = -xDrawn; //reverse direction on x axis = bounce
    }

    //update x and y to make ball appear in new position on every update
    x += xDrawn;
    y += yDrawn;

    //TODO enable keyboard controls paddle
}












setInterval(draw, 80); // change this timeout to make the ball got faster/slower, lower number = faster

//Add getRandomColor() to color of ball
// function getRandomColor() {
//     let letters = '0123456789ABCDEF'.split('');
//     let color = '#';
//     for (let i = 0; i < 6; i++ ) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }







//TODO enable mouse controls paddle
//TODO create bricks field


//Phase 3
//TODO detect collision/ make bricks disappear when hit by the ball
//TODO create scoreboard
//TODO track score
//TODO win/lose

//Phase 4 - extras
//TODO refactor code
//TODO make canvas less pixelated
// https://medium.com/@doomgoober/understanding-html-canvas-scaling-and-sizing-c04925d9a830
//TODO add multiple levels?
//TODO convert to 3D?