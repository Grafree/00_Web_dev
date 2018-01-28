<?php
//include __SITE_PATH . '/application/users/model.php';

class News {
    
    private $load; 
    
    private $action;
    
    private $model;
    
    
    function __construct( $action )
    {
        $this->load = new Load();
        
        $this->model = new Model();
        
        $this->action = $action;
          
        if( method_exists( $this, $this->action ) ) 
        {
            $datas = $this->$action();

            $this->display( $datas );
        }
    }
    
    
    private function index()
    {
        return $this->model->getDatas();
    }
    
    private function test(){
        return [ 'first' => 'Action test', 'last' => 'OK'];
    }
    
    
    private function display( $datas )
    {   
        $this->load->view( 'news', $datas );
    }
    
    private function notfound(){
        return false;
    }
    
}
