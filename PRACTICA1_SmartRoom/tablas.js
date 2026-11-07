$(document).ready(function () {
    
    $("#pagina2").hide();
    $("#pagina3").hide();
    $("#pagina4").hide();

    $("#enlacePagina2").click(function () {
        $("#pagina1").hide();
        $("#pagina2").show();
        $("#pagina3").hide();
        $("#pagina4").hide();

    });

});