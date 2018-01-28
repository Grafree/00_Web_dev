<script language="JavaScript" type="text/javascript">
</script>
<?php
include('model/services/config.php');
include_once('model/services/function.php');
include_once('membres_class.php');
$message = '';
if( isset( $_GET['message'] ) ){
	if( $_GET['message'] == 'notfilled' ){
		$message = 'Vous devez remplir les champs.';
		$level = 'alert';
		$codeAlert = 'UPDT_FIELDS';
	}
	
}
include_once('model/services/message.inc.php');

$updateSession = false;

if( isset( $_GET['membre'] ) ){

	$updateSession = true;

	$membre = new Membres();
	
	$membreId = $_GET['membre'];
	
	$membreValue = $membre->MembreFromId( $membreId );	
	
}

?>
<form name="insert" method="post">


<table align="center" class="table_border" width="100%" border="0" cellpadding="3" cellspacing="0">
	<tr>
		<th class="rightside_heading" nowrap="nowrap" halign="left" colspan="4">Membres</th>
	</tr>
	<tr>
		<td height="15" colspan="4"></td>
	</tr>	
	
	<tr>
		<td width="10%" class="table_rows" nowrap="nowrap" valign="top">
		</td>
		<td width="90%" class="table_rows_right" colspan="3">
			<select id="GenreMembre<?php if( $updateSession ) echo '_update'; ?>" name="GenreMembre">
				<option value="M"<?php if(isset( $_GET['GenreMembre'] ) && $_GET['GenreMembre'] == 'M' ) echo ' selected="selected"'; else if( isset( $membreValue ) && $membreValue[0]['GenreMembre'] == 'M' ) echo ' selected="selected"'; ?>>M.</option>
				<option value="F"<?php if(isset( $_GET['GenreMembre'] ) && $_GET['GenreMembre'] == 'F' ) echo ' selected="selected"'; else if( isset( $membreValue ) && $membreValue[0]['GenreMembre'] == 'F' ) echo ' selected="selected"'; ?>>Mme</option>
				
			</select>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<input id="ActifMembre<?php if( $updateSession ) echo '_update'; ?>" name="ActifMembre" type="checkbox" value="1"<?php if(isset( $_GET['ActifMembre'] ) && $_GET['ActifMembre'] == '1' ) echo ' checked="checked;"'; else if( isset( $membreValue ) && $membreValue[0]['ActifMembre'] == '1' ) echo ' checked="checked;"'; ?> /> Actif
		</td>
	</tr>	
	
	<tr>
		<td width="10%" class="table_rows" nowrap="nowrap" valign="top">
			Nom : 
		</td>

		<td width="40%" class="table_rows_right" valign="top">
			<input id="NomMembre<?php if( $updateSession ) echo '_update'; ?>" name="NomMembre" type="text" style="width:45%;" value="<?php if(isset( $_GET['NomMembre'] ) ) echo $_GET['NomMembre']; else if( isset( $membreValue ) ) echo stripslashes( $membreValue[0]['NomMembre'] ); ?>" />
		</td>
		<td width="10%" class="table_rows" nowrap="nowrap" valign="top">
			Pr&eacute;nom : 
		</td>

		<td width="40%" class="table_rows_right" valign="top">
			<input id="PrenomMembre<?php if( $updateSession ) echo '_update'; ?>" name="PrenomMembre" type="text" style="width:45%;" value="<?php if(isset( $_GET['PrenomMembre'] ) ) echo $_GET['PrenomMembre']; else if( isset( $membreValue ) ) echo stripslashes( $membreValue[0]['PrenomMembre'] ); ?>" />
		</td>
	</tr>

		
	<tr>
		<td width="10%" class="table_rows" nowrap="nowrap" valign="top">
			Commentaire : 
		</td>

		<td width="90%" class="table_rows_right" colspan="3">
			<textarea id="CommentMembre<?php if( $updateSession ) echo '_update'; ?>" name="CommentMembre" style="width:80%;"><?php if(isset( $_GET['CommentMembre'] ) ) echo $_GET['CommentMembre']; else if( isset( $membreValue ) ) echo stripslashes( $membreValue[0]['CommentMembre'] ); ?></textarea>
		</td>
	</tr>

	<tr>
		<td width="10%"></td>
		<td width="40%" colspan="3">
			<div class="espace_bouton">
				<?php if( isset( $membreValue ) ) { ?>
					<a href="#" onclick="closeWindow('update_espace');"><img class="bouton" src="images/buttons/cancel_button.gif" border="0"></a>
					<a href="#" onclick="insertElement('update', <?php echo $membreId; ?>);"><img class="bouton" src="images/buttons/ok_button.gif" border="0" /></a>	
				<?php }else{ ?>
					<a href="#" onclick="closeWindow('insert_espace');"><img class="bouton" src="images/buttons/cancel_button.gif" border="0"></a>
					<a href="#" onclick="insertElementPost('insert', 0 );"><img class="bouton" src="images/buttons/ok_button.gif" border="0" /></a>		
				<?php } ?>
			</div>
		</td>
	</tr>

</table>
	
</form>