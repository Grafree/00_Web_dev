/**
 * Classe de gestion des fenetres coulissantes. 
 * @author Olivier Dommange
 * @version 1.0
 * @date 12 septembre 2010
 * @param enlargeInt		[int] Ellargissement en px
 * @param speedInt 			[int] vitesse en milliseconde
 * @param contentId			[string] id du contenant 
 * @param imgActivePercent	[int] Pourcent de l'opacite de l'element actif
 * @param curveInt			[int] Accentuation de la courbe (1=Aucun - 5=Extreme)
 * @return void
 */
function dynamicGallery( enlargeInt, speedInt, contentId, imgActivePercent, curveInt ){
	
	var enlargeProcessInterval = enlargeInt;
	var speedMilliseconde = speedInt;
	var objectElement = contentId;
	var imgOpacityActiveState = imgActivePercent; // En %
	var curveEmphasis = curveInt; // En %
	
	var nbImages = 0;
	var imgBorderH = new Array(); 		// Bordure total en px à l'horizontal 
	var imgBorderV = new Array(); 		// Bordure total en px à la vertical 
	var imgPaddingH = new Array(); 		// Padding total en px à l'horizontal 
	var imgPaddingV = new Array(); 		// Padding total en px à la vertical 
	var imgMarginH = new Array(); 		// Margin total en px à l'horizontal 
	var imgMarginV = new Array(); 		// Margin total en px à la vertical
	var imgWidthH = new Array(); 		// Largeur en px à l'horizontal 
	var imgHeightV = new Array(); 		// Hauteur en px à la vertical
	var imgTotalWidth = new Array(); 	// Largeur totale en px (Border+Padding+Margin+Width)
	var imgTotalHeight = new Array(); 	// Hauteur totale en px (Border+Padding+Margin+Height)
	var imgLeftPosition = new Array();	// Position de l'image thumb
	var imgTopPosition = new Array();	// Position de l'image thumb
	var imgExpandedWidth = new Array();	// Largeur réelle de l'image
	var imgExpandedHeight = new Array();// Largeur réelle de l'image
	var imgEnlargeProcess = new Array();// Largeur réelle de l'image
	
	var contentElement = '';
	var contentBorderH = 0;
	var contentBorderV = 0;
	var contentPaddingH = 0;
	var contentPaddingV = 0;
	var contentWidth = 0;
	var contentHeight = 0;
	var contentTotalWidth = 0;
	var contentTotalHeight = 0;
	
	var currentImg = '';
	var currentImgNum = 0;
	var currentImgWidthThumb = 0;
	var currentImgWidthProcess = 0;
	var currentImgWidthTotal = 0;
	var currentImgHeightThumb = 0;
	var currentImgHeightProcess = 0;
	var currentImgHeightTotal = 0;
	var currentImgLeftPositionThumb = 0;
	var currentImgLeftPositionProcess = 0;
	var currentImgLeftPositionObjectif = 0;
	var currentImgTopPositionThumb = 0;
	var currentImgTopPositionProcess = 0;
	var currentImgTopPositionObjectif = 0;
	
	var imgCreated = '';
	var nbSteps = 0;
	
	var percentEnlarge = 0;
	var leftProcessInterval = 0;
	var topProcessInterval = 0;
	
	var exposeProcess = '';

	this.initProcess = function(){
		
		contentElement = document.getElementById( contentId );
		
		var imgTempElement = document.createElement('img');
		imgTempElement.style.position = 'absolute';
		imgTempElement.style.left = '-3000px';
		imgTempElement.style.top = '-3000px';
		imgTempElement.style.width = 'auto';
		contentElement.appendChild( imgTempElement );
		

	
		if (window.getComputedStyle) {
			
			var paddingDivL = window.getComputedStyle(contentElement, null).paddingLeft;
			paddingDivL = parseInt( paddingDivL.replace( "px", "" ) );
			var paddingDivR = window.getComputedStyle(contentElement, null).paddingRight;
			paddingDivR = parseInt( paddingDivR.replace( "px", "" ) )
			var borderDivL = window.getComputedStyle(contentElement, null).borderLeftWidth;
			borderDivL = parseInt( borderDivL.replace( "px", "" ) );
			var borderDivR = window.getComputedStyle(contentElement, null).borderRightWidth;
			borderDivR = parseInt( borderDivR.replace( "px", "" ) );
			
			var paddingDivB = window.getComputedStyle(contentElement, null).paddingBottom;
			paddingDivB = parseInt( paddingDivB.replace( "px", "" ) );
			var paddingDivT = window.getComputedStyle(contentElement, null).paddingTop;
			paddingDivT = parseInt( paddingDivT.replace( "px", "" ) );
			var borderDivB = window.getComputedStyle(contentElement, null).borderBottomWidth;
			borderDivB = parseInt( borderDivB.replace( "px", "" ) );
			var borderDivT = window.getComputedStyle(contentElement, null).borderTopWidth;
			borderDivT = parseInt( borderDivT.replace( "px", "" ) );
			
			var divWidth = window.getComputedStyle(contentElement, null).width;
			divWidth = parseInt( divWidth.replace( "px", "" ) );
			var divHeight = window.getComputedStyle(contentElement, null).height;
			divHeight = parseInt( divHeight.replace( "px", "" ) );
			
		}
		else if (contentElement.currentStyle){
			
			var paddingDivL = contentElement.currentStyle.paddingLeft;
			if( paddingDivL == 'auto' ) paddingDivL = 0; else paddingDivL = parseInt( paddingDivL.replace( "px", "" ) );
			var paddingDivR = contentElement.currentStyle.paddingRight;
			if( paddingDivR == 'auto' ) paddingDivR = 0; else paddingDivR = parseInt( paddingDivR.replace( "px", "" ) );
			var borderDivL = contentElement.currentStyle.borderLeftWidth;
			if( borderDivL == 'medium' ) borderDivL = 0; else borderDivL = parseInt( borderDivL.replace( "px", "" ) );
			var borderDivR = contentElement.currentStyle.borderRightWidth;
			if( borderDivR == 'medium' ) borderDivR = 0; else borderDivR = parseInt( borderDivR.replace( "px", "" ) );
			
			var paddingDivB = contentElement.currentStyle.paddingBottom;
			if( paddingDivB == 'auto' ) paddingDivB = 0; else paddingDivB = parseInt( paddingDivB.replace( "px", "" ) );
			var paddingDivT = contentElement.currentStyle.paddingTop;
			if( paddingDivT == 'auto' ) paddingDivT = 0; else paddingDivT = parseInt( paddingDivT.replace( "px", "" ) );
			var borderDivB = contentElement.currentStyle.borderBottomWidth;
			if( borderDivB == 'medium' ) borderDivB = 0; else borderDivB = parseInt( borderDivB.replace( "px", "" ) );
			var borderDivT = contentElement.currentStyle.borderTopWidth;
			if( borderDivT == 'medium' ) borderDivT = 0; else borderDivT = parseInt( borderDivT.replace( "px", "" ) );

			var divWidth = contentElement.offsetWidth;
			var divHeight = contentElement.offsetHeight;
			/*
			var divWidth = contentElement.currentStyle.width;
			if( divWidth == 'auto' ) divWidth = document.documentElement.clientWidth; else divWidth = parseInt( divWidth.replace( "px", "" ) );
			var divHeight = contentElement.currentStyle.height;
			if( divHeight == 'auto' ) divHeight = document.documentElement.clientHeight; else divHeight = parseInt( divHeight.replace( "px", "" ) );
			*/
			//alert(contentElement.currentStyle.width);
			//var divWidth = contentElement.width - ( paddingDivR + paddingDivL );
			//var divHeight = contentElement.height - ( paddingDivT + paddingDivB );;
		}
		//alert(divWidth);
		
		contentPaddingH = paddingDivL + paddingDivR;
		contentBorderH = borderDivL + borderDivR;
		contentWidthH = divWidth;
		contentTotalWidth = contentPaddingH + contentBorderH + contentWidthH;
		contentPaddingV = paddingDivB + paddingDivT;
		contentBorderV = borderDivB + borderDivT;
		contentHeightV = divHeight;
		contentTotalHeight = contentPaddingV + contentBorderV + contentHeightV;
		
		nbImages = contentElement.getElementsByTagName('img').length;

		for (var i = 0; i < nbImages; i++) {
			imgElement = contentElement.getElementsByTagName('img')[i];
			imgElement.setAttribute('id', contentId + i);
			/*
			imgElement.setAttribute('onmouseover', contentId + '.imgOver(\'' + contentId + i + '\');');
			imgElement.setAttribute('onmouseout', contentId + '.imgOut(\'' + contentId + i + '\');');
			imgElement.setAttribute('onclick', contentId + '.imgExpose(\'' + contentId + i + '\');');
			*/
		
			if (window.getComputedStyle) {
				var marginImgL = window.getComputedStyle(imgElement, null).marginLeft;
				marginImgL = parseInt( marginImgL.replace( "px", "" ) );
				var marginImgR = window.getComputedStyle(imgElement, null).marginRight;
				marginImgR = parseInt( marginImgR.replace( "px", "" ) );
				var paddingImgL = window.getComputedStyle(imgElement, null).paddingLeft;
				paddingImgL = parseInt( paddingImgL.replace( "px", "" ) );
				var paddingImgR = window.getComputedStyle(imgElement, null).paddingRight;
				paddingImgR = parseInt( paddingImgR.replace( "px", "" ) );
				var borderImgL = window.getComputedStyle(imgElement, null).borderLeftWidth;
				borderImgL = parseInt( borderImgL.replace( "px", "" ) );
				var borderImgR = window.getComputedStyle(imgElement, null).borderRightWidth;
				borderImgR = parseInt( borderImgR.replace( "px", "" ) );
				
				var marginImgB = window.getComputedStyle(imgElement, null).marginBottom;
				marginImgB = parseInt( marginImgB.replace( "px", "" ) );
				var marginImgT = window.getComputedStyle(imgElement, null).marginTop;
				marginImgT = parseInt( marginImgT.replace( "px", "" ) );
				var paddingImgB = window.getComputedStyle(imgElement, null).paddingBottom;
				paddingImgB = parseInt( paddingImgB.replace( "px", "" ) );
				var paddingImgT = window.getComputedStyle(imgElement, null).paddingTop;
				paddingImgT = parseInt( paddingImgT.replace( "px", "" ) );
				var borderImgB = window.getComputedStyle(imgElement, null).borderBottomWidth;
				borderImgB = parseInt( borderImgB.replace( "px", "" ) );
				var borderImgT = window.getComputedStyle(imgElement, null).borderTopWidth;
				borderImgT = parseInt( borderImgT.replace( "px", "" ) );
				
				var imgWidth = window.getComputedStyle(imgElement, null).width;
				imgWidth = parseInt( imgWidth.replace( "px", "" ) );
				var imgHeight = window.getComputedStyle(imgElement, null).height;
				imgHeight = parseInt( imgHeight.replace( "px", "" ) );
			}
			else if (imgElement.currentStyle) {
				var marginImgL = imgElement.currentStyle.marginLeft;
				if( marginImgL == 'auto' ) marginImgL = 0; else marginImgL = parseInt( marginImgL.replace( "px", "" ) );
				var marginImgR = imgElement.currentStyle.marginRight;
				if( marginImgR == 'auto' ) marginImgR = 0; else marginImgR = parseInt( marginImgR.replace( "px", "" ) );
				var paddingImgL = imgElement.currentStyle.paddingLeft;
				if( paddingImgL == 'auto' ) paddingImgL = 0; else paddingImgL = parseInt( paddingImgL.replace( "px", "" ) );
				var paddingImgR = imgElement.currentStyle.paddingRight;
				if( paddingImgR == 'auto' ) paddingImgR = 0; else paddingImgR = parseInt( paddingImgR.replace( "px", "" ) );
				var borderImgL = imgElement.currentStyle.borderLeftWidth;
				if( borderImgL == 'medium' ) borderImgL = 0; else borderImgL = parseInt( borderImgL.replace( "px", "" ) );
				var borderImgR = imgElement.currentStyle.borderRightWidth;
				if( borderImgR == 'medium' ) borderImgR = 0; else borderImgR = parseInt( borderImgR.replace( "px", "" ) );
				
				var marginImgB = imgElement.currentStyle.marginBottom;
				if( marginImgB == 'auto' ) marginImgB = 0; else marginImgB = parseInt( marginImgB.replace( "px", "" ) );
				var marginImgT = imgElement.currentStyle.marginTop;
				if( marginImgT == 'auto' ) marginImgT = 0; else marginImgT = parseInt( marginImgT.replace( "px", "" ) );
				var paddingImgB = imgElement.currentStyle.paddingBottom;
				if( paddingImgB == 'auto' ) paddingImgB = 0; else paddingImgB = parseInt( paddingImgB.replace( "px", "" ) );
				var paddingImgT = imgElement.currentStyle.paddingTop;
				if( paddingImgT == 'auto' ) paddingImgT = 0; else paddingImgT = parseInt( paddingImgT.replace( "px", "" ) );
				var borderImgB = imgElement.currentStyle.borderBottomWidth;
				if( borderImgB == 'medium' ) borderImgB = 0; else borderImgB = parseInt( borderImgB.replace( "px", "" ) );
				var borderImgT = imgElement.currentStyle.borderTopWidth;
				if( borderImgT == 'medium' ) borderImgT = 0; else borderImgT = parseInt( borderImgT.replace( "px", "" ) );
				/*
				var imgWidth = imgElement.width - ( marginImgL + marginImgR + paddingImgL + paddingImgR );
				var imgHeight = imgElement.height - ( marginImgB + marginImgT + paddingImgB + paddingImgT );
				*/
				var imgWidth = imgElement.offsetWidth;
				var imgHeight = imgElement.offsetHeight;
				
			}
			
			
			imgLeftPosition[i] = imgElement.offsetLeft;
			imgTopPosition[i] = imgElement.offsetTop;
			
			imgMarginH[i] = marginImgL + marginImgR;
			imgPaddingH[i] = paddingImgL + paddingImgR;
			imgBorderH[i] = borderImgL + borderImgR;
			imgWidthH[i] = imgWidth;
			imgTotalWidth[i] = imgMarginH[i] + imgPaddingH[i] + imgBorderH[i] + imgWidthH[i];
			
			imgMarginV[i] = marginImgB + marginImgT;
			imgPaddingV[i] = paddingImgB + paddingImgT;
			imgBorderV[i] = borderImgB + borderImgT;
			imgHeightV[i] = imgHeight;
			imgTotalHeight[i] = imgMarginH[i] + imgPaddingV[i] + imgBorderV[i] + imgHeightV[i];
			
			imgTempElement.src = imgElement.src;
			imgExpandedWidth[i] = imgTempElement.width;
			imgExpandedHeight[i] = imgTempElement.height;
			imgEnlargeProcess[i] = ( Math.pow( ( imgExpandedWidth[i] / imgWidthH[i] ), 2 ) / 10 ) * enlargeProcessInterval;
			
		}
		
		contentElement.removeChild( imgTempElement );
	
	}
	
	this.imgOver = function( idElement ){
		document.getElementById(idElement).className = 'hover';
	}
	this.imgOut = function( idElement ){
		document.getElementById(idElement).className = 'normal';
	}
	
	
	var deleteItem = function(){
		if (imgCreated != '') {
			contentElement.removeChild(imgCreated);
			currentImg.style.filter = 'alpha.opacity(100)';
			currentImg.style.opacity = 1;
		}
		imgCreated = '';
	}
	
	
	var enlargeImg = function(){
		//alert( currentImgWidthProcess + '>=' + ( currentImgWidthTotal - imgEnlargeProcess[numImg] ) );
		if(currentImgWidthProcess >= (currentImgWidthTotal - imgEnlargeProcess[numImg])) {
			currentImgWidthProcess = currentImgWidthTotal;
			imgCreated.style.width = currentImgWidthTotal + 'px';
			
			imgCreated.style.left = currentImgLeftPositionObjectif + 'px';
			imgCreated.style.top = currentImgTopPositionObjectif + 'px';
			//alert('stop');
			clearInterval(exposeProcess);
		}
		else {
			currentImgWidthProcess = currentImgWidthProcess + imgEnlargeProcess[numImg];
			//currentImgHeightProcess = currentImgHeightProcess + imgEnlargeProcess[numImg];
		 	currentImgHeightProcess = imgTotalHeight[numImg] * ( currentImgWidthProcess / imgTotalWidth[numImg] );
			//alert(currentImgWidthProcess);
			imgCreated.style.width = currentImgWidthProcess + 'px';
			imgCreated.style.height = currentImgHeightProcess + 'px';
			
			percentEnlarge = ( ( currentImgWidthProcess - currentImgWidthThumb ) / ( currentImgWidthTotal - currentImgWidthThumb ) );
			
			percentEnlarge = Math.pow( percentEnlarge, curveEmphasis );
			//alert(currentImgLeftPositionThumb + '-' + currentImgLeftPositionObjectif + '*' + percentEnlarge);
			currentImgLeftPositionProcess = currentImgLeftPositionThumb - (Math.floor((currentImgLeftPositionThumb - currentImgLeftPositionObjectif) * percentEnlarge));
			
			//NaN !!
			imgCreated.style.left = currentImgLeftPositionProcess + 'px';
			
			currentImgTopPositionProcess = currentImgTopPositionThumb - (Math.floor((currentImgTopPositionThumb - currentImgTopPositionObjectif) * percentEnlarge));
			imgCreated.style.top = currentImgTopPositionProcess + 'px';
			
		}
	}
	
	
	this.deleteItemEvent = function(){
		deleteItem();
	}
	
	this.imgExpose = function( imgElementId ){
		deleteItem();
		
		numImg = parseInt(imgElementId .replace(contentId, ""));
		
		currentImg = document.getElementById(imgElementId );
		currentImg.style.filter = 'alpha.opacity(' + imgOpacityActiveState + ')';
		currentImg.style.opacity = imgOpacityActiveState / 100;
		
		
		currentImgHeightThumb = imgHeightV[numImg];
		currentImgHeightProcess = imgHeightV[numImg];
		currentImgHeightTotal = imgExpandedHeight[numImg];
		
		currentImgWidthThumb = imgWidthH[numImg];
		currentImgWidthProcess = imgWidthH[numImg];
		currentImgWidthTotal = imgExpandedWidth[numImg];
		
		currentImgLeftPositionThumb = imgLeftPosition[numImg];
		currentImgLeftPositionProcess = imgLeftPosition[numImg];
		
		currentImgLeftPositionObjectif = ( Math.floor( contentTotalWidth / 2 ) - Math.floor( imgExpandedWidth[numImg] / 2 ) );

		currentImgTopPositionThumb = imgTopPosition[numImg];
		currentImgTopPositionProcess = imgTopPosition[numImg];
		currentImgTopPositionObjectif = ( Math.floor( contentTotalHeight / 2 ) - Math.floor( imgExpandedHeight[numImg] / 2 ) );
		
		imgCreated = document.createElement('img');
		imgCreated.setAttribute('src', currentImg.src);
		//imgCreated.setAttribute('width', currentImgLeftPositionThumb);
		imgCreated.setAttribute('width', 0);
		imgCreated.setAttribute('height', 0);
		imgCreated.onclick = function(){
			if (imgCreated != '') {
				contentElement.removeChild(imgCreated);
				currentImg.style.filter = 'alpha.opacity(100)';
				currentImg.style.opacity = 1;
			}
			imgCreated = '';
		};
		imgCreated.style.position = 'absolute';
		imgCreated.style.zIndex = 5000;
		imgCreated.style.padding = '0px';
		imgCreated.style.margin = '0px';
		imgCreated.style.width = '0px';
		imgCreated.style.height = '0px';
		imgCreated.style.borderWidth = '0px';
		imgCreated.style.backgroundColor = 'transparent';
		imgCreated.style.top = currentImgTopPositionThumb + 'px';
		imgCreated.style.left = currentImgLeftPositionThumb + 'px';
		contentElement.appendChild(imgCreated);
		
		exposeProcess = setInterval(function(){
			enlargeImg()
		}, speedMilliseconde);
	}	
}