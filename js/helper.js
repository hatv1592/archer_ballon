jQuery(document).ready(function($) {
    //close popup

    $('.cd-popup').on('click', function(event) {
        if ($(event.target).is('.cd-popup-close')) {
            event.preventDefault();
//            $(this).removeClass('is-visible');
        }
    });
    //close popup when clicking the esc keyboard button
//    $(document).keyup(function(event) {
//        if (event.which == '27') {
//            $('.cd-popup').removeClass('is-visible');
//        }
//    });
});
function makeUnique()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
function updateImg(score) {
    var img_name;
    if (score <= 35 && score >= 0) {
        img_name = score;
    } else {
        img_name = null;
    }
    if (img_name !== null) {
        $('#baner_img').attr('src', 'img/score/score' + img_name + '.png');
    } else {
        $('#baner_img').attr('src', 'img/score/default.png');
    }
}
function changeUrlImg() {

}
