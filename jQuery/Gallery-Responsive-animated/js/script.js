$(window).load(function(){
	
    initNav();

    /* Agrandir l'espace de navigation */
    $('nav').click(function(e){		
        e.stopPropagation();

        if(e.target === this)
        {
            if( $(this).hasClass('open') || $(this).css('left') === '0px' )
            {
                $(this).removeClass('open');
                $(this).animate({'left':-220}, 200);
            }
            else
            {
                $(this).addClass('open');
                $(this).animate({'left':0}, 200);
            }
        }
    });


    /*  Clic sur vignatte pour faire apparaitre la grande */
    $('main aside img').click(function(){
        if( !$(this).hasClass('selected') )
        {
            var thumb = $(this);
            if( $('img.animatedimg').length > 0 )
            {
                $('img.animatedimg').animate({'opacity':0.1}, 400, function(){
                    $('img.animatedimg').remove();
                    animateThumbToImg( thumb );
                });
            }
            else{
                animateThumbToImg( thumb );
            }
            
            $('main aside img').animate({'opacity':1}, 300, function(){
                
                $('main aside img').removeClass('selected');

                thumb.addClass('selected');
                thumb.css({'opacity':0.6});
                
            });
        }
    });

    /* Menu principal animé */
    $('nav ul li span').click(function(){

        if( !$(this).hasClass('selected') )
        {
            $('nav ul li span').removeClass('selected');
            $('nav ul li ul').slideUp();
            $(this).addClass('selected');		
            $(this).next().slideDown();
        }
    });

});

$(window).resize(function(){
	
    initNav();
	
});


var imgXoffset;
var imgYoffset;
var imgHeight;
var imgWidth;
var thumbs = [];

var initNav = function(){
    $('img.animatedimg').remove();
    $('nav').height( $(window).height() );
    imgXoffset = $('img#grandeimage').position().left;
    imgYoffset = $('img#grandeimage').position().top;
    imgHeight = $('img#grandeimage').height();
    imgWidth = $('img#grandeimage').width();
};

var animateThumbToImg = function( obj )
{
    var imgProp = obj.height() / obj.width();

    $('body').prepend('<img class="animatedimg" src="'+obj.attr('src')+'" style="position:absolute; top:'+obj.position().top+'px; left:'+obj.position().left+'px; height:'+obj.height()+'px; width:'+obj.width()+'px;" />');

    $('img.animatedimg').animate({'left':imgXoffset, 'top':imgYoffset, 'width':imgWidth, 'height': (imgWidth * imgProp)});
}