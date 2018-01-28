
/**
 * Classe de mise en mouvement d'un slide show de plusieurs pages. 
 * @author Olivier Dommange
 * @version 1.0
 * @param distancevalue		[int] Distance en pixels à parcourrir de la pièce à déplacer ( + élevé = + rapide ( mais moins fluide ) )
 * @param speedvalue 		[int] Vitesse d'avancement en milliseconde ( + élevé = - rapide )
 * @param idvalue			[string] Id de l'element HTML contenant les pages 
 * @param startdesc			[int] Pourcentage a partir duquel la dégression commence (20, signifie à 20% de la fin)
 * @return void
 */
function SlideClass ( distancevalue, speedvalue, idvalue, startdecc ) {

	var distance = parseInt( distancevalue );
	var speed = speedvalue;						
	var id = idvalue;
	var start = startdecc;
	
	var direction = 'forward';				// Direction lors du clic de la souris (forward ou back)
	var numclic = 0;						// Compte les clics ( clic droit = + 1; clic gauche = - 1 ) 
	var totalEspacePage = 0;				// Largeur de toutes les pages réunies.
	var widthPage = 0;						// Largeur d'une seule page.
	var widthTotal = 0;						// Largeur de toutes les pages réunies actives.
	var multipleWidth = 0;					// Largeur des pages à couvrir lors du déplacement.
	var progress = 0;						// Progression du défilement sur la distance de toutes les pages.
	var reste = 0;							// Distance qui reste à couvrir au déplacement lors d'un clic.
	var dist = 0;							// Même valeur que distance mais négatif
	var nbdl = 0;							// Compte le nombre de pages (compte le nombre d'éléments HTML du type <dl>)
	var support = '';						// Calcule largeur de la fenêtre qui contient et fait défiler les pages

	window.onload = function(){
		support = document.getElementById(id).getElementsByTagName('div')[0];
		nbdl = support.getElementsByTagName('dl').length; 								
		
		for (i = 0; i < nbdl; i++) {
			totalEspacePage += support.getElementsByTagName('dl')[0].offsetWidth; 
		}	
			
		document.getElementById('pagenum').innerHTML = numclic + 1 + '/' + nbdl;
	}
	
	var move = function(){
		dist = 0 - distance; 

		support.style.width = totalEspacePage + 'px'; 				// Redéfini la largeur du diaporama en fonction de la largeur de toutes les images
		widthPage = support.getElementsByTagName('dl')[0].offsetWidth;

		if (numclic <= 0) {
			
			widthTotal = 0 - widthPage;
			multipleWidth = 0 - ( widthPage * numclic );
			numclic = 0;
					
		} else if ( numclic <= nbdl && numclic > 0 ) {
			
			widthTotal = 0 - widthPage * numclic;
			multipleWidth = 0 - ( widthPage * numclic );
			
			if (direction == 'forward' && numclic >= nbdl - 1) {
				
				numclic = nbdl - 1;
				
			}
			
		}
		
		document.getElementById('pagenum').innerHTML = numclic + 1 + '/' + nbdl;
		
		if (numclic != nbdl  && widthTotal != numclic) {
		
			if (direction == 'forward') {
			
				reste = widthTotal - progress;
				var getvaleur = decceleration();
				
			}else if (direction == 'back') {
									
				reste = multipleWidth - progress;
				var getvaleur = deccelerationBack();
				
			}
			
			support.style.left = getvaleur + 'px';
			progress = getvaleur;
			
		}else{
			
			clearInterval( moveIntervalId );
			
		}
		
	}
	
	var deccelerationBack = function(){

		var startDeccelAnim = Math.round( reste * 100 / widthPage );
		
		if( startDeccelAnim < start ){
			
			var lastMove = multipleWidth - 2;
			var resteTaux = Math.round( reste / widthTotal * 100);
			var distanceDecc = Math.round( dist * resteTaux / 100 );
			if( distanceDecc == 0 ) distanceDecc = 1;
			
			var valeur = progress + distanceDecc;
			var thevaleur = parseInt(valeur);
			
			if( thevaleur >= lastMove ){ 						// Dernier mouvement
				thevaleur = parseInt(multipleWidth);
				clearInterval( moveIntervalId ); 
			}
			return thevaleur;
		}else{
			var valeur = progress + distance;
			return parseInt(valeur);
		}
	}
	
	var decceleration = function(){
			
		var startDeccelAnim = Math.round( reste * 100 / widthTotal );

		if( startDeccelAnim < start ){

			var lastMove = parseInt( widthTotal + 2 );
			var resteTaux = Math.round( reste / widthTotal * 100);
			var distanceDecc = Math.round( dist * resteTaux / 100 );
			if( distanceDecc == 0 ) distanceDecc = -1;
			
			var valeur = progress + distanceDecc;
			var thevaleur = parseInt(valeur);
			
			if( thevaleur <= lastMove ){ 						// Dernier mouvement
				thevaleur = parseInt(widthTotal); 
				clearInterval( moveIntervalId ); 
			}
			return thevaleur;
		}else{
			var valeur = progress - distance;
			return parseInt(valeur);
		}
	}

	this.mouseRightGo = function(){
		direction = 'forward';
		moveIntervalId = setInterval( function(){move()}, speed ); 
		numclic ++;
	}
	
	this.mouseLeftGo = function(){
		direction = 'back';
		moveIntervalId = setInterval( function(){move()}, speed ); 
		numclic --;
	}
	
	this.endPageShow = function(){
		direction = 'forward';
		moveIntervalId = setInterval( function(){move()}, speed ); 
		numclic = nbdl - 1;
	}
	
	this.beginPageShow = function(){
		direction = 'back';
		moveIntervalId = setInterval( function(){move()}, speed ); 
		numclic = 0;
	}
	
	this.pageShow = function( page ){
		if ( page - 1 < numclic ) {
			direction = 'back';
			numclic = page - 1;
			moveIntervalId = setInterval( function(){move()}, speed ); 
		}else if ( page - 1 > numclic ){
			direction = 'forward';
			numclic = page - 1;
			moveIntervalId = setInterval( function(){move()}, speed ); 
		}
	}
}	
