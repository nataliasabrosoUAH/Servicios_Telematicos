$(document).ready(function () {

    $("#pagina2").hide();
    $("#pagina3").hide();
    $("#pagina4").hide();
    $("#histograma").hide();

    $("#pagina1 table").css("border-collapse", "collapse");

    $("#pagina1 th, #pagina1 td").css("border", "1px solid black");

    $("#pagina1 th, #pagina1 td").css("padding", "8px");

    $(".checkboxHistograma").change(function () {
        $(".checkboxHistograma").not(this).prop("checked", false);

        if ($(this).is(":checked")) {
            let tipo = $(this).val();
            $("#tituloHistograma").text(tipo);

            let columna;
            if (tipo == "temperatura") {
                columna = 2;
            } else if (tipo == "humedad") {
                columna = 3;
            } else if (tipo == "ruido") {
                columna = 4;
            } else if (tipo == "luz") {
                columna = 5;
            }

            $("#barrasHistograma").empty();
            $("#pagina1 tbody tr").each(function () {
                let ciudad = $(this).find("td").eq(0).text();
                let valor = $(this).find("td").eq(columna - 1).text();
                let fila = $("<div></div>").text(ciudad + ": ");
                let barra = $("<div></div>").text(valor);

                barra.css("width", (valor*2) + "px");
                barra.css("border", "1px solid black");
                barra.css("margin-bottom", "5px");

                fila.append(barra);

                $("#barrasHistograma").append(fila);
                console.log(ciudad, valor);
            });

    $("#pagina1")
    $("#histograma").show();
} else {
    $("#histograma").hide();
}
    });

$("#enlacePagina2").click(function () {
    $("#pagina1").hide();
    $("#pagina2").show();
    $("#pagina3").hide();
    $("#pagina4").hide();

    $("#pagina2 table").css("border-collapse", "collapse");
    $("#pagina2 th, #pagina2 td").css("border", "1px solid black");
    $("#pagina2 th, #pagina2 td").css("padding", "8px");

});

$("#enlacePagina3").click(function () {
    $("#pagina1").hide();
    $("#pagina2").hide();
    $("#pagina3").show();
    $("#pagina4").hide();

    $("#pagina3 table").css("border-collapse", "collapse");
    $("#pagina3 th, #pagina3 td").css("border", "1px solid black");
    $("#pagina3 th, #pagina3 td").css("padding", "8px");

});

$("#enlacePagina4").click(function () {
    $("#pagina1").hide();
    $("#pagina2").hide();
    $("#pagina3").hide();
    $("#pagina4").show();

    $("#pagina4 table").css("border-collapse", "collapse");
    $("#pagina4 th, #pagina4 td").css("border", "1px solid black");
    $("#pagina4 th, #pagina4 td").css("padding", "8px");
});

$("#enlacePagina1").click(function () {
    $("#pagina1").show();
    $("#pagina2").hide();
    $("#pagina3").hide();
    $("#pagina4").hide();
});

});