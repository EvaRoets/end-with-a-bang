//**VARIABLES**
//create html canvas + enable drawing
let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");
// make ball
let ballRadius = 5;
//create moving ball  / define a drawing loop
//define starting point in canvas in variables x and y
let x = canvas.width / 2;
let y = canvas.height - 30;
//define the position + directs the circle is drawn
let xDrawn = 5; // negative = left, positive = right // also changes speed!
let yDrawn = -5; // negative = up, positive = down
//create paddle
let paddleHeight = 5;
let paddleWidth = 50;
let paddleX = (canvas.width - paddleWidth) / 2;
//enable keyboard controls paddle
let pressRight = false; // start with boolean false, keys aren't pressed yet
let pressLeft = false;

//create brick field
//CHECK center bricks
let brickRowCount = 4;
let brickColumnCount = 9;
let brickWidth = 25;
let brickHeight = 10;
let brickPadding = 5;
let brickOffsetTop = 0;
let brickOffsetLeft = 18;

//create brick field
let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {x: 0, y: 0};
    }
}

//**EVENT LISTENERS**
//enable keyboard controls paddle
document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);

function keyDown(event) {
    if (event.key === "Right" || event.key === "ArrowRight") {
        pressRight = true;
    } else if (event.key === "Left" || event.key === "ArrowLeft") {
        pressLeft = true;
    }
}

function keyUp(event) {
    if (event.key === "Right" || event.key === "ArrowRight") {
        pressRight = false;
    } else if (event.key === "Left" || event.key === "ArrowLeft") {
        pressLeft = false;
    }
}

// enable mouse controls paddle
// CHECK make mouse movement more sensitive
document.addEventListener("mousemove", mouseMove, false); //start with boolean false, mouse hasn't moved yet

function mouseMove(event) {
    let mousePositionOnX = event.clientX - canvas.offsetLeft;
    if (mousePositionOnX > 0 && mousePositionOnX < canvas.width) {
        paddleX = mousePositionOnX - paddleWidth / 2;
    }
}


//**FUNCTIONS**
//create moving ball/ define a drawing loop
function drawBall() {
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI * 2);
    context.fillStyle = "#ff0000";
    context.fill();
    context.closePath();
}

function drawPaddle() {
    context.beginPath();
    context.rect(paddleX, canvas.height - (paddleHeight - 3), paddleWidth, paddleHeight);
    context.fillStyle = "#ff1493";
    context.fill();
    context.closePath();
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
            let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            context.beginPath();
            context.rect(brickX, brickY, brickWidth, brickHeight);
            context.fillStyle = "#ff1493";
            context.fill();
            context.closePath();
        }
    }
}

function draw() {
    // clear frame after every interval to make ball instead of line
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();

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
    if (pressRight) {
        paddleX += 5;
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = (canvas.width - 1) - paddleWidth;
        }
    } else if (pressLeft) {
        paddleX -= 5;
        if (paddleX < 0) {
            paddleX = 1;
        }
    }

}

setInterval(draw, 80); // change this timeout to make the ball got faster/slower, lower number = faster

//Phase 3
//TODO detect collision/ make bricks disappear when hit by the ball
//TODO create scoreboard
//TODO track score
//TODO win/lose


//Phase 4 - extras
//TODO refactor code
//TODO make canvas less pixelated
//TODO make ball change color when it bounces
//Add getRandomColor() to color of ball
// function getRandomColor() {
//     let letters = '0123456789ABCDEF'.split('');
//     let color = '#';
//     for (let i = 0; i < 6; i++ ) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }
//TODO make the ball move faster when it hits the paddle
// https://medium.com/@doomgoober/understanding-html-canvas-scaling-and-sizing-c04925d9a830
//TODO add multiple levels?
//TODO convert to 3D?



