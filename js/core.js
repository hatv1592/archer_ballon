_PAUSE = false;
_SO_LUONG_MUI_TEN = 20;
_KHOANG_CACH_CAC_BONG = 40  ;
_TOC_DO_BONG = 3;
_MAX_POWER_CHARGE = 50;
_TRONG_LUC = 0.25;
_TI_LE = 0.8;
//Variable power bar
var holdStart = null;
var holdTime = null;
var is_charging = false;
var power_bar = 0;
var context;
var canvas;
var background;
var background2;
//Variable ball
var Balls = [];
var Balls_images = [];
var Balls_pop = [];
var Balls_poping;
var Balls_poping_img;
var Color = [1, 2, 3, 4, 5, 6, 7];
//Variable to arrow

var fire;
var angle;
var lock_angle;
var Arrow = [];
var arrow_image;
var bow;
var f; //fps
var flag = true;
var score = 0;
//Variable to show

var broad;
var show;
var message = score;
var message2 = 'Số tên: Số tên' + _SO_LUONG_MUI_TEN;
var message3 = 'Số lượng mũi tên: ' + _SO_LUONG_MUI_TEN;
var x = 0;
var y = 0;
//var countarrow = 0;
var test = 0;
var khoangcach = 0;
var fps = {
    startTime: 0,
    frameNumber: 0,
    getFPS: function() {
        this.frameNumber++;
        var d = new Date().getTime(),
                currentTime = (d - this.startTime) / 1000,
                result = Math.floor((this.frameNumber / currentTime));
        if (currentTime > 1) {
            this.startTime = new Date().getTime();
            this.frameNumber = 0;
        }
        return result;
    }
};
var crossX = 0;
var crossY = 0;
var mouse_offsetx = 0;
var mouse_offsety = 0;
var archer;
window.onload = function()
{
    initGame(); // SETUP GAME
    gameLoop(); // Vong lap
};
// load game
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
//                                    setInterval(callback, 1000 / 30);
                                    window.setTimeout(callsback, 1000 / 60);
                                };
                    }
            )();
}

// function draw image sprite // Ve hinh chuyen dong

function drawIMG(imageObj, x, y, sourceWidth, sourceHeight, destX, destY)
{
    var destWidth = sourceWidth * _TI_LE;
    var destHeight = sourceHeight * _TI_LE;
    context.drawImage(imageObj, x, y, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
}
// Bat dau chay game
function initGame()
{
    load_bow_arrows(); //load ten
    load_ball_img(); //load img
    load_bow_archer();
    background = new Image(); //load img bg
    background.src = "img/cutebg.gif";
    background2 = new Image(); //load img bg
    background2.src = "img/bg.png";
    crossImage = new Image(); //load img
    crossImage.src = "img/crosshair.png";
//    crossImage = new Image(); //load img
//    crossImage.src = "img/crosshair.png";

    broad = new Image(); //load img
    broad.src = "img/luotban.png";
    f = document.getElementById("fpscontainer"); //load id fps

    canvas = document.getElementById("myCanvas");
    context = canvas.getContext("2d");
}

//function showFps()
//{
//    f.innerHTML = 'Curent FPS:' + fps.getFPS(); //show ra fps
//}
function gameLoop()
{
    if (_PAUSE !== true) {
        updateGame();
        paintGame();
    }
    requestAnimationFrame(gameLoop);
    updateHoldtime();
//    showFps();

}
function clear()
{
    context.clearRect(0, 0, canvas.width, canvas.height);
}
function pause()
{
    _PAUSE = !_PAUSE;
}

function updateGame()
{
    //show score
    message = score;
    message2 = 'Số tên: ' + _SO_LUONG_MUI_TEN;
    //Khoang cach toi thieu cac bong xuat hien
    if (khoangcach >= _KHOANG_CACH_CAC_BONG)
        if (Math.random() < (1 / 50))
        {
            Balls.push(new Ballon((350 + Math.floor(Math.random() * (canvas.width - 400))), Math.floor(canvas.height), 70, 83, Color[(Math.floor(Math.random() * Color.length))]));
            khoangcach = 0;
        }

    khoangcach = khoangcach + _TOC_DO_BONG;
    if (Balls.length > 0) {
        for (var k = 0; k < Balls.length; k++) {    // kiem tra neu bong bay len vien thi xoa
            Balls[k].posY = Balls[k].posY - _TOC_DO_BONG;
            if (Balls[k].posY < (-Balls[k].height))
            {
                Balls.splice(k, 1);
            }
        }
    }
    for (var j = 0; j < Arrow.length; j++) {     // kiem tra ten bay cham vien thi xoa
//            Arrow[j].speedX = speedX; // Toc do di chuyen cua bong theo chieu x khong doi
        Arrow[j].speedY = Arrow[j].speedY + _TRONG_LUC; // Trong luc la 0.5
        Arrow[j].angle = tinhgoc(Arrow[j].speedX, Arrow[j].speedY); //tinh goc cua mui ten
        Arrow[j].posX = Arrow[j].posX + Arrow[j].speedX;
        Arrow[j].posY = Arrow[j].posY + Arrow[j].speedY;
        /*
         * Kiem tra toa do khi xoay chuot tinh toa do khi xoay chuot:
         *  x‟ = cos(alpha) * x − sin(alpha) * y;
         *  y‟ = sin(alpha) * x + cos(alpha) * y;
         *  Cach thuc: tinh toa do cua dau mui ten khi xoay voi X = chieu dai mui ten Y = chieu cao mui ten
         */

        x = Math.cos(Arrow[j].angle) * (Arrow[j].width - 15 - Arrow[j].daumuiten_x) - Math.sin(Arrow[j].angle) * (Arrow[j].height / 2 - Arrow[j].daumuiten_y / 2);
        y = Math.sin(Arrow[j].angle) * (Arrow[j].width - 15 - Arrow[j].daumuiten_x) + Math.cos(Arrow[j].angle) * (Arrow[j].height / 2 - Arrow[j].daumuiten_y / 2);
        if (Arrow[j].posX + x >= canvas.width || Arrow[j].posY + y > canvas.height)
        {
            Arrow.splice(j, 1); //xoa bong
            flag = true; //cho phep nap ten
            power_bar = 0; //Thanh thuc tro ve 0
        }
    }

    if (Arrow.length > 0)
        for (var j = 0; j < Arrow.length; j++)
        {
            for (var i = 0; i < Balls.length; i++) {

                /*Huong giai quyet:
                 *Ve mot hinh vuong tai dau mui ten sau do so sanh va cham giua dau mui ten va qua bong 
                 */
//                 context.rect(Arrow[j].posX + x, Arrow[j].posY + y + (bow.height * _TI_LE / 2), Arrow[j].daumuiten_x, Arrow[j].daumuiten_y);
                if (intersectRect((Arrow[j].posX + x), (Arrow[j].posY + y + (bow.height * _TI_LE / 2)), Arrow[j].daumuiten_x, Arrow[j].daumuiten_y,
                        Balls[i].posX + 10, Balls[i].posY + 5, Balls[i].width - 20, Balls[i].height - 10)) {
                    Balls_pop.push(new Balls_poping(Balls[i].posX, Balls[i].posY, 70, 54, 20));
                    Balls[i].sound.play();
                    Balls.splice(i, 1);
                    score = score + 1;
                    break;
                }
            }
        }

    canvas.addEventListener("mousemove", handleEvent);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    rotateBow(mouse_offsetx, mouse_offsety);
    if (angle >= 0.7) {
        angle = 0.7;
    } else if (angle <= -0.2) {
        angle = -0.2;
    }

//    if (Balls_pop.length > 0)
    for (var i = 0; i < Balls_pop.length; i++) {
        Balls_pop[i].thoigian = Balls_pop[i].thoigian - 1;
        if (Balls_pop[i].thoigian <= 0) {
            Balls_pop.splice(i, 1);
        }
    }
}


function paintGame()
{
    clear(); // man hinh
    context.globalAlpha = 0.7;
    context.drawImage(background, 0, 0, 960, 540);
    context.globalAlpha = 1.0;
    drawIMG(broad, 0, 0, broad.width, broad.height, canvas.width - (broad.width * _TI_LE), (canvas.height - broad.height * _TI_LE));
    context.drawImage(background2, 0, -5, canvas.width, canvas.height);
    writeMessage(message, message2, message3); // viet tin nhan score
    for (var i = 0; i < Balls.length; i++)
    {
        drawIMG(Balls_images[Balls[i].color], 0, 0, Balls[i].width, Balls[i].height, Math.floor(Balls[i].posX), Math.floor(Balls[i].posY));
    }

    for (var j = 0; j < Arrow.length; j++)                  //Ban ten theo kieu xoay goc
    {
        /* Don't rorate arrow*/

//        drawIMG(arrow_image, 0, 0, Arrow[j].width, Arrow[j].height, Arrow[j].posX, Arrow[j].posY + bow.height * _TI_LE / 2);

        //Check head of arrow
//        context.beginPath();
//        context.rect((Arrow[j].posX + (Arrow[j].width * _TI_LE) - Arrow[j].daumuiten_x), (Arrow[j].posY + (bow.height * _TI_LE / 2) + (Arrow[j].daumuiten_x / 2)), Arrow[j].daumuiten_x, Arrow[j].daumuiten_y);
//        context.lineWidth = 1;
//        context.strokeStyle = "black";
//        context.stroke();
//        context.beginPath();
//        context.rect((Arrow[j].posX + x), (Arrow[j].posY + y + (bow.height * _TI_LE / 2)), Arrow[j].daumuiten_x, Arrow[j].daumuiten_y);
//        context.lineWidth = 1;
//        context.strokeStyle = "orange";
//        context.stroke();

        /*
         * Kiem tra toa do khi xoay chuot tinh toa do khi xoay chuot:
         *  x‟ = cos(alpha) * x − sin(alpha) * y;
         *  y‟ = sin(alpha) * x + cos(alpha) * y;
         *  Cach thuc: tinh toa do cua dau mui ten khi xoay voi X = chieu dai mui ten Y = chieu cao mui ten
         */

        x = Math.cos(Arrow[j].angle) * ((Arrow[j].width - Arrow[j].daumuiten_x - 20) * _TI_LE) - Math.sin(Arrow[j].angle) * (Arrow[j].height / 2 - Arrow[j].daumuiten_y / 2 - 20) * _TI_LE;
        y = Math.sin(Arrow[j].angle) * ((Arrow[j].width - Arrow[j].daumuiten_x - 20) * _TI_LE) + Math.cos(Arrow[j].angle) * (Arrow[j].height / 2 - Arrow[j].daumuiten_y / 2 - 20) * _TI_LE;

        /*Draw rolate arrow*/
        context.save(); //save curent to stuck
        context.translate(Arrow[j].posX, Arrow[j].posY + bow.height * _TI_LE / 2); //di chuyen con
        context.rotate(Arrow[j].angle);
        drawIMG(arrow_image, 0, 0, Arrow[j].width, Arrow[j].height, 0, 0);
        context.restore();
        /*Draw ball*/

        /* Rorate arrow*/
    }

    // cung thu
    context.save();
    context.translate(0, canvas.height * 0.5 - (archer.height * _TI_LE / 2));
    context.rotate(0.32);
    drawIMG(archer, 0, 0, archer.width, archer.height, 0, 0);
    context.restore();


    // Ve tam chuot + img co dinh

    context.drawImage(crossImage, crossX, crossY + (bow.height * _TI_LE * 0.5));
    // cho ban ten neu flas= true;

    context.save();
    context.translate((archer.width * _TI_LE) * 0.2, canvas.height * 0.5 + (archer.height * _TI_LE) * 0.29);
    context.rotate(-angle);

    drawIMG(bow, 0, 0, bow.width, bow.height, 0, -(bow.height * _TI_LE / 2));

    if (flag === true && _SO_LUONG_MUI_TEN > 0) {
        drawIMG(arrow_image, 0, 0, 70, 21, (bow.width * _TI_LE * 0.4), -(arrow_image.height * _TI_LE / 2));
    }

    context.restore();
//    if (holdStart !== null) {
//        alert(holdStart);
//    }
//    Thanh luc
    chargePower(30, canvas.height - 30, holdTime / 10); // ve thanh luc co chieu dai bang 10% thoi gian

    for (var i = 0; i < Balls_pop.length; i++)
    {
        drawIMG(Balls_poping_img, 0, 0, Balls_pop[i].width, Balls_pop[i].height, Balls_pop[i].posX, Balls_pop[i].posY);
    }

}

function handleEvent(mouseEvent, canvas)
{
    if (mouseEvent.offsetX) {
//        Mouse offset
        mouse_offsetx = mouseEvent.offsetX;
        mouse_offsety = mouseEvent.offsetY;

        crossX = mouse_offsetx - (crossImage.width / 2);
        crossY = mouse_offsety - (crossImage.height / 2);
//        document.getElementById("xycoordinates").innerHTML = "Coordinates: (" + crossX + "," + crossY + ")";
    } else {

        mouse_offsetx = mouseEvent.layerX - mouseEvent.currentTarget.offsetLeft;
        mouse_offsety = mouseEvent.layerY - mouseEvent.currentTarget.offsetTop;
        // tinh toa do con tro
        crossX = mouse_offsetx - (crossImage.width / 2);
        crossY = mouse_offsety - (crossImage.height / 2);
//        document.getElementById("xycoordinates").innerHTML = "Coordinates: (" + crossX + "," + crossY + ")";
    }
}

//bam chuot

function handleMouseDown(mouseEvent)
{
    if (_SO_LUONG_MUI_TEN > 0 && flag === true && is_charging !== true) {
        holdStart = Date.now(); // thoi gian bat dau
        is_charging = true;
    }
}

//cai chuot
function handleMouseUp(mouseEvent)
{
    if (_SO_LUONG_MUI_TEN <= 0 && flag === true) {
        updateImg(score);
        $('.cd-popup').addClass('is-visible');
        $('#diem').text(score);
    }
    if (flag === true && _SO_LUONG_MUI_TEN > 0 && holdStart !== null) {
        lock_angle = -angle; // GOC BAN 

        var lucban = ((Date.now() - holdStart) / 80);
        var speedX = lucban * Math.cos(lock_angle); // MOI GIAY BAM THI TOC DO MUI TEN SE TANG LEN
        var speedY = lucban * Math.sin(lock_angle); // MOI GIAY BAM THI TOC DO MUI TEN SE TANG LEN

        Arrow.push(new Ten(30, ((canvas.height * 0.5 + (archer.height * _TI_LE) * 0.29) - (bow.height * _TI_LE / 2)), 70, 21, lock_angle, lucban, speedX, speedY));
        fire.play();
        _SO_LUONG_MUI_TEN = _SO_LUONG_MUI_TEN - 1;
        flag = false;
        is_charging = false;
        holdStart = null;
    }
}

function intersectRect(x1, y1, width1, height1, x2, y2, width2, height2) {  // tinh va cham
    return !(x2 > x1 + width1 ||
            x2 + width2 < x1 ||
            y2 > y1 + height1 ||
            y2 + height2 < y1);
}
function writeMessage(message, message2) {
    context.font = '15pt Calibri';
    context.fillStyle = 'grey';
    context.fillText('Điểm:', canvas.width - (broad.width * _TI_LE) + (broad.width * _TI_LE) * 0.15, canvas.height - (broad.height * _TI_LE) + (broad.height * _TI_LE) * (55 / 100));
    context.font = '30pt Calibri';
    context.fillStyle = 'white';
    context.fillText(message, canvas.width - (broad.width * _TI_LE) + (broad.width * _TI_LE) * 0.5, canvas.height - (broad.height * _TI_LE) + (broad.height * _TI_LE) * 0.6);
    context.font = '15pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message2, canvas.width - (broad.width * _TI_LE) + (broad.width * _TI_LE) * 0.15, canvas.height - (broad.height * _TI_LE) + (broad.height * _TI_LE) * 0.25);
}

function rotateBow(targetX, targetY) {
    var dx = targetX;
    var dy = canvas.height / 2 - targetY;
    angle = Math.atan2(dy, dx);
}

function tinhgoc(targetX, targetY) {
    var dx = targetX;
    var dy = targetY;
    return Math.atan2(dy, dx);
}

function choilai() {
    _SO_LUONG_MUI_TEN = 20;
    score = 0;
    Balls = [];
    $('.cd-popup').removeClass('is-visible');
}


