<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 4.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="styleFaq.css" />
<title>Exercice AJAX DOM</title>
</head>
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

include('faq_sqlfactory.php');
$maBase = new maDB();
$ConnctMsg = $maBase->getErreurMsg();
if (!($ConnctMsg=='ok')){
	$errorNum = $maBase->getErreurNo();
	echo $ConnctMsg.'<br>';
	echo 'Errreur No: '.$errorNum;
}

else{
	//$gerer1= utf8_decode('Gérer les FAQs');
	$gerer1= 'Gérer les FAQs';
	$gerer2= 'Gérer les thèmes';
/*	if( isset( $_GET['action'] )) 
	{
	$action = $_GET['action'];
	}
	else
	{
	$action = '';
	}
	switch($action){
		
		case 'gerer': 
			include('faq_adm.php');
			break;
	//----
		case 'affich1': 
			include('FaqAffich1.php');
			break;
	
	//---
		
		case 'theme': 
			include('theme_adm.php');
			break;		
		
		default: 
*/		
		?>
<body class="body2">		
		<table cellpadding="3" cellspacing="3">
		<br />
		<br />
			<tr>
			<td> 
				<A href="faq_adm.php?motif=gerer"><?php echo $gerer1 ?></A>
			</td>
			</tr>
			
			<tr>
			<td> 
				<A href="theme_adm.php?motif=gerer"><?php echo $gerer2 ?></A>
			</td>
			</tr>        
		</table>
        </body>
        </html>
	<?php
//			break;
//	}
}
?>

