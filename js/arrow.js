

function load_bow_arrows()
{
    arrow_image = new Image();
    arrow_image.src = "img/arror.png";
    bow = new Image();
    bow.src = "img/arror2.png";
}
function load_bow_archer()
{
    archer = new Image();
    archer.src = "img/zamba_nude.png";
    fire = new Audio();
    fire.src = "audio/bow_fire.mp3";
}

function Ten(posX, posY, width, height, angle, lucban, speedX, speedY)
{
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.lucban = lucban;
    this.speedX = speedX;
    this.speedY = speedY;
    this.daumuiten_x = 7;
    this.daumuiten_y = 7;
}
function chargePower(x, y, power)
{
    context.beginPath();    //bat dau ve
    context.rect(x, y, power, 5);
    context.fillStyle = 'red'; // to màu bên trong hình chữ nhật
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = 'black'; // màu đường thẳng
    context.stroke();
}
function updateHoldtime() {
    if (holdStart !== null && holdStart !== 0) {
        holdTime = Date.now() - holdStart;
        if (holdTime >= 1500) {
            if (_SO_LUONG_MUI_TEN > 0) {
                lock_angle = -angle; // GOC BAN 
                var lucban = ((Date.now() - holdStart) / 80);
                var speedX = lucban * Math.cos(lock_angle); // MOI GIAY BAM THI TOC DO MUI TEN SE TANG LEN
                var speedY = lucban * Math.sin(lock_angle); // MOI GIAY BAM THI TOC DO MUI TEN SE TANG LEN
                Arrow.push(new Ten(30, (canvas.height * 0.5 + (archer.height * _TI_LE) * 0.29) - (bow.height * _TI_LE / 2), 70, 21, lock_angle, lucban, speedX, speedY));
                fire.play();
                _SO_LUONG_MUI_TEN = _SO_LUONG_MUI_TEN - 1;
                flag = false;
                is_charging = false;
                holdStart = null;
                holdTime = null;
            }
        }
    }
//function updateHoldtime() {
//    if (holdStart !== null) {
//        holdTime = Date.now() - holdStart;
//        if (holdTime >= 2000) {
//            alert(1);
//        }
//    }
}
