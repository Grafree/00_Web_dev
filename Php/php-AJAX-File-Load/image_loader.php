<?php 
session_start();

// Pour eviter que le navigateur mette dans la mémoire cache les fichiers charges.
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date dans le passé
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-cache, must-revalidate");
header("Pragma: no-cache"); 

define( '_PRODUITS_MAX_WEIGHT', 500000 );
define( '_PRODUITS_MAX_WIDTH', 300 );
define( '_PRODUITS_MAX_HEIGHT', 200 );

include_once( 'images.factory.php' );

if( isset( $_POST[ 'checkImageLoad' ] ) ){ // AJAX : Check Session exist
	if( isset( $_SESSION[ 'load' ] ) && $_SESSION[ 'load' ] == $_POST[ 'checkImageLoad' ] ){
		$_SESSION[ 'load' ] = null;
		echo 'processDone';
	}else{
		echo 0;
	}
	exit;
}

$process = '';
$message = '';
if( isset( $_GET[ 'load'] ) ){
	
	$process = insertproduit_images();
		
	if( $process == 'champvide' ){
		
		$message = "Vous n'avez pas complété les informations correctement.";
		
	}else if( $process == 'imagetaille' ){
		
		$message = "L'image doit avoir un format horizontal (paysage)";
		
	}else if( $process == 'imagepoids' ){
		
		$message = "La poids de l'image excède celle tolérée de ".substr( round( _PRODUITS_MAX_WEIGHT, -5), 0, -3)."Ko.";
		
	}else if( $process == 'format' ){
		
		$message = "Seuls les formats JPEG ou GIF ou PNG sont acceptés pour les images.";
		
	}else if( $process == 'sqlerror' ){
		
		$message = "Un problème est survenu lors de l'opération. Veuillez en informer l'administrateur du système.";
		
	}else if( $process == 'problemeimage' ){
		
		$message = "Un problème est survenu lors du chargement de l'image. Essayez de nouveau.";
		
	}
}

?>
<?php
if( isset( $_GET[ 'load'] ) || isset( $_GET[ 'init' ] ) ){
	?>
	<!doctype html>
	<html>
	<head>
	<style>
	body{font-size:11px; margin:0; padding:0; font-family:Verdana, "Trebuchet MS", Arial, Helvetica, sans-serif; }
	input, input.champ{margin:0; border:1px solid #a5a5a5; background:#fff; width:226px; font-size:10px; padding:2px 4px;}
	input.admin_submit{display:block; cursor:pointer; color:#fff; margin:10px 10px 0px 0px; font-size:11px; font-weight:bold; width:auto; line-height:40px; height:40px; white-space:nowrap; padding:2px 30px 4px 30px; background:#0c1f35 url(../images/site/btn-galerie-bkg.png) repeat-x; border-radius:5px; border:3px solid #000;}
	</style>
	<script type="text/javascript">
	<?php
	if( isset( $_GET[ 'load'] ) && $process == 'ok' ){
		?>
		window.onload = function(){ 
			setInterval( function(){
				document.location.href='image_loader.php?init=set'; 
			}, 3000 );
				
		}
		<?php
	}
	?>
	</script>
	</head>
	<body>
	<?php
	if( isset( $_GET[ 'load'] ) && $process == 'ok' ){
		$_SESSION[ 'load' ] = 'fileLoaded';
		?>
		<img style="display:block; margin:50px auto;" src="images/ajax-loader.gif" />
		<?php
	}else{ 
		?>
		<form method="post" enctype="multipart/form-data" action="image_loader.php?load=do">
		<strong>Image</strong> <br /><?php echo 'format horitzontal - max. : '.substr( round( _PRODUITS_MAX_WEIGHT, -5), 0, -3).'Ko'; ?> :<br />
        <?php echo 'Elle sera redimensionnée ('._PRODUITS_MAX_WIDTH.'px x '._PRODUITS_MAX_HEIGHT.'px)'; ?>
        <br /><br />
		<?php 
		if( $message != '' ){
			echo '<span style="color:red;">'.$message.'</span><br />';
		}
		?>
		<input name="ImageFile" type="file" /><br /><br />
		<input type="submit" class="admin_submit" value="Charger l'image" name="AjouterMenu" align="middle" />
		</form>
		<?php
	}
	?>
	</html>
	<?php
}
?>