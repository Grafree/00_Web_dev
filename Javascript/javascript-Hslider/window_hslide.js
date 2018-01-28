/**
 * Classe d'ouverture d'une fenetre coulissante. 
 * @author Olivier Dommange
 * @version 1.0
 * @return void
 */
function ClassHSlider( SliderId, distanceInt, SpeedInt, SliderWidthInt, SliderWidthMinInt, StartInt ) {

		var id = SliderId;
		var distance = distanceInt;				// distance en px que parcours le coulissement
		var speed = SpeedInt;					// vitesse en milliseconde. Plus la valeur est élevé plus l'animation sera lente.
		var sliderWidth = SliderWidthInt;		// Largeur de la fenêtre coulissante une fois totalement ouverte
		var slideWidthMin = SliderWidthMinInt;	// Ouverture de base de la fenêtre coulissante
		var start = StartInt;					// Pourcentage a partir duquel la dégression commence (ex. 20, signifie à 20% de la fin
		
		var progress = 0;

		var close = function(){

			var slider = document.getElementById(id);

			if( progress > slideWidthMin ){
				var valeur = progress - distance;
				if( valeur < slideWidthMin ){ valeur = slideWidthMin; }
				var getvaleur = parseInt( valeur );
				slider.style.width = getvaleur + 'px';	
				progress = getvaleur;
			}else{
				slider.style.width = slideWidthMin + 'px';		
				progress = slideWidthMin;
				clearInterval( closeIntervalId );
			}
			
		}

		var open = function(){
			
			var slider = document.getElementById(id);
										
			var reste = sliderWidth - progress;

			var getvaleur = decceleration( sliderWidth, progress, reste, distance );
			
			slider.style.width = getvaleur + 'px';
			progress = getvaleur;
			
		}
		
		var decceleration = function(widthTotal, progress, reste, distance){
			
			var startDeccelAnim = Math.round( reste * 100 / widthTotal );
			var slider = document.getElementById(id);
			
			if( startDeccelAnim < start ){

				var lastMove = parseInt( widthTotal - 2 );
				var resteTaux = Math.round( ( reste ) / widthTotal * 100);
				var distanceDecc = Math.round( distance * resteTaux / 100 );
				
				var valeur = progress + distanceDecc;
				var thevaleur = parseInt(valeur);
				
				if( thevaleur >= lastMove ){ 						// Dernier mouvement
				
					thevaleur = parseInt(widthTotal); 
					
					slider.getElementsByTagName( 'div' )[0].className = 'content_show';
					clearInterval( openIntervalId ); 
				
				}
				
				return thevaleur;
				
			}else{

				var valeur = progress + distance;
				return valeur;

			}
			
			
		}
		
		this.mouseopen = function(){
			openIntervalId = setInterval( function(){ open() }, speed ); 
		}
		
		this.mouseclose = function(){
			document.getElementById(id).getElementsByTagName( 'div' )[0].className = 'content_hide';
			closeIntervalId = setInterval( function(){ close() }, speed );
		}
		
		this.mouseAction = function(){
		
		if( sliderWidth == progress ){
			
			document.getElementById(id).getElementsByTagName( 'div' )[0].className = 'content_hide';
			closeIntervalId = setInterval( function(){ close() }, speed );
		
		}else{
			
			openIntervalId = setInterval( function(){ open() }, speed ); 
			
		}
	
	
	}

}