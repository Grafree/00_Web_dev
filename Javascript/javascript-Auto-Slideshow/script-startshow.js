/**
 * Classe de mise en mouvement automatique d'un slide show de plusieurs pages. 
 * @author Olivier Dommange
 * @version 1.0 - 2009-10-01
 * @param distancevalue		[int] Distance en pixels � parcourrir de la pi�ce � d�placer ( + �lev� = + rapide ( mais moins fluide ) )
 * @param speedvalue 		[int] Vitesse d'avancement en milliseconde ( + �lev� = - rapide )
 * @param idvalue			[string] Id de l'element HTML contenant les pages 
 * @param startdesc			[int] Pourcentage a partir duquel la d�gression commence (20, signifie � 20% de la fin)
 * @param secattente		[int] Nb Secondes d'attentes sur chaque slide
 * @param numerotation		[bolean] true = Affiche la num�rotation de page
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
	var totalEspacePage = 0;				// Largeur de toutes les pages r�unies.
	var widthPage = 0;						// Largeur d'une seule page.
	var widthTotal = 0;						// Largeur de toutes les pages r�unies actives.
	var multipleWidth = 0;					// Largeur des pages � couvrir lors du d�placement.
	var progress = 0;						// Progression du d�filement sur la distance de toutes les pages.
	var reste = 0;							// Distance qui reste � couvrir au d�placement lors d'un clic.
	var dist = 0;							// M�me valeur que distance mais n�gatif
	var nbdl = 0;							// Compte le nombre de pages (compte le nombre d'�l�ments HTML du type <dl>)
	var support = '';						// Calcule largeur de la fen�tre qui contient et fait d�filer les pages
	

	window.onload = function(){
		
		support = document.getElementById(id).getElementsByTagName('div')[0];
		nbdl = support.getElementsByTagName('img').length; 								

		for (i = 0; i < nbdl; i++) {
			totalEspacePage += support.getElementsByTagName('img')[i].offsetWidth; 
		}	

		support.style.width = totalEspacePage + 'px'; 				// Red�fini la largeur du diaporama en fonction de la largeur de toutes les images
	
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