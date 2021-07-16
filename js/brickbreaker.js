const canvas = document.getElementById("gameCanvas"); //create html canvas + enable drawing
const message = document.getElementById("message");
const playGame = document.getElementById("play");
const reset = document.getElementById("reset");
const context = canvas.getContext("2d");
const ballRadius = 3; // make ball
let x = canvas.width / 2; //define starting point in canvas in variables x and y
let y = canvas.height - 50;
let xDrawn = 1; //define the position + direction the ball is drawn
let yDrawn = -1; // - = left/up, + = right/down
const paddleHeight = 8;//create paddle
let paddleWidth = 50;
let paddleX = (canvas.width - paddleWidth) / 2; //define starting point paddle
let pressRight = false; //enable keyboard controls paddle
let pressLeft = false;
let brickRowCount = 4; //create brick field
const brickColCount = 11;
const brickWidth = 24.5;
let brickHeight = 8;
const brickPadding = 2;
const brickOffsetTop = 18;
const brickOffsetLeft = 5;
const brickBreaking = new Audio("../audio/brickbreaking.wav");
// const ballBounce = ("../audio/ballbounce.wav");
const gameOver = new Audio("../audio/game-over.wav");
const winner = new Audio("../audio/winner-sound-effect.mp3");
let bricks = []; // loop through all bricks (col and row)
let lives = 3;
for (let col = 0; col < brickColCount; col++) {
    bricks[col] = [];
    for (let row = 0; row < brickRowCount; row++) {
        bricks[col][row] = {x: 0, y: 0, status: 1}; // status 1 = brick is present
    }
}
const drawBall = () => {
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI * 2);
    context.fillStyle = "#FF0000";
    context.fill();
    context.closePath();
}
const drawPaddle = () => {
    context.beginPath();
    context.rect(paddleX, canvas.height - (paddleHeight - 3), paddleWidth, paddleHeight);
    context.fillStyle = "#14F729";
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
                context.fillStyle = "#14F729";
                context.fill();
                context.closePath();
            }
        }
    }
}
const drawScore = () => {
    context.font = "8px 'Emulogic'";
    context.fillStyle = "#14F729";
    context.fillText("SCORE : " + `${localStorage.scoreUp}`, canvas.width - 293, canvas.height - 138);
    // context.fillText("Your score = " + score, canvas.width - 293, canvas.height - 142);
}
// const drawLevels = () => {
//     context.font = "8px 'Emulogic'";
//     context.fillStyle = "#14F729";
//     context.fillText("LEVEL : " + `${localStorage.levelUp}`, canvas.width - 180, canvas.height - 138);
// }
const drawLives = () => {
    context.font = "8px 'Emulogic'";
    context.fillStyle = "#14F729";
    // context.fillText("❤ : " + `${localStorage.livesUp}`, canvas.width - 50, canvas.height - 138);
    context.fillText("❤ : " + lives, canvas.width - 50, canvas.height - 138);
}
const stopBall = () => {
    xDrawn = 0;
    yDrawn = 0;
    x = canvas.width / 2;
    y = canvas.height - 30;
}
const reloadGame = () => {
    window.location.reload();
}
const scoreUp = () => {
    if (typeof (Storage) !== "undefined") {
        if (localStorage.scoreUp) {
            localStorage.scoreUp = Number(localStorage.scoreUp) + 1;
        } else {
            localStorage.scoreUp = 1;
        }
    }
}
// const levelUp = () => {
//     if (typeof (Storage) !== "undefined") {
//         if (localStorage.levelUp) {
//             localStorage.setItem("previousLevelUp", localStorage.levelUp);
//             // localStorage.setItem("previousLivesUp", localStorage.livesUp);
//             localStorage.levelUp = Number(localStorage.levelUp) + 1;
//             // localStorage.livesUp = Number(localStorage.livesUp) + 1;
//             // localStorage.livesDown = Number(localStorage.livesUp) - 1;
//         } else {
//             localStorage.levelUp = 1;
//         }
//     }
// }

// const nextLevel = () => {
//     if (!localStorage.previousLevelUp) {
//     } else {
//         //add features here to increase difficulty per level
//         xDrawn = 2;
//         yDrawn = -2;
//     }
// }

window.addEventListener('load', () => {
    if (typeof (Storage) !== "undefined") {
        if (!localStorage.scoreUp) {
            localStorage.setItem("scoreUp", "0");
        }
        // if (!localStorage.levelUp) {
        //     localStorage.setItem("levelUp", "1");
        // }
        //     if (!localStorage.livesUp) {
        //         localStorage.setItem("livesUp", "3");
        //     }
    }
    drawPaddle();
    drawBricks();
    drawScore();
    drawLives();
    // drawLevels();

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

playGame.addEventListener("click", () => {
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
                        brickBreaking.play();
                        yDrawn = -yDrawn; //bounce
                        brick.status = 0;
                        scoreUp();
                        // if (localStorage.scoreUp === brickRowCount * brickColCount) {
                        if (localStorage.scoreUp == 5) { // for testing purposes only
                            winner.play();
                            lives++
                            // levelUp();
                            stopBall();
                            // message.innerHTML = `YOU WIN! 🥇 <br> You now have ${localStorage.livesUp} ❤ <br> Next: level ${localStorage.levelUp}`;
                            message.innerHTML = "YOU WIN! 🥇 <br> You now have " + lives + " ❤"
                            setTimeout(() => {
                                // nextLevel();
                                reloadGame();
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
        // drawLevels();
        requestAnimationFrame(draw);

        if (y + yDrawn <= 1) { //when ball goes outside top canvas wall
            yDrawn = -yDrawn;//reverse direction on y axis = bounce
        } else if (y + yDrawn > canvas.height - 1) { // when ball goes outside bottom canvas wall
            if (x > paddleX && //make ball bounce off paddle
                x < paddleX + paddleWidth) {
                // ballBounce.play();
                yDrawn = -yDrawn; //reverse direction on y axis = bounce
            } else {
                // if (localStorage.livesUp === 0) {
                if (lives === 0) {
                    stopBall();
                    gameOver.play();
                    message.innerHTML = "GAME OVER! <br>You've lost all your lives! ☹";
                    setTimeout(() => {
                        localStorage.clear();
                        reloadGame();
                    }, 5000)
                } else {
                    x = canvas.width / 2;
                    y = canvas.height - 30;
                    xDrawn = 1;
                    yDrawn = -1;
                    paddleX = (canvas.width - paddleWidth) / 2;
                    lives--
                    message.innerHTML = "Oh, you missed the ball! ☹ <br> You have " + lives + " ❤ left."
                    // localStorage.livesDown();
                    // message.innerHTML = `Oh, you missed the ball! ☹ <br> You have ${localStorage.livesDown} ❤.`
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
            paddleX -= 5; // move paddle left
            if (paddleX < 0) {
                paddleX = 1;
            }
        }
    }
    draw();
});

reset.addEventListener("click", () => {
    localStorage.clear();
    reloadGame();
})