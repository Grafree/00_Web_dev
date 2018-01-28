<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Untitled Document</title>
<script type="text/javascript">

	function refreshCounter(){
		
		if( cdCounter == 0 ) window.location.href = "resultat.php";
		
		var cdDisplay = document.getElementById( 'countdown' );
		
		if ( cdCounter <= 5 ) cdDisplay.style.color = '#FF0000';
		else if ( ( cdCounter > 5 )&&( cdCounter < 15 ) ) cdDisplay.style.color = '#00FF00';
		
		cdDisplay.innerHTML = cdCounter;
		
		cdCounter--;
		
	}
	
	window.onload = function(){
		
		<?php // Temps defini envoye par la methode post
		if( isset( $_POST[ 'time' ] ) ) echo 'cdCounter ='.( $_POST[ 'time' ] ).';';		
		else echo 'cdCounter = 45;'; 
		?>

		setInterval( function(){ refreshCounter(); }, 1000 );

	}
		
</script>

	</head>
	<body>
	<span id="countdown"></span>
	</body>
</html>
