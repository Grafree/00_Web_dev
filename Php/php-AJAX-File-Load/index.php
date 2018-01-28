<?php
session_start();

include_once( 'images.factory.php' );

if( isset( $_POST[ 'displayImages' ] ) ){

	$images = imagesFindAll();
	if( isset( $images ) ){
		foreach( $images as $imageFile ){
		?>
		<div class="imggalery">
			<div class="contentgalery">
				<?php 
				
				if( file_exists( $imageFile ) ){ 
	
					list( $width, $height, $type, $attr ) = getimagesize( $imageFile );
					if( ( $width < 200 && $width > $height ) || ( $height < 200 && $width < $height ) ) 
						$resizeImg = ''; 
					else if( $width >= $height ) 
						$resizeImg = 'width="200"'; 
					else 
						$resizeImg = 'height="200"';
				?> 
				<img style="margin:5px 5px;" src="<?php echo $imageFile; ?>" width="80" height="50" />
				<?php 
				}else{
					echo 'Aucune image !';
				}
				?>
			</div>
			<div class="btngalery">
	
				<img style="cursor:pointer;" onclick="deleteProduitImage( '<?php echo $imageFile; ?>' );" src="images/cross.gif" /></a>
			
			</div>
		</div>
		<?php
		}
	}else{
		echo 'Aucune image';
	}

	exit;		
}

if( isset( $_POST[ 'imageDelete' ] ) ){
	deleteImage( $_POST[ 'imageDelete' ] );
	exit;
}
?>
<!doctype html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta http-Equiv="Cache-Control" Content="no-cache">
	<meta http-Equiv="Pragma" Content="no-cache">
	<meta http-Equiv="Expires" Content="0">
	
	<title>Ajax-Load Image</title>
	<link href="css/style.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript">
	
	var Initxhr = function(){
		var xhr;
		try{ xhr = new XMLHttpRequest(); }
		catch( try_microsoft1 ){
			try { xhr = new ActiveXObject( "MSXML2.XMLHTTP" ); } 
			catch( try_microsoft2 ){
				try { xhr = new ActiveXObject( "Microsoft.XMLHTTP" ); }
				catch( erreur ){ 
					xhr = null;
				}
			}
		}
		if( xhr == null ){
			alert( "Le navigateur ne supporte pas les applications utilisant AJAX." );
		}else{
			return xhr;
		}
	}
	
	
	function addImagesProduitsDisplayBox(){
	
		if( document.getElementById( 'outilsAddBox' ).style.display == 'block' ){
		
			document.getElementById( 'outilsAddBox' ).style.display = 'none';
			document.getElementById( 'outilsAddImage' ).className = 'outilsAdd';
			clearInterval( chekImageLoadProcess );
		}else{
			if ( ( DoImages.readyState == 4 ) && ( DoImages.status == 200 ) )
			{
				document.getElementById( 'outilsAddBox' ).style.display = 'block';
				document.getElementById( 'outilsAddImage' ).className = 'outilsAddActive';
				
				chekImageLoadProcess = setInterval( function(){
					checkImageLoad();
				}, 3000 );	
			}
		}	
	}
	
	
	function displayImages(){

		DoImages = Initxhr();
		var urlSuperGlobal = 'displayImages=do';
		var url = 'index.php';
		DoImages.open( "POST", url, true );	
		DoImages.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		DoImages.setRequestHeader("Content-length", urlSuperGlobal.length);		
		DoImages.onreadystatechange = function(){
			if ( ( DoImages.readyState == 4 ) && ( DoImages.status == 200 ) )
			{
				var str = DoImages.responseText;
				str = str.replace( /^\s*|\s*$/, "" );
				document.getElementById( 'images_zone' ).innerHTML = str;		
			}	
		};
		DoImages.send( urlSuperGlobal );
		
	}
	
	function checkImageLoad(){
	
		DoSend = Initxhr();
		var urlSuperGlobal = 'checkImageLoad=fileLoaded';
		var url = 'image_loader.php';
		DoSend.open( "POST", url, true );	
		DoSend.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		DoSend.setRequestHeader("Content-length", urlSuperGlobal.length);		
		DoSend.onreadystatechange = function(){
			if ( ( DoSend.readyState == 4 ) && ( DoSend.status == 200 ) )
			{
				var str = DoSend.responseText;
				str = str.replace( /^\s*|\s*$/, "" );
				if ( /processDone/.test(str) ) {
					document.getElementById( 'outilsAddBox' ).style.display = 'none';
					document.getElementById( 'outilsAddImage' ).className = 'outilsAdd';
					clearInterval( chekImageLoadProcess );
					displayImages();
				}	
			}
		};
		DoSend.send( urlSuperGlobal );
	}
	
	function deleteProduitImage( imageFile ){
		
		if( confirm('Etes-vous sûr de vouloir supprimer définitivement cette image ?') ){
		
			DoSend = Initxhr();
			var urlSuperGlobal = 'imageDelete=' + imageFile;
			var url = 'index.php';
			DoSend.open( "POST", url, true );	
			DoSend.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			DoSend.setRequestHeader("Content-length", urlSuperGlobal.length);		
			DoSend.onreadystatechange = function(){
				if ( ( DoSend.readyState == 4 ) && ( DoSend.status == 200 ) )
				{
					var str = DoSend.responseText;
					displayImages();
				}
			};
			DoSend.send( urlSuperGlobal );
		
		}
	}
	
	window.onload = function(){ displayImages(); };
	</script>
</head>
<body>
	<div id="page">
		<div id="header">
			<h1>Images</h1>
		</div>	
		<div id="col_left">
		
			<a class="outilsAdd" id="outilsAddImage" href="javascript:addImagesProduitsDisplayBox();"><img src="images/add.gif" align="top" border="0">Ajouter une image
			<div class="outilsAddBox" id="outilsAddBox" style="display:none;">
				<iframe id="outilsAddFrame" src="image_loader.php?init=set" width="300px" height="170px" style="border:0px;"></iframe>
			</div>
			</a>		
			<div class="clear"></div>
			
			
			
			<div id="images_zone"></div>

			
			
		</div>
		
		<div id="col_right">
				
			<div class="figure">

			<p>
				La problématique dans ce cas de figure est que le chargement d'un fichier (ou images) doit être traité de manière à soumettre le fichier au serveur.
				Javascript peut faire ce type de traitement mais l'opération est complexe. jQuery propose toutefois <a href="http://blueimp.github.com/jQuery-File-Upload">une solution intressante</a>. 
			</p>
			<p>
				Il s'avère intéressant d'utiliser PHP pour compléter l'opération grâce à la variable superglobale $_FILES.
				Ceci implique donc d'avoir un fichier externe qui sera inséré dans une balise &lt;iframe&gt; afin d'isoler l'opération.
			</p>
			<p>
				Voici le processus détaillé :
			</p>
			<ol>
				<li>
					<strong>Chargement de la page</strong><br />
					Lancement de la vérification et affichage dynamiquement (AJAX) des images dans l'espace réservé à cet effet.
					<h3>index.php</h3>
					<code>
						&lt;script type="text/javascript"&gt;							
							window.onload = function(){ displayImages(); };
						&lt;/script&gt;
					</code>
					La fonction displayImages();
					<h3>index.php</h3>
					<code>
						function displayImages(){<br /><br />
					
							&nbsp;&nbsp;DoImages = Initxhr();<br />
							&nbsp;&nbsp;var urlSuperGlobal = 'displayImages=do';<br />
							&nbsp;&nbsp;var url = 'index.php';<br />
							&nbsp;&nbsp;DoImages.open( "POST", url, true );	<br />
							&nbsp;&nbsp;DoImages.setRequestHeader("Content-type", "application/x-www-form-urlencoded");<br />
							&nbsp;&nbsp;DoImages.setRequestHeader("Content-length", urlSuperGlobal.length);		<br />
							&nbsp;&nbsp;DoImages.onreadystatechange = function(){<br />
								&nbsp;&nbsp;&nbsp;&nbsp;if ( ( DoImages.readyState == 4 ) && ( DoImages.status == 200 ) )<br />
								&nbsp;&nbsp;&nbsp;&nbsp;{<br />
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	var str = DoImages.responseText;<br />
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	document.getElementById( 'images_zone' ).innerHTML = str;	<br />	
								&nbsp;&nbsp;&nbsp;&nbsp;}	<br />
							&nbsp;&nbsp;};<br />
							&nbsp;&nbsp;DoImages.send( urlSuperGlobal );<br /><br />
							
						}
					</code>
				</li>
				<li>
					<strong>Clic sur le bouton "Ajouter une image"</strong><br />
					Double objectif : afficher le formulaire et vérifier pontcuellement si le chargement a été fait. 
					<ol>
						<li>
							<p>
								Modifie l'affichage (display:block;) de la balise &lt;div&gt; qui contient la balise &lt;iframe&gt; qui fait appelle au fichier 'image_loader.php' disposant du formulaire.
							</p>
							<h3>index.php</h3>
							<code>
								&lt;div class="outilsAddBox" id="outilsAddBox" style="display:none;"&gt;<br />
									&nbsp;&nbsp;&lt;iframe id="outilsAddFrame" src="image_loader.php?init=set" width="300px" height="170px" style="border:0px;"&gt;&lt;/iframe&gt;<br />
								&lt;/div&gt;
							</code>
						</li>
						<li>
							Vérification ponctuelle (toutes les 3 secondes) de l'état du chargement. Pour cela une variable est envoyé au fichier 'image_loader.php' afin de voir si elle correspond à une valeur de session ($_SESSION['load']) qui sera initialisée qu'à la toutefin de l'opération.
							<h3>index.php</h3>
							<code>								
								function checkImageLoad(){<br /><br />
								
									&nbsp;&nbsp;DoSend = Initxhr();<br />
									&nbsp;&nbsp;var urlSuperGlobal = 'checkImageLoad=fileLoaded';<br />
									&nbsp;&nbsp;var url = 'image_loader.php';<br />
									&nbsp;&nbsp;DoSend.open( "POST", url, true );<br />	
									&nbsp;&nbsp;DoSend.setRequestHeader("Content-type", "application/x-www-form-urlencoded");<br />
									&nbsp;&nbsp;DoSend.setRequestHeader("Content-length", urlSuperGlobal.length);	<br />	
									&nbsp;&nbsp;DoSend.onreadystatechange = function(){<br />
										&nbsp;&nbsp;&nbsp;&nbsp;if ( ( DoSend.readyState == 4 ) && ( DoSend.status == 200 ) )<br />
										&nbsp;&nbsp;&nbsp;&nbsp;{<br />
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var str = DoSend.responseText;<br />
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;str = str.replace( /^\s*|\s*$/, "" );<br />
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if ( /processDone/.test(str) ) {<br />
												&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;document.getElementById( 'outilsAddBox' ).style.display = 'none';<br />
												&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;document.getElementById( 'outilsAddImage' ).className = 'outilsAdd';<br />
												&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;clearInterval( chekImageLoadProcess );<br />
												&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;displayImages();<br />
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}	<br />
										&nbsp;&nbsp;&nbsp;&nbsp;}<br />
									&nbsp;&nbsp;};<br />
									&nbsp;&nbsp;DoSend.send( urlSuperGlobal );<br />
								}
	
							</code>
							Au terme du processus, le bloc contenu la balise &lt;iframe&gt; est à nouveau invisible (display:none;), la variable <em>chekImageLoadProcess</em> intiée avec le compteur est supprimée et les images doivent être mises à jour (avec la nouvelle image chargé).
						</li>
					</ol>
				</li>
				<li>
					<strong>Clic sur le bouton "Charger l'image"</strong><br />
					Après que l'utilisateur ait choisi le fichier à charger il déclenche l'opération du chargement dudit fichier en appuyant sur le bouton "Charger l'image".</br />
					<h3>image_loader.php</h3>
					<code>
						&lt;form method="post" enctype="multipart/form-data" action="image_loader.php?load=do"&gt;<br />
						&lt;strong&gt;Image&lt;/strong&gt; <br />
						&lt;input name="ImageFile" type="file" /&gt;<br />
						&lt;input type="submit" class="admin_submit" value="Charger l'image" name="AjouterMenu" align="middle" /&gt;<br />
						&lt;/form&gt;
					</code>
					Dans le cas où l'opération est réussie la variable $_SESSION['load'] est initialisé et une image illustrant le chargement en cours s'affiche à la place du formulaire
					<h3>image_loader.php</h3>
					<code>
						&lt;?php&gt;<br />
							&nbsp;&nbsp;if( isset( $_GET[ 'load'] ) && $process == 'ok' ){<br />
							&nbsp;&nbsp;$_SESSION[ 'load' ] = 'fileLoaded';<br />
							&nbsp;&nbsp;?&gt;<br />
							&nbsp;&nbsp;&lt;img style="display:block; margin:50px auto;" src="images/ajax-loader.gif" /&gt;<br />
							&nbsp;&nbsp;&lt;?php<br />
						}else{ <br />
							&nbsp;&nbsp;// Formulaire HTML (précédent exemple)<br />
						}<br />
						?&gt;<br />
					</code>
					Il est nécessaire de compléter l'opération avec un rechargement automatique de la page au bout de quelques secondes (3 secondes) autrement l'image de chargement restera visible lorsque l'utilisateur voudra charger une nouvelle image.
					<h3>image_loader.php</h3>
					<code>
						&lt;script type="text/javascript"&gt;<br />
						&lt;?php<br />
						if( isset( $_GET[ 'load'] ) && $process == 'ok' ){<br />
							&nbsp;&nbsp;?><br />
							&nbsp;&nbsp;window.onload = function(){ <br />
								&nbsp;&nbsp;&nbsp;&nbsp;setInterval( function(){<br />
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;document.location.href='image_loader.php?init=set'; <br />
								&nbsp;&nbsp;&nbsp;&nbsp;}, 3000 );<br />
									
							&nbsp;&nbsp;}<br />
							&nbsp;&nbsp;&lt;?php<br />
						}<br />
						?&gt;<br />
						&lt;/script&gt;
					</code>
				</li>
				
			</ol>

            </div>
			
		</div>
	
		<div id="bas_page">	
		</div>
	</div>
<div id="footer">
	&copy; 2012 - Ajax
</div>
</body>
</html>