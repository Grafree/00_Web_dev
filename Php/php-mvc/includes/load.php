<?php
/**
 * Description of load
 *
 * @author 5doldo
 */
class Load {
    
    function view( $file_name, $datas = null )
    {
        if( is_array( $datas ) )
        {
            extract( $datas );
        }
        include __SITE_PATH . '/view/index.php';        
    }
}