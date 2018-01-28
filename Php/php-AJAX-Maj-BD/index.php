<?php
include('model/services/config.php');

include_once('model/services/function.php');

include('help.lib.php');

/*
LA TABLE

CREATE TABLE IF NOT EXISTS `membres` (
  `IdMembre` int(10) NOT NULL AUTO_INCREMENT,
  `NomMembre` varchar(50) NOT NULL,
  `PrenomMembre` varchar(50) NOT NULL,
  `GenreMembre` varchar(1) NOT NULL COMMENT 'M ou F',
  `ActifMembre` int(1) NOT NULL DEFAULT '0' COMMENT '0 = inactif; 1 = actif;',
  `CommentMembre` text NOT NULL,
  PRIMARY KEY (`IdMembre`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT AUTO_INCREMENT=1 ;

*/

/*
LA CLASSE MEMBRES
 */ 

include_once('membres_class.php');
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Dev Process</title>
<script src="js/functions.js" type="text/javascript" language="JavaScript"></script>
<script src="js/dev.js" type="text/javascript" language="JavaScript"></script>
<link href="css/admin_main.css" rel="stylesheet" type="text/css" />
<link href="css/dev.css" rel="stylesheet" type="text/css" />
</head>
<body onload="afficheListe( '' );">
	
<div id="page">
<?php // MENU  ?>
<div id="contenu">

	<div id="titre_page">
		Membres
	</div>

	<div id="menu_alone">
		<div class="outils"><a href="#" onclick="activeWindow('insert_espace', 0 );"><img src="images/icons/add.gif" border="0">Nouvelle news</a></div>  
		<?php
		$aide = _HELP_NEWS_CONTENT;
		if( $aide ) echo aide( _HELP_NEWS_TITLE, $aide );
		?>	
	</div>
	<div id="tableau">


<div id="insert_espace" class="hide_screen">
</div>




<?php
/*
 * Tableau
 * 
 */
?>
	<div id="list">
	</div>

		</div>
	</div>

<div id="pied">
	<div class="pied_content">
		&nbsp;&nbsp;&nbsp;&copy; 2009 :: Dev Process
	</div>
</div>

</div>

</body>
</html>