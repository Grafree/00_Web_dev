<?php 
header("Access-Control-Allow-Origin:*" );
   
$datas = ['nom'=>'Neita', 'prenom'=>'Mario'];

$json = json_encode( $datas,  JSON_UNESCAPED_UNICODE );

echo $json;

exit;