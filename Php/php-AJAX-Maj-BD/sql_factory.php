<?php
include('model/services/config.php');

if( isset( $_POST['insert'] ) ){
		
	$NomMembre = $_POST['NomMembre'];
	$PrenomMembre = $_POST['PrenomMembre'];
	$GenreMembre = $_POST['GenreMembre'];
	$ActifMembre = $_POST['ActifMembre'];
	$CommentMembre = $_POST['CommentMembre'];
	
	if( $NomMembre != '' && $PrenomMembre != '' ){
		$sql = 'INSERT INTO membres VALUES ( 
				NULL, 
				\''.$NomMembre.'\', 
				\''.$PrenomMembre.'\', 
				\''.$GenreMembre.'\', 
				\''.$ActifMembre.'\', 
				\''.$CommentMembre.'\'
				)';
		mysql_query( $sql ); 
		echo 'okinsert';
	}else{
		echo 'noFilledInsert';
	}
}


if( isset( $_POST['update'] ) ){
		
	$NomMembre = $_POST['NomMembre'];
	$PrenomMembre = $_POST['PrenomMembre'];
	$GenreMembre = $_POST['GenreMembre'];
	$ActifMembre = $_POST['ActifMembre'];
	$CommentMembre = $_POST['CommentMembre'];
	$IdMembre = $_POST['membre'];
	
	if( $NomMembre != '' && $PrenomMembre != '' ){
		$sql = 'UPDATE membres SET 
			NomMembre = \''.$NomMembre.'\',  
			PrenomMembre = \''.$PrenomMembre.'\' ,  
			GenreMembre = \''.$GenreMembre.'\',  
			ActifMembre = \''.$ActifMembre.'\',  
			CommentMembre = \''.$CommentMembre.'\'
			WHERE IdMembre = \''.$IdMembre.'\'';
		mysql_query( $sql ); 
		echo 'okupdate';
	}else{
		echo 'noFilledUpdate';
	}
}


if( isset( $_POST['ChangeActifMembre'] ) ){
		
	if( $_POST['ChangeActifMembre'] == 1 ) $ChangeActifMembre = '0'; else $ChangeActifMembre = '1';
	$IdMembre = $_POST['membre'];

		$sql = 'UPDATE membres SET   
			ActifMembre = \''.$ChangeActifMembre.'\'
			WHERE IdMembre = \''.$IdMembre.'\'';
		mysql_query( $sql ); 
	
	if( $_POST['ChangeActifMembre'] == 1 ){
		echo 'changeUnactive';
	}else{
		echo 'changeActive';
	}
}


if( isset( $_POST['delete'] ) ){

	$IdMembre = $_POST['Element'];
	
	$sql = 'DELETE FROM membres WHERE IdMembre = \''.$IdMembre.'\'';
	mysql_query( $sql ); 

}
?>