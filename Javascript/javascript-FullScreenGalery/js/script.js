/**
 * Full screen galery. 
 * @author Olivier Dommange
 * @version 1.0
 * @date 14 fevrier 2010
 * 
 * @param ImgArray						[array] List of image's file names
 * @param ImgComment 					[array] List of comentaries
 * @param ImgRep						[string] Path to the Images folder
 * @param ImgActuel						[string] Image's file name of the first Image to show;
 * @param TransitionMode				[bolean] true = Do transition; false = Don't do transition;
 * @param TransitionSpeed				[int] Miliseconds
 * @param TransitionNbSteps				[int] Regulates the transition fluidity.
 * @param TableNbCellsPerRow			[int] Indicate the nb of cells per row of the Thumbs table that is in the HTML code
 * @param TableThumbsPercentCellSize	[int] Percentage of the thumbs width in the cell
 * @param TableThumbsHighlight			[boolean] true = Do the mouseover highlight effect
 * @param TableThumbsBorderWidth		[int] width of the hightlight effect
 * @param TableThumbsBorderColor		[string] color of the border (on normal status)
 * @param TableThumbsBorderColorOver	[string] color of the border (on mouseover status)
 * @param ImgDimensionToDisplay 		[string] 'height' or 'width' - Indicates the default mode on the page load 
 * @param InstanceName 					[string] Name of the instance of this object 
 * @return void
 */
function FullScreenGalery( ImgArray, ImgComment, ImgRep, ImgActuel, TransitionMode, TransitionSpeed, TransitionNbSteps, TableNbCellsPerRow, TableThumbsPercentCellSize, TableThumbsHighlight, TableThumbsBorderWidth, TableThumbsBorderColor, TableThumbsBorderColorOver, ImgDimensionToDisplay, InstanceName ){

	var ImgArray = ImgArray;
	var ImgComment = ImgComment;
	var ImgRep = ImgRep; 										// [String]	Path to the Images folder
	var ImgActuel = ImgActuel; 									// [String] First Image to show;
	var TransitionMode = TransitionMode; 						// [Boolean] true = Do transition; false = Don't do transition; 
	var TransitionSpeed = TransitionSpeed; 						// [Integer] Milliseconds;
	var TransitionNbSteps = TransitionNbSteps; 					// [Integer] Regulates the fluidity
	var TableNbCellsPerRow = TableNbCellsPerRow; 				// [Integer] Indicate the nb of cell per row of the Thumbs table. �
	var TableThumbsPercentCellSize = TableThumbsPercentCellSize; 	// [Integer] Percentage of the thumbs width
	var TableThumbsHighlight = TableThumbsHighlight;
	var TableThumbsBorderWidth = TableThumbsBorderWidth;
	var TableThumbsBorderColor = TableThumbsBorderColor;
	var TableThumbsBorderColorOver = TableThumbsBorderColorOver;
	var ImgDimensionToDisplay = ImgDimensionToDisplay; 						// height (imageHeight = BrowserHeight), width(imageWidth = BrowserWidth)
	var InstanceName = InstanceName;
	
	var myWindowHeight = 0;
	var myWindowWidth = 0;
	var Imgwidth = 0;
	var Imgheight = 0;
	var ImgContentHeight = 0;
	var BrowserSizeToDetect = true; // Used if browser sized has been changed by the user 
	var TransitionOnResizeCheck = true; // To check if it is a user resize;
	var TransitionOpacity = 10; // It's a constant (means 100% black). Do not change;
	var TableThumbImageSize = 0;
	var containerTableSizeHeight = 0;
	var containerTableSizeWidth = 0;
	var InProcess = false;
	
	window.onload = function(){
		loadImage();
	}	

	window.onresize = function(){
		doResizeBrowser();
	}
	
	
	var detectBrowserDimension = function(){
		if (typeof(window.innerWidth) == 'number') {
			//Non-IE
			myWindowWidth = window.innerWidth;
			myWindowHeight = window.innerHeight;
		}
		else 
			if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
				//IE 6+ in 'standards compliant mode'
				myWindowWidth = document.documentElement.clientWidth;
				myWindowHeight = document.documentElement.clientHeight;
			}
			else 
				if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
					//IE 4 compatible
					myWindowWidth = document.body.clientWidth;
					myWindowHeight = document.body.clientHeight;
				}
	}
	
	var displayImageNumber = function( numberKey ){
		var currentNumber = parseInt(numberKey) + 1;
		if (currentNumber < 10) 
			currentNumber = '00' + currentNumber;
		else 
			if (currentNumber < 100) 
				currentNumber = '0' + currentNumber;
		
		document.getElementById('num').innerHTML = currentNumber;
	}
	
	var doTransitionOpacity = function(){
		TransitionOpacity = TransitionOpacity - (10 / TransitionNbSteps);
		var getTransitionDiv = document.getElementById('TransitionMode');
		if (TransitionOpacity >= 0) {
			getTransitionDiv.style.opacity = TransitionOpacity / 10;
			getTransitionDiv.style.filter = 'alpha(opacity=' + TransitionOpacity * 10 + ')';
		}
		else {
			getTransitionDiv.style.opacity = 0;
			getTransitionDiv.style.filter = 'alpha(opacity=0)';
			clearInterval(doTransitionOpac);
			TransitionOpacity = 10;
			InProcess = false;
		}
	}
	
	var tableImageSize = function(){
		
		//alert(TableNbCellsPerRow);
		TableThumbCellSize = Math.ceil(100 / TableNbCellsPerRow);
		TableThumbImageSize = Math.floor( (myWindowWidth / TableNbCellsPerRow ) * TableThumbsPercentCellSize / 100 );
		var TableWidth = TableThumbImageSize * TableNbCellsPerRow;
		//var TableThumbImageMargin = ((Imgwidth / TableNbCellsPerRow) - TableThumbImageSize) / 2;
		//if (TableThumbsHighlight) TableThumbImageMargin = TableThumbImageMargin - (TableThumbsBorderWidth * 2);
		var TableTag = document.getElementById('tableDates').getElementsByTagName('table')[0];
		TableTag.width = TableWidth;
		
		for (iTable = 0; iTable < TableTag.getElementsByTagName('tr').length; iTable++) {
			for (iTr = 0; iTr < TableTag.getElementsByTagName('tr')[iTable].getElementsByTagName('td').length; iTr++) {
				//TableTag.getElementsByTagName('tr')[iTable].getElementsByTagName('td')[iTr].width = TableThumbCellSize + '%';
				TableTag.getElementsByTagName('tr')[iTable].getElementsByTagName('td')[iTr].width = TableThumbImageSize;
				TableTag.getElementsByTagName('tr')[iTable].getElementsByTagName('td')[iTr].align = 'center'
				TableTag.getElementsByTagName('tr')[iTable].getElementsByTagName('td')[iTr].valign = 'middle'
				if (TableTag.getElementsByTagName('tr')[iTable].getElementsByTagName('td')[iTr].getElementsByTagName('img').length > 0) {
					TableTag.getElementsByTagName('tr')[iTable].getElementsByTagName('td')[iTr].getElementsByTagName('img')[0].width = TableThumbImageSize;
					//TableTag.getElementsByTagName('tr')[iTable].getElementsByTagName('td')[iTr].getElementsByTagName('img')[0].style.margin = TableThumbImageMargin + 'px';
						TableTag.getElementsByTagName('tr')[iTable].getElementsByTagName('td')[iTr].getElementsByTagName('img')[0].setAttribute('onmouseover', InstanceName + '.imgThumbRollover( \'imgThumb' + iTable + iTr + '\');');
						TableTag.getElementsByTagName('tr')[iTable].getElementsByTagName('td')[iTr].getElementsByTagName('img')[0].setAttribute('onmouseout', InstanceName + '.imgThumbRollout( \'imgThumb' + iTable + iTr + '\');');
						TableTag.getElementsByTagName('tr')[iTable].getElementsByTagName('td')[iTr].getElementsByTagName('img')[0].setAttribute('id', 'imgThumb' + iTable + iTr);
					
					if (TableThumbsHighlight) {
						
						TableTag.getElementsByTagName('tr')[iTable].getElementsByTagName('td')[iTr].getElementsByTagName('img')[0].style.borderWidth = TableThumbsBorderWidth + 'px';
						TableTag.getElementsByTagName('tr')[iTable].getElementsByTagName('td')[iTr].getElementsByTagName('img')[0].style.borderColor = TableThumbsBorderColor;
						TableTag.getElementsByTagName('tr')[iTable].getElementsByTagName('td')[iTr].getElementsByTagName('img')[0].style.borderStyle = 'solid';
						
					}
				}
			}
		}
	}
	
	this.imgThumbRollover = function(ThumbId){
		if (TableThumbsHighlight) {
			document.getElementById(ThumbId).style.borderColor = TableThumbsBorderColorOver;
		}else{
			document.getElementById(ThumbId).style.opacity = 0.5;
			document.getElementById(ThumbId).style.filter = 'alpha(opacity=5)';
		}
	}
	
	this.imgThumbRollout = function(ThumbId){
		if (TableThumbsHighlight) {
		document.getElementById(ThumbId).style.borderColor = TableThumbsBorderColor;
		}else{
			//alert(ThumbId);
			document.getElementById(ThumbId).style.opacity = 1;
			document.getElementById(ThumbId).style.filter = 'alpha(opacity=10)';
		}
	}
	
	var displayImage = function(){
	
		if (BrowserSizeToDetect) {
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
		
		var MyImg = document.createElement('img'); // Cree une balise <img>
		MyImg.setAttribute("src", ImgRep + ImgActuel); // Ajoute l'attribut src et sa valeur (lien vers l'image)
		if (ImgDimensionToDisplay === 'height') {
			MyImg.setAttribute("height", myWindowHeight); // Ajoute l'attribut height et sa valeur
		}
		else 
			if (ImgDimensionToDisplay === 'width') {
				MyImg.setAttribute("width", myWindowWidth); // Ajoute l'attribut height et sa valeur
			}
		
		getimageBKGDiv.innerHTML = '';
		getimageBKGDiv.appendChild(MyImg); // Insertion de <img> dans l'element portant l'id="imageBKG"
		if (TransitionMode && TransitionOnResizeCheck) {
			var getTransitionModeDiv = document.getElementById('TransitionMode');
			getTransitionModeDiv.style.backgroundColor = '#000000';
			getTransitionModeDiv.style.position = 'absolute';
			getTransitionModeDiv.style.width = myWindowWidth + 'px'; // Donner a l'element portant l'id="imageBKG" la largeur de l'image
			getTransitionModeDiv.style.height = myWindowHeight + 'px';
			getTransitionModeDiv.style.left = '0px';
			getTransitionModeDiv.style.top = '0px';
			getTransitionModeDiv.style.opacity = TransitionOpacity / 10;
			getTransitionModeDiv.style.filter = 'alpha(opacity=' + TransitionOpacity * 10 + ')';
			doTransitionOpac = setInterval(function(){
				doTransitionOpacity()
			}, TransitionSpeed);
		}
		else {
			InProcess = false;
		}
		
		clearInterval(waitImageLoading);
		
	}
	
	var imageReadyLoad = function(){
	
		var gethideImageFromScreenDiv = document.getElementById('hideImageFromScreen');
		Imgwidth = gethideImageFromScreenDiv.getElementsByTagName('img')[0].width; // Detecte la largeur de l'image (apres qu'elle fut redimensionne en fonction de la hauteur du navigateur)
		Imgheight = gethideImageFromScreenDiv.getElementsByTagName('img')[0].height; // Detecte la largeur de l'image (apres qu'elle fut redimensionne en fonction de la hauteur du navigateur)
		if (ImgDimensionToDisplay === 'height') {
			ImgContentHeight = Imgheight;
		}
		
		if (Imgwidth != 0) {
			gethideImageFromScreenDiv.innerHTML = '';
			displayImage();
		}
	}
	
	var loadImage = function(){
		
		InProcess = true;
		var currentKey = detectKeyImage();
		document.getElementById('commentaires').innerHTML = ImgComment[currentKey];
		displayImageNumber(currentKey);
		
		if (BrowserSizeToDetect) {
			detectBrowserDimension();
		}
		
		Imgwidth = 0;
		var MyImgToHide = document.createElement('img'); // Cree une balise <img>
		MyImgToHide.setAttribute("src", ImgRep + ImgActuel); // Ajoute l'attribut src et sa valeur (lien vers l'image)
		if (ImgDimensionToDisplay === 'height') {
			MyImgToHide.setAttribute("height", myWindowHeight); // Ajoute l'attribut height et sa valeur
		}
		else 
			if (ImgDimensionToDisplay === 'width') {
				MyImgToHide.setAttribute("width", myWindowWidth); // Ajoute l'attribut height et sa valeur
				ImgContentHeight = myWindowHeight;
			}
		
		document.getElementById('hideImageFromScreen').appendChild(MyImgToHide);
		
		waitImageLoading = setInterval(function(){
			imageReadyLoad()
		}, 1);
		
	}
	
	
	// ---------------------Utils---�
	
	var detectKeyImage = function(){
		var KeyImage;
		for (i in ImgArray) {
			if (ImgArray[i] == ImgActuel) {
				KeyImage = i;
			}
		}
		return KeyImage;
	}
	
	
	var containerTableSize = function(){
		document.getElementById('containerTable').style.height = myWindowHeight + 'px';
		document.getElementById('containerTable').style.width = myWindowWidth + 'px';
		containerTableSizeHeight = myWindowHeight;
		containerTableSizeWidth = myWindowWidth;
	}
	
	// ---------------------Events Action------------------------------�
	
	this.displayTable = function(){
		containerTableSize();
		document.getElementById('tableDates').className = 'tableDates';
	}
	
	this.hideTable = function(){
		document.getElementById('containerTable').style.height = '0px';
		document.getElementById('containerTable').style.width = '0px';
		document.getElementById('tableDates').className = 'hidetable';
		containerTableSizeHeight = 0;
		containerTableSizeWidth = 0;
	}
	
	this.displayInfo = function(){
		document.getElementById( 'info' ).className = 'info';
		/*
		if (myWindowWidth > 200) {
			var infoWidth = myWindowWidth - 200;
		}else{
			var infoWidth = myWindowWidth;
		}
		var infoMarginLeft = ( infoWidth / 2 );	
		document.getElementById( 'info' ).style.width = infoWidth + 'px';
		document.getElementById( 'info' ).style.left = '50%';
		document.getElementById( 'info' ).style.marginLeft = '-' + infoMarginLeft + 'px';	
		*/
	}
	
	this.hideInfo = function(){
		document.getElementById('info').className = 'hideinfo';
	}
	
	var doResizeBrowser = function(){
		TransitionOnResizeCheck = false;
		BrowserSizeToDetect = true;
		loadImage();
		if( containerTableSizeHeight !== 0 ){
			containerTableSize();
		}
	}
	
	this.imagePrevious = function(){
		if (!InProcess) {
		
			BrowserSizeToDetect = false;
			TransitionOnResizeCheck = true;
			
			var currentKeyImage = detectKeyImage();
			var previousImage = currentKeyImage - 1;
			
			if (previousImage < 0) {
				//alert( (ImgArray.length - 1) );
				ImgActuel = ImgArray[(ImgArray.length - 1)];
			}
			else {
				ImgActuel = ImgArray[previousImage];
			}
			loadImage();
		}
	}
	
	this.imageNext = function(){
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
	
	this.setImage = function(imgToShow){
		
		if (!InProcess) {
			
			BrowserSizeToDetect = false;
			TransitionOnResizeCheck = true;
			
			ImgActuel = imgToShow;
			this.hideTable(); 
			loadImage();
		}
	}
	
	this.changeMode = function(){
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
	
}