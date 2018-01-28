<?php
define ( 'SITE_PATH', realpath( dirname(__FILE__) ) );
        
session_start();

if( isset( $_POST[ 'token' ] ) && $_POST[ 'token' ] === $_SESSION[ 'token' ] && isset( $_POST[ 'survey' ] ) )
{
    $survey = $_POST[ 'survey' ];
    
    if( isset( $_POST[ 'answers' ] ) )
    {
        $answersSanitized = array();
        
        foreach( $_POST[ 'answers' ] as $answers )
        {
            $answersSanitized[] = ( is_numeric( $answers ) ) ? $answers : null;
        }
        
        $fp = fopen( SITE_PATH . '/survey/' . $survey . '/results/' . $_SESSION[ 'token' ] . '.json', 'w' );
        
        fwrite( $fp, json_encode( $answersSanitized ) );
        
        fclose( $fp );
    }
    else if( isset( $_POST[ 'results' ] ) && $_POST[ 'results' ] )
    {
        $results = new stdClass();
        
        $results->questions = array();
        
        $fquestions = json_decode( file_get_contents( SITE_PATH . '/survey/' . $survey . '/q.json' ) ); // Questions
                
        foreach( $fquestions->questions as $fquestion )
        {
            $choices = array();
            
            foreach( $fquestion->a as $a )
            {
                $choices[] = [ 'statement' => $a->statement, 'nb' => 0 ];
            }
            
            $results->questions[] = [ 'statement' => $fquestion->statement, 'a' => $choices ];
        }
        
        
        $dir = opendir(  SITE_PATH . '/survey/' . $survey . '/results/' );
        
        $filesSurvey = glob( SITE_PATH . '/survey/' . $survey . '/results/*.json' );
        
        foreach ( $filesSurvey as $file )
        {
            $fanswers = json_decode( file_get_contents( $file ) ); // Answers

            foreach( $fanswers as $n => $fanswer )
            {
                $results->questions[ $n ][ 'a' ][ $fanswer ]['nb']++;
            }
        }
        
        $results->nbsurvey = count( $filesSurvey );
            
        echo json_encode( $results );
    }
    
}
else {
    
    echo 'wrongtoken';
    
}