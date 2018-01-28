/**
 * Classe ouverture d'une fenêtre plein écran. 
 * @author Olivier Dommange
 * @version 1.0
 * @date 12 juin 2009
 * @param XGfree_borderwidthInt	[int] Epaisseur de la bordure qui se trouve entre le cadre et l'image
 * @param XXGfree_innerpadding	[int] Espace interne entre le cadre et l'image
 * @return void
 */
function GaleryView ( XGfree_borderwidthInt, XGfree_innerpadding ){
	
	var XGfree_borderwidth = XGfree_borderwidthInt;
	var XGfree_inpadding = XGfree_innerpadding;

	var ImgId = '';
	var ImgIdHeight = 0;
	var ImgIdWidth = 0;
	var Caption = '';
	var Group = '';
	var nbImages = 0;
	var NbGroup = 0;
	var PositionGroup = 0;
	var NextImage = 0;
	var PreviousImage = 0;
	
	var speed = 30;
	var progressWidth = 5;
	var progressHeight = 5;
	var XGfreeWidthProgress = 0;
	var XGfreeHeightProgress = 0;
	var State = '';

	var xhr = null; 

	
var getXhr = function(){
	
	if(window.XMLHttpRequest)xhr = new XMLHttpRequest(); 
	
	else if(window.ActiveXObject){ 
  
		try{
			xhr = new ActiveXObject("Msxml2.XMLHTTP");
		}catch (e){
		     xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
	  	
	}else{
		
		alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest..."); 
		xhr = false; 
  
	} 
}	
 
var ShowImage = function( image ){
	getXhr();
	xhr.onreadystatechange = function(){
		
	     if(xhr.readyState == 4 && xhr.status == 200){
	 	    document.getElementById('XGFreeImage').innerHTML=xhr.responseText;
	     }
		 
	}
	xhr.open( "GET","ajax.php?image="+image, true );
	xhr.send( null );
}
 
var getImgSize = function(){
	
	//alert(ImgId);
	
	if (document.getElementById('XGfreeImage') != null) {
		
		//alert(ImgIdHeight +' / '+ImgIdWidth);
		
		// A améliroer pour IE.
		// Actuelement ImgIdHeight demeure undefined lors du passage d'une image à l'autre via les fléche suivant et precedent
		
		if (ImgIdHeight == 0 || ImgIdHeight == undefined || ImgIdWidth == 0) {

			ImgIdHeight = document.getElementById('XGfreeImage').height;
			ImgIdWidth = document.getElementById('XGfreeImage').width;
			
		} else {
		
			XGfreeWidthProgress = Math.round(ImgIdWidth / 10);
			XGfreeHeightProgress = Math.round(ImgIdHeight / 10);
			
			document.getElementById('superposeImg').innerHTML = '';
			document.getElementById('superposeImg').className = '';
			clearInterval(openIntervalSizeImg);
			
			if (State == 'slide') {
			
				positionImageSuperpose();
				
			}
			else if(State == 'open'){
				
				openIntervalId = setInterval(function(){open()}, speed);
				
			}
		}
	}	
}
/*
var findHHandWW = function(ele) {
	
	ImgIdHeight = ele.height;
	ImgIdWidth = ele.width;
	return true;
}
*/
		
var imageSet = function(){
		
	var XGfree_img = '<img id="XGfreeImage" src="' + ImgId + '" />';
	
	document.getElementById('superposeImg').className = 'half_hide';
	document.getElementById('superposeImg').innerHTML = XGfree_img;
/*

var myImage = new Image();
myImage.name = ImgId;
myImage.src = ImgId;
myImage.onload = findHHandWW(this);
*/
	openIntervalSizeImg = setInterval(function(){ getImgSize() }, speed);
}

var open = function(){
	
	var XGfree_left = 0 - ( progressWidth / 2 );
	var XGfree_top = 0 - ( progressHeight / 2 );

	if ( ( XGfreeWidthProgress * 10 ) >= progressWidth ) {
		
		XGfree_div = '<div style=" border:1px solid #999; position:absolute;';
		XGfree_div += ' width:' + progressWidth +  'px' + '; margin-left:' + XGfree_left + 'px' + '; left:50%;';
		XGfree_div += ' height:' + progressHeight + 'px; top:50%; margin-top:' + XGfree_top + 'px' + ';">';
		XGfree_div += '</div>';
		document.getElementById('superpose').innerHTML = XGfree_div;
	
	}else{
		
		document.getElementById('superpose').innerHTML = '';
		clearInterval(openIntervalId);
		progressWidth = 5;
		progressHeight = 5;
		XGfreeWidthProgress = 0;
		XGfreeHeightProgress = 0;
		positionImageSuperpose(); 
		
	}

	progressWidth = progressWidth + XGfreeWidthProgress;
	progressHeight = progressHeight + XGfreeHeightProgress;
			
}

		
var positionImageSuperpose = function(){
	
	Caption = document.getElementById( ImgId ).getAttribute( 'alt' );

	Group = document.getElementById( ImgId ).getAttribute( 'group' );
	
	nbImages = document.getElementById( 'galery' ).getElementsByTagName( 'img' ).length;
		
	for( i = 0; i < nbImages; i++ ){
		
		if( document.getElementById( 'galery' ).getElementsByTagName( 'img' )[i].getAttribute( 'group' ) == Group){
			
			NbGroup++;
			
			if( document.getElementById( 'galery' ).getElementsByTagName( 'img' )[i].getAttribute( 'id' ) ==  ImgId ){
				PositionGroup = NbGroup;
			}
			
		}
		
	}
	
	if (PositionGroup < NbGroup ) {
		NextImage = PositionGroup + 1;
	}else{
		NextImage = 1;
	}
	
	if (PositionGroup > 1 ) {
		PreviousImage = PositionGroup - 1;
	}else{
		PreviousImage = NbGroup;
	}
	
	if (document.all) {
		//alert(screen.height + ' < ' +  ImgIdHeight);
		if (screen.height < ImgIdHeight) {
			var XGfree_windowheight = ImgIdHeight + 'px';
		}else{
			//var XGfree_windowheight = window.innerHeight + 'px';
																	// A améliroer pour IE
			var marginTopOffset = ImgIdHeight / 2;
			var HeightWindows = screen.height - marginTopOffset;
			var XGfree_windowheight = HeightWindows + 'px';
		}
	}
	else {
		var XGfree_windowheight = '100%';
	}
	
	var XGfree_left = 0 - (ImgIdWidth/ 2);
	var XGfree_top = 0 - ((ImgIdHeight/ 2) + 50 );	
		
	ImgIdWidth = ( XGfree_borderwidth * 2 ) + ( XGfree_innerpadding * 2 ) + ImgIdWidth;
	
	var XGfree_div = '';
	
	
	XGfree_div += '<div class="bkg_browser" onclick="javascript:Galery.closeGalery();" style="height:' + XGfree_windowheight + '; position:absolute; left:0; top:0; padding:0; z-index:100;"></div>';
	XGfree_div += '<div class="galery_window" style="position:absolute; width:' + ImgIdWidth + 'px' + '; top:50%; margin-left:' + XGfree_left + 'px' + '; left:50%; margin-top:' + XGfree_top + 'px' + '; z-index:120;">';
	XGfree_div += '<div class="galery_title_window">';
	XGfree_div += '<span class="close" onclick="javascript:Galery.closeGalery();">X</span>';
	XGfree_div += Caption;
	XGfree_div += '</div>';	
	XGfree_div += '<div class="galery_content_window" id="XGFreeImage" style="border-width:' + XGfree_borderwidth + 'px; padding:' + XGfree_innerpadding + 'px;">';	
	//XGfree_div += '<img src="' + ImgId + '" />';
	XGfree_div += '</div>';	
	XGfree_div += '<div class="galery_foot">';
	XGfree_div += '<span class="arrow" onclick="javascript:Galery.previousGalery();">&lt;</span>&nbsp;&nbsp;&nbsp;';
	XGfree_div += PositionGroup + '/' + NbGroup;
	XGfree_div += '&nbsp;&nbsp;&nbsp;<span class="arrow" onclick="javascript:Galery.nextGalery();">&gt;</span>';
	XGfree_div += '</div>';
	XGfree_div += '</div></div>';
	
	document.getElementById('superpose').innerHTML = XGfree_div;
	
	ShowImage( ImgId );
	
	ImgIdHeight = 0;
	ImgIdWidth = 0;

}

var getId = function( Numero ){
	
	var NbGroupTemp = 0;
		
	for( i = 0; i < nbImages; i++ ){
			
		if( document.getElementById( 'galery' ).getElementsByTagName( 'img' )[i].getAttribute( 'group' ) == Group ){
						
			NbGroupTemp++;
			
			if (NbGroupTemp == Numero) {
			
				ImgId = document.getElementById('galery').getElementsByTagName('img')[i].getAttribute('id');
			
			}
		}
	}
}

var Init = function(){
	
	Group = '';
	NbGroup = 0;
	PositionGroup = 0;
	NextImage = 0;
	PreviousImage = 0;
	ImgIdHeight = 0;
	ImgIdWidth = 0;
	State = '';
	
}

this.closeGalery = function(){
	
	document.getElementById('superpose').innerHTML = '';
	Init();
}

this.openGalery = function( id ){
	
	State = 'open';
	ImgId = id;
	imageSet();

//	openIntervalId = setInterval(function(){ open() }, speed);

}

this.nextGalery = function(){
	
	getId( NextImage );
	Init();
	State = 'slide';
	imageSet();
	
}

this.previousGalery = function(){
		
	getId( PreviousImage );
	Init();
	State = 'slide';
	imageSet();
	
}

this.img_hover = function( id ){
	document.getElementById( id ).className = 'image_galery_hover';
}


this.img_link = function( id ){
	document.getElementById( id ).className = 'image_galery';
}

}