var scripts = function()
{
    setTimeout(function(){ document.querySelector('body').classList.remove('intro'); }, 2000);
    
    let makeAppearElements = document.querySelectorAll( '.makeappear' );
    
    Array.prototype.forEach.call( makeAppearElements, function( makeAppearElement )
    {
        setTimeout(function(){ makeAppearElement.style.opacity = 1; }, 50);
        
        let menuWidth = document.querySelector( 'footer ul' ).offsetWidth;
        
        let menuRightOffset = document.querySelector( 'footer ul' ).style;
        
        document.querySelector( 'header span' ).style.left = 'calc( 100% - ' + (menuWidth + 40) + 'px)';  
    });
    
    
    /* Menu burger */
    document.querySelector('footer button').onclick = function()
    {
        if( document.querySelector('body').classList.contains( 'openmenu' ) )
        {
            document.querySelector('body').classList.remove( 'openmenu' );
        }
        else
        {
            document.querySelector('body').classList.add( 'openmenu' );
        }        
    };
    
    
    /* Menu animation when burger button is clicked */
    let lisMenu = document.querySelectorAll( 'footer > ul > li > a' );

    Array.prototype.forEach.call( lisMenu, function( item )
    {
        item.onclick = function( e )
        {
            e.preventDefault();
            
            let href = this.href;
            
            let element = getPosition( this );
            
            let span = document.createElement('span');
            
            span.id = 'newtitle';
            
            span.style.top = element.y + 'px';
            
            span.style.left = element.x + 'px';
                        
            document.querySelector('body').appendChild( span );
            
            document.querySelector('body').classList.add( 'hidemenu' );
            
            let spantitle = document.querySelector('body > #newtitle');
            
            spantitle.innerHTML = this.innerHTML;
            
            this.style.visibility = 'hidden';
            
            setTimeout(function(){ spantitle.style.top = '59px'; }, 50);
            
            setTimeout(function(){ window.location.href = href; }, 1500);
            
        };
    });
    
};



window.onload = function()
{
    scripts();
};



let getPosition = function( el )
{
    var xPos = 0;
    var yPos = 0;

    while( el )
    {
        if (el.tagName == "body")
        {
            var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
            
            var yScroll = el.scrollTop || document.documentElement.scrollTop;

            xPos += (el.offsetLeft - xScroll + el.clientLeft);
            
            yPos += (el.offsetTop - yScroll + el.clientTop);
        } 
        else 
        {
            xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            
            yPos += (el.offsetTop - el.scrollTop + el.clientTop);

        }
        
        el = el.offsetParent;
    }
  
    return {
        x: xPos,
        y: yPos
    };
};