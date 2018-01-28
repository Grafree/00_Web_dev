/**
 * @author 5doldo
 */
function activeWindow( id, dbId ){

		document.getElementById( id ).className = "edit_box";
		
		if ( dbId === 0 ) {
			afficheInsert();
		} else {
			afficheUpdate( dbId );
		}
}

function closeWindow( id ){
		document.getElementById( id ).className = "hide_screen";
}


function Initxhr()
{
	var xhr;
	try{
		xhr=new XMLHttpRequest();

	}
		catch(try_microsoft1){
			try { xhr=new ActiveXObject("MSXML2.XMLHTTP");
			} 
				catch(try_microsoft2){
					try {
						xhr=new ActiveXObject("Microsoft.XMLHTTP");
					}
						catch (erreur){
							xhr=null;
						}
				}
			
		}
	if (xhr==null){
		alert("Votre navigateur ne supporte la classe XMLHttpRequest de JavaScript");
	}
	else{
		return xhr;
	}
}




/* LISTE :: Récupère la liste des éléments  */

function afficheListe( message, order ){
	
	xhr = Initxhr();
	
	var url = 'list.php?message=' + message + '&order=' + order;

	xhr.onreadystatechange = traiterListe;
	xhr.open( "GET", url, true );
	xhr.send( null );
}

function traiterListe()
{
	if ((xhr.readyState == 4) && (xhr.status == 200))
	{
		var str = xhr.responseText;
		//str = str.replace( /^\s*|\s*$/, "" );
		document.getElementById( 'list' ).innerHTML = str;	
	}
}



/* INSERT :: Affiche le formulaire d'ajout  */

function afficheInsert(){
	
	insert = Initxhr();
	
	var url = 'insert.php';

	insert.onreadystatechange = traiterInsert;
	insert.open( "GET", url, true );
	insert.send( null );
}

function traiterInsert()
{
	if ((insert.readyState == 4) && (insert.status == 200))
	{
		var str = insert.responseText;
		//str = str.replace( /^\s*|\s*$/, "" );
		document.getElementById( 'insert_espace' ).innerHTML = str;	
	}
}


/* UPDATE :: Affiche le formulaire d'edition  */

function afficheUpdate( id ){
	
	update = Initxhr();
	var url = 'insert.php?membre=' + id ;

	update.onreadystatechange = traiterUpdate;
	update.open( "GET", url, true );
	update.send( null );
}

function afficheUpdateMessage( urlSuperGlobale, message ){
	
	update = Initxhr();
	var messageSuperGlobale = urlSuperGlobale + '&message=' + message;
	var url = 'insert.php?' + messageSuperGlobale ;

	update.onreadystatechange = traiterUpdate;
	update.open( "GET", url, true );
	update.send( null );
}

function traiterUpdate()
{
	if ((update.readyState == 4) && (update.status == 200))
	{
		var str = update.responseText;
		//str = str.replace( /^\s*|\s*$/, "" );
		document.getElementById( 'update_espace' ).innerHTML = str;	
	}
}

function insertElement( action, id ){
	DoInsert = Initxhr();
	
	if (id != 0) {
		var IdElement = '&membre=' + id;
		var ElementIdName = '_update';
	} else {
		var IdElement = '';
		var ElementIdName = '';
	}

	var NomMembre = document.getElementById( 'NomMembre' + ElementIdName ).value;
	var PrenomMembre = document.getElementById( 'PrenomMembre' + ElementIdName ).value;
	var GenreMembre = document.getElementById( 'GenreMembre' + ElementIdName ).options[document.getElementById( 'GenreMembre' + ElementIdName ).selectedIndex].value;
	if (document.getElementById('ActifMembre' + ElementIdName).checked) {
		var ActifMembre = document.getElementById('ActifMembre' + ElementIdName).value;
	}else{
		var ActifMembre = '0';
	}
	var CommentMembre = document.getElementById('CommentMembre' + ElementIdName ).value;
	
	var urlSuperGlobal = action + '=do' 
						+ '&NomMembre=' + NomMembre 
						+ '&PrenomMembre=' + PrenomMembre 
						+ '&GenreMembre=' + GenreMembre 
						+ '&ActifMembre=' + ActifMembre 
						+ '&CommentMembre=' + CommentMembre 
						+ IdElement;
	
	var url = 'sql_factory.php';

	DoInsert.open( "POST", url, true );

	DoInsert.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	DoInsert.setRequestHeader("Content-length", urlSuperGlobal.length);
	DoInsert.setRequestHeader("Connection", "close");

	DoInsert.onreadystatechange = function(){
		traiterInsertElement( urlSuperGlobal )
	};
	
	DoInsert.send( urlSuperGlobal );
}

function traiterInsertElement( urlSuperGlobal )
{
	if ((xhr.readyState == 4) && (xhr.status == 200))
	{
		var str = DoInsert.responseText;
		str = str.replace( /^\s*|\s*$/, "" );
		
		if (str === 'noFilledUpdate') {
			afficheUpdateMessage( urlSuperGlobal, 'notfilled');
		} else if (str === 'okupdate') {
			afficheListe('update');
			closeWindow('update_espace');
		} else if (str === 'noFilledInsert') {
			afficheListe('notfilled');
		} else if (str === 'okinsert') {
			afficheListe('insert');
			closeWindow('insert_espace');
		}
	}
}


/**** CHANGE ACTIF ****/

function changeActive( id, etatChange ){
	
	DoChange = Initxhr();
	
	var params = 'ChangeActifMembre=' + etatChange + '&membre=' + id;
	
	var url = 'sql_factory.php';

	DoChange.open( "POST", url, true );
	
	DoChange.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	DoChange.setRequestHeader("Content-length", params.length);
	DoChange.setRequestHeader("Connection", "close");
	
	DoChange.onreadystatechange = traiterChangeElement;
	
	DoChange.send( params );
						
}

function traiterChangeElement()
{
	if ((xhr.readyState == 4) && (xhr.status == 200))
	{
		var str = DoChange.responseText;
		str = str.replace( /^\s*|\s*$/, "" );
		
		if (str === 'changeActive') {
			afficheListe('changeActive');
		} else if (str === 'changeUnactive') {
			afficheListe('changeUnactive');
		}
	}
}



/*** DELETE ***/

function deleteProcess(idElementToDelete){
	afficheListe('deleteConfirm&delete=' + idElementToDelete);
}


function deleteElement( idElementToDelete ) {
    
	DoDelete = Initxhr();
	
	var urlSuperGlobal = 'delete=do&Element=' + idElementToDelete;
	var url = 'sql_factory.php?';

	DoDelete.open( "POST", url, true );
	
	DoDelete.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	DoDelete.setRequestHeader("Content-length", urlSuperGlobal.length);
	DoDelete.setRequestHeader("Connection", "close");
	
	DoDelete.onreadystatechange = traiterDeleteElement;
	
	DoDelete.send( urlSuperGlobal );

}
function traiterDeleteElement()
{
	if ((xhr.readyState == 4) && (xhr.status == 200))
	{
		var str = DoDelete.responseText;
		str = str.replace( /^\s*|\s*$/, "" );
		
		afficheListe( 'delete' );
	}
}