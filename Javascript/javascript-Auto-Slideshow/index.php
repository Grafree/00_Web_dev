<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
<style>

	div.espace_page{  				/* Espace visible du diaporama */
		height:175px;
		width:302px;
		overflow:hidden;
		position:relative;
	}
	
	div.support{  					/* Contient toutes les pages */
		width:auto;
		white-space:nowrap;
		position:absolute;
		left:0px;
		top:0px;
		border:1px solid #666;
	}
	
	div.support img {
		display:inline;
		float:left;
		padding: 0px 0px 0px 0px;	/* Ne pas mettre de padding left ou right */
		margin: 0px 0px 0px 0px;	/* Ne pas mettre de margin left ou right */
	}
	
</style>
<script language="JavaScript" Type="text/javascript" src="script-startshow.js"></script>
<script language="javascript">

/*
=== Déclaration de l'instance ===

var mavariable = new SlideClass( 
	[distance en pixel], 
	[vitesse en milliseconde], 
	[id de la div contenant le slide show], 
	[Pourcentage a partir duquel la dégression commence],
	[Secondes d'attente sur chaque slide],
	[Affiche la numérotation de page],
	[id de la div pour afficher la pagination]
	);
*/
var objslide = new SlideClass( 45, 15, 'page', 90, 2, true, 'pagenum' );

</script>
</head>
<body>
	
												
	<div class="espace_page" id="page">
		<div class="support">						

				<img src="galery/01.jpg" width="300" />
				<img src="galery/02.jpg" width="300" />
				<img src="galery/03.jpg" width="300" />
				<img src="galery/04.jpg" width="300" />
				<img src="galery/05.jpg" width="300" />
				<img src="galery/06.jpg" width="300" />
				<img src="galery/07.jpg" width="300" />

		</div>
	</div>
				
	<div id="pagenum" class="arrow"></div>								


</body>
</html>