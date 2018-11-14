/**
 * Created by wilme on 31/10/2018.
 */


$(document).ready(function () {
    var file = $('img');
    var cantidad_img = file.length;
    var c = 1;

    for(var i = 0; i < cantidad_img; i++)
    {
        if(i%2 != 0)
        {
            var id = '#DiffImage' + i;
            var idmsn = '#result' + i;
            comparission(file[i-1].src, file[i].src, id, idmsn, i);
        }
    }

    function analysis(file) {
        resemble(file).onComplete(function(data) {
            console.log(data);
        });
    }

    function comparission(file1, file2, id, idmsn, i) {
        control = resemble(file1).compareTo(file2).onComplete(function (data) {

            var name1 = file1.split('/')[file1.split('/').length - 1].split('.')[0];
            var name2 = file2.split('/')[file2.split('/').length - 1].split('.')[0];
            $("#indice ul").append('<li><a href="#comp'+i+'">Comparación '+ c +': ' + name1 + ' - ' + name2 + ' Diferencia en: ' + data.misMatchPercentage + '%</a></li>');
            c++;
            var dimension = "";
            if(data.isSameDimensions)
            {
                dimension = "Las imagenes tienen las mismas dimensiones.";
            }
            else
            {
                dimension = "Las imagenes comparadas tienen diferentes dimensiones.";
            }

            $(idmsn).html("La segunda imagen es <strong>" + data.misMatchPercentage + "%</strong> diferente comparada con la primera. <br> " + dimension);
            var html = [];
            html.push("<img style='width:500px;' src='"+data.getImageDataUrl()+"'/>");
            $(id).html(html.join(''));
        });
    }

});