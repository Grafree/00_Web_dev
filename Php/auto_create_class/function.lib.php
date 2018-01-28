<?php
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Fonctions Globales

function connectmysql($base,$Host,$User,$Pass){
		$link = mysql_connect($Host,$User,$Pass) or die (	"Erreur SQL !<br />
												Échec de la connexion<br />"
												.mysql_error());

// --- Sélectionner la base de données désirées.
	mysql_select_db($base,$link) or die (	"Erreur SQL !<br />
											Pas Base de données sélectionnées.<br />"
											.mysql_error());
											
		return $link;
}

function findtype($champs, $type, $file){
	
	if ( preg_match("/int/i", $type) || preg_match("/bigint/i", $type) || preg_match("/mediumint/i", $type) || preg_match("/smallint/i", $type) || preg_match("/tinyint/i", $type) ) {
	
		$form = '<select name="'.$champs.'">
					<option <?php if(isset($_POST[\''.$champs.'\']) && $_POST[\''.$champs.'\'] == \'0\' ) echo \'seleted="selected"\'; else if ( isset( $'.$file.') && $'.$file.'[0]->get_'.$champs.'() == \'0\') echo \'seleted="selected"\'; ?>>----</option>
					<option <?php if(isset($_POST[\''.$champs.'\']) && $_POST[\''.$champs.'\'] == \'1\' ) echo \'seleted="selected"\'; else if ( isset( $'.$file.') && $'.$file.'[0]->get_'.$champs.'() == \'1\') echo \'seleted="selected"\'; ?>>1</option>
					<option <?php if(isset($_POST[\''.$champs.'\']) && $_POST[\''.$champs.'\'] == \'2\' ) echo \'seleted="selected"\'; else if ( isset( $'.$file.') && $'.$file.'[0]->get_'.$champs.'() == \'2\') echo \'seleted="selected"\'; ?>>2</option>
				</select>';
	
	}else if ( preg_match("/text/i", $type) || preg_match("/blob/i", $type) || preg_match("/longblob/i", $type) || preg_match("/longtext/i", $type) || preg_match("/mediumblob/i", $type) || preg_match("/mediumtext/i", $type) ) {	

		$form = '<textarea id="'.$champs.'" name = "'.$champs.'"><?php 
				if( isset($_POST[\''.$champs.'\']) ){ 
				echo $_POST[\''.$champs.'\']; 
				}else if( isset( $'.$file.' ) ){ 
				echo $'.$file.'[0]->get_'.$champs.'(); 
				}
				?></textarea>
				';	
	
	}else if ( preg_match("/date/i", $type) ){

		$form = '
				<?php
				if( isset( $'.$file.' ) ){
					list($year,$month,$day) = explode(\'-\','.$file.'get_'.$champs.'());
				}else{
					list($year,$month,$day) = explode(\'-\', date(\'Y-m-d\') );
				}
				?>
				<select name="day">
				 	<option value="00"> -- </option>
					<?php 
					for( $i = 1; $i < 31; $i++ ){
						if( $i < 10 ) $i = \'0\'.$i;
					?>
						 <option value="<?php echo $i; ?>" <?php
						 if(isset($_POST[\'day\']) && $_POST[\'day\'] == $i){
							 echo \'selected="selected"\';
						 }else if(isset($day) && $day == $i){
							 echo \'selected="selected"\';
						 }
						 ?>><?php echo $i; ?></option>
					<?php
					}
				 	?>
				 </select>
				 <select name="month">
				 <option value="00"> -- </option>
				 <?php 
					for( $i = 1; $i < 12; $i++ ){
						if( $i < 10 ) $i = \'0\'.$i;
				 ?>
				 <option value="<?php echo $i; ?> <?php
				 if(isset($_POST[\'month\']) && $_POST[\'month\'] == $i){
				 	echo \'selected="selected"\';
				 }else if(isset($month) && $month == $i){
				 	echo \'selected="selected"\';
				 }
				 ?>"><?php echo $i; ?></option>
				 <?php
				 }
				 ?>
				 </select>
				 <select name="year">
					 <option value="0000"> ---- </option>
				 	<?php
				 	$current_year = date(\'Y\'); 
				 	$i = $current_year - 20;
				 	for($current_year; $current_year >= $i;$current_year--){
				 	?>
				 		<option value="<?php echo $current_year; ?>" <?php
				 		if(isset($_POST[\'year\']) && $_POST[\'year\'] == $current_year){
				 		echo \'selected="selected"\';
				 		}else if(isset($year) && $year == $current_year){
				 		echo \'selected="selected"\';
				 		}
						 ?>><?php echo $current_year; ?></option>
				 		<?php
				 	}
				 	?>
				 </select>'; 		
	}else{
		
		$form = '<input id="'.$champs.'" name="'.$champs.'" type="text" value="<?php if( isset($_POST[\''.$champs.'\']) ) $_POST[\''.$champs.'\'] ; else if( isset( $'.$file.' ) ) echo $'.$file.'[0]->get_'.$champs.'(); ?>">';

	}
	
	return $form;
}

?>