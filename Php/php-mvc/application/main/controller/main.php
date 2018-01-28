<?php

class Main {
    
    public $load; 
    
    public $action;
    
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
    
    public function index()
    {
        return '';
    }
    
    private function display( $datas  )
    {    
        $this->load->view( 'main', $datas  );
    }
}
