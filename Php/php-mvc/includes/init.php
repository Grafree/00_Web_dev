<?php
require __SITE_PATH . '/includes/' . 'bootstrap.php';
require __SITE_PATH . '/includes/' . 'load.php';

/*** Chargement automatique des classes ***/
function __autoload($class_name) 
{
    $filename = strtolower($class_name);

    $file = __SITE_PATH . '/application/' . $filename . '/controller/' . $filename . '.php';

    if( !file_exists($file) )
    {
        return false;
    }
    
    require_once $file;
}

new Bootstrap();