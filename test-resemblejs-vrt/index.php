<?php require_once 'charge_images.php' ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Comparación de screenshots</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
</head>
<body>
    <div class="container">
        <h1 class="page-header">VRT - Comparación de Screenshots Generados</h1>
        <div class="row">
            <div class="col-lg-12">
                <form action="" method="post">
                    <div class="col-lg-6 form-group">
                        <label for="directorio1">Escoja la version a comparar:</label>
                        <select name="directorio1" id="directorio1" class="form-control">
                            <option value="">Seleccione</option>
                            <?php foreach ($directorios as $directorio): ?>
                                <option value="<?= $directorio ?>"><?= $directorio ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="col-lg-6 form-group">
                        <label for="directorio2">Escoja la version a comparar:</label>
                        <select name="directorio2" id="directorio2" class="form-control">
                            <option value="">Seleccione</option>
                            <?php foreach ($directorios as $directorio): ?>
                                <option value="<?= $directorio ?>"><?= $directorio ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="col-lg-6 form-group">
                        <button type="submit" class="btn btn-primary">Comparar</button>
                    </div>
                </form>
            </div>
        </div>
        <?php if($base_1 != $base_2): ?>
        <div class="row">
            <div class="col-lg-12">
                <h3>Índice</h3>
                <div id="indice" class="indice">
                    <ul></ul>
                </div>
            </div>
            <?php foreach ($images as $key => $image): ?>
                <div class="col-lg-6 img-responsive" style="">
                    <h4>Feature <?= $names[$key] ?></h4>
                    <img class="img-fluid w-100" src="<?= $image ?>" width="500">
                </div>
                <?php if($key%2 != 0): ?>
                    <div class="col-lg-12" style="margin-top: 10px">
                        <a name="comp<?= $key ?>" id="comp<?= $key ?>"></a>
                        <h3>
                            <span class="label label-info">
                                Comparación de imagenes
                            </span>
                        </h3>
                        <span id="result<?= $key ?>" style="margin: 0 auto;"></span>
                        <div id="DiffImage<?= $key ?>" style="width: 500px; height: auto; margin: 10px auto; background-color: #eee;"></div>
                    </div>
                <?php endif; ?>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>
        <?php if($mensaje): ?>
            <div class="alert alert-danger">
                <strong><?= $mensaje; ?>!</strong>
            </div>
        <?php endif; ?>
    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script src="resemble.js"></script>
    <script src="index.js"></script>
</body>
</html>