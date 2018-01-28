/**
 * Classe de gestion de menus coulissants. 
 * @author Olivier Dommange
 * @version 1.0
 * @date 06 juin 2009
 * @param distanceInt		[int] distance en px
 * @param speedInt 			[int] vitesse en milliseconde
 * @param idmenu			[string] id des menus coulissants 
 * @param deccStart			[int] Pourcent de deceleration de l'animation
 * @param openState			[bolean] fermeture automatique des menus coulissants a l'ouverture d'une autre = true
 * @param openStartState	[int] Id de la slide ouverte au chargement. 0 indique aucune
 * @param openSlideState	[bolean] Indique si l'ouverture du menu coulissant au chargement dervait se faire avec un coulissement
 * @return void
 */
function accordionMenu( distanceInt, speedInt, idmenu, deccStart, openState, openStartState, openSlideState ){

	var distance = distanceInt; 		// distance en px que parcours le coulissement
	var speed = speedInt; 				// vitesse en milliseconde. Plus la valeur est élevé plus l'animation sera lente.
	var id = idmenu;

	var start = deccStart; 				// Pourcentage a partir duquel la décélération commence (ex. 20, signifie a 20% de la fin) 0 indique aucune décelération
	var automatic = openState;			// indique si la fermeture des menus est automatique (true) a l'ouverture d'un entre eux.
	var startOpen = openStartState; 	// Id de la slide qui devrait être ouverte sans coulissement au chargement. 0 signifie aucune ouverture au départ.
	var startSlideOpen = openSlideState;// Indique si l'ouverture du menu coulissant au chargement dervait se faire avec un coulissement.

	var current_slider = '';			// Indique le menu actuellement ouverte
	var current_slider_autoclose = '';	// Indique le menu coulissant a fermer
	
	var allSlides = 0;					// Indique le nombre de menus
	var liLength = 0;					// Indique le nombre de sous-menus
	var progress = new Array();			// Recupere la progression en px de l'ouverture de chaque menu
	var height = new Array();			// Indique la hauteur du moment de chaque menu


	window.onload = function(){
	
		allSlides = document.getElementById( 'menu' ).getElementsByTagName( 'ul' ).length;
		
		for (i = 1; i <= allSlides; i++) {
			
			progress[i - 1] = 0;
			var elementHeight = document.getElementById( id + '_' + i ).offsetHeight;
			height[i - 1] = elementHeight;
			
			if ( i == startOpen ) {
				
				if ( startSlideOpen ) {
				
					current_slider = i;
					openIntervalId = setInterval( function(){ open() }, speed );
					
				} else {
					
					openAuto(i);
				}	
				
			}else {
				
				document.getElementById( id + '_' + i ).className = 'content_hide';
				
			}
			
		}

	}
	
	
	var close = function (){
	
		doClose( current_slider );
		
	}
	
	
	var close_auto = function (){
	
		doClose( current_slider_autoclose );
		
	}
	
	var doClose = function ( currentSliderId ){
		
		var slider = document.getElementById(id + '_' + currentSliderId);

		var liLengthClose =  slider.getElementsByTagName('li').length;
		for( i = 0; i < liLengthClose; i++ ){
			slider.getElementsByTagName('li')[i].className = 'content_hide';
		}		
		
		var progressValue = progress[ currentSliderId - 1 ];
		var elmtHeight = height[ currentSliderId - 1 ];
		var getvaleur = closedecceleration( elmtHeight, progressValue, distance );
		
		slider.style.height = getvaleur + 'px';
		if( getvaleur == 0 ){
			slider.className = 'content_hide';
		}
		progress[ currentSliderId - 1 ] = getvaleur;
		
	}
	
	var closedecceleration = function ( heightTotal, progressValue, distance ){
		
		var startCloseDeccelAnim = Math.round( progressValue * 100 / heightTotal );
		
		if (startCloseDeccelAnim < start) {
		
			var resteTaux = Math.round( ( progressValue ) / heightTotal * 100 );
			var distanceDecc = Math.round( distance * resteTaux / 100 );
			if( distanceDecc < 1 ){ distanceDecc = 1; }
			
			var valeur = progressValue - distanceDecc;
			var thevaleur = parseInt( valeur );
			
			if ( thevaleur <= 0 ) { // Dernier mouvement
				
				thevaleur = 0;
						
				clearInterval( closeIntervalId );
				
			}
			
			return thevaleur;
			
		} else {
		
			var valeur = progressValue - distance;
			return parseInt( valeur );
			
		}
		
	}
	
	
	var open = function (){

		var slider = document.getElementById( id + '_' + current_slider );
		var progressValue = progress[ current_slider - 1 ];
		var elmtHeight = height[ current_slider - 1 ];
		var reste = elmtHeight - progressValue;
		var getvaleur = decceleration( elmtHeight, progressValue, reste, distance );
		
		slider.style.height = getvaleur + 'px';
		progress[ current_slider - 1 ] = getvaleur;
		
	}
	
	var openAuto = function( currentSliderId ){
	
		var slider = document.getElementById(id + '_' + currentSliderId);
		var elmtHeight = height[ currentSliderId - 1 ];
		
		slider.style.height = elmtHeight + 'px';
		progress[ currentSliderId - 1 ] = elmtHeight;
		
		slider.className = 'sous-menu';
		
	}
	
	
	var decceleration = function( heightTotal, progressValue, reste, distance ){
		
		var startDeccelAnim = Math.round( reste * 100 / heightTotal );
		var currentSliderId = current_slider;
		var slider = document.getElementById( id + '_' + currentSliderId );
		
		if (startDeccelAnim < start) {
		
			var lastMove = parseInt( heightTotal - 2 );
			var resteTaux = Math.round( reste / heightTotal * 100 );
			var distanceDecc = Math.round( distance * resteTaux / 100 );
			if( distanceDecc < 1 ){ distanceDecc = 1; }
			var valeur = progressValue + distanceDecc;
			var thevaleur = parseInt( valeur );
			if ( thevaleur >= lastMove ) { // Dernier mouvement
				thevaleur = parseInt( heightTotal );
				slider.className = 'sous-menu';
				
				for( i = 0; i < liLength; i++ ){
					slider.getElementsByTagName('li')[i].className = '';
				}				
				
				clearInterval( openIntervalId );
				
			}
			
			return thevaleur;
			
		} else {
		
			var valeur = progressValue + distance;
			return parseInt( valeur );
			
		}
		
	}
	
	/****************************************************************
	 *   Declencher par un evenement
	 *   Ouvre la fenetre coulissante si ferme ou ferme si ouvert
	 ****************************************************************/
	this.action = function( slideId ){
		
		var min = progress[ slideId - 1 ];
		var max = height[ slideId - 1 ];
				
		if ( min == 0 ) { // open the window
	
			current_slider = slideId;
			openIntervalId = setInterval( function(){ open() }, speed );
			
			liLength =  document.getElementById( id + '_' + current_slider ).getElementsByTagName('li').length;
			for( i = 0; i < liLength; i++ ){
				document.getElementById( id + '_' + current_slider ).getElementsByTagName('li')[i].className = 'content_hide';
			}
			document.getElementById( id + '_' + current_slider ).className = 'sous-menu';
			
			if ( automatic ) {
				
				for ( i = 1; i <= allSlides; i++ ) { // verifie si une fenetre est ouverte pour la fermer
					var minother = progress[ i - 1 ];
					var maxother = height[ i - 1 ];
					
					if ( minother != 0 && minother == maxother ) {
						current_slider_autoclose = i;
		
						closeIntervalId = setInterval( function(){ close_auto() }, speed ); // 
					}
				}
				
			}
			
		}
		else 
			if (min == max) { // close the window
				current_slider = slideId;
				document.getElementById(id + '_' + slideId).className = 'content_hide';
				closeIntervalId = setInterval( function(){ close() }, speed ); 
			}
	}
	
	/* Rollover de l'entete */
	this.entete_roll = function( slideId ){
		document.getElementById( slideId ).className = 'titre_menu_roll';
	}
	this.entete_normal = function( slideId ){
		document.getElementById( slideId ).className = 'titre_menu_normal';
	}
	
}