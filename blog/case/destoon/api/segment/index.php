<?php
$mydata = '�߲�̫����ɱ���';
require 'pscws3.class.php';
$dict = 'dict.txt';
$cws = new PSCWS3($dict);
print_r($cws->segment($mydata));
?>