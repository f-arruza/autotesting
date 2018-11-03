<?php
/**
 * Created by PhpStorm.
 * User: wilme
 * Date: 02/11/2018
 * Time: 8:35
 */

    $directory1 = "images1/features";
    $directory2 = "images2/features";

    $dirint = opendir($directory1);
    $images = [];
    $names = [];
    $i = 0;
    $j = 1;
    $n = 0;

    while (($archivo = readdir($dirint)) !== false)
    {
        if (preg_match("/.gif/", $archivo) || preg_match("/.jpg/", $archivo) || preg_match("/.png/", $archivo))
        {
            $images[$i] = $directory1 . "/" . $archivo;
            $i = $i + 2;
            $names[] = explode('.',$archivo);
        }
    }

    closedir($dirint);

    $dirint2 = opendir($directory2);

    while (($archivo = readdir($dirint2)) !== false)
    {
        if (preg_match("/.gif/", $archivo) || preg_match("/.jpg/", $archivo) || preg_match("/.png/", $archivo))
        {
            $images[$j] = $directory2 . "/" . $archivo;
            $j = $j + 2;
            $names[] = explode('.',$archivo);
        }
    }

    closedir($dirint2);

    ksort($images);