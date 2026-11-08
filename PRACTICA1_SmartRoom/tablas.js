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