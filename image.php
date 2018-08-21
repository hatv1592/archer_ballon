<?php

$user = array('ten' => 'ten', 'toc_do_go' => '120', 'chuan_xac' => '75%');
$name = $user['name'];
$avt = imagecreatefromjpeg($headers['Location']); //Lấy thông tin tấm ảnh
$image = imagecreatefromjpeg('chitiet_cauthu.jpg');
//Thiet lam mau cho text
$color_blue = imagecolorexact($image, 0, 122, 36);
$color_dark = imagecolorexact($image, 0, 0, 0);
$color_white = imagecolorexact($image, 255, 255, 255);
$color_red = imagecolorallocate($image, 162, 19, 19);
$color_yellow = imagecolorallocate($image, 214, 214, 0);
//end Thiet lam mau cho text
imagecopymerge($image, $avt, 20, 5, 0, 0, 180, 200, 100); //Ghi hình vào background
imagefttext($image, 24, 0, 227, 30, $color_blue, 'arial_bold.ttf', $name); //Ghi tên lên background
//Ghi info 
imagefttext($image, 12, 0, 240, 60, $color_dark, 'arial_bold.ttf', 'Quốc Tịch : ');
imagefttext($image, 12, 0, 340, 60, $color_dark, 'ARIAL.TTF', $quoctich);
imagefttext($image, 12, 0, 240, 90, $color_dark, 'arial_bold.ttf', 'Ngày Sinh : ');
imagefttext($image, 12, 0, 340, 90, $color_dark, 'ARIAL.TTF', $birthday);
imagefttext($image, 12, 0, 240, 120, $color_dark, 'arial_bold.ttf', 'Vị Trí : ');
imagefttext($image, 12, 0, 340, 120, $color_dark, 'ARIAL.TTF', $vitri);
imagefttext($image, 12, 0, 240, 150, $color_dark, 'arial_bold.ttf', 'CLB hiện tại : ');
imagefttext($image, 12, 0, 340, 150, $color_dark, 'ARIAL.TTF', ' Sutzo.com');
imagefttext($image, 12, 0, 240, 180, $color_dark, 'arial_bold.ttf', 'Bạn giống cầu thủ : ');
imagefttext($image, 12, 0, 400, 180, $color_dark, 'ARIAL.TTF', $name_player);
$line = imagecreate(89, 9);
//--------------------Tan Cong------------------------------
//--------------------------Lay do dai proset--------------------
//do rong proset	
$w_img = (int) substr($row['attack'], 29, 2) * 2;
//thong tin proset	
$w = (int) substr($row['attack'], 29, 2);
//thiet lap thanh proset
$arr = creat_color_posset($w, $image);
//var_dump($arr);exit();	
//Thông tin chi tiết 
imagecopymerge($image, $line, 240, 300, 2, 2, 200, 10, 100); //Ghi hình vào background
imagefttext($image, 12, 0, 450, 310, $arr['color_text'], 'arial_bold.ttf', $w);
imagecopymerge($image, $arr['color_pro'], 240, 300, 2, 2, $w_img, 10, 100); //Ghi hình vào background
//End Thông tin chi tiết 
//------------------------Phong Thu------------------------------
//--------------------------Lay do dai proset--------------------
//do rong proset	
$w_img = (int) substr($row['defence'], 29, 2) * 2;
//thong tin proset	
$w = (int) substr($row['defence'], 29, 2);
//End Lay do dai proset
//Thiet lap mau proset
$arr = creat_color_posset($w, $image);
//end Thiet lap mau proset
//Thông tin chi tiết 
imagecopymerge($image, $line, 240, 330, 2, 2, 200, 10, 100); //Ghi hình vào background
imagefttext($image, 12, 0, 450, 340, $arr['color_text'], 'arial_bold.ttf', $w);
imagecopymerge($image, $arr['color_pro'], 240, 330, 2, 2, $w_img, 10, 100); //Ghi hình vào background
//End Thông tin chi tiết
//------------------------Ky Thuat------------------------------
//--------------------------Lay do dai proset--------------------
//do rong proset	
$w_img = (int) substr($row['ball_controll'], 29, 2) * 2;
//thong tin proset	
$w = (int) substr($row['ball_controll'], 29, 2);
//End Lay do dai proset//Thiet lap mau proset
$arr = creat_color_posset($w, $image);
//end Thiet lap mau proset
//Thông tin chi tiết 
imagecopymerge($image, $line, 240, 360, 2, 2, 200, 10, 100); //Ghi hình vào background
imagefttext($image, 12, 0, 450, 370, $arr['color_text'], 'arial_bold.ttf', $w);
imagecopymerge($image, $arr['color_pro'], 240, 360, 2, 2, $w_img, 10, 100); //Ghi hình vào background
//End Thông tin chi tiết  
//------------------------Danh dau------------------------------
//--------------------------Lay do dai proset--------------------
//do rong proset	
$w_img = (int) substr($row['header_accuracy'], 29, 2) * 2;
//thong tin proset	
$w = (int) substr($row['header_accuracy'], 29, 2);
//End Lay do dai proset//Thiet lap mau proset
$arr = creat_color_posset($w, $image);
//end Thiet lap mau proset
//Thông tin chi tiết 
imagecopymerge($image, $line, 240, 390, 2, 2, 200, 10, 100); //Ghi hình vào background
imagefttext($image, 12, 0, 450, 400, $arr['color_text'], 'arial_bold.ttf', $w);
imagecopymerge($image, $arr['color_pro'], 240, 390, 2, 2, $w_img, 10, 100); //Ghi hình vào background
//End Thông tin chi tiết
//------------------------Chuyen bong------------------------------
//--------------------------Lay do dai proset--------------------
//do rong proset	
$w_img = (int) substr($row['short_pass_accuracy'], 29, 2) * 2;
//thong tin proset	
$w = (int) substr($row['short_pass_accuracy'], 29, 2);
//End Lay do dai proset//Thiet lap mau proset
$arr = creat_color_posset($w, $image);
//end Thiet lap mau proset
//Thông tin chi tiết 
imagecopymerge($image, $line, 240, 420, 2, 2, 200, 10, 100); //Ghi hình vào background
imagefttext($image, 12, 0, 450, 430, $arr['color_text'], 'arial_bold.ttf', $w);
imagecopymerge($image, $arr['color_pro'], 240, 420, 2, 2, $w_img, 10, 100); //Ghi hình vào background
//End Thông tin chi tiết 
//------------------------Sut chinh xac------------------------------
//--------------------------Lay do dai proset--------------------
//do rong proset	
$w_img = (int) substr($row['shot_accuracy'], 29, 2) * 2;
//thong tin proset	
$w = (int) substr($row['shot_accuracy'], 29, 2);
//End Lay do dai proset//Thiet lap mau proset
$arr = creat_color_posset($w, $image);
//end Thiet lap mau proset
//Thông tin chi tiết 
imagecopymerge($image, $line, 240, 450, 2, 2, 200, 10, 100); //Ghi hình vào background
imagefttext($image, 12, 0, 450, 460, $arr['color_text'], 'arial_bold.ttf', $w);
imagecopymerge($image, $arr['color_pro'], 240, 450, 2, 2, $w_img, 10, 100); //Ghi hình vào background
//End Thông tin chi tiết  
//------------------------Luc sut------------------------------
//--------------------------Lay do dai proset--------------------
//do rong proset	
$w_img = (int) substr($row['kicking_power'], 29, 2) * 2;
//thong tin proset	
$w = (int) substr($row['kicking_power'], 29, 2);
//End Lay do dai proset//Thiet lap mau proset
$arr = creat_color_posset($w, $image);
//end Thiet lap mau proset
//Thông tin chi tiết 
imagecopymerge($image, $line, 240, 480, 2, 2, 200, 10, 100); //Ghi hình vào background
imagefttext($image, 12, 0, 450, 490, $arr['color_text'], 'arial_bold.ttf', $w);
imagecopymerge($image, $arr['color_pro'], 240, 480, 2, 2, $w_img, 10, 100); //Ghi hình vào background
//End Thông tin chi tiết 
//------------------------Toc Do------------------------------
//--------------------------Lay do dai proset--------------------
//do rong proset	
$w_img = (int) substr($row['top_speed'], 29, 2) * 2;
//thong tin proset	
$w = (int) substr($row['top_speed'], 29, 2);
//End Lay do dai proset//Thiet lap mau proset
$arr = creat_color_posset($w, $image);
//end Thiet lap mau proset
//Thông tin chi tiết 
imagecopymerge($image, $line, 240, 510, 2, 2, 200, 10, 100); //Ghi hình vào background
imagefttext($image, 12, 0, 450, 520, $arr['color_text'], 'arial_bold.ttf', $w);
imagecopymerge($image, $arr['color_pro'], 240, 510, 2, 2, $w_img, 10, 100); //Ghi hình vào background
//End Thông tin chi tiết  
//header("Content-type: image/jpeg"); 
imagejpeg($image, $fname, 90);
imagedestroy($image);
//--Post image len tuong va luu photoid
//--Lay player_id va ten cau thu
$player_id = $row['player_id'];
//--End Lay player_id va ten cau thu
$user = $facebook->api('/me');
$post_photo = $facebook->api('/me/photos', 'POST', array(
    'link' => 'http://www.facebook.com/sutzovn?sk=app_208195102528120',
    'source' => '@' . realpath($fname),
    'message' => "Để đo chỉ số của bạn click vào đây : http://www.facebook.com/sutzovn?sk=app_208195102528120 - $name giống cầu thủ $name_player : http://sutzo.com/player_info.html?player_id=$player_id",
        )
);
$_SESSION['photoid'] = $post_photo['id'];
?>

