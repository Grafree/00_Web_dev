<?php
/*
LA TABLE

 CREATE TABLE IF NOT EXISTS `membres` (
  `IdMembre` int(10) NOT NULL AUTO_INCREMENT,
  `NomMembre` varchar(50) NOT NULL,
  `PrenomMembre` varchar(50) NOT NULL,
  PRIMARY KEY (`IdMembre`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT AUTO_INCREMENT=1 ;
*/

/*
LA CLASSE
 */ 
class Bureau{

	private $Bureau;
	public $BureauFixe = '5D';
	
	public function set_bureau( $bureau ){
		$this->Bureau = $bureau;
	}
	
	public function get_bureau(){
		return $this->Bureau;
	}	
}

class Membres extends Bureau{
	
	private $NomMembre = array();
	private $PrenomMembre = array();

	public function AllMembres(){
		
		$sql = 'SELECT * FROM membres';
		$result = mysql_query( $sql );
		while( $row = mysql_fetch_assoc( $result ) ){
			$this->NomMembre[] = $row['NomMembre'];
			$this->PrenomMembre[] = $row['PrenomMembre'];				
		}
		
		$nbRows = mysql_num_rows( $result );
		
		return $this->MembresArray( $nbRows );
	}
			
			
	public function MembreFromId( $id ){
		
		$sql = 'SELECT * FROM membres WHERE IdMembre =\''.$id.'\'';
		$result = mysql_query( $sql );
		while( $row = mysql_fetch_assoc( $result ) ){
			$this->NomMembre[] = $row['NomMembre'];
			$this->PrenomMembre[] = $row['PrenomMembre'];				
		}			
		
		$nbRows = mysql_num_rows( $result );
		
		return $this->MembresArray( $nbRows );
	}
	
	
	public function MembresArray( $NbMembres ){
		
		$MembresArray = array();
		
		for( $i = 0; $i < $NbMembres; $i++ ){
				$array = array(
					'PrenomMembre' => $this->PrenomMembre[$i], 
					'NomMembre' => $this->NomMembre[$i], 
				);					
				$MembresArray[] = $array;
		}
		return $MembresArray;
	}

	public function get_NomMembre(){ 
		return $this->NomMembre; 
	}

	public function get_PrenomMembre(){ 
		return $this->PrenomMembre; 
	}
}
  
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
		<title>Untitled Document</title>
	</head>
<body>
<?php

/* A DECOMMENTER POUR UTILISER

	$AllMembres = new Membres();
	
	$membresArray = $AllMembres->AllMembres();
	foreach( $membresArray as $membreValue ){
		echo $membreValue['PrenomMembre'].' '.$membreValue['NomMembre'].'<br />';
	}


	$membre = new Membres();
	
	$membreValue = $membre->MembreFromId( '2' );
	echo $membreValue[0]['PrenomMembre'].' '.$membreValue[0]['NomMembre'].'<br />';
	
*/

highlight_file('request_code.php');

?>	
</body>