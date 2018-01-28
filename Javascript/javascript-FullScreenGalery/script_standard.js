

	
	var ImgArray = new Array( '001.jpg', '002.jpg', '003.jpg', '004.jpg', '005.jpg' );
	var ImgComment = new Array( 'Mes vacances', 'Au travail', 'Lundi matin', 'Les Vaudois', 'Bison fut√©' );
	var ImgRep = 'images/bkgs/';			// [String]	Path to the Images folder
	var ImgActuel = '001.jpg';				// [String] First Image to show;
	var TransitionMode = true;				// [Boolean] true = Do transition; false = Don't do transition; 
	var TransitionSpeed = 20;				// [Integer] Milliseconds;
	var TransitionNbSteps = 20;				// [Integer] Regulates the fluidity
	var TableNbCellsPerRow = 10;			// [Integer] Indicate the nb of cell per row of the Thumbs table. ¨
	var TableThumbsPercentCellSize = 95;	// [Integer] Percentage of the thumbs width
	var TableThumbsHighlight = true;
	var TableThumbsBorderWidth = 1;		
	var TableThumbsBorderColor = '#000000';
	var TableThumbsBorderColorOver = '#ffffff';
	
	var myWindowHeight = 0;
	var myWindowWidth = 0;
	var Imgwidth = 0;
	var Imgheight = 0;
	var ImgContentHeight = 0;
	var BrowserSizeToDetect = true;			// Used if browser sized has been changed by the user 
	var ImgDimensionToDisplay = 'width'; 	// height (imageHeight = BrowserHeight), width(imageWidth = BrowserWidth)
	var TransitionOnResizeCheck = true; 	// To check if it is a user resize;
	var TransitionOpacity = 10;  			// It's a constant (means 100% black). Do not change;
	var TableThumbImageSize = 0;
	var InProcess = false;

	window.onresize = doResizeBrowser;

	function detectBrowserDimension() {
	  if( typeof( window.innerWidth ) == 'number' ) {
		//Non-IE
		myWindowWidth = window.innerWidth;
		myWindowHeight = window.innerHeight;
	  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
		//IE 6+ in 'standards compliant mode'
		myWindowWidth = document.documentElement.clientWidth;
		myWindowHeight = document.documentElement.clientHeight;
	  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
		//IE 4 compatible
		myWindowWidth = document.body.clientWidth;
		myWindowHeight = document.body.clientHeight;
	  }
	}
		
	function displayImageNumber( numberKey ){
		var currentNumber = parseInt( numberKey ) + 1;
		if( currentNumber < 10 ) currentNumber = '00' + currentNumber;
		else if( currentNumber < 100 ) currentNumber = '0' + currentNumber;
		
		document.getElementById('num').innerHTML = currentNumber;
	}
	
	function doTransitionOpacity(){
		TransitionOpacity = TransitionOpacity - ( 10 / TransitionNbSteps );
		var getTransitionDiv = document.getElementById('TransitionMode');
		if( TransitionOpacity >= 0 ){
			getTransitionDiv.style.opacity = TransitionOpacity/10;
			getTransitionDiv.style.filter = 'alpha(opacity=' + TransitionOpacity * 10 + ')';
		}else{
			getTransitionDiv.style.opacity = 0;
			getTransitionDiv.style.filter = 'alpha(opacity=0)';
			clearInterval( doTransitionOpac );
			TransitionOpacity = 10;
			InProcess = false;
		}
	}
	
	function tableImageSize(){
		TableThumbCellSize = Math.ceil( 100 / TableNbCellsPerRow );
		TableThumbImageSize = Math.ceil( ( Imgwidth / TableNbCellsPerRow ) * TableThumbsPercentCellSize / 100 );
		var TableThumbImageMargin = ( ( Imgwidth / TableNbCellsPerRow ) - TableThumbImageSize ) / 2;
		if( TableThumbsHighlight ) TableThumbImageMargin = TableThumbImageMargin - ( TableThumbsBorderWidth * 2 );
		var TableTag = document.getElementById('tableDates').getElementsByTagName('table')[0];
		
		for( iTable = 0; iTable < TableTag.getElementsByTagName('tr').length; iTable++){
			for ( iTr = 0; iTr < TableTag.getElementsByTagName('tr')[iTable].getElementsByTagName('td').length; iTr++ ) {
				TableTag.getElementsByTagName('tr')[iTable].getElementsByTagName('td')[iTr].width = TableThumbCellSize + '%';
				TableTag.getElementsByTagName('tr')[iTable].getElementsByTagName('td')[iTr].align = 'center'
				TableTag.getElementsByTagName('tr')[iTable].getElementsByTagName('td')[iTr].valign = 'middle'
				if ( TableTag.getElementsByTagName('tr')[iTable].getElementsByTagName('td')[iTr].getElementsByTagName('img').length > 0 ) {
					TableTag.getElementsByTagName('tr')[iTable].getElementsByTagName('td')[iTr].getElementsByTagName('img')[0].width = TableThumbImageSize;
					TableTag.getElementsByTagName('tr')[iTable].getElementsByTagName('td')[iTr].getElementsByTagName('img')[0].style.margin = TableThumbImageMargin + 'px';
					if (TableThumbsHighlight) {
						TableTag.getElementsByTagName('tr')[iTable].getElementsByTagName('td')[iTr].getElementsByTagName('img')[0].setAttribute( 'id', 'imgThumb' + iTable + iTr );
						TableTag.getElementsByTagName('tr')[iTable].getElementsByTagName('td')[iTr].getElementsByTagName('img')[0].style.borderWidth = TableThumbsBorderWidth + 'px';
						TableTag.getElementsByTagName('tr')[iTable].getElementsByTagName('td')[iTr].getElementsByTagName('img')[0].style.borderColor = TableThumbsBorderColor;
						TableTag.getElementsByTagName('tr')[iTable].getElementsByTagName('td')[iTr].getElementsByTagName('img')[0].style.borderStyle = 'solid';
						TableTag.getElementsByTagName('tr')[iTable].getElementsByTagName('td')[iTr].getElementsByTagName('img')[0].setAttribute( 'onmouseover', 'imgThumbRollover( \'imgThumb' + iTable + iTr + '\');' );
						TableTag.getElementsByTagName('tr')[iTable].getElementsByTagName('td')[iTr].getElementsByTagName('img')[0].setAttribute( 'onmouseout', 'imgThumbRollout( \'imgThumb' + iTable + iTr + '\');' );
					}
				}
			}
		}
	}
	
	function imgThumbRollover( ThumbId ){		
		document.getElementById( ThumbId ).style.borderColor = TableThumbsBorderColorOver;
	}
	
	function imgThumbRollout( ThumbId ){		
		document.getElementById( ThumbId ).style.borderColor = TableThumbsBorderColor;
	}
	
	function displayImage(){
				
		if ( TableThumbImageSize === 0 ) {			
			tableImageSize();
		}
		var getimageBKGDiv = document.getElementById('imageBKG');
		getimageBKGDiv.style.width = Imgwidth + 'px'; // Donner a l'element portant l'id="imageBKG" la largeur de l'image
		getimageBKGDiv.style.height = ImgContentHeight + 'px';
		getimageBKGDiv.style.marginTop = '0px';
		getimageBKGDiv.style.marginBottom = '0px';
		getimageBKGDiv.style.marginLeft = 'auto';
		getimageBKGDiv.style.marginRight = 'auto';
		getimageBKGDiv.style.overflow = 'hidden';
		getimageBKGDiv.style.position = 'relative';
		getimageBKGDiv.style.left = '0px';
		getimageBKGDiv.style.top = '0px';
		
		var MyImg  = document.createElement('img');					// Cree une balise <img>
		MyImg.setAttribute( "src", ImgRep + ImgActuel );		// Ajoute l'attribut src et sa valeur (lien vers l'image)
				
		if (ImgDimensionToDisplay === 'height') {
			MyImg.setAttribute("height", myWindowHeight); // Ajoute l'attribut height et sa valeur
		}else if (ImgDimensionToDisplay === 'width') {
			MyImg.setAttribute("width", myWindowWidth); // Ajoute l'attribut height et sa valeur
		}	
		
		getimageBKGDiv.innerHTML = '';
		getimageBKGDiv.appendChild( MyImg ); 	// Insertion de <img> dans l'element portant l'id="imageBKG"
		
		if ( TransitionMode && TransitionOnResizeCheck ) {
			var getTransitionModeDiv = document.getElementById('TransitionMode');
			getTransitionModeDiv.style.backgroundColor = '#000000';
			getTransitionModeDiv.style.position = 'absolute';
			getTransitionModeDiv.style.width = myWindowWidth + 'px'; // Donner a l'element portant l'id="imageBKG" la largeur de l'image
			getTransitionModeDiv.style.height = myWindowHeight + 'px';
			getTransitionModeDiv.style.left = '0px';
			getTransitionModeDiv.style.top = '0px';
			getTransitionModeDiv.style.opacity = TransitionOpacity/10;
			getTransitionModeDiv.style.filter = 'alpha(opacity=' + TransitionOpacity * 10 + ')';
			doTransitionOpac = setInterval( function(){ doTransitionOpacity() }, TransitionSpeed );
		}else{
			InProcess = false;
		}
	
		clearInterval( waitImageLoading );
			
	}

	function imageReadyLoad(){
		
		var gethideImageFromScreenDiv = document.getElementById('hideImageFromScreen');
		Imgwidth = gethideImageFromScreenDiv.getElementsByTagName('img')[0].width;  // Detecte la largeur de l'image (apres qu'elle fut redimensionne en fonction de la hauteur du navigateur)
		Imgheight = gethideImageFromScreenDiv.getElementsByTagName('img')[0].height;  // Detecte la largeur de l'image (apres qu'elle fut redimensionne en fonction de la hauteur du navigateur)

		if( ImgDimensionToDisplay === 'height' ){
			ImgContentHeight = Imgheight;					
		}

		if( Imgwidth != 0 ){
			gethideImageFromScreenDiv.innerHTML = '';
			displayImage();
		}
	}	
	
	function loadImage(){
		
		InProcess = true;
		var currentKey = detectKeyImage();
		document.getElementById('commentaires').innerHTML = ImgComment[currentKey];
		displayImageNumber( currentKey );
		
		if ( BrowserSizeToDetect ) {
			detectBrowserDimension();
		}
		
		Imgwidth = 0;
		var MyImgToHide  = document.createElement('img');					// Cree une balise <img>
		MyImgToHide.setAttribute( "src", ImgRep + ImgActuel );		// Ajoute l'attribut src et sa valeur (lien vers l'image)
		
		if (ImgDimensionToDisplay === 'height') {
			MyImgToHide.setAttribute("height", myWindowHeight); // Ajoute l'attribut height et sa valeur
		}else if (ImgDimensionToDisplay === 'width') {
			MyImgToHide.setAttribute("width", myWindowWidth); // Ajoute l'attribut height et sa valeur
			ImgContentHeight = myWindowHeight;		
		}	
			
		document.getElementById('hideImageFromScreen').appendChild( MyImgToHide );
		
		waitImageLoading = setInterval( function(){ imageReadyLoad() }, 1 );
		
	}


	// ---------------------Utils---¨

	function detectKeyImage(){
		var KeyImage;
		for ( i in ImgArray ){
			if ( ImgArray[i] == ImgActuel ){
				KeyImage = i;
			}
		}
		return KeyImage;
	}


	// ---------------------Events Action------------------------------¨

	function displayTable(){
		document.getElementById('tableDates').className = 'tableDates';	
	}
	
	function hideTable(){
		document.getElementById('tableDates').className = 'hidetable';	
	}
	
	function doResizeBrowser(){
		TransitionOnResizeCheck = false;
		BrowserSizeToDetect = true;
		loadImage();
	}

	function imagePrevious(){
		if (!InProcess) {
		
			BrowserSizeToDetect = false;
			TransitionOnResizeCheck = true;
			
			var currentKeyImage = detectKeyImage();
			var previousImage = currentKeyImage - 1;
			
			if (previousImage < 0) {
				ImgActuel = ImgArray[(ImgArray.length - 1)];
			}
			else {
				ImgActuel = ImgArray[previousImage];
			}
			loadImage();
		}
	}
	
	function imageNext(){
		if (!InProcess) {
		
			BrowserSizeToDetect = false;
			TransitionOnResizeCheck = true;
			
			var currentKeyImage = detectKeyImage();
			var nextImage = parseInt(currentKeyImage) + 1;
			
			if (nextImage > (ImgArray.length - 1)) {
				ImgActuel = ImgArray[0];
			}
			else {
				ImgActuel = ImgArray[nextImage];
			}
			loadImage();
		}
	}
	
	function setImage( imgToShow ){
		if (!InProcess) {
			BrowserSizeToDetect = false;
			TransitionOnResizeCheck = true;
			
			ImgActuel = imgToShow;
			hideTable();
			loadImage();
		}
	}

	function changeMode(){
		if (!InProcess) {
		
			BrowserSizeToDetect = false;
			TransitionOnResizeCheck = true;
			
			if (ImgDimensionToDisplay === 'height') 
				ImgDimensionToDisplay = 'width';
			else 
				ImgDimensionToDisplay = 'height';
			loadImage();
		}
	}