var scripts = function()
{
    checkWindowSize();
    
    Array.prototype.forEach.call( document.querySelectorAll('article h2'), function( title )
    {
        title.onclick = function()
        {
            this.querySelector('img').src = 'images/checkbox-checked.svg';
        }
    });
    
    
    document.querySelector('header button').onclick = function()
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
    
    

    let lisMenu = document.querySelectorAll( 'aside > ul > li > a' );

    Array.prototype.forEach.call( lisMenu, function( item )
    {
        item.onclick = function( e )
        {
            e.preventDefault();
            
            let activeElement = null;
            
            if( this.parentNode.querySelector('ul') )
            {
                if( document.querySelector( 'aside > ul > li.active' ) )
                {
                    activeElement = document.querySelector( 'aside > ul > li.active' );
                    
                    activeElement.querySelector( 'ul' ).style.height = '0px';

                    activeElement.classList.remove( 'active' );
                }

                if( activeElement !== item.parentNode )
                {
                    let ulH = item.parentNode.querySelector( 'ul' ).scrollHeight;
                    
                    item.parentNode.querySelector( 'ul' ).style.height = ulH + "px";

                    item.parentNode.classList.add( 'active' );
                }
            }
        }
    });
    
};


let checkWindowSize = function()
{
    if( window.matchMedia("(min-width: 700px)").matches )
    {
        document.querySelector('body').classList.remove( 'openmenu' );
    }
};



window.onload = function()
{
    scripts();
}

window.onscroll = function()
{
    let scrollFromTop = window.pageYOffset || document.documentElement.scrollTop;

    if( scrollFromTop > 100 )
    {
        document.querySelector('body').classList.add( 'fixed' );
    }
    else
    {
        document.querySelector('body').classList.remove( 'fixed' );
    }
};

window.onresize = function()
{
    checkWindowSize();
};
