
/**
 * Classe de fenetre coulissantes verticalement. 
 * @author Olivier Dommange
 * @version 1.0
 * @date 07 juin 2009
 * @param distanceInt		[int] distance en px
 * @param speedInt 			[int] vitesse en milliseconde
 * @param idmenu			[string] id des menus coulissants 
 * @param deccStart			[int] Pourcent de deceleration de l'animation
 * @param windowHeightMin	[int] Hauteur minimum 
 * @param windowPadding		[int] Correspond au padding indiqueé dans le CSS pour content_show
 * @return void
 */
function windowSlideVert(distanceInt, speedInt, idmenu, deccStart, windowHeightMin, windowPadding){

	var distance = distanceInt; 			// distance en px que parcours le coulissement
	var speed = speedInt; 					// vitesse en milliseconde. Plus la valeur est élevé plus l'animation sera lente.
	var id = idmenu;
	var start = deccStart; 					// Pourcentage a partir duquel la dégression commence (ex. 20, signifie à 20% de la fin
	var slideHeightMin = windowHeightMin; 	// Ouverture de base de la fenêtre coulissante
	var padding = windowPadding; 			// Doit correspondre au padding indiqueé dans le CSS pour content_show
	
	var elementHeight = 0;
	var progress = 0;


	var close = function(){
	
		var slider = document.getElementById(id);
		
		if ( progress > slideHeightMin ) {
			var valeur = progress - distance;
			if ( valeur < slideHeightMin ) {
				valeur = slideHeightMin;
			}
			var getvaleur = parseInt(valeur);
			slider.style.height = getvaleur + 'px';
			progress = getvaleur;
		}
		else {
			slider.style.height = slideHeightMin + 'px';
			progress = slideHeightMin;
			clearInterval(closeIntervalId);
		}
		
	}
	
	var open = function(){
		
		document.getElementById(id).getElementsByTagName('div')[0].className = 'content_show';
		
		elementHeight = document.getElementById(id).getElementsByTagName('div')[0].offsetHeight;
		elementHeight = parseInt(elementHeight + padding * 2);

		document.getElementById(id).getElementsByTagName('div')[0].className = 'content_hide';
		
		
		var reste = elementHeight - progress;
		var getvaleur = decceleration(elementHeight, progress, reste, distance);

		var slider = document.getElementById(id);		
		slider.style.height = getvaleur + 'px';
		progress = getvaleur;
		
	}
	
	var decceleration = function(heightTotal, progress, reste, distance){
	
		var startDeccelAnim = Math.round(reste * 100 / heightTotal);
		
		if (startDeccelAnim < start) {
		
			var lastMove = parseInt(heightTotal - 2);
			var resteTaux = Math.round((reste) / heightTotal * 100);
			var distanceDecc = Math.round(distance * resteTaux / 100);
			if( distanceDecc == 0 ) distanceDecc++;
			
			var valeur = progress + distanceDecc;
			var thevaleur = parseInt(valeur);
			
			if (thevaleur >= lastMove) {
				thevaleur = parseInt(heightTotal);
				
				var slider = document.getElementById(id);
				slider.getElementsByTagName('div')[0].className = 'content_show';
				clearInterval(openIntervalId);
				
			}
			
			return thevaleur;
			
		}
		else {
		
			var valeur = progress + distance;
			return parseInt(valeur);
			
		}
		
	}
	
	this.mouseopen = function(){
		openIntervalId = setInterval( function(){ open() }, speed );
	}
	
	this.mouseclose = function(){
		document.getElementById(id).getElementsByTagName('div')[0].className = 'content_hide';
		closeIntervalId = setInterval( function(){ close() }, speed); 
	}
}