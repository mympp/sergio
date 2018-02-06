<?php 
require 'common.inc.php';
$from=!empty($_POST['from'])?$_POST['from']:'';
$id=!empty($_POST['id'])?$_POST['id']:"";
$name=!empty($_POST['name'])?$_POST['name']:"";
// @file_put_contents('1.txt',$from."----".$id."----".$name);
// 
if(empty($from) || empty($id) || empty($name)){
  $data=array("code"=>0,"message"=>"图片上传失败");
  echo json_encode($data,JSON_UNESCAPED_UNICODE);
  die;
}
//验证规则
$r = $db->get_one("SELECT * FROM {$DT_PRE}member where userid={$id}");
if(empty($r)){
  $data=array("code"=>0,"message"=>"图片上传失败");
  echo json_encode($data,JSON_UNESCAPED_UNICODE);
  die;
}
$username=$r['username'];
//加密比较
$guizhe="ahsgdhagegadajfgoqbvh";
$sha_name=sha1($username.$guizhe);
if($sha_name === $name){
  $name=$username;
  //@file_put_contents("name.txt",$name);
}else{
  $data=array("code"=>0,"message"=>"图片上传失败");
  echo json_encode($data,JSON_UNESCAPED_UNICODE);
  die;
}


createimage($id,$from,"id");
createimage($name,$from,"name");
$data=array("code"=>1,"message"=>"图片上传成功");
echo json_encode($data,JSON_UNESCAPED_UNICODE);
function createimage($value,$from,$key){
	$res=getimagesize($from);
	// if($res[0]<128 || $res[1]<128){
 //       $data=array("code"=>0,"message"=>"图片小于128px");
 //       echo json_encode($data,JSON_UNESCAPED_UNICODE);
 //       exit;
	// }
	$md5=md5($value);
	$ut=substr($md5, 0, 2);
	$ut2=substr($md5, 2, 2);
	
	if($key=="name"){   
	   if(!is_dir('./file/avatar/'.$ut.'/'.$ut2)){
        $res=mkdir(iconv("UTF-8", "GBK", './file/avatar/'.$ut.'/'.$ut2),0777,true);
	   }
       $filename='./file/avatar/'.$ut.'/'.$ut2.'/_'.$value.".jpg";
	   $filename20='./file/avatar/'.$ut.'/'.$ut2.'/_'.$value."x20.jpg";
	   $filename48='./file/avatar/'.$ut.'/'.$ut2.'/_'.$value."x48.jpg";
	}
	if($key=="id"){
	   if(!is_dir('./file/avatar/'.$ut.'/'.$ut2)){
        $res=mkdir(iconv("UTF-8", "GBK", './file/avatar/'.$ut.'/'.$ut2),0777,true);
	   }
	   $filename='./file/avatar/'.$ut.'/'.$ut2.'/'.$value.".jpg";
	   $filename20='./file/avatar/'.$ut.'/'.$ut2.'/'.$value."x20.jpg";
	   $filename48='./file/avatar/'.$ut.'/'.$ut2.'/'.$value."x48.jpg";
	}
	
	imagepress($from,128,128,$filename);
	imagepress($from,48,48,$filename48);
	imagepress($from,20,20,$filename20);
}
function imagepress($filepath, $new_width, $new_height,$file){
    // ini_set('gd.jpeg_ignore_warning', 1);  
	$source_info   = getimagesize($filepath);  
	$source_width  = $source_info[0];  
	$source_height = $source_info[1];  
	$source_mime   = $source_info['mime'];  
	$source_ratio  = $source_height / $source_width;  
	$target_ratio  = $new_height / $new_width;  
	// 源图过高  
	if ($source_ratio > $target_ratio)  
	{  
	$cropped_width  = $source_width;  
	$cropped_height = $source_width * $target_ratio;  
	$source_x = 0;  
	$source_y = ($source_height - $cropped_height) / 2;  
	}  
	// 源图过宽  
	elseif ($source_ratio < $target_ratio)  
	{  
	$cropped_width  = $source_height / $target_ratio;  
	$cropped_height = $source_height;  
	$source_x = ($source_width - $cropped_width) / 2;  
	$source_y = 0;  
	}  
	// 源图适中  
	else  
	{  
	$cropped_width  = $source_width;  
	$cropped_height = $source_height;  
	$source_x = 0;  
	$source_y = 0;  
	}  
	switch ($source_mime)  
	{  
		case 'image/gif':  
			$source_image = imagecreatefromgif($filepath);  
		break;  
		case 'image/jpeg':  
			$source_image = imagecreatefromjpeg($filepath);  
		break;  
		case 'image/png':  
			$source_image = imagecreatefrompng($filepath);  
		break;  
		default:  
		return false;  
		break;  
	}  
	$target_image  = imagecreatetruecolor($new_width, $new_height);  
	$cropped_image = imagecreatetruecolor($cropped_width, $cropped_height);  
	// 裁剪  
	imagecopy($cropped_image, $source_image, 0, 0, $source_x, $source_y, $cropped_width, $cropped_height);  
	// 缩放  
	imagecopyresampled($target_image, $cropped_image, 0, 0, 0, 0, $new_width, $new_height, $cropped_width, $cropped_height);  
	unlink($file);
	header('Content-Type: image/jpeg');  
	imagejpeg($target_image,$file,80);  
	imagedestroy($source_image);  
	imagedestroy($target_image);  
	imagedestroy($cropped_image);  
}  

?>