<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 4.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
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
	 


<?php
	 
	 //require_once(str_replace( '/', DIRECTORY_SEPARATOR,CMS5D_MOD_PATH.'/faq/utils/faq_sqlfactory.php'));
	 include('faq_sqlfactory.php');
	 $ajouter=false;
	 $imotif="";
	 $ioperation="";
	 $moperation="";
	 $fquest="";
	 $frep="";
	 $imId="";
	 $fID="";
	 $faqsVide=false;
	 
	 if (isset($_POST['stheme']))
	 {
		 $thm=$_POST['stheme'];
		 $ajouter=true;
	 }
	 if (isset($_POST['faqQuest']))
	 {
		 $fquest=$_POST['faqQuest'];
		 $ajouter=true;
	 }
	 if (isset($_POST['faqRep']))
	 {
		 $frep=$_POST['faqRep'];
		 $ajouter=true;
	 }
	 if (isset($_POST['poperation']))
	 {
		 $moperation=$_POST['poperation'];
		 $ioperation="";
		 $ajouter=true;
	 }
	 if (isset($_POST['FqNumb']))
	 {
		 $fID=$_POST['FqNumb'];
		 $ajouter=true;
	 }
	 if ($ajouter)
	 {
		 if ((!trim($fquest)=="")&&(!trim($frep)==""))
		 {
		 
			if (trim($moperation=='nouveau')){ 
				$afaq = new faq($thm,$fquest,$frep);
				$afaq->traiter_faq('A');
				echo 'Une nouvelle FAQ a ètè ajoutée dans la base de données';
				$imotif='gerer';
			}
			if (trim($moperation=='modifier')){ 
				$afaq = new faq($thm,$fquest,$frep);
				$afaq->traiter_faq('M',$fID);
				echo 'La FAQ No: '.$fID.' a été modifiée';
				$imotif='gerer';
			}
		}
		else
		{
			echo 'Attention les champs marqués d\'une * sont obligatoires, veuillez les remplir SVP';
			$ioperation = $moperation;
			$imId=$fID;
			
			
		}
	 }
	else
	{
		if (isset($_GET['motif']))
		 {
			 $imotif=$_GET['motif'];
		 }
		 if (isset($_GET['mfqId']))
		 {
			 $imId=$_GET['mfqId'];
		 }
		 if (isset($_GET['operation']))
		 {
			 $ioperation=$_GET['operation'];
		 }
	}
	 if (trim($imotif)=='gerer')
	 {
		 $faq1 = new faq();
		 $listfaq1=$faq1->list_faq();
	 }
	 if(trim($ioperation)=='nouveau')
	 {
		$atheme = new theme();
		$alistthem=$atheme->list_thm();		 
	 }
	 elseif(trim($ioperation)=='supprimer')
	 {
		$faq1->traiter_faq('S',$imId);
		$listfaq1=$faq1->list_faq();
		echo "un élément a été supprimer de la liste des FAQs";
	 }
	 elseif(trim($ioperation)=='modifier')
	 {
		$faq2 = new faq();
		$Mfaq=$faq2->get_faq($imId);
		$atheme = new theme();
		$alistthem=$atheme->list_thm();		
	 }	 
//<select size="20"
//<table width="800">

	echo '<form name="faqfrm" method="POST" class="form_input">';
	echo '<A href="faq.php"> Retour</A><br><br>';
	//--
	//echo utf8_encode('Text=:'.$listfaq1[0][2]);
	//--
	echo '<table class="TabUser">';

if (trim($imotif)=='gerer'){
	
	if (count($listfaq1)>0)
	{
		
		echo '<tr><td></td><td></td><td></td><td>FAQs:</td></tr>';
		echo '<tr><td></td><td></td><td></td><td><select name="sfaqs" id="fqid" onchange="jacascript:afficheFaq(\'fqid\');">';
		for($i=0;$i<count($listfaq1);$i++){
			echo '<option value='.$listfaq1[$i][0].'>'.utf8_encode($faq1->tronquer_rep($listfaq1[$i][2],20)).'</option>';
		}
		echo "</select></td></tr>";
	}
	else
	{
		$faqsVide=true;
		echo '<tr><td>Aucun élément Faq n\'est actuellement enregistré dans la Base de données</tr></td><br><br>';
	}
}
if (!$faqsVide)
{
	if((((trim($ioperation)=='nouveau')||(trim($ioperation)=='modifier')))&&(!(trim($imotif)=='gerer')))
	{
		//echo '<tr><td><A href="faq.php"> Retour</A></td></tr>';
		echo '<tr><td></td><td>Thèmes:</td>
		<tr><td></td><td><select name="stheme">';
		for($i=0;$i<count($alistthem);$i++){
			echo '<option value='.$alistthem[$i][0];
			if ((trim($ioperation)=='modifier')&&($alistthem[$i][0]==$Mfaq[0][1])) {echo ' SELECTED';}
			echo '>'.utf8_encode($alistthem[$i][1]).'</option>';
		}
		echo "</select></td></tr>";
		
	}
	//style="text-align:left"
	?>
	
	<tr><td>* Question:</td></tr>
	<tr><td>
	<textarea class="textQ1" name="faqQuest" <?php if ((!(trim($ioperation)=='modifier'))&&(!(trim($ioperation)=='nouveau'))){
		echo 'readonly="readonly"'.' disabled="disabled"';}?>><?php
    if (trim($imotif)=='gerer') 
	{echo utf8_encode($listfaq1[0][2]);} 
	elseif(trim($ioperation)=='modifier')
	{echo utf8_encode($Mfaq[0][2]);}
	else
	{echo $fquest;}
	?></textarea>
	</td></tr><tr height="10"></tr><tr><td>* Réponse:</td></tr>
	<tr><td>	
	<textarea class="textR1" name="faqRep"<?php if ((!(trim($ioperation)=='modifier'))&&(!(trim($ioperation)=='nouveau'))){echo
	'readonly="readonly"'.' disabled="disabled"';} ?>
	><?php 
	if (trim($imotif)=='gerer') 
	{echo utf8_encode($listfaq1[0][3]);} 
	elseif(trim($ioperation)=='modifier')
	{echo utf8_encode($Mfaq[0][3]);}
	else
	{echo $frep;}?></textarea>
	</td></tr>
	
	<?php
	if (trim($ioperation)=='modifier'){
	echo '<tr><td>
	<input type="hidden" name="FqNumb" value="'.$imId.'"></td></tr>';
	}
	?>
	</table>
	<?php
	if (trim($imotif)=='gerer')
	{
	echo '<table><tr></tr><tr><td align="justify" valign="baseline">';
	
		echo '<input type="button" class="bt1" name="supp" value="Supprimer" onclick="javascript:GenerateURL(\'fqid\',\'S\');"></td>
		<td>';
		echo '<input type="button" class="bt1" name="modif" value="Modifier" onclick="javascript:GenerateURL(\'fqid\',\'M\');"></td>
		<td>';
		echo '<input type="button" class="bt1" name="nouv" value="Nouveau" onclick="javascript:GenerateURL(\'-\',\'N\');">';
	}
	else
	{
		echo '<table><tr></tr><tr><td align="justify" valign="baseline">';
		echo '<input type="submit" class="btSubmit1" value="Enregistrer">';
		echo '<input type="hidden" name="poperation" value="'.$ioperation.'">';
		
	}
	echo '</td></tr>';
}
else
{
	
	echo '<br><br><input type="button" class="bt1" name="nouv" value="Nouveau" onclick="javascript:GenerateURL(\'-\',\'N\');">';
}
?>
</table>
</form>
</body> 
</html> 