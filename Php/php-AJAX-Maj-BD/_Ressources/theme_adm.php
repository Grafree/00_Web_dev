<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 4.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="styleFaq.css" />
<script type="text/javascript" src="MonAjax.js"> </script>
<script type="text/javascript" src="faqs.js"> </script>
</head>
<body class="body2">
<?php


	
	// This file is an example file for the creation of a module.
	// Replace, within the license/disclaimer below, the tags with %% by the correct values,
	// and remove these three lines ...
	
	/**
	 * %%SHORT_DESCRIPTION%%.
	 *
	 * PHP versions >= %%PHP_VERSION%%
	 *
	 * Copyright (c) 2009 JEMAI Noureddine
	 *
	 *                              LICENSE
	 *
	 * This program is free software; you can redistribute it and/or modify
	 * it under the terms of the GNU General Public License as published by
	 * the Free Software Foundation; either version 2 of the License, or
	 * (at your option) any later version.
	 *
	 * This program is distributed in the hope that it will be useful,
	 * but WITHOUT ANY WARRANTY; without even the implied warranty of
	 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
	 * GNU General Public License for more details.
	 *
	 * You should have received a copy of the GNU General Public License along
	 * with this program; if not, write to the Free Software Foundation, Inc.,
	 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
	 *
	 * 5D-ETSL (Lausanne),
	 * hereby disclaims all copyright interest in the current file
	 * written by JEMAI Noureddine.
	 *
	 * 5D-ETSL (Lausanne), 2009
	 * 5D, Director
	 *
	 * @package contact
	 * @author Jemai Noureddine <njmv1@voila.fr>
	 * @copyright Copyright (c) 2009, JEMAI Noureddine. All Rights Reserved.
	 * @license http://www.gnu.org/licenses/old-licenses/gpl-2.0.html GPL2.0
	 * @version 1.0
	 */
?>

<?PHP
//require_once(str_replace( '/', DIRECTORY_SEPARATOR,CMS5D_MOD_PATH.'/faq/utils/faq_sqlfactory.php'));
include('faq_sqlfactory.php');
$ajouter=false;
$imotif="";
$atheme = new theme();
if (isset($_POST['source']))
{
	$psource=$_POST['source'];
	$ajouter=true;
}
if (isset($_POST['ithmID']))
{
	$pithmID=$_POST['ithmID'];
	$ajouter=true;
}
if (isset($_POST['thmtext']))
{
	$ptextthm=$_POST['thmtext'];
	$ajouter=true;
}
if (isset($_POST['pmotif']))
{
	$pmotif=$_POST['pmotif'];
	$ajouter=true;
}
if ($ajouter){
	if ($ptextthm=="")
	{
		echo '!!Attention!! le champs "Non de thème" ne peut pas être vide';
		$imotif=$pmotif;
	if(trim($imotif)=='modifier')
	{
		$ithmID=$pithmID;
		$mthm=$atheme->get_thm($ithmID);
		$psource='Mod';
		$titre='Modification de Thème No: '.$ithmID;
	}
	elseif(trim($imotif)=='nouveau')
	{
		$psource='Nouv';
		$titre='Nouveau Thème';
	}		
		
	}
	else
	{
		$atheme1 = new theme($ptextthm);
		$imotif='gerer';
		switch($psource){
			case 'Mod':
			$atheme1->traiter_thm('M',$pithmID);
			echo 'le thème No: '.$pithmID.' a été modifié';				
			break;
			
			case 'Nouv':
			$atheme1->traiter_thm('A',"");
			echo 'Un thème a été ajouté dans la Base de Données';		
			break;
		}
	}
	
}
else
{
	if (isset($_GET['motif']))
	{
		$imotif=$_GET['motif'];
	}
	if (isset($_GET['mthqId']))
	{
		$ithmID=$_GET['mthqId'];
	}		

	if (trim($imotif)=='supprimer')
	{
		$faq2 = new faq();
		$Mfaq=$faq2->list_faq($ithmID);
		if(count($Mfaq)>0)
		{
			echo '!Au moins un élément FAQ est lié à ce thème! veuillez supprimer le(s) FAQ(s) de ce theme avant cette opération';
		}
		else
		{
			$atheme->traiter_thm('S',$ithmID);
			echo 'le thème No: '.$ithmID.' a été supprimé';
		}
		$imotif='gerer';
	}
	elseif(trim($imotif)=='modifier')
	{
		$mthm=$atheme->get_thm($ithmID);
		$psource='Mod';
		$titre='Modification de Thème No: '.$ithmID;
	}
	elseif(trim($imotif)=='nouveau')
	{
		$psource='Nouv';
		$titre='Nouveau Thème';
	}	
}
echo '<form name="frmTeme" method="post"><table>';
if (trim($imotif)=='gerer')
{
	$alistthem=$atheme->list_thm();	
	echo '<tr><td><A href="faq.php"> Retour</A></td></tr>';
	if (count($alistthem)>0)
	{
		echo '<tr><td>Thèmes:</td></tr><tr><td><select name="stheme" id="thmID">';
	
	
		for($i=0;$i<count($alistthem);$i++){
			echo '<option value='.$alistthem[$i][0];
			echo '>'.utf8_encode($alistthem[$i][1]).'</option>';
		}
		echo
		'</td><td><input type="button" class="bt1" name="supp" value="Supprimer" onclick="javascript:GenerateURLthm(\'thmID\',\'S\');">
		</td>
		<td><input type="button" class="bt1" name="modif" value="Modifier" onclick="javascript:GenerateURLthm(\'thmID\',\'M\');"></td>
		<td><input type="button" class="bt1" name="modif" value="Ajouter" onclick="javascript:GenerateURLthm(\'thmID\',\'N\');"></td>
		</tr>
		</select>';
	}
	else
	{
		echo 'Aucun thème n\'est enregistré dans la base de données';
	}
}
elseif((trim($imotif)=='nouveau')||(trim($imotif)=='modifier'))
{
	echo '<tr><td><A href="faq.php"> Retour</A></td></tr>';
	echo '<tr><td style="font:bold">'.$titre.'</td></tr>';
	echo '<tr><td><input type="text" name="thmtext" ';
	if (trim($imotif)=='modifier') {echo 'value="'.utf8_encode($mthm[0][1]).'"';}
	echo '></td></tr><br><br>';
	echo'<tr><td><input type="submit" class="btSubmit1" value="Enregistrer"></td></tr>';
	echo'<tr><td><input type="hidden" name="source" value="'.$psource.'"></td></tr>';
	echo'<tr><td><input type="hidden" name="pmotif" value="'.$imotif.'"></td></tr>';
	if (trim($imotif)=='modifier'){
		echo'<tr><td><input type="hidden" name="ithmID" value="'.$ithmID.'"></td></tr>';
	}
}
?>
</table>
</Form>
</body> 
</html> 