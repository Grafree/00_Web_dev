<?php
//header('Content-type: text/html; charset=UTF-8');  
	
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
var $mHost="localhost";
var $mUser="root";
var $mPass="mysql";
var $mDb="ajaxdb";
var $maConnection=""; 	 
	 */
	
	
	// The module beins here ...
	class maDB{
		var $mHost;
		var $mUser;
		var $mPass;
		var $mDb;
		var $maConnection;
		var $errorNo;
		var $errorMsg;
		function __tostring()
		{
			return "Cette classe permet d'ouvrir et fermer une base de donnes. <br>";	
		}		
		function __construct($mHost="localhost",$mUser="root",$mPass="mysql",$mDb="ajaxdb"){
			//afin d'viter que l'on accde  la BD de Mysql
			if (strtolower($mDb)=='mysql'){
				$mDb="";
			}
			$this->mDB=$mDb;
			
			if (($this->maConnection=mysql_connect($mHost, $mUser, $mPass))&&(mysql_select_db($mDb))){
				$this->errorMsg='ok';
				
			}
			else
			{
				$this->errorNo=mysql_errno();
				$this->errorMsg=mysql_error();
			}
		}
		function getErreurNo(){
			return $this->errorNo;
		}
		function getErreurMsg(){
			return $this->errorMsg;
		}		
		
		
	}
	
	
	class faq{
		//public $ID_faq;
		public $theme_faq;
		public $quest_faq;
		public $rep_faq;
		function __tostring()
		{
			return "Cette classe permet de traiter les questions/rponses du site SIC. <br>";	
		}
		function __construct($ctheme_faq="", $cquest_faq="", $crep_faq="")
		{
			//$this->ID_faq = $cID_faq;
			$maBase = new maDB();
			$this->theme_faq = $ctheme_faq;
			$this->quest_faq = utf8_decode($cquest_faq);
			$this->rep_faq = utf8_decode($crep_faq);
			
		}
		function tronquer_rep($rep,$nb)
		{
			$mrep=substr($rep,0,$nb);
			return $mrep;
		}
		function traiter_faq($operation,$ifqID=""){
			$req;
			switch($operation){
		// ajouter faq		
				case 'A':
				$req = "INSERT INTO tb_faq (theme, faq_quest, faq_rep) VALUES ($this->theme_faq, '$this->quest_faq',
						'$this->rep_faq')";
				break;
		// supprimer faq		
				case 'S':
				$req = "DELETE FROM tb_faq WHERE faq_ID = ".$ifqID;
				break;
		// modifier faq		
				case 'M':
				$req = "UPDATE tb_faq SET theme = $this->theme_faq, faq_quest = '$this->quest_faq', faq_rep = '$this->rep_faq' WHERE
						faq_ID = ".$ifqID;
				break;				
			}
			mysql_query($req) or die ('Erreur : '.mysql_error());
			return true;
			closeDB();
		}
		function list_faq($vthme="")
		{
			//$maBase = new maDB();
			$reqset=array();
			if (empty($vthme)){
				$req = "SELECT * FROM tb_faq ORDER BY faq_ID";
			}
			else{
				$req = "SELECT * FROM tb_faq WHERE theme = $vthme ";	
			}
			$result=mysql_query($req) or die ('Erreur : '.mysql_error());
			while( $row = mysql_fetch_array($result))
			{
					$reqset[]=$row;
			}
			return $reqset;			
			
		}
		function get_faq($fID){
				$req = "SELECT * FROM tb_faq WHERE faq_ID = $fID ";				
				$reqset=array();
				$result=mysql_query($req) or die ('Erreur : '.mysql_error());
				while( $row = mysql_fetch_array($result))
				{
					$reqset[]=$row;
				}

			return $reqset;			
			
		}		
	}
	class theme{
		public $ID_theme;
		public $name_theme; 
		
		function __tostring()
		{
			return "Cette classe permet de traiter les thmes du FAQ du site SIC. <br>";	
		}
		function __construct($cname_theme="")
		{
			//$this->ID_theme = $cID_theme;
			$maBase = new maDB();
			$this->name_theme = utf8_decode($cname_theme);
			
		}		
		function traiter_thm($operation,$IDthm=""){
			$req;
			switch($operation){
		// ajouter faq		
				case 'A':
				$req = "INSERT INTO tb_theme (theme_name) VALUES ('$this->name_theme')";
				break;
		// supprimer faq		
				case 'S':
				$req = "DELETE FROM tb_theme WHERE theme_ID = ".$IDthm;
				break;
		// modifier faq		
				case 'M':
				$req = "UPDATE tb_theme SET theme_name = '$this->name_theme' WHERE theme_ID = ".$IDthm;
				break;				
			}
			mysql_query($req) or die ('Erreur : '.mysql_error());
			return true;	
		}
		function list_thm(){
			$req = "SELECT * FROM tb_theme ORDER BY theme_ID";
			$reqset=array();
			$result=mysql_query($req) or die ('Erreur : '.mysql_error());
			while( $row = mysql_fetch_array($result))
			{
				$recset[]=$row;
			}
			return $recset;			
			
		}
		function get_thm($midthm){
			$req = "SELECT * FROM tb_theme WHERE theme_ID = $midthm";
			$reqset=array();
			$result=mysql_query($req) or die ('Erreur : '.mysql_error());
			while( $row = mysql_fetch_array($result))
			{
				$recset[]=$row;
			}
			return $recset;			
			
		}		
	}
	class img{
		public $ID_img;
		public $name_img; 
		public $url_img;
		
		function __tostring()
		{
			return "Cette classe permet de traiter les Les images de l'exercice DOM. <br>";	
		}
		function __construct($cname_img="")
		{
			//$this->ID_theme = $cID_theme;
			$maBase = new maDB();
			$this->img_name = utf8_decode($cname_img);
			
		}		

		function list_img(){
			$req = "SELECT * FROM tb_img ORDER BY img_ID";
			$reqset=array();
			$result=mysql_query($req) or die ('Erreur : '.mysql_error());
			while( $row = mysql_fetch_array($result))
			{
				$recset[]=$row;
			}
			return $recset;			
			
		}
		function get_img($midimg){
			$req = "SELECT * FROM tb_img WHERE img_ID = $midimg";
			$reqset=array();
			$result=mysql_query($req) or die ('Erreur : '.mysql_error());
			while( $row = mysql_fetch_array($result))
			{
				$recset[]=$row;
			}
			return $recset;			
			
		}		
	}	
	
?> 