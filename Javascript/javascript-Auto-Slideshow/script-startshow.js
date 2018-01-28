/**
 * Classe de mise en mouvement automatique d'un slide show de plusieurs pages. 
 * @author Olivier Dommange
 * @version 1.0 - 2009-10-01
 * @param distancevalue		[int] Distance en pixels à parcourrir de la pièce à déplacer ( + élevé = + rapide ( mais moins fluide ) )
 * @param speedvalue 		[int] Vitesse d'avancement en milliseconde ( + élevé = - rapide )
 * @param idvalue			[string] Id de l'element HTML contenant les pages 
 * @param startdesc			[int] Pourcentage a partir duquel la dégression commence (20, signifie à 20% de la fin)
 * @param secattente		[int] Nb Secondes d'attentes sur chaque slide
 * @param numerotation		[bolean] true = Affiche la numérotation de page
 * @param numid				[string] Id de la div pour afficher la pagination
 * @return void
 */
function SlideClass ( distancevalue, speedvalue, idvalue, startdecc, secattente, numerotation, numid ) {

	var distance = parseInt( distancevalue );
	var speed = speedvalue;						
	var id = idvalue;
	var start = startdecc;
	var attente = secattente * 1000;
	var numerotationBol = numerotation;
	var numerotationId = numid;
	
	var direction = 'forward';				// Direction lors du clic de la souris (forward ou back)
	var numclic = 1;						// Compte les clics ( clic droit = + 1; clic gauche = - 1 ) 
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
		nbdl = support.getElementsByTagName('img').length; 								

		for (i = 0; i < nbdl; i++) {
			totalEspacePage += support.getElementsByTagName('img')[i].offsetWidth; 
		}	

		support.style.width = totalEspacePage + 'px'; 				// Redéfini la largeur du diaporama en fonction de la largeur de toutes les images
	
		if (numerotationBol) {
			document.getElementById( numerotationId ).innerHTML = numclic + '/' + nbdl;
		}
					
		dist = 0 - distance; 
		widthPage = support.getElementsByTagName('img')[0].offsetWidth;
		
		waitMove();
		
	}
	
	var move = function(){
			
		widthTotal = 0 - widthPage * ( numclic - 1 );
		multipleWidth = 0 - widthPage * ( numclic - 1 );

		if (numerotationBol) {
			document.getElementById( numerotationId ).innerHTML = numclic + '/' + nbdl;
		}

		if (direction == 'forward' ) {
		
			reste = widthTotal - progress;
			var getvaleur = decceleration();
			
		}else{
								
			reste = multipleWidth - progress;
			var getvaleur = deccelerationBack();
			
		}
		
		support.style.left = getvaleur + 'px';
		progress = getvaleur;
		
		if (direction == 'forward') {
		
			var widthPageNeg = 0 - widthPage * ( numclic - 1 );				
		
			if( progress == widthPageNeg ){
				clearInterval( moveIntervalId );
				waitMove();
			}
			
		}else if (direction == 'back') {
					
			if( progress == 0 ){
				clearInterval( moveIntervalId );
				waitMove();
			}
		}
	}

	var deccelerationBack = function(){

		var startDeccelAnim = Math.round( reste * 100 / widthPage );
		
		if( startDeccelAnim < start ){
			
			var lastMove = -1;
			var distanceDecc = Math.round( dist * startDeccelAnim / 100 );
			if( distanceDecc == 0 ) distanceDecc = -1;
			
			var valeur = progress - distanceDecc;
			var thevaleur = parseInt(valeur);
			
			if( thevaleur >= lastMove ){ 						// Dernier mouvement
				thevaleur = parseInt(multipleWidth);
				reste = 0;
				clearInterval( moveIntervalId ); 
			}
			return thevaleur;
		}else{
			var valeur = progress + distance;
			return parseInt(valeur);
		}
	}
	
	var decceleration = function(){
			
		var widthPageNeg = 0 - widthPage;
		var startDeccelAnim = Math.round( reste * 100 / widthPageNeg );
		
		if( startDeccelAnim < start ){

			var lastMove = parseInt( widthTotal );
			var distanceDecc = Math.round( dist * startDeccelAnim / 100 );
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

	var waitMove = function(){
		waitInterval = setInterval( function(){autoMove()}, attente ); 
	}
	
		
	var autoMove = function(){
		clearInterval( waitInterval );
		if ( nbdl == numclic ) {
			direction = 'back';	
			moveIntervalId = setInterval( function(){move()}, speed ); 
			numclic = 1;
			
		}else if ( nbdl >= numclic ){
			direction = 'forward';
			moveIntervalId = setInterval( function(){move()}, speed ); 
			numclic++;
		}
	}
}	