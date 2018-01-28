//function slideshow(){
$(document).ready( function(){
	slideshow();
});
$( window ).resize(function() {
	slideshow();
});


var slideshow = function(){
	
    var speedSlide = 500;				// Temps de l'animation millieme de seconde
    var waitSlide = 4000;				// Temps d'attente sur une slide
    var marginUL = 0; 					// margin initial du <ul> qui contient toutes les images
    var numCurrentSlide = 0;				// Index of the current slide shown
    var nbImage = $( 'div#slider ul li' ).length; 	// compte le nombre d'images dans un tableau array  	
    var sliderWidth = parseInt( $('div#slider').width() );
    var sliderHeight = parseInt( $('div#slider').css('height') );
    var widthUL = nbImage * sliderWidth;		
    $('div#slider ul').css( {width:widthUL} );
    $('div#slider ul li').css( {width:sliderWidth} );
    $('div.slideshow div#sliderzone').css({position:'relative'});
    $('div.slideshow div#sliderzone div#slider').css({position:'relative'});
	$('div.slideshow div#sliderzone div#slider li img').show();
	$('div.slideshow div#sliderzone div#slider li span.description').css({'display':'block'});
    $('div.slideshow div#sliderzone div#slider li').css({margin:'0', padding:'0', display:'block', float:'left', position:'relative'});
    $('div.slideshow div#sliderzone div#slider li img').css({display:'block'});
    $('div.slideshow div#sliderzone div#slider li img').css({display:'block', position:'absolute'});
    $('div.slideshow div#sliderzone img.arrow').css({position:'absolute', zIndex:'10', top:''+( sliderHeight / 2 +15)+'px', cursor:'pointer'});
	 $('div#slider ul').animate({marginLeft:0}, speedSlide);
	console.log( numCurrentSlide );

    var animateSlider = function(){
        if( marginUL < ( widthUL - sliderWidth ) ){
            $('div#slider ul').animate({marginLeft:'-=' + sliderWidth}, speedSlide);
            numCurrentSlide++;
            marginUL += sliderWidth;
        }else{
            $('div#slider ul').animate({marginLeft:'+=' + ( widthUL - sliderWidth )}, speedSlide);
            numCurrentSlide = 0;
            marginUL = 0;
        }
        highLightThumb();
    };

    var highLightThumb = function(){
        $( 'div#navSlider ul li' ).css( {'background-color':'rgb(221,221,221)','color':'rgb(221,221,221)'} );
        $( $( 'div#navSlider ul li' )[ numCurrentSlide ] ).css( {'background-color':'rgb(0,128,255)','color':'rgb(0,128,255)'} );
    };
	
	/*
    animateAuto = setInterval(function(){ // Animation automatique au demarrage 
        nimateSlider();
    }, waitSlide);
	*/
    $( 'img#arrow_left' ).click(
        function(){
            //clearInterval( animateAuto );
            if( marginUL > 0 ){
                $('div#slider ul').animate({marginLeft:'+=' + sliderWidth}, speedSlide);
                marginUL -= sliderWidth;
                numCurrentSlide--;
                highLightThumb();
            }
        }
    );
		
    $( 'img#arrow_right' ).click(
        function(){
            //clearInterval( animateAuto );
            animateSlider();				
        }
    );

    $( 'div#navSlider ul li' ).click(
        function(){
            //clearInterval( animateAuto );
            if ($(this).index() !== numCurrentSlide) {
				console.log($(this).index() + '!==' + numCurrentSlide);
                numCurrentSlide = $(this).index();
                var distanceToSet = sliderWidth * numCurrentSlide;
                var distanceToSlide = distanceToSet - marginUL;
                marginUL = distanceToSet;
                $('div#slider ul').animate({marginLeft: '-=' + distanceToSlide}, speedSlide);
                highLightThumb();
            }
        }
    );

    highLightThumb();

}

//window.onload = function(){slideshow();}
//window.onresize = function(){slideshow();}

