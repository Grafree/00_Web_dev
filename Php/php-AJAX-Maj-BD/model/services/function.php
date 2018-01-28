<?php

/*********************************************************************
 *  Renvoie le message au format et selon le degre d'importance
 * 
 *  @param message	Est le texte du message
 * 	@param level	Est le degre d'importance du message
 * 					 1. accept; 2. warning; 3. alert; 4. system; 5. info; 6. bomb
 * 					 7. (aléatoire) incorporera l'icone que portera ce nom
 *  @return			Le message formaté
 * 
 *********************************************************************/
function messageBox($message, $level, $codealert ){
	
	switch( $level ){
		
		case 'accept':	$levelTxt = 'green';	$levelEntete = 'green';		$levelImg = 'accept.gif';	break;
		
		case 'warning':	$levelTxt = 'orange';	$levelEntete = 'orange';	$levelImg = 'error.gif';	break;
		
		case 'alert':	$levelTxt = 'red';		$levelEntete = 'red';		$levelImg = 'cancel.gif';	break;
		
		case 'system':	$levelTxt = '#555';		$levelEntete = 'gray';		$levelImg = 'magnifier.gif';	break;
		
		case 'info':	$levelTxt = '#0072c9';	$levelEntete = 'blue';		$levelImg = 'information.gif';	break;
			
		case 'bomb':	$levelTxt = 'black';	$levelEntete = 'black';		$levelImg = 'bomb.gif';		break;
		
		default :		$levelTxt = 'black';	$levelEntete = 'black';		$levelImg = $level.'.gif';		break;
		
	}
	
	
	$displayMessage = '
		<div class="message" id="'.$codealert.'">
			<div class="mesentete_'.$levelEntete.'">
			<a class="btn" href="javascript:adminMessage(\''.$codealert.'\')"><img src="images/icons/cross_btn.gif" border="0" /></a>
			</div>
			<div class="mescontenu">
			<img class="icon" src="images/icons/'.$levelImg.'" />
			<div class="txt" style="color:'.$levelTxt.';">'.$message.'</div>
			<div class="clear"></div>
			</div>
		</div>';
	
	return $displayMessage;
	
}

function aide($titreAide, $textAide){

	
	$displayAide = '
		<div class="aide">
			<a class="bulle" href="#">
				<img src="images/icons/information.gif" border="0">&nbsp;Aide
				<span class="aide_contenu"> 
					<b>Aide ['.$titreAide.']</b><br /><br />
					'.$textAide.'
				</span>	
			</a>
		</div>';
	
	return $displayAide;
	
}

?>