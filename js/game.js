var context;
var canvas;
var image;
var plane;
var count = 0;
var crossX = 0;
var crossY = 0;
var Zomb = [];
var Plan = [];
var x1 = 0;
var y1 = 0;
window.onload = function()
{
    initGame(); // SETUP GAME
    gameLoop(); // VONG LAP
};
if (!window.requestAnimationFrame)
{
    window.requestAnimationFrame =
            (
                    function()
                    {

                        return	window.webkitRequestAnimationFrame ||
                                window.mozRequestAnimationFrame ||
                                window.oRequestAnimationFrame ||
                                window.msRequestAnimationFrame ||
                                function(callback, element)
                                {
                                    window.setTimeout(callback, 1000 / 60);
                                };
                    }
            )();
}

// function draw image sprite // Ve hinh chuyen dong

function drawIMG(imageObj, x, y, sourceWidth, sourceHeight, destX, destY)
{
    var destWidth = sourceWidth;
    var destHeight = sourceHeight;
    context.drawImage(imageObj, x, y, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
}
function drawIMG2(imageObj, x, y)
{
    context.drawImage(imageObj, x, y);
}

function initGame()
{
    bg = new Image();
    bg.src = "img/BG.jpg";
    image = new Image();
    image.src = "img/zobies.png";
    plane = new Image();
    plane.src = "img/plane.png";
    crossImage = new Image();
    crossImage.src = "img/crosshair.png";
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext("2d");
}

function gameLoop()
{
    if (x1 >= image.width - 194) {
        x1 = 0;
        y1 = 0;
    }
    updateGame();
    paintGame();
    requestAnimationFrame(gameLoop);
}
function updateGame()
{
    canvas.addEventListener("mousemove", handleEvent);
    canvas.addEventListener("mousedown", handleMouseDown);
}
function paintGame()
{

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(crossImage, 0, 0);
}
function handleEvent(mouseEvent)
{
    crossX = mouseEvent.offsetX - (crossImage.width / 2);
    crossY = mouseEvent.offsetY - (crossImage.height / 2);
}