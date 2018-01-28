<?php
/*
--
-- Base de donn�es: `tools`
--

-- --------------------------------------------------------

--
-- Structure de la table `elements`
--

CREATE TABLE IF NOT EXISTS `elements` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `titre` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `archive` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `elements`
--

INSERT INTO `elements` (`id`, `titre`, `description`, `archive`) VALUES
(1, 'Premier �l�ment', 'Premier arriv�, � la suite du Premier ministre et star de la matin�e, le nouveau ministre de la Culture Le neveu de l''ancien pr�sident socialiste a bri�vement pos� pour les nombreux photographes et cameramens mass�s sur le perron, sans faire de d�claration.', 1),
(2, 'Second �l�ment', 'Apr�s une grosse heure de conseil, au cours de laquelle on leur a demand� de faire preuve "d''audace r�formatrice", "d''�tre solidaires et jouer collectif" selon le porte-parole les 38 membres de l''�quipe ont pos� avec le pr�sident et le Premier ministre pour la traditionnelle photo de famille.', 1);

 */

$connectDB = mysql_connect( 'localhost', 'root', 'mysql' );
mysql_select_db( 'tools', $connectDB );




/******************************************************************
 *  R�sultat recherche par mot cl� 
 *
 * @param $motcle			Le ou les mots cles s�pares par + ou [espace]
 * @param $objetsParPage	Nombre de r�sultat par page
 * @param $noPage			Num�ro de page
 * @param $return			Soit 'list' pour les donnees recuperees par la requete, soit 'nb' pour le nb de resultat
 * @return 					SQL result
 * 
 */
function findElementsByKeywords( $motcle, $objetsParPage, $noPage, $return = 'list' ){

	/* D�coupe les mots recherches */
	$recherche = split( '[ ,+]', $motcle );
	$nbmots = count( $recherche );
			
	$sqlBase = 'SELECT 
				elements.id, 
				elements.titre, 
				elements.description 
				FROM elements 
				WHERE elements.archive = \'1\' ';

	$sqlAnd = '';
	
	if( $motcle != '' && $motcle != '*'){
		
		for ( $i = 0; $i < $nbmots; $i++ ){
			
			$mot = trim( addslashes( $recherche[$i] ) );
			
			if ($mot!='') {
	
			$sqlAnd .= "AND ( description LIKE '%".$mot."%' OR titre LIKE '%".$mot."%' ) ";	
			
			}
		}
		
	}
	
	$sqlConstruct = $sqlBase.$sqlAnd;
	
	$limit = ( ( $noPage - 1 ) * $objetsParPage ).' , '.$objetsParPage;
	
	
	
	$sql = $sqlConstruct.'ORDER BY titre ASC LIMIT '.$limit;
	
	$result = mysql_query($sql)or die('Error. Please inform the administrator.');


	if( $return == 'list'){
		
		return $result;
		
	}else if( $return == 'nb'){
		
		return mysql_num_rows( $result );
		
	}

	
}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
	<title>Outil de recherche</title>
</head>
<body>
	
	<form action="index.php?action=search" method="post">

		<input type="text" size="30" name="keywords" value="" />&nbsp;&nbsp;&nbsp;<input type="submit" value="Recherche..." />

	</form>
	
	<?php 
	
	if( isset( $_GET['action'] ) && $_GET['action'] == 'search' ){
	
		$result = findElementsByKeywords( $_POST['keywords'], 5, 1 );
	
		while( $row = mysql_fetch_assoc( $result ) ){

			echo '<p><strong>'.$row['titre'].'</strong> '.$row['description'].'</p>';

		}
	
	}
	
	?>

</body>
</html>