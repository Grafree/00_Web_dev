var survey = '';
var surveyValid = false;
var answers = {};
var q = {};
var nQ = 0;
var nbQ = 0;
var results = {};
var nbSurvey = 0;
var displayResults = false;
var loadResults = false;

$(document).ready(function()
{
    $('header>menu i.mainmenu').click(function()
    {
        if( $('header').hasClass('menuopen') )
        {
            $('header>menu>ul:not(:first-child)').slideUp(500, function(){$('header').removeClass('menuopen');});
        }
        else
        {
            $('header').addClass('menuopen');
            $('header>menu>ul:not(:first-child)').slideDown(500);
        }
    });
    
    var asideWidth = $('aside').width();
    $('aside').hide();
    $('aside>div').css({right:-asideWidth});
    
    $('header>menu i.infos, aside i.close').click(function()
    {
        if( $('aside').hasClass('open') )
        {
            asideWidth = $('aside').width();
            $('aside').addClass('transopen');
            $('aside>div').animate({right:-asideWidth}, 500, function(){$('aside').removeClass('transopen'); $('aside').hide(); $('aside').removeClass('open');});
        }
        else
        {
            $('aside').show();
            $('aside>div').show();
            $('aside').addClass('transopen');
            $('aside').addClass('open');
            $('aside>div').animate({right:0}, 500, function(){
                $('aside').removeClass('transopen');                
                $('html, body').animate({scrollTop:0});
            });
        }
    });
    
    surveyAccess();
    
});


var surveyAccess = function()
{
    $('button#access').on('click', function( e )
    {
        e.preventDefault();
        
        validAccess();
           
    });
        
    $('div#overlay>div.modal>input').on('keypress',  function( e ) 
    {
        if( e.which === 13 )
        {
            validAccess();
            
            return false;
        }
    });    
};


var validAccess = function()
{    
    if( $('div#overlay>div.modal>input').val() === 'survey' )
    {
        surveyValid = true;

        initSurvey();

        setupSurvey();
    }
    else if( $('div#overlay>div.modal>input').val() === 'adminsurvey' )
    {
        surveyValid = true;

        initSurvey();
        
        endSurvey();
    }
    else
    {
        $('div#overlay>div.modal>input').addClass('error').val('');

        $('span.error').show();
    }    
};


var updateProgress = function()
{
    $('menu>ul:first-child>li:first-child>strong').html( ( nQ + 1 ) );
    
    $('main>div#questions>article.current').removeClass( 'current' );
    
    $('main>div#questions>article.current').hide();
    
    $('main>div#questions>article:eq(' + nQ + ')').addClass( 'current' );
    
    $('main>div#questions>article:eq(' + nQ + ')').slideDown();
    
    nextQuestion();
};


var initSurvey = function()
{
    survey = $('input#survey').val();
    
    nQ = 0;
    
    $('div#overlay').fadeOut();
    
    $.getJSON( 'survey/' + survey + '/q.json', function( data ) {
        
        q = data;
        
        $('header>h1').html('');
        
        var surveyType = ( q.type ) ? q.type : 'survey';
        
        var typeFr = ( surveyType === 'test' ) ? 'Epreuve pratique' : 'Enquête'; 
             
        $('header>h1').html( typeFr + ' <span>' + q.title + '</span>' );
        
        setupSurvey();
    
    });
};


var setupSurvey = function()
{        
    $('main>div#questions').html('');

    if( displayResults ) 
    {
        $('main>div#questions').addClass('displayResults');
    }
    
    nbQ = 0;
    
    nQ = 0;

    $.each( q.questions, function( key, val ) 
    {
        nbQ++;

        var answers = '';

        $.each( val.a, function( akey, aval ) 
        {
            var result = ( displayResults ) ? ' <em>' + results.questions[ key ].a[ akey ].nb + '</em>' : '';

            answers += '<li>' + aval['statement'] + result + '</li>';
        });
        
        var img = ( val.img && val.img.length > 0 ) ? '<img src="' + val.img + '">' : '';

        var questionContent = '<article><h2>' + val.q + '</h2><h3>' + val.statement + '</h3>' + img + '<ol class="options">' + answers + '</ol></article>';

        if( ( loadResults && displayResults ) || ( !loadResults && !loadResults ) )
        {
            $('main>div#questions').append( questionContent );
        }
    });

    $('menu>ul:first-child>li:first-child>span').html( nbQ );

    if( nbQ > 0 && ( ( loadResults && displayResults ) || ( !loadResults && !displayResults ) ) )
    {
        updateProgress();

        loadResults = false;
    }
    
};


var nextQuestion = function()
{
    if( surveyValid )
    {
        var btnNext  = ( ( nQ + 1 ) === nbQ ) ? '<button class="next">Terminé !</button>' : '<button class="next">Suivant &gt;</button>';
        
        var btnPrev  = ( ( nQ > 1 ) ) ? '<button class="prev">Précédent</button>' : '';
        
        $('main>div#questions>article:eq(' + nQ + ')').append('<div><div class="infos">Vous n\'avez pas indiqué de réponse.</div><hr>' + btnPrev + btnNext + '</div>');
        
        if( !displayResults )
        {
            chooseOptions();
        }
        
        $('main>div#questions>article:eq(' + nQ + ') button.next').on( 'click', function()
        {
            if( checkAnswer() )
            {
                if( ( nQ + 1 ) === nbQ )
                {
                    endSurvey();
                }
                else
                {
                    nQ++;

                    updateProgress();
                }
            }
            else
            {
                $('main>div#questions>article:eq(' + nQ + ') div .infos').show();
            }
        });
        
        $('main>div#questions>article:eq(' + nQ + ') button.prev').on( 'click', function()
        {
            nQ--;

            updateProgress();
        });
    }
    else
    {
        stopSurvey();
    }
};


var chooseOptions = function()
{
    $('main>div#questions>article:eq(' + nQ + ') .options li').on( 'click', function()
    {
        $('main>div#questions>article:eq(' + nQ + ') .options li.selected i').remove();

        $('main>div#questions>article:eq(' + nQ + ') .options li.selected').removeClass('selected');

        $(this).append( '<i class="materitalicon done">done</i>' );

        $(this).addClass( 'selected' );
    }); 
};


var checkAnswer = function()
{
    if( !displayResults )
    {
        if( $('main>div#questions>article:eq(' + nQ + ') .options .selected').length === 1 )
        {
            answers[ nQ ] = $('main>div#questions>article:eq(' + nQ + ') .options li').index( $('main>div#questions>article:eq(' + nQ + ') .options .selected') );

            return true;
        }
        else
        {
            return false;
        }
    }
    else
    {
        return true;
    }
};


var endSurvey = function()
{
    $.post( 'survey.php', { token: $('input#token').val(), answers: answers, survey: survey }).done(function(){
        
        answers = [];
        
        displayResults = true;
        
        loadResults = true;
        
        $('main>div#questions>article').hide();
        
        $('div#results').fadeIn();
        
        getResults();
        
        var send = setInterval( function(){ getResults(); }, 5000 );
        
    });
};


var getResults = function()
{
    $.post( 'survey.php', { token: $('input#token').val(), results: true, survey: survey }).done(function( datas ){
        
        results = JSON.parse( datas );
        
        if( results.nbsurvey > nbSurvey )
        {
            nbSurvey = results.nbsurvey;
            
            $('div#results>div').html( 'Nombre de résultats : ' + results.nbsurvey + ' <button><i class="materitalicon done">done</i> Afficher les résultats</button>');

            $('div#results>div button').on( 'click', function( e ){ e.preventDefault(); $('div#results>div button').remove();  setupSurvey(); });
        }
        
    });    
};

var stopSurvey = function()
{
    surveyValid = false;
    
    nQ = 0;
    
    answers = [];
    
    $('main>div#questions>article').hide();
    
    $('div#overlay').fadeIn();
};
