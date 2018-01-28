<?php

/**
 * Indique le nombre de resultats au total et pour la page courante
 * 
 * @param $AllResultsArray	[array]		Tableau de tous les résultats
 * @param $nbResultsPerPage	[int]		Nombre de resultats a afficher par page
 * @result 					[string]	HTML de la pagination
 */
function displayPaginationHeader( $AllResultsArray, $nbResultsPerPage = 10 ){	
	
	define("_SEARCHNBRESULT", "result");
	define("_SEARCHNBRESULTS", "results");
	define("_SEARCHRESULTTO", "to");		
	
	if( isset( $_GET['page'] ) ) $page = $_GET['page']; else $page = 1;
	$nbResultsTotal = count( $AllResultsArray );
	$nbPages = ceil( $nbResultsTotal / $nbResultsPerPage );
	$numResult = $nbResultsPerPage * ( $page - 1 ) + 1;
	if( ( $nbResultsTotal - $numResult ) < $nbResultsPerPage ) $numLimitResult = ( $nbResultsTotal - $numResult ); else $numLimitResult = $nbResultsPerPage - 1;

	$displayHTML = '';
	
	// Etat des réultats
	$displayHTML .= $nbResultsTotal.' ';
	if( $nbResultsTotal > 1 ) $displayHTML .= _SEARCHNBRESULTS; else $displayHTML .= _SEARCHNBRESULT; 
	$displayHTML .= ' ('.$numResult.' '._SEARCHRESULTTO.' '.( $numResult + $numLimitResult ).')<br />';
	
	return $displayHTML;
}


/**
 * Compose la numerotation d'une pagination
 * 
 * @param $currentUrl		[string]	L'adresse URL complete
 * @param $AllResultsArray	[array]		Tableau de tous les résultats
 * @param $nbResultsPerPage	[int]		Nombre de resultats a afficher par page
 * @param $nbPagesMaxToShow	[int]		Nombre de page a afficher dans la pagination
 * @result 					[string]	HTML de la pagination
 */
function displayPagination( $currentUrl, $AllResultsArray, $nbResultsPerPage = 10, $nbPagesMaxToShow = 5 ){	
	
	if( isset( $_GET['page'] ) ) $page = $_GET['page']; else $page = 1;
	$nbResultsTotal = count( $AllResultsArray );
	$nbPages = ceil( $nbResultsTotal / $nbResultsPerPage );

	
	$pagesToGo = floor( $nbPagesMaxToShow / 2 );
	if( $nbPages >= ( $page + $pagesToGo ) && $page > ( $nbPagesMaxToShow - $pagesToGo ) )
		$pageLimit = $page + $pagesToGo;
	else if( ( $page + $pagesToGo ) <= $nbPagesMaxToShow && $nbPages > $nbPagesMaxToShow )
		$pageLimit = $nbPagesMaxToShow;
	else
		$pageLimit = $nbPages;
	
	if( ( $nbPages - $pagesToGo ) < $page && $page > ( $nbPagesMaxToShow - $pagesToGo ) && $nbPagesMaxToShow < $nbPages ){
		$pageFrom = $nbPages - $nbPagesMaxToShow + 1;
	}else if( $page + $pagesToGo > $nbPagesMaxToShow && $nbPages > $nbPagesMaxToShow )
		$pageFrom = $page - $pagesToGo;
	else
		$pageFrom = 1;
		
	$displayHTML = '';
	
	if( $nbPages > 1 ){	
	
		if( $page == 1 && $nbPages > $nbPagesMaxToShow ) $displayHTML .= '&lt;&lt;&nbsp;&nbsp;';
		else if ( $nbPages > $nbPagesMaxToShow ) $displayHTML .= '<a href="'.$currentUrl.'?page=1">&lt;&lt;</a>&nbsp;&nbsp;';
				
		// Page precedente
		if( $page > 1 )	$displayHTML .= '<a href="'.$currentUrl.'?page='.( $page - 1 ).'">&lt;</a>&nbsp;&nbsp;';
		else $displayHTML .= '&lt;&nbsp;&nbsp';

	
		for( $i = $pageFrom; $i <= $pageLimit; $i++ ){
			if( $page == $i ) $displayHTML .= '&nbsp;<span class="pagination">'.$i.'</span>&nbsp;';
			else $displayHTML .= '&nbsp;<a class="pagination" href="'.$currentUrl.'?page='.$i.'">'.$i.'</a>&nbsp;';
		}

		// Page suivante
		if( $page < $nbPages ) $displayHTML .= '&nbsp;&nbsp;<a href="'.$currentUrl.'?page='.( $page + 1 ).'">&gt;</a>';
		else $displayHTML .= '&nbsp;&nbsp;&gt;';
	
		if( $page == $nbPages && $nbPages > $nbPagesMaxToShow ) $displayHTML .= '&nbsp;&nbsp;&gt;&gt;';
		else if( $nbPages > $nbPagesMaxToShow ) $displayHTML .= '&nbsp;&nbsp;<a href="'.$currentUrl.'?page='.$nbPages.'">&gt;&gt;</a>';
		
	}
	
	return $displayHTML;
}


/**
 * Compose les résultats pour chaque page
 * 
 * @param $AllResultsArray	[array]		Tableau de tous les résultats
 * @param $nbResultsPerPage	[int]		Nombre de resultats a afficher par page
 * @param $nbPagesMaxToShow	[int]		Nombre de page a afficher dans la pagination
 * @result 					[array]		Les resultats pour la page courante
 */
function displayPaginationResults( $AllResultsArray, $nbResultsPerPage = 10, $nbPagesMaxToShow = 5 ){	

	if( isset( $_GET['page'] ) ) $page = $_GET['page']; else $page = 1;
	$nbResultsTotal = count( $AllResultsArray );
	$nbPages = ceil( $nbResultsTotal / $nbResultsPerPage );
	$numResult = $nbResultsPerPage * ( $page - 1 ) + 1;
	if( ( $nbResultsTotal - $numResult ) < $nbResultsPerPage ) $numLimitResult = ( $nbResultsTotal - $numResult ); else $numLimitResult = $nbResultsPerPage - 1;

	$resultsArray = array();

	for( $i = ( $numResult - 1 ); $i < ( $numResult + $numLimitResult ); $i++ ){
		
		$resultsArray[] = $AllResultsArray[ $i ];
		
	}
	
	return $resultsArray;

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

echo displayPaginationHeader( $resultsArray );

// Affichage des résultats
echo displayPagination( _URL, $resultsArray );

$results = displayPaginationResults( $resultsArray );
foreach( $results as $result ){
	
	echo '<br />'.$result;
	
}

?>
</body>
</html>