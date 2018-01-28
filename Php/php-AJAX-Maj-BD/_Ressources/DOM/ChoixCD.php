<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <link rel="stylesheet" type="text/css" href="top5.css" />
  <script type="text/javascript" src="top5.js"> </script>
<title>Choix de CD</title>
</head>

<body onload="ajouterOnClickImg()">
<?PHP
include('dom_inc_top5.php');
$mimg = new img;
$list_img = $mimg->list_img();
?>
<div id="instructions">Pour ajouter un CD à votre liste des favoris (max 5 cd par choix) il suffit de cliquer sur l'image correspondante. Vous pouvez refaire votre choix avec le bouton "Recommencer".
</div>
<div id="cd">
<?PHP
    //echo 'nb CD = '.count($list_img);
	for ($i=0;$i<count($list_img);$i++)
	
	{
		//echo '<br>'.$list_img[$i][2].$list_img[$i][1].'<br>';
		echo '<img class="pochette" src="'.$list_img[$i][2].$list_img[$i][1].'" />';
		echo'   ';
	}
?>
</div>
<div id="liste-top5">
    <hr />
    <h4> Liste des 5 CD favoris</h4>
    <hr />
    <div id="top5">
    </div>
</div>
<form name="cdFrm" method="post">
	<input type="button" value="Recommencer" onclick="recommencer()"/>
</form>        
</body>
</html>