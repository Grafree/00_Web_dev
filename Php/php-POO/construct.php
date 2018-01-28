<?php

class MaClasse{
	
	private $vitesse;
	public $distance;
	
	function __construct( $vitesse, $distance ){
		$this->distance = $distance;
		$this->vitesse = $vitesse;
	}
	
	function temps(){
		return round( $this->distance / $this->vitesse, 2 );
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

//echo Maclasse::$test;
?>

<?php
$instance = new MaClasse( 25, 200 );
?>
<br />
<?php 
echo $instance->temps().' heures pour '.$instance->distance.'km';
?>

<br /><br />

<?php

highlight_file('construct.php');

?>
</body>