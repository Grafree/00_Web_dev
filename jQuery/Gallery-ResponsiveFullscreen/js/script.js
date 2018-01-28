var windowHeight = 0;
var bigImgWidthSpace = 0;
var thumbsContentHeight = 0;
var asideNav = 0;
var slidePosition = 0;
var slideInterval = null;


$(window).resize(function(){
    init();	
});

$(window).load(function(){
	
    init();

    /*  Clic sur vignette pour faire apparaitre la grande */
    $('main aside img').click(function(){
        
        $('img#grandeimage').hide();
        
        var imgHeight = $(this).height();
        var imgWidth = $(this).width();
        var imgRealWidth = windowHeight * imgWidth / imgHeight;
        
        if( bigImgWidthSpace < imgRealWidth )
        {
            var leftOffset = imgRealWidth / 2;
            $('img#grandeimage').css({'width':imgRealWidth, 'height':windowHeight, 'left':'50%', 'margin-left':'-'+leftOffset+'px', 'margin-top':'0px', 'top':'0px'});
        }
        else
        {
            var imgRealHeight = bigImgWidthSpace *  imgHeight / imgWidth;
            var topOffset = imgRealHeight / 2;
            $('img#grandeimage').css({'width':bigImgWidthSpace, 'height':imgRealHeight, 'top':'50%', 'margin-top':'-'+topOffset+'px', 'margin-left':'0px', 'left':'0px'});
        }
        $('img#grandeimage').attr('src', $(this).attr('src') );
        $('img#grandeimage').fadeIn();
    });


    /* Menu principal animé */
    $('nav ul li span').click(function(){

        if( !$(this).hasClass('selected') )
        {
            $('nav').css({'z-index':20});
            $('nav ul li span').removeClass('selected');
            $('nav ul li ul').slideUp();
            $(this).addClass('selected');		
            $(this).next().slideDown();
        }
        else{
            $('nav ul li span').removeClass('selected');
            $('nav ul li ul').slideUp();
            $('nav').css({'z-index':5});
        }
    });
    
    $('main menu img#arrowup').hover(function(){
        slideInterval = setInterval(function(){ slide('up'); }, 10);
    },function(){
        clearInterval( slideInterval );
    });
    
    $('main menu img#arrowdown').hover(function(){
        slideInterval = setInterval(function(){ slide('down'); }, 10);
    },function(){
        clearInterval( slideInterval );
    });

});


var slide = function( dir ){
    
    var distance = ( windowHeight - thumbsContentHeight - asideNav );
    if( slidePosition <= 0 && slidePosition >= distance ){
        if( dir === 'up' ) {
            slidePosition -= 5;
        }else{
            slidePosition += 5;
        }
        if( slidePosition < distance )
        {
            slidePosition = distance;
        }
        else if( slidePosition > 0 )
        {
            slidePosition = 0;
        }
        $('div#thumbs ul').css({'top':slidePosition+'px'});
    }
};


var init = function(){
    $('img#grandeimage').hide();
    
    windowHeight            = $(window).height();
    bigImgWidthSpace        = $('section').width();
    asideNav                = $('aside nav').outerHeight();  
    thumbsContentHeight     = $('div#thumbs ul').height();  
    slidePosition           = 0;
    
    $('div#thumbs ul').css({'top':slidePosition+'px'});
    $('main').height( windowHeight );
    $('section').height( windowHeight );	
    $('section img').height( windowHeight );	
    $('aside').height( windowHeight );
    
    $('div#thumbs').height( windowHeight - asideNav );
};