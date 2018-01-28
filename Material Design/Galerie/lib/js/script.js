$(document).ready(function()
{
    $('figure>nav>q').click(function()
    {
        if( $(this).parent('nav').hasClass('open') )
        {
           $(this).parent('nav').removeClass('open');
           $(this).nextAll('i.favorite:first').animate({top:0});
           $(this).nextAll('i.launch:first').animate({top:0});
        }
        else
        {
           $(this).parent('nav').addClass('open');
           $(this).nextAll('i.favorite:first').animate({top:80});
           $(this).nextAll('i.launch:first').animate({top:150});
        }
    });

    $('figure').hover(function(){
        $(this).addClass('hover');
        }, function(){
        $(this).removeClass('hover');
    });  

    $('figure>nav>i.favorite').click(function()
    {
        var element = $(this).parent().parent();


        if( element.hasClass('selected') )
        {
            hideIcons( element );
        }
        else
        {
            element.addClass('selected');
        }

    }); 


    $('figure>nav>i.launch').click(function()
    {
        openOverlay( $(this).parent().parent() );
    });
    
    $('header>nav>i.menu').click(function(){
        
        if( $(this).hasClass('open') )
        {
            $(this).removeClass('open');
            $('header>nav>i:not(.menu)').animate({top:0}, 500, function(){
                $('header>nav>i:not(.menu)').hide();
            });
        }
        else
        {
            $(this).addClass('open');
            var n = 0;
            $('header>nav>i:not(.menu)').show();
            $('header>nav>i:not(.menu)').each(function(){
                $(this).animate({top:(n+=70)});
            });
        }

    });

});


var hideIcons = function( element )
{
    element.find('i').animate({top:0});
    element.removeClass('selected');
    element.find('nav').removeClass('open');
};

var openOverlay = function( element )
{    
    var windowHeight    = $(window).height();
    var windowWidth     = $(window).width();
    
    var windowBuffer    = 60; /* Used to have a window padding */ 

    $('body').append('<div id="overlay" style="height:0px;"></div>');

    var scrollTop = $('body').scrollTop();

    var imgLmt              = element.find('img');
    var imgSrc              = imgLmt.attr('src');
    var leftOffset          = element.offset().left;
    var topOffset           = element.offset().top;
    var imgTopOffset        = topOffset - scrollTop;

    var imgLmtWidth         = imgLmt.width();
    var imgLmtWidthExpand   = imgLmtWidth * 0.1;
    var imgLmtHeight        = imgLmt.height();
    var imgLmtHeightExpand  = imgLmtHeight * 0.1;

    $('body').append('<img src="'+imgSrc+'" />');

    var imgWidth            = $('body>img').width();
    var imgHeight           = $('body>img').height();
    
    if( windowHeight - windowBuffer < imgHeight )
    {
        var imgNewHeight = windowHeight - windowBuffer;
        imgWidth = imgNewHeight / imgHeight * imgWidth;
        imgHeight = imgNewHeight;
    }
    else if( windowWidth - windowBuffer < imgWidth )
    {
        var imgNewWidth = windowWidth - windowBuffer;
        imgHeight = imgNewWidth / imgWidth * imgHeight;
        imgWidth = imgNewWidth; 
    }
    
    
    var imgWidthOffsetLeft  = (windowWidth-imgWidth)/2;
    var imgWidthOffsetRight = (windowHeight-imgHeight)/2;
    
    element.css({opacity:0});
    $('body>img').css({left:leftOffset, top:imgTopOffset, height:imgLmtHeight, width:imgLmtWidth, opacity:1});

    $('body>img').animate({boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', width:( imgLmtWidth + imgLmtWidthExpand ), height:imgLmtHeight, left:leftOffset - ( imgLmtWidthExpand / 2 ), top:imgTopOffset - ( imgLmtHeightExpand / 2 ) }, 500, function()
    {
        $('body>img').animate({width:imgWidth, height:imgHeight, left:imgWidthOffsetLeft, top:imgWidthOffsetRight}, 1000 );

        $('body>div#overlay').animate({width:'100%', height:windowHeight}, 500, function()
        {
            $('body>img').animate({boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'});
            
            $('body').append('<i class="materitalicon close"></i>');
            $('body>i.close').css({width:0, height:0, left:(imgWidthOffsetLeft + imgWidth),  top:imgWidthOffsetRight });

            $('body>i.close').animate({width:60, height:60, left:(imgWidthOffsetLeft + imgWidth - 30),  top:(imgWidthOffsetRight - 30) }, 500, function()
            {
                $('body>i.close').html('close');
            });

            $('body>i.close').click(function()
            {
                closeOverlay();
                hideIcons( element );
            });

            $('div#overlay').click(function( event ){
                if( $( event.target ).is( "div#overlay" ) )
                {
                    closeOverlay();
                    hideIcons( element );
                }
            });
        });
    });
    
    
    var closeOverlay = function(){

        var scrollUpdateTop = $('body').scrollTop() - scrollTop;

        $('body>i.close').html('');
        $('body>i.close').animate({width:0, height:0, left:imgWidthOffsetLeft, top:imgWidthOffsetRight}, 1000, function(){

            $('body>div#overlay').animate({width:0, height:0}, 500, function(){
                $('div#overlay').remove();
            });
            $('body>img').animate({top:( imgTopOffset - scrollUpdateTop ), left:leftOffset, height:imgLmtHeight, width:imgLmtWidth}, 1000, function(){
                $('body>img').remove();
                element.css({opacity:1});
            });
            $('body>i').remove();
        });

    };
};