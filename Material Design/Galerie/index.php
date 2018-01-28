<!doctype html>
<html>
<head>
    <title>Material Design : Galerie</title>
    <script src="lib/js/jquery-1.11.3.min.js"></script>
    <script src="lib/js/jquery.animate-shadow-min.js"></script>
    <script src="lib/js/script.js"></script>
    <link href="lib/fonts/roboto/roboto.css" rel='stylesheet'>
    <link href="lib/fonts/materialicons/materialicons.css" rel="stylesheet">
    <link href="lib/css/styles.css" rel="stylesheet">
</head>
<body>
    <header>
        <h1>Galerie</h1>
        <nav>
            <i class="materitalicon menu">menu</i>
            <i class="materitalicon add">add</i>
            <i class="materitalicon remove">remove</i>
        </nav>
    </header>
    <div>
        <?php
        foreach (glob("*.gif") as $n => $filename) { ?>
            <figure><img src="<?php echo $filename; ?>" />
                <nav>
                    <q><?php echo $n+1; ?></q>
                    <i class="materitalicon favorite">favorite</i>
                    <i class="materitalicon launch">launch</i>
                </nav>
                <figcaption><span><?php echo $filename; ?></span> - <?php echo filesize($filename); ?>Ko</figcaption>
            </figure>
        <?php
        }
        ?>
    </div>
</body>
</html>