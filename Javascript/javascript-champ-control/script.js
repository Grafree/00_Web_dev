/**
 * FormValidControls. 
 * @author Olivier Dommange
 * @version 1.0
 * @date 15 novembre 2011
 * 
 * @param FormName						[string] Formula name <form name="TheName">
 * @param FieldTextColorDefault			[string] Text color for input, select and textarea
 * @param FieldBorderColorDefault		[string] Border color for input, select and textarea
 * @param FieldWidthDefault				[string] Border width for input, select and textarea
 * @param FieldFocusTextColorDefault	[string] Text color for input, select and textarea on focus
 * @param InfoTextColorDefault			[string] Text color for message below input
 * @param InstanceName 					[string] Name of the instance of this object 
 * @return void
 */
function FormValidControls( FormName, FieldTextColorDefault, FieldBorderColorDefault, FieldWidthDefault, FieldFocusTextColorDefault, InfoTextColorDefault ){

	var FormName = FormName;
	var FieldTextColorDefault = FieldTextColorDefault;
	var FieldBorderColorDefault = FieldBorderColorDefault;
	var FieldWidthDefault = FieldWidthDefault;
	var FieldFocusTextColorDefault = FieldFocusTextColorDefault;
	var InfoTextColorDefault = InfoTextColorDefault;
	
	var Xtype;
	var KeyNumber;
	var KeyCharacter;
	var ValueInField;
	var NbCharacterInField;
	var ValidTypeKeyPress;

	
	var formElmtDisplay = function( xelmt, xtype, xbc, xtc, xdis, xdisstate ){
		xelmt.type = xtype;
		if( xbc !== undefined ) xelmt.style.borderColor = xbc;
		if( xtc !== undefined ) xelmt.style.color = xtc;
		if( xdis !== undefined && xdisstate !== undefined ) xdis.disabled = xdisstate;
	}
	
	var labelDisplay = function( xelmt, xtext, xtc ){
		xelmt.innerHTML = xtext;
		xelmt.style.Color = xtc;
	}
	
	var validImgDisplay = function( xelmt, xsrc ){
		xelmt.src = xsrc;
	}
	
	var infoTextDisplay = function( xelmt, xtext, xtc ){
		xelmt.innerHTML = xtext;
		if( xtc !== undefined ) xelmt.style.color = xtc;
	}
	
	var eventKeyInfo = function( e ){
		if( window.event ) KeyNumber = e.keyCode // IE
		else if( e.which ) KeyNumber = e.which // Netscape/Firefox/Opera
		KeyCharacter = String.fromCharCode( KeyNumber );
	}
	
	var verifyEmailFormat = function( emailAdress ){
		var status = false;     
		var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
		 if ( emailAdress.search( emailRegEx ) != -1) {
			 status = true;
		 }
		 return status;
	}
	
	
	var Initxhr = function(){ //Ajax - PRIVATE
		var xhr;
		try{ xhr = new XMLHttpRequest(); }
		catch( try_microsoft1 ){
			try { xhr = new ActiveXObject( "MSXML2.XMLHTTP" ); } 
			catch( try_microsoft2 ){
				try { xhr = new ActiveXObject( "Microsoft.XMLHTTP" ); }
				catch ( erreur ){ xhr = null; }
			}
		}
		return xhr;
	}

	
	
	this.alternInputTypePassToText = function( idTxt, id ){
		
		xelmtTxt = document.getElementById( idTxt );
		xelmt = document.getElementById( id );
		
		if( xelmt.type === 'password' ){
			infoTextDisplay( xelmtTxt, 'Cacher' );
			formElmtDisplay( xelmt, 'text' );
		}else{  
			infoTextDisplay( xelmtTxt, 'Voir' );
			formElmtDisplay( xelmt, 'password' );
		}
		
	}
	
	/*
	 * @param id						[string] Id of the field
	 * @param minNbCharacters			[int] (optional) Indicates the minimum of characters that needs to be in the field. 0 = no min;
	 * @param maxNbCharacters			[int] (optional) Indicates the minimum of characters that needs to be in the field. 0 = no max;
	 * @param typeKeyPressCheck			[int] (optional) 0 = all, 1 = 'alphanumeric'; 2 = 'numeric'; 3 = 'alpha';
	 * @param stringFormatCheck			[string] (optional) none = [no check]; email = email format;
	 * @param msgUsed					[bolean] (optional) Indicates if there's a msg space (identify by "_msg" in the id ).
	 * @param imgValidUsed				[bolean] (optional) Indicates if there's a img to confirm (identify by "_check" in the id ).
	 * @param ableOtherField			[string] (optional) Changes the disabled attribute of specific elements from Id element. 0 = no element to become able.
	*/
	this.checkTextFieldValue = function( id, minNbCharacters, maxNbCharacters, typeKeyPressCheck, stringFormatCheck, msgUsed, imgValidUsed, ableOtherField ){
		if( minNbCharacters === undefined ) minNbCharacters = 0;
		if( maxNbCharacters === undefined ) maxNbCharacters = 0;
		if( typeKeyPressCheck === undefined ) typeKeyPressCheck = 0;
		if( stringFormatCheck === undefined ) stringFormatCheck = 'none';
		if( ableOtherField === undefined ) ableOtherField = 0;		
		if( imgValidUsed === undefined ) imgValidUsed = false;		
		if( msgUsed === undefined ) msgUsed = false;		
		
		var xelmt = document.getElementById( id ); 
		if( msgUsed ) var elmtMsg = document.getElementById( id + '_msg' );
		if( imgValidUsed ) var elmtValidImg = document.getElementById( id + '_check' );
		
		
		xelmt.onkeypress = function( event ){
			ValueInFieldBeforeKeyPress = xelmt.value;
			eventKeyInfo( event );
		}
		
		xelmt.onkeyup = function( event ){
			Xtype = xelmt.type;
			ValueInField = xelmt.value;
			NbCharacterInField = ValueInField.length;
			ValidTypeKeyPress = true;
			var StateDisField = true;
			
			if( ("abcdefghijklmnopqrstuvwxyz0123456789-_").indexOf( KeyCharacter ) < 0 && typeKeyPressCheck === 1 && KeyNumber !== 8 ){
				ValidTypeKeyPress = false;
			}else if( ("0123456789").indexOf( KeyCharacter ) < 0 && typeKeyPressCheck === 2 && KeyNumber !== 8 ){
				ValidTypeKeyPress = false;
			}else if( ("abcdefghijklmnopqrstuvwxyz").indexOf( KeyCharacter ) < 0 && typeKeyPressCheck === 3 && KeyNumber !== 8 ){
				ValidTypeKeyPress = false;
			}
			
			if( maxNbCharacters < NbCharacterInField && maxNbCharacters != 0 && imgValidUsed ){
				infoTextDisplay( elmtMsg, 'Vous avez atteint la limite de caractères autorisées', 'red' );
				xelmt.value = ValueInFieldBeforeKeyPress;
			}else if( !ValidTypeKeyPress && imgValidUsed ){
				xelmt.value = ValueInFieldBeforeKeyPress;
				infoTextDisplay( elmtMsg, 'Ce symbôle n\'est pas autorisé !', 'red' );
			}else if( stringFormatCheck != 'none' ){
				if( stringFormatCheck == 'email' ){
					if( verifyEmailFormat( ValueInField ) ){
						if( msgUsed ){
							var elmtMsgTxt = 'OK!';
							var elmtMsgTxtColor = 'green';
						}
						if( imgValidUsed ){
							var elmtValidImgSrc = 'images/checkmark-16.png';
						}
						if( ableOtherField != 0 ){ 
							var elementOtherField = document.getElementById( ableOtherField ); 
							StateDisField = false; 
						}
					}else{
						if( msgUsed ){
							if( NbCharacterInField == 0 )
								var elmtMsgTxt = 'Indiquez votre adresse E-mail';
							else
								var elmtMsgTxt = 'Le format de l\'adresse est en vérification...';
							var elmtMsgTxtColor = InfoTextColorDefault;
						}
						
						if( imgValidUsed ){
							var elmtValidImgSrc = 'images/checkmark-gray-16.png';
						}
						
						if( ableOtherField != 0 ){ 
							var elementOtherField = document.getElementById( ableOtherField ); 
							StateDisField = true; 
						}
					}
				}
				formElmtDisplay( xelmt, Xtype, formElmtBorderColor, FieldTextColorDefault, elementOtherField, StateDisField );
				if( msgUsed ) infoTextDisplay( elmtMsg, elmtMsgTxt, elmtMsgTxtColor );
				if( imgValidUsed ) validImgDisplay( elmtValidImg, elmtValidImgSrc );
			}else{
				
				if( ( NbCharacterInField >= minNbCharacters || minNbCharacters === 0 ) &&  NbCharacterInField != 0 ){
					var formElmtBorderColor = FieldBorderColorDefault;
					if( msgUsed ){
						var elmtMsgTxt = 'OK!';
						var elmtMsgTxtColor = 'green';
					}
					if( imgValidUsed ){
						var elmtValidImgSrc = 'images/checkmark-16.png';
					}
					if( ableOtherField != 0 ){ 
						var elementOtherField = document.getElementById( ableOtherField ); 
						StateDisField = false; 
					}
				}else{
					var formElmtBorderColor = FieldBorderColorDefault;
					if( msgUsed ){
						if( NbCharacterInField < minNbCharacters && minNbCharacters != 0 && NbCharacterInField != 0 )
							var elmtMsgTxt = 'Il reste ' + ( minNbCharacters - NbCharacterInField ) + ' caractères';
						else
							var elmtMsgTxt = 'Indiquez au moins ' + minNbCharacters + ' caractères';
						
						var elmtMsgTxtColor = InfoTextColorDefault;
					}
					if( imgValidUsed ){
						var elmtValidImgSrc = 'images/checkmark-gray-16.png';
					}
					if( ableOtherField != 0 ){ 
						var elementOtherField = document.getElementById( ableOtherField ); 
						StateDisField = true; 
					}
				}				
				formElmtDisplay( xelmt, Xtype, formElmtBorderColor, FieldTextColorDefault, elementOtherField, StateDisField );		
				if( msgUsed ) infoTextDisplay( elmtMsg, elmtMsgTxt, elmtMsgTxtColor );
				if( imgValidUsed ) validImgDisplay( elmtValidImg, elmtValidImgSrc );
			}
		}
		
		
		xelmt.onblur = function(){
			Xtype = xelmt.type;
			ValueInField = xelmt.value;
			NbCharacterInField = ValueInField.length;
			
			if( NbCharacterInField > 0  ){
				if( !ValidTypeKeyPress ){
					xelmt.value = ValueInField.substr( 0, ( NbCharacterInField - 1 ) );
					ValidTypeKeyPress = true;
				}
			}
			
			updateElements = false;
			if( NbCharacterInField < minNbCharacters && minNbCharacters != 0 &&  NbCharacterInField != 0 ){
				var formElmtBorderColor = 'red';
				if( msgUsed ){
					var elmtMsgTxt = 'Vous avez indiqué ' + NbCharacterInField + ' des ' + minNbCharacters + ' caractères';
					var elmtMsgTxtColor = 'red';
				}
				if( imgValidUsed ){
					var elmtValidImgSrc = 'images/cross-16.png';
				}
				updateElements = true;
			}else if( NbCharacterInField === 0 ){
				var formElmtBorderColor = FieldBorderColorDefault;
				if( msgUsed ){
					var elmtMsgTxt = 'Indiquez au moins ' + minNbCharacters + ' caractères';
					var elmtMsgTxtColor = InfoTextColorDefault;
				}
				if( imgValidUsed ){
					var elmtValidImgSrc = 'images/checkmark-gray-16.png';
				}
				updateElements = true;
			}		
			
			if( ableOtherField != 0 ){ 
				var elementOtherField = document.getElementById( ableOtherField ); 
				if( NbCharacterInField >=  minNbCharacters && minNbCharacters != 0 ) var stateOtherField = false; 
				else var stateOtherField = true;
			}
			
			if( updateElements ){ 
				formElmtDisplay( xelmt, Xtype, formElmtBorderColor, FieldTextColorDefault, elementOtherField, stateOtherField );
				if( ableOtherField != 0 ) var elementOtherField = document.getElementById( ableOtherField );
				if( msgUsed ) infoTextDisplay( elmtMsg, elmtMsgTxt, elmtMsgTxtColor );
				if( imgValidUsed ) validImgDisplay( elmtValidImg, elmtValidImgSrc );
			}
			
		}
		
	}
	
	this.compareTextFieldValue = function( id, compareid, msgUsed, imgValidUsed ){
		if( imgValidUsed === undefined ) imgValidUsed = false;		
		if( msgUsed === undefined ) msgUsed = false;	
		var elmtCompare = document.getElementById( compareid );
		var elmt = document.getElementById( id ); 
		if( msgUsed ) var elmtMsg = document.getElementById( id + '_msg' );
		if( imgValidUsed ) var elmtValidImg = document.getElementById( id + '_check' );
		
		elmt.onkeyup = function( event ){
			ValueInFieldCompare = elmtCompare.value;
			Xtype = elmt.type;
			ValueInField = elmt.value;
			NbCharacterInField = ValueInField.length;
		
			if( ValueInFieldCompare == ValueInField ){
				var formElmtBorderColor = FieldBorderColorDefault;
				if( msgUsed ){
					var elmtMsgTxt = 'Correct!';
					var elmtMsgTxtColor = 'green';
				}
				if( imgValidUsed ){
					var elmtValidImgSrc = 'images/checkmark-16.png';
				}
			}else{
				var formElmtBorderColor = FieldBorderColorDefault;
				if( msgUsed ){
					var elmtMsgTxt = 'Reproduisez le mot de passe';
					var elmtMsgTxtColor = InfoTextColorDefault;
				}
				if( imgValidUsed ){
					var elmtValidImgSrc = 'images/cross-16.png';
				}
			}						
			formElmtDisplay( elmt, Xtype, formElmtBorderColor, FieldTextColorDefault );
			if( msgUsed ) infoTextDisplay( elmtMsg, elmtMsgTxt, elmtMsgTxtColor );
			if( imgValidUsed ) validImgDisplay( elmtValidImg, elmtValidImgSrc );
			
		}
		
	}

	
	this.suggestTextFieldValue = function( id ){
		var elmt = document.getElementById( id ); 
		
		elmt.onkeyup = function( event ){
			ValueInField = elmt.value;
			
			// Ajax
			DoGetTextsSuggestion = Initxhr();
			if( DoGetTextsSuggestion != null ){
				DoGetTextsSuggestion.open( "GET", 'searchword.txt?string=' + ValueInField, true ); //Renvoit mots dont le string match
				DoGetTextsSuggestion.onreadystatechange = function(){
					//if ( DoGetTextsSuggestion.readyState === 4 && DoGetTextsSuggestion.status === 200 ){ // To use for http request
					if ( DoGetTextsSuggestion.readyState === 4 ){						
						var suggestionText = DoGetTextsSuggestion.responseText;
						suggestionTextArray = suggestionText.split( ' ' );
						
				
						var elmtWidth = elmt.offsetWidth;
			
						var suggestArea = document.createElement('div');
						suggestArea.setAttribute( 'style', 'position:absolute; display:none; padding:0 3px; background-color:#fff; border:1px solid #999; width:' + ( elmtWidth - 6 ) + 'px; max-height:70px; overflow:auto; z-index:100000' );
						suggestArea.setAttribute( 'id', 'myrecherche_suggest' );
						elmt.parentNode.insertBefore( suggestArea, elmt.nextSibling );
						checkInsertSuggest = false;
						for( i = 0; i < suggestionTextArray.length; i++ ){
							
								checkInsertSuggest = true;
								var span = document.createElement('span');
								span.setAttribute( 'style', 'width:100%; color:#000; line-height:18px; display:block;' );
								span.setAttribute( 'id', 'suggestionTextX' + i );
								suggestArea.appendChild( span );
				
								suggestArea.getElementsByTagName( 'span' )[ i ].onmouseover = function(){ this.style.backgroundColor = '#deedff'; };
								suggestArea.getElementsByTagName( 'span' )[ i ].onmouseout = function(){ this.style.backgroundColor = 'transparent'; };
								suggestArea.getElementsByTagName( 'span' )[ i ].onclick = function(){ elmt.value = this.innerHTML; suggestArea.style.display = 'none'; };
								suggestArea.getElementsByTagName( 'span' )[ i ].innerHTML = suggestionTextArray[ i ];
							
			
						}
						if( checkInsertSuggest ) suggestArea.style.display = 'block';
					}
				};
				DoGetTextsSuggestion.send( null );
			}
		}
	}
}