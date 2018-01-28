<?php

class MaClasse{
	
	public $vitesse = 50;				// public :: rend accessible la propri�t� depuis l'ext�rieur de la classe
	private $distance = 200;			// private :: ne rend accessible uniquement la propri�t� � l'int�rieur de la classe
	public $tempsAlloue = 30;			// 
	
	public function temps(){
		return round( $this->distance / $this->vitesse, 2 );
	}
	
	public function get_distance(){		// getter :: M�thode pour r�cup�rer des propri�t�s m�me private
		return $this->distance;
	}
	
	public function set_vitesse( $newVitesse ){	// setter :: M�thode pour attribuer une nouvelle valeur � une m�thode
		$this->vitesse = $newVitesse;
	}
	
	public function heuresEnMinutes( $heures ){
		return $heures * 60;
	}
	
}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" >
<head>
	<title>PHP -> POO</title>
</head> 
<body>
<?php
$instance = new MaClasse();
echo $instance->vitesse.'km/h';
?>

<br />

<?php 
$mavitesse = 200;
$instance->set_vitesse( $mavitesse );
echo $instance->heuresEnMinutes( $instance->temps() ).' minutes pour '.$instance->get_distance().'km � '.$instance->vitesse.' km/h';
?>

<br /><br />

<?php

highlight_file('bases.php');

?>
</body>