<?php 
include('model/services/config.php');
include_once('model/services/function.php');
$message = '';

if( isset( $_GET['message'] ) ){
	if( $_GET['message'] == 'insert' ){
		$message = 'L\'&eacute;l&eacute;ment a bien &eacute;t&eacute; ajout&eacute;.';
		$level = 'accept';
		$codeAlert = 'INSRT_OK';
	}
	else if( $_GET['message'] == 'update' ){
		$message = 'L\'&eacute;l&eacute;ment a bien &eacute;t&eacute; modifi&eacute;.';
		$level = 'accept';
		$codeAlert = 'UPDT_OK';
	}
	else if( $_GET['message'] == 'changeActive' ){
		$message = 'L\'&eacute;l&eacute;ment a bien &eacute;t&eacute; activ&eacute;.';
		$level = 'accept';
		$codeAlert = 'UPDT_ACT';
	}
	else if( $_GET['message'] == 'changeUnactive' ){
		$message = 'L\'&eacute;l&eacute;ment a bien &eacute;t&eacute; d&eacute;sactiv&eacute;.';
		$level = 'accept';
		$codeAlert = 'UPDT_UNACT';
	}
	else if( $_GET['message'] == 'delete' ){
		$message = 'L\'&eacute;l&eacute;ment a bien &eacute;t&eacute; supprim&eacute;.';
		$level = 'accept';
		$codeAlert = 'DLT_OK';
	}
	else if( $_GET['message'] == 'deleteConfirm' ){
		$message = 'Etes-vous s&ucirc;r de vouloir supprimer cet &eacute;l&eacute;ment.
					<br /><br /><a href="#" onclick="deleteElement('.$_GET['delete'].');">
					<img src="images/buttons/ok_button.gif" /></a>';
		$level = 'system';
		$codeAlert = 'DLT_CONF';
	}
	else if( $_GET['message'] == 'notfilled' ){
		$message = 'Vous devez remplir tous les champs.';
		$level = 'alert';
		$codeAlert = 'INSRT_FIELDS';
	}
}

include_once('model/services/message.inc.php');
include_once('membres_class.php');
?>
<div id="update_espace" class="hide_screen">
</div>
<?php

if( isset( $_GET['order'] ) && $_GET['order'] != 'undefined' ) $order = $_GET['order']; else $order = 'none';

$AllMembres = new Membres();
$membresArray = $AllMembres->AllMembres( $order );

if( isset( $membresArray ) ){

?>
<table class="table_border" width="100%" align="center" border="0" cellpadding="0" cellspacing="0">
	<tr>
		<?php 
		if( $order == 'NomMembreAsc' ) $headingNomClass = 'table_heading_active_asc'; else if( $order == 'NomMembreDesc' ) $headingNomClass = 'table_heading_active'; else $headingNomClass = 'table_heading';  
		if( $order == 'NomMembreAsc' ) $orderNomClass = 'NomMembreDesc'; else $orderNomClass = 'NomMembreAsc';
		if( $order == 'PrenomMembreAsc' ) $headingPrenomClass = 'table_heading_active_asc'; else if( $order == 'PrenomMembreDesc' ) $headingPrenomClass = 'table_heading_active'; else $headingPrenomClass = 'table_heading';  
		if( $order == 'PrenomMembreAsc' ) $orderPrenomClass = 'PrenomMembreDesc'; else $orderPrenomClass = 'PrenomMembreAsc';
		?>		
		<th class="table_heading" nowrap="nowrap" width="2%" align="left">#</th>
		<th class="<?php echo $headingPrenomClass; ?>" nowrap="nowrap" width="20%" align="left" id="PrenomMembre" onmouseout="headingnormal(this.id);" onmouseover="headingactive(this.id);"><a href="#" onclick="afficheListe( '', '<?php echo $orderPrenomClass; ?>' );">Pr&eacute;nom</a></th>
		<th class="<?php echo $headingNomClass; ?>" nowrap="nowrap" width="58%" align="left" id="NomMembre" onmouseout="headingnormal(this.id);" onmouseover="headingactive(this.id);"><a href="#" onclick="afficheListe( '', '<?php echo $orderNomClass; ?>' );">Nom</a></th>
		<th class="table_heading" nowrap="nowrap" width="10%" align="left">Acitf</th>
		<th class="table_heading_hide" nowrap="nowrap" width="5%" align="center">Modifier</th>
		<th class="table_heading_hide" nowrap="nowrap" width="5%" align="center">Supprimer</th>	
	</tr>	
	
	<?php
	$cpt = 0;
	foreach( $membresArray as $membreValue ){
		if(($cpt % 2) == 0){$lineClass = "table_rows1";}else{$lineClass = "table_rows2";}$cpt++;
		?>
		<tr class="table_border" id="<?php echo $cpt; ?>" onclick="tablechoose(this.id);" onmouseover="tablehighlight(this.id, '<?php echo $lineClass; ?>');" onmouseout="tablenormal(this.id, '<?php echo $lineClass; ?>')">
			<td class="<?php echo $lineClass;?>" nowrap="nowrap" width="2%" valign="top"><?php echo $cpt; ?></td>	
			<td class="<?php echo $lineClass;?>" width="20%" valign="top"><?php echo stripslashes( $membreValue['PrenomMembre'] ); ?></td>
			<td class="<?php echo $lineClass;?>" nowrap="nowrap" width="58%" valign="top"><?php echo stripslashes( $membreValue['NomMembre'] ); ?></td>
			<td class="<?php echo $lineClass;?>" nowrap="nowrap" width="10%" valign="top">
				<a href="#" onclick="changeActive( <?php echo $membreValue['IdMembre']; ?>, '<?php echo $membreValue['ActifMembre']; ?>' );">
				<?php if( $membreValue['ActifMembre'] == '1' ){ ?>
					<img border="0" src="images/icons/accept.gif" />
				<?php }else{ ?>
					<img border="0" src="images/icons/delete.gif" />
				<?php } ?>
				</a>
			</td>
			<td class="<?php echo $lineClass."_hide";?>" nowrap="nowrap" width="5%" valign="top" align="center"><a href="#" onclick="activeWindow( 'update_espace', <?php echo $membreValue['IdMembre']; ?> );"><img border="0" src="images/icons/pencil.gif" /></a></td>
			<td class="<?php echo $lineClass."_hide";?>" nowrap="nowrap" width="5%" valign="top" align="center"><a href="#" onclick="return deleteProcess( <?php echo $membreValue['IdMembre']; ?> )"><img border="0" src="images/icons/cross.gif" /></a></td>
		</tr>	
		<?php 
	}
	?>
</table>	
<?php 

}else{ 

?>
<table class="table_border" width="100%" align="center" border="0" cellpadding="0" cellspacing="0">

	<tr class="table_border" id="">
		<td nowrap="nowrap" valign="top">Aucun &eacute;l&eacute;ment</td>
	</tr>	
</table>
<?php	

}

?>	