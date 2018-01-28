<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title></title>
<script type="text/javascript">
function colorPickerDisplay( element, iDCP ){	
	
	if( document.getElementById( 'colorPicker_' + iDCP ) ){
		element.removeChild( document.getElementById( 'colorPicker_' + iDCP ) );
	}else{
	
	var elementPosition = element.style.position;
	element.style.position = 'relative'; 

	var divCP = document.createElement( 'div' );
	divCP.setAttribute( 'id', 'colorPicker_' + iDCP );
	divCP.setAttribute( 'style', 'display:block; position:absolute; top:15px; width:136px; min-height:10px; padding:1px; background-color:#fff; box-shadow:0 1px 4px #666;');
	element.appendChild( divCP );

	<?php 
	$couleurs = glob( 'couleurs/*.png' );
	foreach( $couleurs as $couleur ){ ?>
		var imgCP = document.createElement( 'img' );
		imgCP.setAttribute( 'style', 'display:block; float:left; border:1px solid #fff; width:15px; height:15px; cursor:pointer;' );
		imgCP.setAttribute( 'src', '<?php echo $couleur; ?>' );
		imgCP.onmouseover = function(){ this.style.borderColor = '#000'; }
		imgCP.onmouseout = function(){ this.style.borderColor = '#fff'; }
		imgCP.onclick = function(){ 
			document.getElementById( 'field_' + iDCP ).value = '<?php echo str_replace( 'couleurs/', '', $couleur ); ?>';
			document.getElementById( 'img_' + iDCP ).src = '<?php echo $couleur; ?>';
			element.style.position = elementPosition; 
		}
		divCP.appendChild( imgCP );
		<?php  
	}
	?>
	
	}
}

</script>
</head>
<body>

<span style="display:block; float:left;" onclick="colorPickerDisplay( this, 'colorpicker' );">
<img style="display:block; float:left; margin:0 6px 0 0;" id="img_colorpicker" src="couleurs/w-0.png">
</span>
<input name="Couleur" id="field_colorpicker" type="text" value="w-0.png" />

</body>
</html>
