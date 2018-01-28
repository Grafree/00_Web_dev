/**
 * Classe de mise en mouvement d'un slide show vertical. 
 * @author Olivier Dommange
 * @version 1.0
 * @date 11 juin 2009
 * @param distancevalue		[int] Distance dans le déplacement
 * @param speedvalue 		[int] Vitesse en milliseconde
 * @param idvalue			[string] Id du contenant 
 * @return void
 */
function SlideVerticalClass ( distancevalue, speedvalue, idvalue ) {

	var distance = parseInt( distancevalue );
	var speed = speedvalue;						
	var id = idvalue;
	var progress = 0;
	
	var moveback = function(){
		var espaceVignette = document.getElementById(id);
		var support = document.getElementById(id).getElementsByTagName( 'div' )[0];
		
		var distanceNeg = 0 - distance;
		var progressDiff = progress - distanceNeg;
		
		if( progressDiff < 0 ){
			var progressInt = parseInt( progress );

			var valeur = progressInt + distance;
			var getvaleur = parseInt( valeur );
			support.style.top = getvaleur + 'px';	
			progress = getvaleur; 
		}else{
			support.style.top = '0px';		
			progress = 0; 
		}
	}

	var move = function(){
		var dist = 0 - distance; // Correspond à la distance négative parcouru en pixel lors de chaque clic de déplacement
		
		var espaceVignette = document.getElementById( id );
		var support = document.getElementById(id).getElementsByTagName( 'div' )[0];
		var nbli = support.getElementsByTagName( 'li' ).length; // Indique le nombre d'images dans le diaporama
					
		var espaceVignetteWidth = document.getElementById(id).offsetHeight; // LHauteur de la partie visible
		
		var totalEspacevignette = 0;

		for ( i = 0; i < nbli; i++ ){
			totalEspacevignette += support.getElementsByTagName( 'img' )[i].offsetHeight; // Indique la hauteur de chaque image
		}
		
		support.style.height = totalEspacevignette + 'px'; // Redéfini la hauteur du diaporama en fonction de la largeur de toutes les images
		
		// Calcul la distance maximum de la totalité des vignettes assemblées.
		var espaceWidthDiff = 0 - ( totalEspacevignette - espaceVignetteWidth );
					
		if( progress > espaceWidthDiff ){
			
			var reste = espaceWidthDiff - progress;
			var doubleDist = parseInt( dist ) * 2 ;

			if ( reste > doubleDist) {
				var getvaleur = espaceWidthDiff; // Permet de vérifier s'il y a une distance suffisante pour encore un clic
				support.style.top = getvaleur + 'px';		
				progress = getvaleur;
			}else{
				var valeur = progress + dist;
				var getvaleur = parseInt( valeur );
				support.style.top = getvaleur + 'px';		
				progress = getvaleur;
			}
			
		}else{
			support.style.top = espaceWidthDiff + 'px';		
			progress = espaceWidthDiff;
		}
		
	}


	this.mouseUpGo = function(){
		moveIntervalId = setInterval( function(){move()}, speed ); 
	}
	this.mouseUpStop = function(){
		clearInterval( moveIntervalId );
	}
	
	this.mouseDownGo = function(){
		moveIntervalId = setInterval( function(){moveback()}, speed ); 
	}
	this.mouseDownStop = function(){
		clearInterval( moveIntervalId );
	}

}	
