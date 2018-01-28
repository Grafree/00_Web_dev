<?php
class Bootstrap{
    
    public $load;
    
    function __construct()
    {
        $this->load = new Load();
        
        $this->router();
    }
    
    
    function router()
    {
        // Recupère la variable transmise dans l'URL
        $route = (empty($_GET['page'])) ? '' : $_GET['page'];

        if (empty($route))
        {
            $route = 'index';
        }
        else
        {
            // Récupère de URL ce qui concerne la page et l'action 
            $parts = explode('/', $route);
            $file = $parts[0];
            if(isset( $parts[1]))
            {
                $action = $parts[1];
            }
        }
        
        $page     = (empty($page) || $page === 'home')        ?  'main' : $page;
        $action   = (empty($action))      ?  'index' : $action;
        
        $filename = strtolower($page);
        
        if( file_exists( __SITE_PATH . '/application/'  . $filename . '/controller/' . $filename . '.php' ) )
        {
            include __SITE_PATH . '/application/' . $filename . '/model.php';
            
            // Utilise __autoload() pour charger les objets            
            if( !( new $page( $action ) ) )
            {
                include __SITE_PATH . '/view/404.html';
            }
        }
        else
        {
            include __SITE_PATH . '/view/404.html';
        }
    }
}
