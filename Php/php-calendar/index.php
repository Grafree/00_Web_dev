<?php

define( '_URL', '.' );

/// POUR VUE MENSUELLE
     function getSecond($valeur) {
          return substr($valeur, 17, 2);
     }

     function getMinute($valeur) {
          return substr($valeur, 14, 2);
     }

     function getHour($valeur) {
          return substr($valeur, 11, 2);
     }

     function getDay($valeur)     {
          return substr($valeur, 8, 2);
     }

     function getMonth($valeur)     {
          return substr($valeur, 5, 2);
     }

     function getYear($valeur) {
          return substr($valeur, 0, 4);
     }

     function monthNumToName($mois) {
          $tableau = Array("", "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aôut", "Septembre", "Octobre", "Novembre", "Décembre");
          return (intval($mois) > 0 && intval($mois) < 13) ? $tableau[intval($mois)] : "Indéfini";
     }
 
 function format_month($j){
 switch($j) {
		case "01" :	$m = "janvier"; break;
		case "02" :	$m = "février"; break;
		case "03" :	$m = "mars"; break;
		case "04" :	$m = "avril"; break;
		case "05" :	$m = "mai"; break;
		case "06" :	$m = "juin"; break;
		case "07" :	$m = "juillet"; break;
		case "08" :	$m = "août"; break;
		case "09" :	$m = "septembre"; break;
		case "10" :	$m = "octobre"; break;
		case "11" :	$m = "novembre"; break;
		case "12" :	$m = "décembre"; break;
	}
	return $m;
 }
 
     
$MonthView = 0;
$periode = date("Y-m");
if(isset($_GET['mois'])){
	$MonthView = $_GET['mois'];
    $premier_jour = mktime(0,0,0,date("m")+ $MonthView,date("d"),date("Y"));
    $periode = date("Y-m", $premier_jour);
}
$moisprecedente = $MonthView - 1;
$moissuivante = $MonthView + 1;

?>
<html>
<head>
<title>Calendrier</title>
<link href="calendar.css" rel="stylesheet" type="text/css" />
</head>
<body>

<div id="page">

<div id="contenu">





<div id="onglet">
	<div class="tab"><a href="index.php?mois=<?php echo $moisprecedente; ?>"><img src="<?php echo _URL; ?>/images/icons/date_previous.gif" border="0" />&nbsp;Mois précédent</a></div>
	<div class="tab"><a href="index.php?mois=<?php echo $moissuivante; ?>">&nbsp;Mois suivant&nbsp;<img src="<?php echo _URL; ?>/images/icons/date_next.gif" border="0" /></a></div>
</div>


	<div id="tableau">
          <table class="calender" width="100%" align="center" border="0" cellpadding="0" cellspacing="0">
			<tr>
               <th class="table_heading" nowrap="nowrap" width="17%" align="left">Lundi</td>
               <th class="table_heading" nowrap="nowrap" width="17%" align="left">Mardi</td>
               <th class="table_heading" nowrap="nowrap" width="17%" align="left">Mercredi</td>
               <th class="table_heading" nowrap="nowrap" width="17%" align="left">Jeudi</td>
               <th class="table_heading" nowrap="nowrap" width="17%" align="left">Vendredi</td>
               <th class="table_heading" nowrap="nowrap" width="7%" align="left">Samedi</td>
               <th class="table_heading" nowrap="nowrap" width="8%" align="left">Dimanche</td>
          </tr>
          <?php
///// VUE MENSUEL 

 
          // Tableau des valeurs possibles pour un numéro de jour dans la semaine
          $tableau = Array("0", "1", "2", "3", "4", "5", "6", "0");
          $nb_jour = Date("t", mktime(0, 0, 0, getMonth($periode), 1, getYear($periode)));
          $pas = 0;
          $indexe = 1;

	          // Tant que l'on n'a pas affecté tous les jours du mois traité
	          while ($pas < $nb_jour) {
	               if ($indexe == 1){?>
	               	<tr>
	               	<?php }
	               // Si le jour calendrier == jour de la semaine en cours
	               if (Date("w", mktime(0, 0, 0, getMonth($periode), 1 + $pas, getYear($periode))) == $tableau[$indexe]) {
	                    // Si jour calendrier == aujourd'hui
	                    $afficheJour = Date("j", mktime(0, 0, 0, getMonth($periode), 1 + $pas, getYear($periode)));
                        $thisJour = Date("Y-m-d", mktime(0, 0, 0, getMonth($periode), 1 + $pas, getYear($periode)));
                        $thisDay = Date("l", mktime(0, 0, 0, getMonth($periode), 1 + $pas, getYear($periode)));
						$from_timestamp = mktime(0, 0, 0, getMonth($periode), 1 + $pas, getYear($periode));
						$to_timestamp = mktime(0, 0, 0, getMonth($periode), 1 + $pas, getYear($periode)) + (60*60*24);
	                    if (Date("Y-m-d", mktime(0, 0, 0, getMonth($periode), 1 + $pas, getYear($periode))) == Date("Y-m-d")) {
	                         $class = "today_cell";
	                    }else{
	                         $class = "day_cell";
	                    }
	                    // Ajout de la case avec la date
	                    ?>
	                    <td class="<?php echo $class; ?>" valign="top"> 
	                    	<?php 
							
	// AFFICHAGE DU JOUR (chiffre du jour) /////////////////////////////////////////////////////////////////////////////
							echo '<span class="day_date"><strong>'.$afficheJour.'</strong><a name="'.$afficheJour.'">&nbsp;</a></span>';
							?>
	                    	<br /><br style="line-height:4px;" />

	                    	<?php 

					 
	                    		
	// AFFICHAGE DES MENUS /////////////////////////////////////////////////////////////////////////////////////////////	
				 
	$MenuduJour = array();	//	Sert uniquement pour ne pas faire planter le processus - A SUPPRIMER
				 		
				 		
	/// SERA LA FONCTION A CREER QUI SELECTIONNE LE MENU DU JOUR ///
	//$MenuDuJourArray = MenuduJour( $thisJour ); 
	
	///    $afficheJour est le jour du mois en chiffre
	///    $thisJour est le jour au format [YYYY-MM-DD]
	///	   $thisDay est le jour de ma semaine en anglais (Monday, Tuesday, Wednesday, ...)
	///    $from_timestamp est le Timestamp à minuit ce jour
	///    $to_timestamp est le Timestamp à 23:59:59 ce jour


						// Affichage des informations	
	                    if ( Date( "Y-m-d", mktime( 0, 0, 0, getMonth( $periode ), 1 + $pas, getYear( $periode ) ) ) <= Date( "Y-m-d" ) ) {								
								if($thisDay != 'Saturday' && $thisDay != 'Sunday'){
									echo '<div class="activite_entete">';
										echo '<a href="detail.php?mois='.$MonthView.'&date='.$thisJour.'" style="display:block; float:right;"><img src="'._URL.'/images/icons/add.gif" border="0" /></a>';
									echo 'Menu du jour';
									echo '</div>';
									echo '<div class="activite_contenu">';
	 	                    		
									if(isset($tableauActivite)){								
										$totalActivite = 0;
										foreach($MenuDuJourArray as $MenuDuJour) {
											$id_menu = $MenuDuJour['id_menu'];
											$totalActivite+=$valeurAct->get_dureeactivite();
											echo '<div class="activite_definition">';
											echo'<a href="detail.php?mois='.$MonthView.'&date='.$thisJour.'&id='.$id_menu.'"><b>'.$valeurAct->get_libelle_typeactivite().'</b></a>';
											
											echo '<br />'.$valeurAct->get_libelle_typeactivitespecifique(). '<br />';
											if($valeurAct->get_titreactivite() != ''){ echo '<em>'.$valeurAct->get_titreactivite().'</em><br />';}
											echo ' ('.$valeurAct->get_dureeactivite().'&nbsp;h)';

											if( authorizeDelete() ){
												echo '&nbsp;&nbsp;<a href="'._URL.'/view/'._MODULE_NAME.'/calendrier.php?mois='.$MonthView.'&account='.$account.'&archive='.$archive.'page=activite&participantid='.$participantid.'&supprimer='.$valeurAct->get_idactivite().'" onClick="return confirmation()" style="" title="Supprimer"><img alt="Supprimer" src="'._URL.'/images/icons/bullet_delete.gif" border="0" /></a>';
											}
											echo '</div>'; 
										}
										echo '</div>';
			                    		echo '<div class="activite_total"><b>'.$totalActivite.' h total</b>';
									   	echo '</div>';	
	 	                    		}else{
	 	                    			echo '<em class="activite_none">Aucune activité inscrite</em>';           		
	 	                    			echo '</div>';	
	 	                    		}	 	         
								}
	                    }
				
						?></td><?php
	                    $pas++;
						
	               }
	               //
	               else {
	                    // Ajout d'une case vide
	                    ?>
	                    <td class="weday_cell" width="20%" valign="top">&nbsp;</td>
	               		<?php	
	               }
	               if ($indexe == 7 && $pas < $nb_jour) { ?>
	               </tr>
	               <?php $indexe = 1;} else {$indexe++;}
	          }
	          // Ajustement du tableau
	          for ($i = $indexe; $i <= 7; $i++) {
	          ?>
	             <td class="weday_cell" width="20%" valign="top">&nbsp;</td>
	          <?php 
	          }
           ?>
   
          </tr></table>
		</div>
	</div>
</div>

</body>
</html>