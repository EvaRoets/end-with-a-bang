//Phase 1
//TODO create html canvas + enable drawing
let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");

//TODO create moving ball  / define a drawing loop
//define starting point in canvas in variables x and y
//CHECK are these the correct starting points?
let x = canvas.width/2;
let y = canvas.height-30;

//define the position the circle is drawn at
//CHECK why 2 and -2?
let xDrawn = 2;
let yDrawn = -2;

function draw() {
    // clear frame after every interval to make ball instead of line
    context.clearRect(0, 0, canvas.width, canvas.height);

    // make ball move after every interval
    context.beginPath();
    context.arc(x, y, 3, 0, Math.PI*2);
    context.fillStyle = "#0095DD";
    context.fill();
    context.closePath();
    //update x and y to make ball appear in new position on every update
    x += xDrawn;
    y += yDrawn;
}
setInterval(draw, 40); // change this timeout to make the ball got faster/slower



// x = min 5 max 295
// y = min 5 max 145

//TODO ensure all elements stay in canvas

//TODO make ball bounce off the walls

//Phase 2
//TODO create paddle
context.beginPath();
context.rect(150, 140, 25, 5); // stay at y = 140 to make paddle move
context.fillStyle = "#FF0000";
context.fill();
context.closePath();


//TODO enable keyboard controls paddle
//TODO enable mouse controls paddle
//TODO create bricks field


//Phase 3
//TODO detect collision/ make bricks disappear when hit by the ball
//TODO create scoreboard
//TODO track score
//TODO win/lose

//Phase 4 - extras
//TODO refactor code
//TODO add multiple levels?
//TODO convert to 3D?