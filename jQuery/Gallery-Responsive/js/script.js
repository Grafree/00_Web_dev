$(document).ready(function(){
	
	resizeNav();
	
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
	$('main aside img').hover(function(){
		$('img#grandeimage').hide();
		$('img#grandeimage').attr('src', $(this).attr('src') );
		$('img#grandeimage').fadeIn();
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
	
	resizeNav();
	
});


var resizeNav = function(){
	$('nav').height( $(window).height() );		
}