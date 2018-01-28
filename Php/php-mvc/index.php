<?php
// Affiche les erreurs
ini_set('display_errors', 1);

// Indique dans une constante le chemin du site
$site_path = realpath(dirname(__FILE__));
define ('__SITE_PATH', $site_path);

// démarrage des opérations
require 'includes/init.php';