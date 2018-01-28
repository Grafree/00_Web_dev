<?php 
session_start();
$_SESSION[ 'token' ] = md5( time() );
$survey = ( isset( $_GET[ 's' ] ) ) ? $_GET[ 's' ] : 'test';
?>
<!doctype html>
<html>
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />
    <title>Enquete</title>
    <script src="lib/js/jquery-3.1.1.min.js"></script>
    <script src="lib/js/jquery.animate-shadow-min.js"></script>
    <script src="lib/js/script.js"></script>
    <link href="lib/images/favicon-external-link.ico" rel="shortcut icon" type="image/x-icon" />
    <link href="lib/fonts/roboto/roboto.css" rel="stylesheet">
    <link href="lib/fonts/materialicons/materialicons.css" rel="stylesheet">
    <link href="lib/css/styles.css" rel="stylesheet">
</head>
<body>
    <header>
        <menu>
            <ul>
                <li><strong>1</strong>/<span>1</span></li>
                <!--
                <li><i class="materitalicon mainmenu">menu</i></li>
                -->
                <li><i class="materitalicon infos">info_outline</i></li>
            </ul>
            <ul>
                <li><a class="selected" href="index.html">Formats & données des URL</a></li>
                <li><a href="google_maps.html">Ressources intégrées</a></li>
            </ul>
        </menu>
        <h1></h1>
    </header>
    
    <main>
        
        <div id="results">
            <h2>Terminé !</h2>
            <div></div>
        </div>	
        
        <div id="questions"></div>
        
    </main>
		
		
    <aside>
        <div>
            <i class="materitalicon close">close</i>
            <h2>Questions répondues</h2>
            <ul>
                <li>Question 1 : Réponse A</li>
                <li>Question 2 : Réponse A</li>
                <li>Question 3 : Réponse A</li>
                <li>Question 4 : Réponse A</li>
                <li>Question 5 : Réponse A</li>
                <li>Question 6 : Réponse A</li>
            </ul>
        </div>
    </aside>
    
    <div id="overlay">
        <div class="modal">
            <h3>Accès à l'enquête</h3>
            <input type="password"><button id="access">Valider</button>
            <span class="error">Les accès ne sont pas correctement indiqués.</span>
        </div>
    </div>

<footer>
    <p>Olivier Dommange - Enquete</p>
</footer>
    <input type="hidden" id="survey" value="<?php echo $survey; ?>">
    <input type="hidden" id="token" value="<?php echo $_SESSION['token']; ?>">
</body>
</html>