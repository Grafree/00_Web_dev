<?php
/* 
 */
include_once('globales.lib.php');

if (isset($_POST['base']) && $_POST['base'] != ''){
	$base			= $_POST['base'];
	}
if 	((isset($_POST['table']) && $_POST['table'] != '') && (isset($_POST['file']) && $_POST['file'] != '') && (isset($_POST['directory']) && $_POST['directory'] != '')){
	$base				= $_POST['base'];	
	$table				= mysql_escape_string($_POST['table']);
	$file				= mysql_escape_string($_POST['file']);
	$_SESSION['file'] 	= $file;
	$directory			= mysql_escape_string($_POST['directory']);
	$_SESSION['directory'] = $directory;

//if (!file_exists('source/'.$directory.'/'.$file.'.class.php') && !file_exists('source/'.$directory.'/'.$file.'.factory.php')){
//on crée le fichier class
		
		mkdir('source/'.$directory);
		touch('source/'.$directory.'/'.$file.'.class.php');
		
$link = connectmysql($base, _Host, _User, _Pass);

/* 
 * Voir : http://php.developpez.com/faq/?page=mysql#mysql-describe
 */
$sql = 'DESCRIBE '.$table;

$text = 
'<?php 
//////////////////////////////////////////////////////
//////////Classe '.$file.'
//////////////////////////////////////////////////////
class  '.$file.'{
';
while($field = mysql_fetch_assoc($result)){

	$text .='
	var $'.$field["Field"].';';

}
$text .= '
';

$result = mysql_query($sql);
while($field = mysql_fetch_assoc($result)){
	$text .= '
	function get_'.$field["Field"].'() { return $this->'.$field["Field"].'; }
	function set_'.$field["Field"].'($'.$field["Field"].') { $this->'.$field["Field"].' = $'.$field["Field"].'; return true; }
	';	
}
$text .= '
}
//////////////////////////////////////////////////////
//////////FactoryList
//////////////////////////////////////////////////////
function '.$file.'FactoryList($result){
	$t = array();
	while($row = mysql_fetch_object($result)) $t[] = '.$file.'Factory($row);
	if ($t != NULL) return $t;
	else return NULL;
}
//////////////////////////////////////////////////////
//////////'.$file.'Factory
//////////////////////////////////////////////////////
function '.$file.'Factory($row){
	$o = new '.$file.'();
	';
	
$result = mysql_query($sql);
while($field = mysql_fetch_assoc($result)){
	$text .= '
	if (!empty($row->'.$field["Field"].')) $o->set_'.$field["Field"].'($row->'.$field["Field"].');';	
}
	$text .= '
		
	return $o;
}
?>';	
		
			$fd = fopen('source/'.$directory.'/'.$file.'.class.php', "w");	
			fwrite($fd,$text);
			header('location:index.php');

//on crée le fichier factory

		touch('source/'.$directory.'/'.$file.'.factory.php');
		//}
			
$text = 
'<?php
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////
////// Fichier '.$file.'_factory.php
/////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
include_once(\''.$file.'.class.php\');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// fonction servant a rechercher tous les elements de la table '.$table.'

function '.$file.'FindAll($nbresult, $numresult, $return = \'list\') {
	
	if( $return == \'list\' &&  $nbresult != \'all\'){
		
		$limit = \' LIMIT \'.$numresult.\', \'.$nbresult;
	
	}else{
		
		$limit = \'\';
		
	}

	$sql = \'SELECT';

	$result = mysql_query($sql);
	$i = 0;
	while($field = mysql_fetch_assoc($result)){
		if( $i == 0 ) $text .= '
			'.$table.'.'.$field["Field"];
		$text .= ',
			'.$table.'.'.$field["Field"];
		$i++;
	}
	
	$result = mysql_query($sql);
	$first = mysql_fetch_assoc($result);
	$text .= '
			FROM '.$table.'
			ORDER BY '.$table.'.'.$first["Field"].'\'';
	$text .= '		
			.$limit;	

	$result = mysql_query($sql) or die (mysql_error());
	
	if( $return == \'list\'){
		return '.$file.'FactoryList($result);
	}else if( $return == \'nb\'){
		
		return mysql_num_rows( $result );
		
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////Selectionne les donnees en fonction de l\'id//////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function '.$file.'FindById( $id ) {

	$sql = \'SELECT';
	
$result = mysql_query($sql);
$i = 0;
while($field = mysql_fetch_assoc($result)){
	if( $i == 0 ) $text .= '
			'.$table.'.'.$field["Field"];
		$text .= ',
			'.$table.'.'.$field["Field"];
		$i++;
}
	$text .= '
			FROM '.$table.'';

	$result = mysql_query($sql);
	$first = mysql_fetch_assoc($result);
	$text .= '
			WHERE '.$table.'.'.$first["Field"].' = \\\'\'.$id.\'\\\'\';';		
			

$text .= '

	$result = mysql_query($sql) or die (mysql_error());
	return '.$file.'FactoryList($result);
}';

$text .= '

/********************************************************************
 * 
 * Fonction pour Ajouter à la BD des donnees
 * 
 *********************************************************************/
function insert'.$file.'() {';
$result = mysql_query($sql);
while($field = mysql_fetch_assoc($result)){
	$text .= '
			$'.$field["Field"].' 		= mysql_real_escape_string($_POST[\''.$field["Field"].'\']);';
}

	$text .= '
	if(';
$result = mysql_query($sql);
$i = 0;
while($field = mysql_fetch_assoc($result)){

	if (preg_match("/varchar/i", $field["Type"])) {
		
		if( $i == 0 ) $text .= '$'.$field["Field"].' != \'\'';
		else
			$text .= ' && 
		$'.$field["Field"].' != \'\'';
		$i++;
	
	}
}
$text .= '){';


$text .='
		
		$sql=\'INSERT INTO '.$table.' VALUES (';

$result = mysql_query($sql);
$i = 0;
while($field = mysql_fetch_assoc($result)){
	if( $i == 0 ) $text .= '
				NULL';
	$text .= ', 
				\\\'\'.$'.$field["Field"].'.\'\\\'';
	$i++;
}
								
	$text .=	'
				)\';
		
		if ( !mysql_query($sql) ) {
			die (mysql_error());
			return false;
		}
	
	}else{
		return false;
		
	}
	return true;
}

/********************************************************************
 * 
 * Fonction pour Modifier la BD des donnees
 * 
 *********************************************************************/
function update'.$file.'( $id ) {';
$result = mysql_query($sql);
while($field = mysql_fetch_assoc($result)){
	$text .= '
			$'.$field["Field"].' 		= mysql_real_escape_string($_POST[\''.$field["Field"].'\']);';
}


	$text .= '
	if(';
$result = mysql_query($sql);
$i = 0;
while($field = mysql_fetch_assoc($result)){

	if (preg_match("/varchar/i", $field["Type"])) {
		
		if( $i == 0 ) $text .= '$'.$field["Field"].' != \'\'';
		else
			$text .= ' && 
		$'.$field["Field"].' != \'\'';
		$i++;
	}
}
$text .= '){
	';


	$text .= '
		$sql = \'UPDATE '.$table.' SET
	';

$result = mysql_query($sql);
$i = 0;
while($field = mysql_fetch_assoc($result)){
	if( $i != 0 && $i == 1 ) $text .= 
		$field["Field"].' = $'.$field["Field"].'';
	else if($i > 1) $text .=',
		'.$field["Field"].' = $'.$field["Field"].'';
	$i++;
}

$result = mysql_query($sql);
$first = mysql_fetch_assoc($result);
$text .= '
		WHERE '.$table.'.'.$first["Field"].' = \\\'\'.$id.\'\\\'\';';	

$text .='
		
		//Execution de la requetes
		if ( !mysql_query($sql) ) {
			die (mysql_error());
			return false;
		}
	
	}else{
		return false;
		
	}
	return true;
}';

$text .= '

/********************************************************************
 * 
 * Fonction pour Supprimer des elements dans la BD des donnees
 * 
 *********************************************************************/
function delete'.$file.'( $id ) {

	$sql =\'DELETE FROM '.$table.'';

$result = mysql_query($sql);
$first = mysql_fetch_assoc($result);
$text .= '
		WHERE '.$table.'.'.$first["Field"].' = \\\'\'.$id.\'\\\'\';';	
		
$text .='
		
		//Execution de la requetes
		if ( !mysql_query($sql) ) {
			die (mysql_error());
			return false;
		}

	return true;
}
?>';
			$fd = fopen('source/'.$directory.'/'.$file.'.factory.php', "w");	
			fwrite($fd,$text);
			//mysql_close($link);	
			//header('location:index.php');

		
/////////////////////////////////////////////////////////////////////////////
/////////Création du fichier view
/////////////////////////////////////////////////////////////////////////////		
if(isset($_POST['view']) && $_POST['view'] == 'view' ){
			mkdir('view/'.$directory);
			touch('view/'.$directory.'/'.$file.'.php');
	
$text = '<?php
include_once(\'../../model/services/globales.lib.php\');
include_once(_PATH.\'/model/source/'.$directory.'/'.$file.'.factory.php\');

if ( isset( $_GET[\'id\'] ) ) $id = $_GET[\'id\']; else $id = 0;

if (isset( $_GET[\'noPage\'] ) ) $noPage = $_GET[\'noPage\']; else $noPage = 1;

if (isset( $_GET[\'nbrobjet\'] ) ) $numElementToShow = $_GET[\'nbrobjet\']; else $numElementToShow = 50;

if( isset( $_GET[\'insert'.$file.'\'] ) ){
	
	$message = "Les données ont bien été ajoutées.";
	$level = \'accept\';

}

if( isset( $_GET[\'update'.$file.'\'] ) ){

	$message = "Les données ont bien été modifiées.";
	$level = \'accept\';
	
}

if( isset( $_GET[\'delete'.$file.'\'] ) ){
	if( delete'.$file.'($_GET[\'delete'.$file.'\'] ) ){
		$message = "Les données ont bien été supprimées.";
		$level = \'accept\';
	}	
}

?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<?php include(_PATH.\'/view/head.inc.php\'); ?>
</head>

<body>

<div id="page">
<?php include(_PATH.\'/model/services/menu.inc.php\'); ?>

<div id="contenu">
	<div id="titre_page">Gestion</div>

	<div id="menu">
		<?php if( authorizeAdd() ){ ?>
		<div class="outils"><a href="'.$file.'_detail.php?noPage=<?php echo $noPage; ?>"><img src="<?php echo _URL; ?>/images/icons/add.gif" align="top" border="0">Ajouter un élément</a></div> 		
		<?php
		}
		
		$aide = "
			<p></p>
			
		";
		
		if( $aide ) echo aide( \'Gestionnaire du menu\', $aide );
		
		?>
	</div>

	<div id="tableau">
	';
	
	$text .='
	<?php $nombreTot = '.$file.'FindAll( $numElementToShow,\'All\',\'nb\' ); ?>
	<?php if ( isset( $nombreTot ) && $nombreTot != 0 ) {?>
		<div class="compteur">
			<table>
		<tr valign="middle">
			<td>	
			<form method="post" action="<?php echo \''.$file.'.php\';?>">
			<select name="nbrobjet" onchange="this.form.submit();">
				<option value=""> - </option>
				<?php if ($nombreTot > 50) {?>
				<option value="50" <?php if(isset($_POST[\'nbrobjet\']) && $_POST[\'nbrobjet\'] == 50) echo \'selected="selected"\';?>>50</option>
				<?php
				} 
				if ($nombreTot > 100) {?>
				<option value="100" <?php if(isset($_POST[\'nbrobjet\']) && $_POST[\'nbrobjet\'] == 100) echo \'selected="selected"\';?>>100</option>
				<?php
				} 
				if ($nombreTot > 150) {?>
				<option value="150" <?php if(isset($_POST[\'nbrobjet\']) && $_POST[\'nbrobjet\'] == 150) echo \'selected="selected"\';?>>150</option>
				<?php
				} ?>
				<option value="<?php echo $nombreTot;?>" <?php if(isset($_POST[\'nbrobjet\']) && $_POST[\'nbrobjet\'] == $nombreTot ) echo \'selected="selected"\';?>><?php echo $nombreTot;?></option>
			</select>
			</form>
			</td>
			<td>
			<?php
			// ==== GESTION DU NOMBRE DE PAGES ====	
			//Compter le nombre d\'objets:
			if (isset($_POST[\'nbrobjet\']) && $_POST[\'nbrobjet\'] !=\'\'){
			$objetsParPage = $_POST[\'nbrobjet\'];
			}else{
			$objetsParPage = 50;
			}
			$nbGroupTotal = 15;
			
			$numElementToShow = ( $noPage - 1 ) * $objetsParPage;
			$noElementDiff = ( $nbGroupTotal - 1 ) / 2;
			
			$nombreTot = '.$file.'FindAll($numElementToShow,\'All\',\'nb\');
				
			$nombrePages = ceil($nombreTot / $objetsParPage);

			$noPageMin = $noPage - $noElementDiff;
			$premPage = $noElementDiff + $noElementDiff;
			if($noPage > $nombrePages - $noElementDiff){$noPageMin = $nombrePages - $premPage;}			
			
			if($noPageMin < 1) $noPageMin = 1; 
			$noPageMax = $noPage + $noElementDiff;
			if($noPageMax < $nbGroupTotal)$noPageMax = $nbGroupTotal;
			if($noPageMax > $nombrePages)$noPageMax = $nombrePages;

			//AFFICHE LES PAGES
			if( $nombreTot != 0 && $objetsParPage < $nombreTot ){
				?>
				<a href="'.$file.'.php?&noPage=<?php if($noPage == 1){ echo $noPage; }else{ echo $noPage-1;} ?>">Page précédente</a>
				<?php
				for ($p = 1; $p <= $nombrePages; $p++) {
					if($p == $noPage){
						echo \'<strong>\'.$p.\'</strong>\';
					}else{
						if($p >= $noPageMin && $p <= $noPageMax){
							?>
							<a href="'.$file.'.php?noPage=<?php echo $p; ?>"><?php echo $p; ?></a>
							<?php
						}
					}
					if($p != $nombrePages && $p >= $noPageMin && $p < $noPageMax){ echo \'|\';}			
				}
				?>
				<a href="'.$file.'.php?noPage=<?php if($noPage >= $nombrePages){ echo $noPage; }else{ echo $noPage+1;} ?>">Page suivante</a>
					<?php
			}
			?>
				<strong>&nbsp;Total&nbsp;:&nbsp;<?php echo $nombreTot; ?>&nbsp;enregistrement</strong>
		</td>
	</tr>
	</table>
		</div>
	<?php } ?>
	';

	
	$text .='
		
		<table class="table_border" width="100%" align="center" border="0" cellpadding="0" cellspacing="0">
			<?php 
			$'.$file.'_array = '.$file.'FindALL($noPage, $numElementToShow);

			if ( isset( $'.$file.'_array ) ) {
			?>
				<tr>
					<th class="table_heading">&nbsp;</th>';

			$result = mysql_query( $sql ) or die("Erreur lors de la requête : ".mysql_error()."\n");
			$i = 0;
			while( $field = mysql_fetch_assoc( $result ) ){	
				if( $i != 0){
			$text .= '
					<th class="table_heading" nowrap="nowrap" id="nom">'.$field["Field"].'</th>';
				}
			}
			$text .= '
				<?php if( authorizeModify() ){ ?>
					<th class="table_heading_hide" nowrap="nowrap" align="left">Modifier</th>
				<?php } ?>
				<?php if( authorizeDelete() ){ ?>
					<th class="table_heading_hide" nowrap="nowrap" align="left">Supprimer</th>
				<?php } ?>
				<tr>
			';
			
			$result = mysql_query($sql);
			$first = mysql_fetch_assoc($result);
			$Id_class = $first["Field"];
			$text .='	
				<?php
				$cpt = 0;
				foreach ($'.$file.'_array as $'.$file.') {
				$check = $'.$file.'->get_'.$Id_class.'();
				$checkupdate = $'.$file.'->get_'.$Id_class.'();
				if( $id == $'.$file.'->get_'.$Id_class.'() ){ $lineClass = \'table_rows_modify\'; } else if( $cpt % 2 == 0 ){ echo \'class="table_rows1"\'; }else{ echo \'class="table_rows2"\'; } $cpt++; ?>
				
				<tr class="table_border" id="<?php echo $cpt; ?>  onClick="tablechoose(this.id);" onMouseOver="tablehighlight(this.id, \'<?php echo $lineClass; ?>\');" onMouseOut="tablenormal(this.id, \'<?php echo $lineClass; ?>\')">>
					<td width="2%">
					<a name="<?php echo $'.$file.'->get_'.$Id_class.'(); ?>">
						<?php echo $cpt; ?>	
					</a>
					</td>
				';
			
			$result = mysql_query($sql);
			$i = 0;
			while($field = mysql_fetch_assoc($result)){	
				if( $i != 0){
				$text .= '
					<td class="<?php echo $lineClass; ?>" valign="top">
						<?php echo $'.$file.'->get_'.$field["Field"].'(); ?>
					</td>';
				}
				$i++;
			}
				
			$text .= '
				<?php if( authorizeModify() ){ ?>
					<td class="<?php echo $lineClass; ?>_hide" nowrap="nowrap" align="left">
					<a href="'.$file.'_detail.php?modifier=<?php echo $'.$file.'->get_'.$Id_class.'(); ?>&noPage=<?php echo $noPage; ?>" ?>Modifier</a>
					</td>
				<?php } ?>
				<?php if( authorizeDelete() ){ ?>
					<td class="<?php echo $lineClass; ?>_hide" nowrap="nowrap" align="left">
					<a href="'.$file.'.php?delete'.$file.'=<?php echo $'.$file.'->get_'.$Id_class.'(); ?>&noPage=<?php echo $noPage; ?>" onclick="return confirmation();" ?>Supprimer</a>
					</td>
				<?php } ?>
				<tr>
	
		<?php
				}
			} else {
			?>
				<tr class="table_border">
					<td class="table_rows_total"><b>Aucune donnée n\'existe.</b></td>
				</tr>
			<?php
				}
			?>
			</table>
		';			


		$text .= '
		<?php if ( isset( $nombreTot ) && $nombreTot != 0 ) {?>
		<div class="compteur">			
			<?php
			//AFFICHE LES PAGES
			if($nombreTot != 0 && $objetsParPage < $nombreTot){
				?>
				<a href="'.$file.'.php?&noPage=<?php if($noPage == 1){ echo $noPage; }else{ echo $noPage-1;} ?>">Page précédente</a>
				<?php
				for ($p = 1; $p <= $nombrePages; $p++) {
					if($p == $noPage){
						echo \'<strong>\'.$p.\'</strong>\';
					}else{
						if($p >= $noPageMin && $p <= $noPageMax){
							?>
							<a href="'.$file.'.php?noPage=<?php echo $p; ?>"><?php echo $p; ?></a>
							<?php
						}
					}
					if($p != $nombrePages && $p >= $noPageMin && $p < $noPageMax){ echo \'|\';}			
				}
				?>
				<a href="'.$file.'.php?noPage=<?php if($noPage >= $nombrePages){ echo $noPage; }else{ echo $noPage+1;} ?>">Page suivante</a>
					<?php
			}
			?>
				<strong>&nbsp;Total&nbsp;:&nbsp;<?php echo $nombreTot; ?>&nbsp;enregistrement</strong>			
		</div>
		<?php } ?>
		';

		
	$text .= '
	</div>
	<?php include(_PATH.\'/view/footer.inc.php\'); ?>
	</div>	
</div>
</div>	
</body>
</html>';

$fd = fopen('view/'.$directory.'/'.$file.'.php', "w");	
fwrite($fd,$text);
//mysql_close($link);
//header('location:index.php');	
}
			
////////////////////////////////////////////////////////////////////////
//////////Création du fichier detail
////////////////////////////////////////////////////////////////////////
			
if(isset($_POST['detail']) && $_POST['detail'] == 'detail' ){
if(isset($_POST['view']) && $_POST['view'] == 'view' ){			
		touch('view/'.$directory.'/'.$file.'_detail.php');
		}else{
		mkdir('view/'.$directory);
		touch('view/'.$directory.'/'.$file.'_detail.php');
		}
		
$text = '<?php 

include_once(\'../../model/services/globales.lib.php\');
include_once(_PATH.\'/model/source/'.$directory.'/'.$file.'.factory.php\');

if ( isset( $_GET[\'noPage\'] ) ) $noPage = $_GET[\'noPage\']; else $noPage = 1;

if( isset ($_GET[\'modifier\'] ) ){
	$id = $_GET[\'modifier\'];
	$action = \'modifier=\'.$id.\'&update'.$file.'=\'.$id;	
	$'.$file.' = '.$file.'FindById($id);

}else {

	$id = 0;
	$action = \'insert'.$file.'\';
	$'.$file.' = NULL;

}
if( isset( $_GET[\'update'.$file.'\'] ) ){
	
	if( update'.$file.'($_GET[\'update'.$file.'\']) ){
		
		header(\'location:'.$file.'.php?update'.$file.'&noPage=<?php echo $noPage; ?>&id=\'.$_GET[\'update'.$file.'\'].\'#\'.$_GET[\'update'.$file.'\']);
		
	}else{
		
		$message = "Vous n\'avez pas complété les informations correctement.";
		$level = \'warning\';
		
	}

}

if( isset( $_GET[\'insert'.$file.'\'] ) ){
	
	if( insert'.$file.'() ){
		
		header(\'location:'.$file.'.php?insert'.$file.'&noPage=<?php echo $noPage; ?>\');
		
	}else{
		
		$message = "Vous n\'avez pas complété toutes les informations nécessaires.";
		$level = \'warning\';
		
	}

}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><head>
<?php include(_PATH.\'/view/head.inc.php\'); ?>
</head>
<body>

<div id="page">

<?php include(_PATH.\'/model/services/menu.inc.php\'); ?>

<div id="contenu">

	<div id="titre_page">
		Gestionnaire des contacts
	</div>

	<div id="menu">
		<?php 
		$aide = "
			<p></p>
		";
		
		if( $aide ) echo aide( \''.$file.'\', $aide );
		
		?>
	
	</div>
	<div id="tableau">
	
	<form name="'.$file.'" method="post" action="<?php echo \''.$file.'_detail.php?\'.$action; ?>">

	<table align="center" class="table_border" width="100%" border="0" cellpadding="3" cellspacing="0">

		<tr>
			<th class="rightside_heading" nowrap="nowrap" align="left" colspan="2">
				<?php
					if ( isset( $'.$file.' ) ) {
						echo "Modifier";
					}else{
						echo "Ajouter";
					}
				?>
			</th>
		</tr>
		<tr>
			<td height="15" colspan="2"></td>
		</tr>';

	$i = 0;
	$result = mysql_query($sql);
	while( $field = mysql_fetch_assoc( $result ) ){	
	if( $i != 0){

	$text .= '
		<tr>
		
			<td width="10%" class="table_rows" nowrap="nowrap"> 
				'.$field["Field"];
				if ( preg_match("/text/i", $field["Type"]) ){ $text .='<strong>*</strong>&nbsp;'; }
			
			$text .=':
			</td>
			<td width="90%" class="table_rows_right">
			';
			
			$text .= findtype($field["Field"], $field["Type"], $file);

			$text .='
				</td>
		</tr>';
	}	
		$i++;
	}
			
	$text .= '
		<tr>
			<td></td>
			<td>
				<div class="espace_bouton">	
	<?php if(isset($'.$file.')){ ?>
	<input type="image" name="ModifierMenu" value="Modifier" align="middle" src="<?php echo _URL; ?>/images/buttons/ok_button.gif">
	<?php }else{ ?>
	<input type="image" name="AjouterMenu" value="Ajouter" align="middle" src="<?php echo _URL; ?>/images/buttons/ok_button.gif">
	<?php } ?>
	</td>
	</tr>
	
</table>	

	</form>
	
	</div>
	
</div>

<?php include(_PATH.\'/view/footer.inc.php\'); ?>

</div>
</body>
</html>
';
			$fd = fopen('view/'.$directory.'/'.$file.'_detail.php', "w");	
			fwrite($fd,$text);
			//mysql_close($link);	
			//header('location:index.php');
			}
	}

// 
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Document sans titre</title>
<script>

function sendForm(){
	document.forms['create'].submit();
}

</script>
<style>
body{
width: 100%;
font-size: 10px;
font-family:Verdana, Arial, Helvetica, sans-serif;
}

a:link{
color:#000000;
text-decoration:none;
}

a:visited{
color:#000000;
text-decoration:none;
}

a:hover{
color:#0000ff;
}

#contenu{
width: 90%;
margin:auto;
}

div.message{ 
background-color:#f9fbf2;
border-right:1px solid #a5bd9d; 
border-bottom:1px solid #7b9479; 
border-left:1px solid #c5dec1; 
font-size:11px; font-weight:bold; 
position:absolute; 
width:450px; 
left:50%; 
top:125px; 
margin-left:-225px; 
padding:0px 0px 5px 0px; 
z-index:150;
}
div.message a{
display:block; 
width:16px; 
margin:0px 0px 0px 435px;
}
div.message div.mesentete{
background-color:#c5bd9d; 
height:20px; width:449px; 
margin:0px 0px 20px 0px; 
border-right:1px solid #567a28; 
border-left:1px solid #567a28; 
border-bottom:1px solid #567a28; 
background-image:url(../images/logos/login_bkg.gif); 
background-repeat:repeat-x;
}
div.message div.mescontenu{
margin:30px;
}
div.message div.txt{
float:left; 
width:340px; 
line-height:19px; 
font-size:11px;
}
div.message img.icon{
float:left; 
margin:2px 15px 5px 5px;
}

#tableau{
width: 50%;
background-color:#F7F7F7;
border: #CCCCCC solid 1px;
}

#tableau form{
background-color:#E6E6E6;
}

#tableau label{
font-size:12px;
font-weight:bold;
}

#pied{ 
width:90%;
margin:auto;
text-align:left; 
 }
</style>

</head>

<body>
	<div id="contenu">
	<h1>Générateur de class et de factory</h1>
	<div id="tableau">
	<form name="create" method="post" action="<?php echo 'index.php';?>">
<table>
	<tr height="15">
	</tr>

	<tr>
		<td width="20%" nowrap="nowrap">
			<label for="base">Nom de la base de donnée</label> :
		</td>
			
		<td width="80%">
			
		
			<select name="base" id="base" onchange="sendForm();">
				<option value=""> Choisissez une base de données </option>
					<?php 
	$link = mysql_connect($dbhost,$dbuser,$dbpass);
			$db_list = mysql_list_dbs($link);

			$i = 0;
		$rows = mysql_num_rows($db_list);
				while ($i < $rows) {?>
				<option <?php if(isset($_POST['base']) && $_POST['base'] == mysql_db_name($db_list, $i) ) echo ' selected="selected"'; ?> value="<?php echo mysql_db_name($db_list, $i) ; ?>"><?php echo mysql_db_name($db_list, $i) ; ?></option>
					<?php $i++; } ?>	
			</select>		
		</td>
	</tr>

<?php if (isset($_POST['base']) && $_POST['base'] != ''){?>
	<tr>

		<td width="20%" nowrap="nowrap">
			<label for="table">Nom de la table concernée</label> :
		</td>
			
		<td width="80%">
			
		
			<select name="table" id="table">
				<option> Choisissez une table </option>
					<?php 
						$sql = 'SHOW TABLES FROM '.mysql_real_escape_string( $_POST['base'] ).'';
						
						
						$result = mysql_query($sql);
						while ($row = mysql_fetch_row($result)){
					?>
				<option <?php if(isset($_POST['table']) && $_POST['table'] == $row[0]) echo 'selected ="selected"'; ?> value="<?php echo $row[0] ; ?>"><?php echo $row[0] ;?></option>
					<?php } ?>		
			</select>		
		</td>
	</tr>
	<tr>	
		<td width="20%" nowrap="nowrap">
			<label for="file" >Nom du fichier</label> :
		</td>

		<td width="80%">
			<input type="text" name="file" id="file" value="<?php if(isset($_POST['file']) && $_POST['file'] !='') echo $_POST['file'] ?>"/>
		</td>
	</tr>
	<tr>	
		<td width="20%" nowrap="nowrap">
			<label for="directory" >Nom du dossier</label> :
		</td>

		<td width="80%">
			<input type="text" name="directory" id="directory" value="<?php if(isset($_POST['directory']) && $_POST['directory'] !='') echo $_POST['directory'] ?>"/>
		</td>
	</tr>
	<tr>	
		<td width="20%" nowrap="nowrap">
			<label for="view" >fichier view</label> :
		</td>

		<td width="80%">
			<input type="checkbox" name="view" id="view" value="view" <?php if (isset($_POST['view']) && $_POST['view'] == 'view') echo 'checked="checked"';?>/>
		</td>
	</tr>
	<tr>	
		<td width="20%" nowrap="nowrap">
			<label for="detail" >fichier detail</label> :
		</td>

		<td width="80%">
			<input type="checkbox" name="detail" id="detail" value="detail" <?php if (isset($_POST['detail']) && $_POST['detail'] == 'detail') echo 'checked="checked"';?>/>
		</td>
	</tr>
	<tr>
		<td>
			<div class="espace_bouton">
			<input type="submit" name="creation" value="Créer fichiers" align="middle" />	
			</div>			
		</td>
	</tr>
<?php } ?>
</table>	
	</form>

	</div>
	</div>
	<div>
<div id="pied">

	<br/>&nbsp;&nbsp;&nbsp;&copy;2009 - <a href="mailto:miottiger@hotmail.com">Alpha</a>
	
</div>
	</div>
</body>
</html>
