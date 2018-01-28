<?php

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
    


/*
 * Indique les propriétés et méthodes publiques d'une classe
 * @param [object] $ClassToCheck
 * @return [string] Affichage formaté d'un tableau des propriétés et méthodes
 */
function ClassToUML( $ClassToCheck ){
	
	$classContent = '<div style="width:300px; font-family:Arial; font-size:11px; border:1px solid #bbb;">';
	$classContent .= '<div style="width:292px; padding:10px 0px; font-weight:bold; text-align:center; background-color:#f00; color:#fff; border:4px solid #fff;">';
		$classContent .= 'Classe : '.get_class( $ClassToCheck );
	$classContent .= '</div>';
	
	$classContent .= '<div style="width:280px; padding:5px; border:1px solid #ddd; margin:0px 4px 4px 4px;">';
		$vars = get_class_vars( get_class( $ClassToCheck ) );
		if( count( $vars ) > 0 ){
			foreach( $vars as $var => $key  ){
				$classContent .= $var.' ['.TypeVariable( $key ).']<br />';
			}
		}else{
			$classContent .= '<em>Il n\'existe aucune propriété ou toutes sont protected ou private</em>';
		}
	$classContent .= '</div>';
	
	$classContent .= '<div style="width:280px; padding:5px; border:1px solid #ddd; margin:0px 4px 4px 4px;">';
		$methods = get_class_methods( $ClassToCheck );
		if( count( $methods ) > 0 ){
			foreach( $methods as $method ){
				$classContent .= $method.'()<br />';
			}
		}else{
			$classContent .= '<em>Il n\'existe aucune méthode ou toutes sont protected ou private</em>';
		}
	$classContent .= '</div>';
	
	$classContent .= '</div>';
	
	return $classContent;

}
function TypeVariable( $variable ){
	
	if( is_int( $variable ) ){
		return 'Integer';
	}else if( is_integer( $variable ) ){
		return 'Integer';
	}else if( is_float( $variable ) ){
		return 'Float';
	}else if( is_bool( $variable ) ){
		return 'Boolean';
	}else if( is_string( $variable ) ){
		return 'String';
	}else if( is_object( $variable ) ){
		return 'Object';
	}else if( is_array( $variable ) ){
		return 'Array';
	}else if( is_null( $variable ) ){
		return 'Null';
	}
	
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" >
<head>
	<title>PHP -> POO</title>
	<style>
		body{ font-family:Arial, Helvetica; font-size:11px; }
		
	</style>
</head> 
<body>

<h2>Consulter : </h2>
<ol>
<li><a href="Atelier POO.pdf">La documentation</a></li>
<li><a href="bases.php">La base du POO</a></li>
<li><a href="construct.php">Le Constructeur</a></li>
<li><a href="request_code.php">Les requêtes exploitées dans une classe</a></li>
</ol>

<br />
<h2>Afficheur au format UML d'une classe</h2>


<?php
$AllMembres = new Membres();
echo ClassToUML( $AllMembres );
?>

<br /><br />

<?php

highlight_file('functionReadClass.php');

?>	

</body>