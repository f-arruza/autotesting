/**
 * Created by wilme on 31/10/2018.
 */


$(document).ready(function () {
    var file = $('img');
    var cantidad_img = file.length;

    for(var i = 0; i < cantidad_img; i++)
    {
        if(i%2 != 0)
        {
            console.log(i);
            var id = '#DiffImage' + i;
            var idmsn = '#result' + i;
            comparission(file[i-1].src, file[i].src, id, idmsn);
        }
    }

    function analysis(file) {
        resemble(file).onComplete(function(data) {
            console.log(data);
        });
    }

    function comparission(file1, file2, id, idmsn) {
        control = resemble(file1).compareTo(file2).onComplete(function (data) {
            console.log(data);
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