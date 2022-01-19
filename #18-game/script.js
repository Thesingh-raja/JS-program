const canvas= document.querySelector("#myCanvas");
const ctx= canvas.getContext("2d");
var canvasWidth= canvas.width;
var canvasHeight= canvas.height;
const ballRadius =10;
var x=canvasWidth/2;
var dx=2;
var y=canvasHeight/2;
var dy=2;
const paddleWidth =75;
const paddleHeight =20;
var paddleX=canvasWidth -paddleWidth;
var brickPadding =20;
var brickOffsetTop =10;
var brickOffsetLeft =10;
var brickWidth=75;
var brickHeight=20;
var bricks=[];
var numberOfRow =3;
var numberOfColumn =5;
const scoreContainer = document.querySelector(".score");
const color="#33C7FF";

//generate bricks
function generateBricks()
{
    for (var row=0;row<numberOfRow;row++)
    {
        bricks[row]=[];
        for(var col=0;col<numberOfColumn;col++)
        {
            //if status 1 , brick is alive
 bricks[row][col]={x:row,y:col,status:1};
        }
    }
}
generateBricks();

function drawAllBricks ()
{
    for (var row=0;row<numberOfRow;row++){ 
    for(var col=0;col<numberOfColumn;col++)
    {
        const brick = bricks[row][col];
        const brickX = col*(brickWidth + brickPadding) +brickOffsetLeft;
        const brickY= row*(brickHeight+ brickPadding)+ brickOffsetTop;
        brick.x=brickX;
        brick.y=brickY;

        if(brick.status)
        {
ctx.beginPath();
ctx.rect(brickX,brickY,brickWidth,brickHeight);
ctx.fillStyle =color;
ctx.fill();
ctx.closePath();
        }
    }
}
}
function checkBoundaryCollision()
{
if (x<=ballRadius || x+ballRadius>= canvasWidth)
{
    dx=-dx;
}
else if (y<=ballRadius)
{
    dy=-dy;
}
else if (y>=canvasHeight -paddleHeight)
{
    //check if ball in the range of paddle or not
    if(x>paddleX && x<paddleX+paddleWidth)
    {
        //ball shoul bounce
        dy=-dy
    }
    else {
        handleGameOver();
    }
}
}
function handleGameOver()
{
    clearInterval(interval);
    alert("Game Over . Your score is "+ getScore());
    window.location.reload();
}

function collisionDetection()
{
    for(var row=0;row<numberOfRow;row++)
    {
        for(var col=0;col<numberOfColumn;col++)
        {
            const brick=bricks[row][col];
            //brick should be alive
            if (brick.status && x>=brick.x&& x<=brick.x+brickWidth&& y>=brick.y && y<=brick.y+brickHeight)
            {
                dy=-dy;
                brick.status=0;
                updateScore();
            }
        }
    }
}

function draw()
{ 
ctx.beginPath();
ctx.clearRect(0,0,canvasWidth,canvasHeight)
ctx.arc(x,y,ballRadius,0,Math.PI*2);
ctx.fillStyle=color;
ctx.fill();
ctx.closePath();
checkBoundaryCollision();
drawPaddle();
drawAllBricks();
x=x+dx;
y=y+dy;
collisionDetection();
}

function drawPaddle()
{
    ctx.beginPath();
    ctx.rect(paddleX,canvasHeight - paddleHeight,paddleWidth,paddleHeight);
    ctx.fillStyle=color;
    ctx.fill();
    ctx.closePath();
}

function getScore()
{
    var score=0;
    for(var row=0;row<numberOfRow;row++)
    {
        for(var col=0;col<numberOfColumn;col++)
        {
            const brick=bricks[row][col];
            if(brick.status ===0) score++;
        }}
        return score;
}

function updateScore()
{
    scoreContainer.textContent=`Score : ${getScore()}`;
}
window.onkeydown=(event)=>{
    // console.log(event);
    if (event.key=="Left"||event.key=="ArrowLeft")
    {
        //move paddle to left
        if(paddleX-10>=0)paddleX= paddleX -10;
    }
    else if (event.key=="Right"||event.key=="ArrowRight")
    {
        //move paddle to right
       if(paddleX+10+paddleWidth <= canvasWidth) paddleX= paddleX + 10;

    }
};

const interval = setInterval(draw,20)