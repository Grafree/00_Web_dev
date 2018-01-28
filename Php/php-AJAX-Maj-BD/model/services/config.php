<?php
$connect = mysql_connect( 'localhost', 'root', 'mysql' );
mysql_select_db( 'atelierphppoo', $connect );

header('Content-Type: text/html; charset=UTF-8'); 
?>