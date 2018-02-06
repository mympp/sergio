<?php
require '../../../common.inc.php';
header('content-type:application/json;charset=utf-8');
//文件保存路径
    $date=date("Ymd");
    $data_str="/file/upload/".$date;
    $dir_str=DT_ROOT.$data_str;
    $photo_str=DT_PATH."file/upload/".$date;
    if(!file_exists($dir_str)){
       mkdir($dir_str);
    }
    $index = 0;        //$_FILES 以文件name为数组下标，不适用foreach($_FILES as $index=>$file)
    $upload_file_name = 'upload_file' . $index;        //对应index.html FomData中的文件命名
    //上传格式
    $allow = array('image/jpeg','image/jpg','image/png','image/bmp');
    $type=$_FILES[$upload_file_name]['type'];
    if(!in_array($type,$allow)){
        // 非法后缀名
        $type_str=implode(',',$allow);
        exit(json_encode(array('code'=>'0','message'=>'图片格式不对 , 只能是'.$type_str),JSON_UNESCAPED_UNICODE));
     }
    $type=trim(strstr($type,'/'),'/');

    $tiem_str=time().mt_rand(10,1000);
    $photo=$dir_str.'/'.$tiem_str.'.'.$type;
    $photo_url=$photo_str.'/'.$tiem_str.'.'.$type;;  
    $MAXIMUM_FILESIZE = 3 * 1024 * 1024;     //文件大小限制    1M = 1 * 1024 * 1024 B;
    if($_FILES[$upload_file_name]['size'] > $MAXIMUM_FILESIZE){
      exit(json_encode(array('code'=>'2','message'=>'图片大小不能大于3M'),JSON_UNESCAPED_UNICODE));
    }
    $isMoved = @move_uploaded_file ( $_FILES[$upload_file_name]['tmp_name'], $photo);        //上传文件
    
    if($isMoved){  
        exit(json_encode(array('code'=>'1','img'=>$photo_url,'message'=>'上传成功'),JSON_UNESCAPED_UNICODE));
    }else{
        exit(json_encode(array('code'=>'3','message'=>'上传失败'),JSON_UNESCAPED_UNICODE));
    }