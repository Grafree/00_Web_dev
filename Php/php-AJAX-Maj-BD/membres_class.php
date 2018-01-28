<?php

class Membres{
	
	private $IdMembre = array();
	private $NomMembre = array();
	private $PrenomMembre = array();
	private $GenreMembre = array();
	private $ActifMembre = array();
	private $CommentMembre = array();
	private $nbRows = 0;


	public function get_IdMembre(){ return $this->IdMembre; }
	public function get_NomMembre(){ return $this->NomMembre; }
	public function get_PrenomMembre(){ return $this->PrenomMembre; }
	public function get_GenreMembre(){ return $this->GenreMembre; }
	public function get_ActifMembre(){ return $this->ActifMembre; }
	public function get_CommentMembre(){ return $this->CommentMembre; }

	public function AllMembres( $order ){
		
	
		if( $order == 'NomMembreDesc' ){
			$orderBy = ' ORDER BY NomMembre DESC'; 
		}else if( $order == 'NomMembreAsc' ){
			$orderBy = ' ORDER BY NomMembre ASC'; 
		}else if( $order == 'PrenomMembreDesc' ){
			$orderBy = ' ORDER BY PrenomMembre DESC'; 
		}else if( $order == 'PrenomMembreAsc' ){
			$orderBy = ' ORDER BY PrenomMembre ASC'; 
		}else{
			$orderBy = '';
		}
	
		$sql = 'SELECT * FROM membres'.$orderBy;
		$result = mysql_query( $sql );
		while( $row = mysql_fetch_assoc( $result ) ){
			$this->IdMembre[] = $row['IdMembre'];
			$this->NomMembre[] = $row['NomMembre'];
			$this->PrenomMembre[] = $row['PrenomMembre'];
			$this->GenreMembre[] = $row['GenreMembre'];
			$this->ActifMembre[] = $row['ActifMembre'];
			$this->CommentMembre[] = $row['CommentMembre'];				
		}
		
		$this->nbRows = mysql_num_rows( $result );
		
		return $this->MembresArray();
	}
			
			
	public function MembreFromId( $id ){
		
		$sql = 'SELECT * FROM membres WHERE IdMembre =\''.$id.'\'';
		$result = mysql_query( $sql );
		while( $row = mysql_fetch_assoc( $result ) ){
			$this->IdMembre[] = $row['IdMembre'];
			$this->NomMembre[] = $row['NomMembre'];
			$this->PrenomMembre[] = $row['PrenomMembre'];	
			$this->GenreMembre[] = $row['GenreMembre'];
			$this->ActifMembre[] = $row['ActifMembre'];
			$this->CommentMembre[] = $row['CommentMembre'];			
		}			
		
		$this->nbRows = mysql_num_rows( $result );
		
		return $this->MembresArray();
	}
	
	
	public function MembresArray(){
		
		$MembresArray = array();
		
		for( $i = 0; $i < $this->nbRows; $i++ ){
				$array = array(
					'IdMembre' => $this->IdMembre[$i], 
					'PrenomMembre' => $this->PrenomMembre[$i], 
					'NomMembre' => $this->NomMembre[$i],  
					'GenreMembre' => $this->GenreMembre[$i],  
					'ActifMembre' => $this->ActifMembre[$i],  
					'CommentMembre' => $this->CommentMembre[$i], 
				);					
				$MembresArray[] = $array;
		}
		
		if( count( $MembresArray ) > 0 )
			return $MembresArray;
		else
			return NULL;
	}

}
  
?>