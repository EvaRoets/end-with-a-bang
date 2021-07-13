//**VARIABLES**
let canvas = document.getElementById("gameCanvas"); //create html canvas + enable drawing
let context = canvas.getContext("2d");
let ballRadius = 3; // make ball
let x = canvas.width / 2; //define starting point in canvas in variables x and y
let y = canvas.height - 30;
let xDrawn = 5; //define the position + direction the ball is drawn
let yDrawn = -5; // - = left/up, + = right/down
let paddleHeight = 8;//create paddle
let paddleWidth = 50;
let paddleX = (canvas.width - paddleWidth) / 2; //define starting point paddle
let pressRight = false; //enable keyboard controls paddle
let pressLeft = false;
let brickRowCount = 5; //create brick field
let brickColumnCount = 11;
let brickWidth = 24.5;
let brickHeight = 10;
let brickPadding = 2;
let brickOffsetTop = 0;
let brickOffsetLeft = 5;
let bricks = []; // loop through all bricks (col and row)
for (let col = 0; col < brickColumnCount; col++) {
    bricks[col] = [];
    for (let row = 0; row < brickRowCount; row++) {
        bricks[col][row] = {x: 0, y: 0, status: 1}; // status 1 = brick is present
    }
}
let score = 0; //define score

//**EVENT LISTENERS**
document.addEventListener("keydown", keyDown, false);//enable keyboard controls paddle
document.addEventListener("keyup", keyUp, false);
document.addEventListener("mousemove", mouseMove, false); // enable mouse controls paddle

//**FUNCTIONS**
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

function mouseMove(event) {
    let mousePositionOnX = event.clientX - canvas.offsetLeft;
    if (mousePositionOnX > 0 && mousePositionOnX < canvas.width) {
        paddleX = mousePositionOnX - paddleWidth / 2;
    }
}

function collisionDetection() { //detect collision
    for (let col = 0; col < brickColumnCount; col++) {
        for (let row = 0; row < brickRowCount; row++) {
            let brick = bricks[col][row];
            if (brick.status === 1) {
                if (x > brick.x &&
                    x < brick.x + brickWidth &&
                    y > brick.y &&
                    y < brick.y + brickHeight) {
                    yDrawn = -yDrawn;
                    brick.status = 0;
                    score++; //track score
                    if (score === brickRowCount * brickColumnCount) {
                        console.log("You win!")
                        document.location.reload();
                        clearInterval(interval);
                    }
                }
            }
        }
    }
}

function drawBall() { //create moving ball/ define a drawing loop
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

function drawBricks() { //make bricks disappear when hit by the ball
    for (let col = 0; col < brickColumnCount; col++) {
        for (let row = 0; row < brickRowCount; row++) {
            if (bricks[col][row].status === 1) {
                let brickX = (col * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (row * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[col][row].x = brickX;
                bricks[col][row].y = brickY;
                context.beginPath();
                context.rect(brickX, brickY, brickWidth, brickHeight);
                context.fillStyle = "#ff1493";
                context.fill();
                context.closePath();
            }
        }
    }
}

function drawScore() {//create scoreboard
    context.font = "8px 'Roboto', sans-serif"; // CHECK add more/different styling?
    context.fillStyle = "#ff1493";
    context.fillText("Your score: " + score, 8, canvas.height);
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);// clear frame after every interval to make ball instead of line
    drawBall(); //call all draw functions
    drawPaddle();
    drawBricks();
    collisionDetection();
    drawScore();

    if (y + yDrawn <= 1) { //when ball goes outside top canvas wall
        yDrawn = -yDrawn; //reverse direction on y axis = bounce
    } else if (y + yDrawn > canvas.height - 1) { // when ball goes outside bottom canvas wall
        if (x > paddleX && //make ball bounce off paddle
            x < paddleX + paddleWidth) {
            yDrawn = -yDrawn; //reverse direction on y axis = bounce
        } else { // log losing score and reload
            console.log("Game Over")
            document.location.reload();
            clearInterval(interval);
        }
    }

    if (x + xDrawn <= 1 //when ball goes outside left canvas wall
        || x + xDrawn > canvas.width - 1) {  ///when ball goes outside right canvas wall
        xDrawn = -xDrawn; //reverse direction on x axis = bounce
    }

    x += xDrawn; //update x and y to make ball appear in new position on every update
    y += yDrawn;

    if (pressRight) {//enable keyboard controls paddle
        paddleX += 18; // make paddle move right 18px
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = (canvas.width - 1) - paddleWidth;
        }
    } else if (pressLeft) {
        paddleX -= 18; // make paddle move left 18px
        if (paddleX < 0) {
            paddleX = 1;
        }
    }

}

let interval = setInterval(draw, 80);//set interval to reload frame and enable movment


//Phase 4 - extras
//convert functions to arrow functions where possible
//convert for loops into for of/for in


//TODO go through all check comments
// CHECK make mouse movement more sensitive
// CHECK .status not depreciated?
// CHECK add win/lose message in html?
// CHECK add more/different styling?/replace scoreboard to html tags


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
//TODO add lives?
//TODO add multiple levels?
//TODO convert to 3D?


//create moving ball  / define a drawing loop

