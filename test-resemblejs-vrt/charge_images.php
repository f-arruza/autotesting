<?php
/**
 * Created by PhpStorm.
 * User: wilme
 * Date: 02/11/2018
 * Time: 8:35
 */

    $dir_base = "screenshots";
    $base_1 = isset($_POST["directorio1"]) ? $_POST["directorio1"] : NULL;
    $base_2 = isset($_POST["directorio2"]) ? $_POST["directorio2"] : NULL;

    $url_1 = explode('_', $base_1);
    $base_1 = $url_1[0];

    $url_2 = explode('_', $base_2);
    $base_2 = $url_2[0];

    $directory1 = "screenshots/". $base_1;
    $directory2 = "screenshots/". $base_2;

    $dir = scandir($dir_base, 1);

    $directorios['names'] = [];
    $directorios['dir'] = [];

    $dirs = [];
    $mensaje = "";

    for ($d = 0; $d < (count($dir)-2); $d++)
    {
        $dir2 = scandir($dir_base . "/" . $dir[$d], 1);
        for($d2 = 0; $d2 < (count($dir2) - 2); $d2++)
        {
            $directorios['names'][] = "Test Plan " . $dir[$d] . " - " . $dir2[$d2];
            $directorios['dir'][] = $dir[$d] . "/" . $dir2[$d2];
        }
    }

    if($directory1 != $directory2)
    {
        $title = "(".$directorios['names'][$url_1[1]] . ") VS (" . $directorios['names'][$url_2[1]].")";
        $dirint = opendir($directory1);

        $files = [];
        $images = [];
        $names = [];
        $i = 0;
        $j = 1;
        $n = 0;

        while (($archivo = readdir($dirint)) !== false)
        {
            if (preg_match("/.gif/", $archivo) || preg_match("/.jpg/", $archivo) || preg_match("/.png/", $archivo))
            {
                $files[] = $archivo;
                $images[$i] = $directory1 . "/" . $archivo;
                $name_file = explode('.',$archivo);
                $names[$i] = $name_file[0];
                $i = $i + 2;
            }
        }

        closedir($dirint);

        $dirint2 = opendir($directory2);

        while (($archivo = readdir($dirint2)) !== false)
        {
            if (preg_match("/.gif/", $archivo) || preg_match("/.jpg/", $archivo) || preg_match("/.png/", $archivo))
            {
                for($f = 0; $f < count($files); $f++)
                {
                    if($files[$f] == $archivo)
                    {
                        $images[$j] = $directory2 . "/" . $archivo;
                        $name_file = explode('.',$archivo);
                        $names[$j] = $name_file[0];
                        $j = $j + 2;
                        break;
                    }
                }
            }
        }

        closedir($dirint2);

        ksort($images);
        ksort($names);
    }
    else
    {
        if($base_1 && $base_2)
            $mensaje = "Esta tratando de comparar las mismas versiones!";
    }
