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
/* Includes all the configuration variables and connects to the database.
 * Includes also the classes used in the frontend and starts(or continues) a session.

require_once( str_replace( '/', DIRECTORY_SEPARATOR, '../../cms/init.php' ) );

/* Declares the constants used in the administration backend.

define( '_PATH', CMS5D_ROOT_PATH );
define( '_URL',  CMS5D_ROOT_URL );

/* Sets the variables used by 'modules/admin/header.inc.php'.

$site_titre       = 'cms5d';
$site_author      = '5D Multimédia et Communication Web';
$site_description = '';
$site_keywords    = '';


/* Checks if the user has been authenticated.

if( !isset( $_SESSION[ 'adminOK' ] ) ) {
	
	header( 'Location: ' . _URL . 'cms/index.php' );
}

require_once( str_replace( '/', DIRECTORY_SEPARATOR, '../faq/utils/faq_sqlfactory.php' ) );
 */
 include('faq_sqlfactory.php');
$faqId="";
if(isset( $_GET['id_faq']))
{
	$faqId = $_GET['id_faq'];
}			   
$cfaq1=new faq();
$listfaq=$cfaq1->get_faq($faqId);
if (count($listfaq)>0){
	echo utf8_encode($listfaq[0][3]);
	//echo $listfaq[0][3];
}
?>