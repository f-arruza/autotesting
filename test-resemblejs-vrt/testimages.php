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
            <?php foreach ($images as $key => $image): ?>
            <?php if($key%2 == 0): ?>
                <?php if($key == 0): ?>
                    <h2>Feature <?= $names[$key][0] ?></h2>
                <?php else: ?>
                    <h2>Feature <?= $names[$key-1][0] ?></h2>
                <?php endif; ?>
            <?php endif; ?>
                <div class="col-lg-6 img-responsive" style="margin-top: 10px;">
                    <img class="img-fluid w-100" src="<?= $image ?>" width="500" height="400">
                </div>
                <?php if($key%2 != 0): ?>
                    <div class="col-lg-12" style="margin-top: 10px">
                        <h3>
                            <span class="label label-info">
                                Comparación de imagenes
                            </span>
                        </h3>
                        <span id="result<?= $key ?>" style="margin: 0 auto;"></span>
                        <div id="DiffImage<?= $key ?>" style="width: 500px; height: 400px; margin: 10px auto; background-color: #eee;"></div>
                    </div>
                <?php endif; ?>
            <?php endforeach; ?>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script src="resemble.js"></script>
    <script src="index.js"></script>
</body>
</html>