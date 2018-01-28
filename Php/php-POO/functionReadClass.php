<?php
/*
 * Indique les propriétés et méthodes publiques d'une classe
 * 	@param [object] $ClassToCheck
 * 	@return [string] Affichage formaté d'un tableau des propriétés et méthodes
 */
function ClassToUML( $ClassToCheck ){
	
	$classContent = '<div style="width:300px; font-family:Arial; font-size:11px; border:1px solid #bbb;">';
	$classContent .= '<div style="width:292px; padding:10px 0px; font-weight:bold; text-align:center; background-color:#f00; color:#fff; border:4px solid #fff;">';
		$classContent .= 'Classe : '.get_class( $ClassToCheck );
	$classContent .= '</div>';
	
	$classContent .= '<div style="width:280px; padding:5px; border:1px solid #ddd; margin:0px 4px 4px 4px;">';
		$vars = get_class_vars( get_class( $ClassToCheck ) );
		if( count( $vars ) > 0 ){
			foreach( $vars as $var => $key  ){
				$classContent .= $var.' ['.TypeVariable( $key ).']<br />';
			}
		}else{
			$classContent .= '<em>Il n\'existe aucune propriété ou toutes sont protected ou private</em>';
		}
	$classContent .= '</div>';
	
	$classContent .= '<div style="width:280px; padding:5px; border:1px solid #ddd; margin:0px 4px 4px 4px;">';
		$methods = get_class_methods( $ClassToCheck );
		if( count( $methods ) > 0 ){
			foreach( $methods as $method ){
				$classContent .= $method.'()<br />';
			}
		}else{
			$classContent .= '<em>Il n\'existe aucune méthode ou toutes sont protected ou private</em>';
		}
	$classContent .= '</div>';
	
	$classContent .= '</div>';
	
	return $classContent;

}

function TypeVariable( $variable ){
	
	if( is_int( $variable ) ){
		return 'Integer';
	}else if( is_integer( $variable ) ){
		return 'Integer';
	}else if( is_float( $variable ) ){
		return 'Float';
	}else if( is_bool( $variable ) ){
		return 'Boolean';
	}else if( is_string( $variable ) ){
		return 'String';
	}else if( is_object( $variable ) ){
		return 'Object';
	}else if( is_array( $variable ) ){
		return 'Array';
	}else if( is_null( $variable ) ){
		return 'Null';
	}
	
}
?>