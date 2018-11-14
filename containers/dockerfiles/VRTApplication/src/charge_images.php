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

    $directory1 = "screenshots/". $base_1;
    $directory2 = "screenshots/". $base_2;

    $dir = scandir($dir_base, 1);

    $directorios = [];
    $mensaje = "";

    for ($d = 0; $d < (count($dir)-2); $d++)
    {
        $directorios[] = $dir[$d];
    }

    if($directory1 != $directory2)
    {
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
