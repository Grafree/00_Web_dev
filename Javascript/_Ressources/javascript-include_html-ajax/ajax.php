<?php
 
$page=$_GET['page'];
     if($page==1)require 'page1.html';
else if($page==2)require 'page2.html';
else if($page==3)require 'page3.html';
else require 'page4.html';
 
?>
