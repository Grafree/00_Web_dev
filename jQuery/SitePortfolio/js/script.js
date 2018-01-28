// JavaScript Document

var headerHeight = null;    // Hauteur de l'entete => Sert a definir la distance � laquelle l'objet doit rester bloque
var limitAbout = 300;       // Limite en nombre de px que la rubrique About peut descendre
var scrollTop = null;

var speedFilter = 500;      // Vitesse de l'animation des vignettes en milliseconde
var curFilter = 'all';
var conT = 0;
var conL = 0;
var conH = 0;
var nCol = 0;
var posT = [];
var posL = [];

$(document).ready( function(){	
	
    init();
    
    //==== Menu (premier niveau) ====//
    $('ul#navigation > li a').not("ul#navigation li ul a").click(function(event){

        event.preventDefault();                 // Supprime l'action de rechargement de la page lors du clic sur la balise <a>
        $('section#realisation').slideUp(1500);     // Cache le contenant des details des realisations

        if( $($(this).parent().find('.sousmenu')).length > 0 ){
            $(this).parent().find('ul.sousmenu li a#'+curFilter).parent().addClass( 'actif' );
            $(this).parent().find('.sousmenu').show();	
        }else{
            $('.sousmenu').hide();
        }

        if( $(this).attr('href') === '#about_content'){
            scrollTop = 0;
        }else{
            scrollTop = $($(this).attr('href')).offset().top - headerHeight;
        }
        $('html, body').stop().animate( { scrollTop: ( scrollTop ) }, 1500);

        $('nav ul#navigation > li').removeClass( 'actif' );
        $(this).parent().addClass( 'actif' );

    });
    
 
    //==== Menu (second niveau - filtre) ====//
    $('ul.sousmenu > li a').click(function(event){
        event.preventDefault(); 
        curFilter = $(this).attr('href');
        if($('section#realisation').is(":visible")){ // Ferme la realisation, puis effectue le filtre
            $('section#realisation').slideUp(1500, function(){
                animGallery();
            }); 
        } else{
            animGallery();
        }   
    });
    
    
    //==== About ====//
    $(window).scroll(function() {
        var scrollT = $(document).scrollTop();
        if( scrollT >= limitAbout ){
                var pos = ( scrollT - limitAbout );
                $('section.contenu_about').css({'top':pos });  // Change la valeur de la position top du bloc <section class="contenu_about">
        }else{
                $('section.contenu_about').css({'top':0 });
        }
    });	


    //==== Vignettes ====//	
    $('ul#vignettes li').hover(
        function(){
            $(this).find('.bkg').fadeIn(200).animate({'opacity':'0.9'}, 0);
            $(this).find('.texte').fadeIn(0);
            $(this).css({'cursor':'pointer'});
        },
        function(){
            $(this).find('.bkg').fadeOut(400);
            $(this).find('.texte').fadeOut(100);
        }
    );		

    $('ul#vignettes li').click(
        function(){
            $('section#realisation div').hide();
            $('section#realisation div').eq( $(this).index() ).show();
            $('section#realisation').slideDown( 1500 );
            $('html, body').stop().animate( { scrollTop: ( $('#realisation').offset().top - headerHeight ) }, 1500);
            $('#portfolio ul.sousmenu').show();	
        }
    );	
});	


var init = function(){

    $('html, body').stop().animate( { scrollTop: 0 }, 1500);
    
    // bloc01 //
    setTimeout(function(){  $('.slide_txt').slideDown(200);  }, 500);
    setTimeout(function(){  $('.slide_image').slideDown(500);  }, 2000);
    setTimeout(function(){  $('div#conteneur_blocs dt').slideDown(100);  }, 1000);
    setTimeout(function(){  $('div#conteneur_blocs dd').slideDown(100);  }, 1200);

    
    // recuperation des valeurs pour l'animation des vignettes //
    headerHeight = $('header').height();
    $('section#realisation').hide();
    
    conH = $('#vignettes').height(); 
    conT = $('#vignettes').offset().top; 
    conL = $('#vignettes').offset().left;
    $('#vignettes').css({'position':'relative', 'height':conH});
    var i = 0;    
    $('ul#vignettes > li').each( function(){
        posT[i]=$(this).offset().top-conT;   
        posL[i]=$(this).offset().left-conL;   
        if(i>0 && nCol===0 && posT[i]!==posT[(i-1)]) nCol=i;
        i++; 
    });
    
    
    i = 0;
    $('ul#vignettes > li').each( function(){
        $(this).css({'top':posT[i], 'left':posL[i], 'position':'absolute'});
        var img = $(this).data('img');
        var titre = $(this).data('titre');
        var texte = $(this).data('texte');
        $('section#realisation').append('<div><h5>' + titre + '</h5><p>' + texte + '</p><img src="' + img + '"/></div>');
        i++;                 
    });
    $('section#realisation div').hide();
    animGallery();
};



var animGallery = function(){
    
    $('ul.sousmenu > li a').each( function(){
        if( $(this).attr('href') === curFilter ){
            $(this).parent().addClass( 'actif' );
        }else{
            $(this).parent().removeClass( 'actif' );
        }
    });
    
    i = 0;
    if(curFilter!=='all') $('ul#vignettes > li').not('.'+curFilter).fadeOut();
    $('ul#vignettes > li').each( function(){
        if( $(this).hasClass(curFilter) || curFilter==='all'){
            $(this).animate({'position':'absolute', 'top':posT[i], 'left':posL[i]}, speedFilter);   
            i++;
        }
    });
    if(curFilter==='all'){
        setTimeout(function(){ $('ul#vignettes > li').fadeIn(); }, speedFilter);
    }else{
        setTimeout(function(){ $('ul#vignettes > li.'+curFilter).fadeIn(); }, speedFilter);
    }
};