//**VARIABLES**
const canvas = document.getElementById("gameCanvas"); //create html canvas + enable drawing
const message = document.getElementById("message");
const play = document.getElementById("play");
const context = canvas.getContext("2d");
const ballRadius = 3; // make ball
let x = canvas.width / 2; //define starting point in canvas in variables x and y
let y = canvas.height - 50;
let xDrawn = 1; //define the position + direction the ball is drawn
let yDrawn = -1; // - = left/up, + = right/down
const paddleHeight = 8;//create paddle
const paddleWidth = 50;
let paddleX = (canvas.width - paddleWidth) / 2; //define starting point paddle
let pressRight = false; //enable keyboard controls paddle
let pressLeft = false;
let brickRowCount = 3; //create brick field
const brickColCount = 11;
const brickWidth = 24.5;
const brickHeight = 5;
const brickPadding = 2;
const brickOffsetTop = 15;
const brickOffsetLeft = 5;
let score = 0;
let lives = 3;
let levels = 1;
let bricks = []; // loop through all bricks (col and row)
for (let col = 0; col < brickColCount; col++) {
    bricks[col] = [];
    for (let row = 0; row < brickRowCount; row++) {
        bricks[col][row] = {x: 0, y: 0, status: 1}; // status 1 = brick is present
    }
}
const drawBall = () => {
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI * 2);
    context.fillStyle = "#13F0FF";
    context.fill();
    context.closePath();
}
const drawPaddle = () => {
    context.beginPath();
    context.rect(paddleX, canvas.height - (paddleHeight - 3), paddleWidth, paddleHeight);
    context.fillStyle = "#ff1493";
    context.fill();
    context.closePath();
}
const drawBricks = () => { //make bricks disappear when hit by the ball
    for (let col = 0; col < brickColCount; col++) {
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
const drawScore = () => {
    context.font = "8px 'Roboto', sans-serif";
    context.fillStyle = "#ff1493";
    context.fillText("Your score = " + score, canvas.width - 293, canvas.height - 142);
}
const drawLives = () => {
    context.font = "8px 'Roboto', sans-serif";
    context.fillStyle = "#ff1493";
    context.fillText("❤ = " + lives, canvas.width - 28, canvas.height - 142);
}
const drawLevels = () => {
    context.font = "8px 'Roboto', sans-serif";
    context.fillStyle = "#ff1493";
    context.fillText("Level " + levels, canvas.width - 160, canvas.height - 142);
}
const reloadGame = () => {
    document.location.reload();
}
const stopBall = () => {
    xDrawn = 0;
    yDrawn = 0;
    x = canvas.width / 2;
    y = canvas.height - 30;
}
const level2 = () => {
    reloadGame();
    levels = 2;
    brickRowCount = 4; //create brick field
    xDrawn = 2; //define the position + direction the ball is drawn
    yDrawn = -2; // - = left/up, + = right/down
}

window.addEventListener('load', () => {
    drawPaddle();
    drawBricks();
    drawScore();
    drawLives();
    drawLevels();
    const keyDown = (event) => {
        if (event.key === "Right" || event.key === "ArrowRight") {
            pressRight = true;
        } else if (event.key === "Left" || event.key === "ArrowLeft") {
            pressLeft = true;
        }
    }
    const keyUp = (event) => {
        if (event.key === "Right" || event.key === "ArrowRight") {
            pressRight = false;
        } else if (event.key === "Left" || event.key === "ArrowLeft") {
            pressLeft = false;
        }
    }
    const mouseMove = (event) => {
        let mousePositionOnX = event.clientX - canvas.offsetLeft;
        if (mousePositionOnX > 0 && mousePositionOnX < canvas.width) {
            paddleX = mousePositionOnX - paddleWidth / 2;
        }
    }
    document.addEventListener("keydown", keyDown, false);//enable keyboard controls paddle
    document.addEventListener("keyup", keyUp, false);
    document.addEventListener("mousemove", mouseMove, false); // enable mouse controls paddle
});

play.addEventListener("click", () => {
    message.innerHTML = "Let's go!";
    const collisionDetection = () => { //detect collision
        for (let col = 0; col < brickColCount; col++) {
            for (let row = 0; row < brickRowCount; row++) {
                let brick = bricks[col][row];
                if (brick.status === 1) {
                    if (x > brick.x &&
                        x < brick.x + brickWidth &&
                        y > brick.y &&
                        y < brick.y + brickHeight) {
                        yDrawn = -yDrawn; //bounce
                        brick.status = 0;
                        score++; //track score
                        if (score === brickRowCount * brickColCount) {
                            message.innerHTML = "YOU WIN! 🥇";
                            levels++
                     stopBall();
                            setTimeout(() => {
                                level2();
                            }, 5000)
                        }
                    }
                }
            }
        }
    }
    const draw = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        collisionDetection();
        drawBall();
        drawPaddle();
        drawBricks();
        drawScore();
        drawLives();
        drawLevels();
        requestAnimationFrame(draw);
        if (y + yDrawn <= 1) { //when ball goes outside top canvas wall
            yDrawn = -yDrawn;//reverse direction on y axis = bounce
        } else if (y + yDrawn > canvas.height - 1) { // when ball goes outside bottom canvas wall
            if (x > paddleX && //make ball bounce off paddle
                x < paddleX + paddleWidth) {
                yDrawn = -yDrawn; //reverse direction on y axis = bounce
            } else {
                lives--;
                if (lives <= 0) {
                    lives = 0;
                    message.innerHTML = "GAME OVER! <br>You've lost all your lives! ☹";
                    stopBall();
                    setTimeout(() => {
                        reloadGame();
                    }, 5000)
                } else {
                    x = canvas.width / 2;
                    y = canvas.height - 30;
                    xDrawn = 2;
                    yDrawn = -2;
                    paddleX = (canvas.width - paddleWidth) / 2;
                    message.innerHTML = "Oh, you missed the ball! ☹"
                }
            }
        }
        if (x + xDrawn <= 1 //when ball goes outside left canvas wall
            || x + xDrawn > canvas.width - 1) {  ///when ball goes outside right canvas wall
            xDrawn = -xDrawn; //reverse direction on x axis = bounce
        }

        x += xDrawn; //update x and y to make ball appear in new position on every frame update
        y += yDrawn;
        if (pressRight) {//enable keyboard controls paddle
            paddleX += 5; // move paddle right
            if (paddleX + paddleWidth > canvas.width) {
                paddleX = (canvas.width - 1) - paddleWidth;
            }
        } else if (pressLeft) {
            paddleX -= 5; // move paddle  left
            if (paddleX < 0) {
                paddleX = 1;
            }
        }
    }
    draw();
});


//Add extra levels?