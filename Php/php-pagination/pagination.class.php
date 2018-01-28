<?php
class Pagination{
	
	private $currentUrl;
	private $allResultsArray;
	private $page;
	private $nbResultsPerPage;
	private $nbPagesMaxToShow;
	
	private $nbResultsTotal;
	private $nbPages;
	private $numResult;
	private $numLimitResult;
	
	const _SEARCHNBRESULT = "result";
	const _SEARCHNBRESULTS = "results";
	const _SEARCHRESULTTO = "to";
	
	function __construct( $currentUrl, $allResultsArray, $page, $nbResultsPerPage = 10, $nbPagesMaxToShow = 5 ){
		
		$this->currentUrl = $currentUrl;
		$this->allResultsArray = $allResultsArray;
		$this->page = $page;
		$this->nbResultsPerPage = $nbResultsPerPage;
		$this->nbPagesMaxToShow = $nbPagesMaxToShow;
		
		$this->nbResultsTotal = count( $allResultsArray );
		$this->nbPages = ceil( $this->nbResultsTotal / $nbResultsPerPage );
		$this->numResult = $this->nbResultsPerPage * ( $page - 1 ) + 1;
		if( ( $this->nbResultsTotal - $this->numResult ) < $this->nbResultsPerPage ) $this->numLimitResult = ( $this->nbResultsTotal - $this->numResult ); else $this->numLimitResult = $this->nbResultsPerPage - 1;

	}
	
	public function displayPaginationHeader(){	
	
		$displayHTML = '';
		
		// Etat des réultats
		$displayHTML .= $this->nbResultsTotal.' ';
		if( $this->nbResultsTotal > 1 ) $displayHTML .= self::_SEARCHNBRESULTS; else $displayHTML .= self::_SEARCHNBRESULT; 
		$displayHTML .= ' ('.$this->numResult.' '.self::_SEARCHRESULTTO.' '.( $this->numResult + $this->numLimitResult ).')<br />';
		
		return $displayHTML;
	}
	
	
	public function displayPagination(){	
	
		$pagesToGo = floor( $this->nbPagesMaxToShow / 2 );
		if( $this->nbPages >= ( $this->page + $pagesToGo ) && $this->page > ( $this->nbPagesMaxToShow - $pagesToGo ) )
			$pageLimit = $this->page + $pagesToGo;
		else if( ( $this->page + $pagesToGo ) <= $this->nbPagesMaxToShow && $this->nbPages > $this->nbPagesMaxToShow )
			$pageLimit = $this->nbPagesMaxToShow;
		else
			$pageLimit = $this->nbPages;
		
		if( ( $this->nbPages - $pagesToGo ) < $this->page && $this->page > ( $this->nbPagesMaxToShow - $pagesToGo ) && $this->nbPagesMaxToShow < $this->nbPages ){
			$pageFrom = $this->nbPages - $this->nbPagesMaxToShow + 1;
		}else if( $this->page + $pagesToGo > $this->nbPagesMaxToShow && $this->nbPages > $this->nbPagesMaxToShow )
			$pageFrom = $this->page - $pagesToGo;
		else
			$pageFrom = 1;
			
		$displayHTML = '';
		
		if( $this->nbPages > 1 ){	
		
			if( $this->page == 1 && $this->nbPages > $this->nbPagesMaxToShow ) $displayHTML .= '&lt;&lt;&nbsp;&nbsp;';
			else if ( $this->nbPages > $this->nbPagesMaxToShow ) $displayHTML .= '<a href="'.$this->currentUrl.'?page=1">&lt;&lt;</a>&nbsp;&nbsp;';
					
			// Page precedente
			if( $this->page > 1 )	$displayHTML .= '<a href="'.$this->currentUrl.'?page='.( $this->page - 1 ).'">&lt;</a>&nbsp;&nbsp;';
			else $displayHTML .= '&lt;&nbsp;&nbsp';
	
		
			for( $i = $pageFrom; $i <= $pageLimit; $i++ ){
				if( $this->page == $i ) $displayHTML .= '&nbsp;<span class="pagination">'.$i.'</span>&nbsp;';
				else $displayHTML .= '&nbsp;<a class="pagination" href="'.$this->currentUrl.'?page='.$i.'">'.$i.'</a>&nbsp;';
			}
	
			// Page suivante
			if( $this->page < $this->nbPages ) $displayHTML .= '&nbsp;&nbsp;<a href="'.$this->currentUrl.'?page='.( $this->page + 1 ).'">&gt;</a>';
			else $displayHTML .= '&nbsp;&nbsp;&gt;';
		
			if( $this->page == $this->nbPages && $this->nbPages > $this->nbPagesMaxToShow ) $displayHTML .= '&nbsp;&nbsp;&gt;&gt;';
			else if( $this->nbPages > $this->nbPagesMaxToShow ) $displayHTML .= '&nbsp;&nbsp;<a href="'.$this->currentUrl.'?page='.$this->nbPages.'">&gt;&gt;</a>';
			
		}
		
		return $displayHTML;
	}


	public function displayPaginationResults(){	
	
		$resultsArray = array();
	
		for( $i = ( $this->numResult - 1 ); $i < ( $this->numResult + $this->numLimitResult ); $i++ ){
			
			$resultsArray[] = $this->allResultsArray[ $i ];
			
		}
		
		return $resultsArray;
	
	}
}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
<title>Pagination</title>
</head>
<body>



<br />
<?php

define("_URL", $_SERVER["PHP_SELF"]);
define("_NBRESULTSPERPAGE", "10");		//nb resultats par page
define("_NBPAGESMAXTOSHOW", "5");		//nb page a afficher

$resultsArray = array( 
'Element 1', 'Element 2', 'Element 3', 'Element 4', 'Element 5', 'Element 6', 'Element 7', 'Element 8', 'Element 9', 'Element 10', 
'Element 11', 'Element 12', 'Element 13', 'Element 14', 'Element 15', 'Element 16', 'Element 17', 'Element 18', 'Element 19', 'Element 20', 
'Element 21', 'Element 22', 'Element 23', 'Element 24', 'Element 25', 'Element 26', 'Element 27', 'Element 28', 'Element 29', 'Element 30', 
'Element 31', 'Element 32', 'Element 33', 'Element 34', 'Element 35', 'Element 36', 'Element 37', 'Element 38', 'Element 39', 'Element 40', 
'Element 41', 'Element 42', 'Element 43', 'Element 44', 'Element 45', 'Element 46', 'Element 47', 'Element 48', 'Element 49', 'Element 50', 
'Element 51', 'Element 52', 'Element 53', 'Element 54', 'Element 55', 'Element 56', 'Element 57', 'Element 58', 'Element 59', 'Element 60', 
'Element 61'
);



if( isset( $_GET['page'] ) ) $page = $_GET['page']; else $page = 1;



$pagination = new Pagination( _URL, $resultsArray, $page);

// Affichage des résultats
echo $pagination->displayPaginationHeader();
echo $pagination->displayPagination();

$results = $pagination->displayPaginationResults();
foreach( $results as $result ){
	
	echo '<br />'.$result;
	
}

?>
</body>
</html>