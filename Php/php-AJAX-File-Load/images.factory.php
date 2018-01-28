<?php

function imagesFindAll() {
	
	$imagesFiles = glob( 'images/upload/*.jpg' );
	
	return $imagesFiles;
	
}

function resizeImagetoJPG($sourcefile, $endfile, $thumbwidth, $thumbheight, $quality){
	
	$img = imagecreatefromjpeg($sourcefile);
	$width = imagesx( $img );
	$height = imagesy( $img );
	
	if ($width > $height) { // Horizontal
	    $newwidth = $thumbwidth;
	    $newheight = $thumbheight;
	}else { 					// Vertical
	    $newheight = $thumbheight;
	    $divisor = $height / $thumbheight;
	    $newwidth = floor( $width / $divisor );
	}
	
	$tmpimg = imagecreatetruecolor( $newwidth, $newheight ); // Create a new temporary image.
	
	imagecopyresampled( $tmpimg, $img, 0, 0, 0, 0, $newwidth, $newheight, $width, $height ); // Copy and resize old image into new image.
	
	imagejpeg( $tmpimg, $endfile, $quality); // Save thumbnail into a file.
	
	imagedestroy( $tmpimg); // release the memory
	imagedestroy( $img );
	
}


function lowerCasetext( $text ){
	$accents = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûýýþÿŔŕ.?!$=()/&%*[]{}' ";
	$sans = "aaaaaaaceeeeiiiidnoooooouuuuybsaaaaaaaceeeeiiiidnoooooouuuyybyRr_________________";	
    $text = utf8_decode( $text );    
    $text = strtr( $text, utf8_decode( $accents ), $sans );
    $text = strtolower($text);
    return utf8_encode($text); 
}


function imageExt( $type_file ){
	
	if($type_file == 'image/gif'){
    	$ext = 'gif';
    }elseif($type_file == 'image/jpeg'){
    	$ext = 'jpg';
    }elseif($type_file == 'image/jpg'){
    	$ext = 'jpg';
    }elseif($type_file == 'image/png'){
    	$ext = 'png';
    }else{
    	$ext = 'noext';
    }
	
	return $ext;
}

function insertproduit_images() {	
	
	if ( !empty($_FILES['ImageFile'] ) && $_FILES['ImageFile']['name'] != '' ){
	
		$path = "images/upload/";
	   	$file = $weight = $tmp = '';
	    $size_max = _PRODUITS_MAX_WEIGHT;
	    $width_max = _PRODUITS_MAX_WIDTH;
	    $height_max = _PRODUITS_MAX_HEIGHT;
	    $mime_type='/gif|png|jpeg|jpg/';
	    $size_max_ko=$size_max/1024;

		$file = $_FILES['ImageFile']['name'];
	    $weight = $_FILES['ImageFile']['size'];
	    $tmp = $_FILES['ImageFile']['tmp_name'];    
	    $type_file = $_FILES['ImageFile']['type'];
        $ext = imageExt( $type_file );

	    if( $ext != 'noext' ){
	        $size_tmp = getimagesize( $tmp );
			$ImgWidth = $size_tmp[0];
			$ImgHeight = $size_tmp[1];
			
	        if ( ( $weight < $size_max ) ){
	        		
				if( $ImgWidth > $ImgHeight ){
					
					$ImageProduitImage = lowerCasetext( $file ).'.'.$ext;
				
					if( file_exists( $path.$ImageProduitImage ) ) $ImageProduitImage = lowerCasetext( $file ).'-'.time().'.'.$ext;
					
					if( move_uploaded_file( $tmp, $path.$ImageProduitImage ) ){
						
						chmod( $path.$ImageProduitImage, 0777 );
				
						resizeImagetoJPG( $path.$ImageProduitImage, $path.$ImageProduitImage, $width_max, $height_max, 60 );

						return 'ok';
					}else{
						return 'problemeimage';
					}
				}else{
					return 'imagetaille';	
				}
			}else{
				return 'imagepoids';	
			}
		}else{
			return 'format';	
		}
	}else{
		return 'champvide';	
	}
}


function deleteImage( $imageFile ) {

	if( file_exists( $imageFile ) ){
		unlink( $imageFile );
	}

	return true;
}
?>