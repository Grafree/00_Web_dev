/**
 * Classe de gestion des fenetres coulissantes. 
 * @author Olivier Dommange
 * @version 1.0
 * @date 06 juin 2009
 * @param distanceInt		[int] distance en px
 * @param speedInt 			[int] vitesse en milliseconde
 * @param idmenu			[string] id des fenêtres coulissantes 
 * @param deccStart			[int] Pourcent de deceleration de l'animation
 * @param openState			[bolean] fermeture automatique des fenêtres coulissantes a l'ouverture d'une autre = true
 * @param openStartState	[int] Id de la slide ouverte au chargement. 0 indique aucune
 * @param openSlideState	[bolean] Indique si l'ouverture de la fenetre coulissante au chargement dervait se faire avec un coulissement.
 * @param minHeightSlide	[int] Nb de px des fenêtres fermées. Correspond a la propriete CSS height de la classe slider_content
 * @param paddingInnerSlide	[int] Correspond au padding indiqué dans le CSS pour content_show
 * @return void
 */
function accordionWindow( distanceInt, speedInt, idmenu, deccStart, openState, openStartState, openSlideState, minHeightSlide, paddingInnerSlide ){

	var distance = distanceInt; 		// distance en px que parcours le coulissement
	var speed = speedInt; 				// vitesse en milliseconde. Plus la valeur est élevé plus l'animation sera lente.
	var id = idmenu;

	var start = deccStart; 				// Pourcentage a partir duquel la décélération commence (ex. 20, signifie a 20% de la fin) 0 indique aucune décelération
	var automatic = openState;			// indique si la fermeture des slides est automatique (true) a l'ouverture d'un entre eux.
	var startOpen = openStartState; 	// Id de la slide qui devrait être ouverte sans coulissement au chargement. 0 signifie aucune ouverture au départ.
	var startSlideOpen = openSlideState;// Indique si l'ouverture de la fenetre coulissante au chargement dervait se faire avec un coulissement.
	var slideHeightMin = minHeightSlide;// Ouverture de base en px de la fenêtre coulissante. Doit correspondre a la propriete height de la classe slider_content
	var padding = paddingInnerSlide; 	// Doit correspondre au padding indiqueé dans le CSS pour content_show

	var current_slider = 0;			// Indique la fenêtre coulissante actuellement ouverte
	var current_slider_autoclose = 0;	// Indique la fenêtre coulissante a fermer
	var current_Subslider = '';
	
	var allSlides = 0;					// Indique le nombre de fenetres coulissantes
	var progress = new Array();			// Recupere la progression en px de l'ouverture de chaque fenetre coulissante
	var height = new Array();			// Indique la hauteur du moment de chaque fenetre coulissante

	var heightSub = 0;					// Indique la hauteur du sous-element
	var SubAndParentHeight = 0;			// Indique la hauteur combiné du sous-element et de la fenetre
	var ParentHeight = 0;				// Indique la hauteur de la fenetre sans le sous-element

	window.onload = function(){
	
		allSlides = document.getElementById( 'allslides' ).getElementsByTagName( 'dd' ).length;
		
		for (i = 1; i <= allSlides; i++) {
			
			progress[i - 1] = slideHeightMin;
			var elementHeight = document.getElementById( id + '_' + i ).getElementsByTagName( 'div' )[0].offsetHeight;
			var elementHeight = parseInt( elementHeight + padding * 2 );
			height[i - 1] = elementHeight;
			
			if ( i == startOpen ) {
				
				if ( startSlideOpen ) {
				
					current_slider = i;
					openIntervalId = setInterval( function(){ open() }, speed );
					
				} else {
					
					openAuto(i);
				}	
				
			}else {
				
				document.getElementById( id + '_' + i ).getElementsByTagName( 'div' )[0].className = 'content_hide';
				document.getElementById( id + '_' + i ).getElementsByTagName( 'div' )[0].style.overflow = 'visible';
				
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
		var progressValue = progress[ currentSliderId - 1 ];
		var elmtHeight = height[ currentSliderId - 1 ];
		
		var getvaleur = closedecceleration( elmtHeight, progressValue, distance, slideHeightMin );
		
		slider.style.height = getvaleur + 'px';
		progress[ currentSliderId - 1 ] = getvaleur;
		
	}
	
	var closedecceleration = function ( heightTotal, progressValue, distance, deccObjective ){
		
		var startCloseDeccelAnim = Math.round( progressValue * 100 / heightTotal );
		
		if (startCloseDeccelAnim < start) {
		
			var resteTaux = Math.round( ( progressValue ) / heightTotal * 100 );
			var distanceDecc = Math.round( distance * resteTaux / 100 );
			if( distanceDecc < 1 ){ distanceDecc = 1; }
			
			var valeur = progressValue - distanceDecc;
			var thevaleur = parseInt( valeur );
			
			if ( thevaleur <= deccObjective ) { // Dernier mouvement
				
				thevaleur = deccObjective;
				
				clearInterval( closeIntervalId );
				
			}
			
			return thevaleur;
			
		}
		else {
		
			var valeur = progressValue - distance;
			return parseInt( valeur );
			
		}
		
	}
	
	
	var open = function (){
		
		var slider = document.getElementById(id + '_' + current_slider);
		var progressValue = progress[ current_slider - 1 ];
		var elmtHeight = height[ current_slider - 1 ];
		var reste = elmtHeight - progressValue;
		var getvaleur = decceleration( elmtHeight, progressValue, reste, distance );
		
		if (progress[current_slider - 1] == height[current_slider - 1]) {
			slider.style.height = 'auto';
		}else{
			slider.style.height = getvaleur + 'px';
		}
		progress[ current_slider - 1 ] = getvaleur;
				
	}
	
	var openAuto = function( currentSliderId ){
	
		var slider = document.getElementById(id + '_' + currentSliderId);
		var elmtHeight = height[ currentSliderId - 1 ];
		
		slider.style.height = elmtHeight + 'px';
		progress[ currentSliderId - 1 ] = elmtHeight;
		
		slider.getElementsByTagName('div')[0].className = 'content_show';
		
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
				
				slider.getElementsByTagName( 'div' )[0].className = 'content_show';
				slider.getElementsByTagName( 'div' )[0].style.overflow = 'visible';
								
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
				
		if ( min == slideHeightMin ) { // open the window
	
			current_slider = slideId;
			openIntervalId = setInterval( function(){ open() }, speed );
			
			if ( automatic ) {
				
				for ( i = 1; i <= allSlides; i++ ) { // verifie si une fenetre est ouverte pour la fermer
					var minother = progress[ i - 1 ];
					var maxother = height[ i - 1 ];
					
					if ( minother != slideHeightMin && minother == maxother ) {
						current_slider_autoclose = i;
						
						var elementHeight = document.getElementById( id + '_' + i ).getElementsByTagName( 'div' )[0].offsetHeight;
						var elementHeight = parseInt( elementHeight + padding * 2 );
						height[i - 1] = elementHeight;
						
						document.getElementById( id + '_' + i ).getElementsByTagName( 'div' )[0].className = 'content_hide';
					
						if (heightSub != 0) { 							// Supprime tout ce qui pourrait concerner un sous-element ouvert
							document.getElementById(id + '_' + i + '_sub').style.height = '1px';
							height[i - 1] = ParentHeight;				
							heightSub = 0;
							SubAndParentHeight = 0;
							ParentHeight = 0;
						}
		
						closeIntervalId = setInterval( function(){ close_auto() }, speed ); // 
					}
				}
				
			}
			
		} else if (min == max) { // close the window
				current_slider = slideId;						
				
				var elementHeight = document.getElementById( id + '_' + current_slider ).getElementsByTagName( 'div' )[0].offsetHeight;
				var elementHeight = parseInt( elementHeight + padding * 2 );
				height[current_slider - 1] = elementHeight;
				
				document.getElementById(id + '_' + slideId).getElementsByTagName('div')[0].className = 'content_hide';

				if ( heightSub != 0 ) { // Supprime tout ce qui pourrait concerner un sous element ouvert
					document.getElementById(id + '_' + slideId + '_sub').style.height = '1px';
					height[slideId - 1] = ParentHeight;					
					heightSub = 0;
					SubAndParentHeight = 0;
					ParentHeight = 0;
				}
				
				closeIntervalId = setInterval( function(){close()}, speed); 
			}
	}
	
	this.subaction = function( idParent ){

		current_slider = idParent;
		
		var SubElement = document.getElementById( id + '_' + idParent + '_sub' ).getElementsByTagName( 'div' )[0];
		heightSub = SubElement.offsetHeight;
		
		if( ParentHeight == 0 ){
			ParentHeight = height[idParent - 1];
		}

		if( progress[idParent - 1] - heightSub < ParentHeight  ){	

			SubAndParentHeight = heightSub + height[idParent - 1];
			
			document.getElementById( id + '_' + idParent + '_sub' ).style.height = 'auto';
			height[idParent - 1] = SubAndParentHeight;
			openIntervalId = setInterval( function(){ open() }, speed );
			
		}else{
			
			document.getElementById( id + '_' + idParent + '_sub' ).style.height = '1px';
			var currentHeight = SubAndParentHeight - heightSub;	
					
			closeIntervalId = setInterval( function(){closeSub( idParent )}, speed);  // Methode a creer
			
		}

		
	}

	var closeSub = function ( currentSliderId ){
		
		var slider = document.getElementById(id + '_' + currentSliderId);
		var progressValue = progress[ currentSliderId - 1 ];
		var elmtHeight = height[ currentSliderId - 1 ];
		
		var getvaleur = closedecceleration( elmtHeight, progressValue, distance, ParentHeight );
		
		if( getvaleur == ParentHeight){
			
			heightSub = 0;
			SubAndParentHeight = 0;
			height[currentSliderId - 1] = ParentHeight;
			ParentHeight = 0;
			
		}
		
		slider.style.height = getvaleur + 'px';
		progress[ currentSliderId - 1 ] = getvaleur;
		
	}

	
	/* Rollover de l'entete */
	this.entete_roll = function( slideId ){
		document.getElementById( slideId ).className = 'entete_roll';
	}
	this.entete_normal = function( slideId ){
		document.getElementById( slideId ).className = 'entete_normal';
	}
	
}
