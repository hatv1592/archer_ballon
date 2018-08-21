function load_ball_img() {
    for (var i = 1; i <= Color.length; i++) {
        Balls_images[i] = new Image();
        Balls_images[i].src = "img/bong" + i + ".png";
    }
    Balls_poping_img = new Image();
    Balls_poping_img.src = "img/balloon-pop-md.png";
    ballomshot = new Audio();
    ballomshot.src = "audio/balloon_popping.mp3";
}

function Ballon(x, y, width, height, color)
{
    this.posX = x;
    this.posY = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.sound = ballomshot;
}
function Balls_poping(x, y, width, height, thoigian)
{
    this.posX = x;
    this.posY = y;
    this.width = width;
    this.height = height;
    this.thoigian = thoigian;

}