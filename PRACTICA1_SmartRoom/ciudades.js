// ===== Apartado 2.1: ciudades según el país (AJAX con jQuery) =====

$(document).ready(function () {

    // Qué fichero corresponde a cada país
    const ficheros = {
        "españa": "espana.txt",
        "francia": "francia.txt",
        "italia": "italia.txt",
        "inglaterra": "inglaterra.txt"
    };

    const campoPais = $("#pais");
    const campoCiudad = $("#ciudad");

    // Deja el desplegable de ciudades vacío y desactivado, con un mensaje
    function vaciarCiudades(mensaje) {
        campoCiudad.empty();
        campoCiudad.append($("<option>").val("").text(mensaje));
        campoCiudad.prop("disabled", true);
    }

    let paisCargado = null;   // último país del que se han pedido ciudades

    // Pide al "servidor" el fichero del país elegido y rellena el desplegable
    function cargarCiudades(ciudadElegida) {
        const pais = campoPais.val().trim().toLowerCase();

        // Si el país no ha cambiado, no se vuelve a pedir
        if (pais === paisCargado) {
            return;
        }
        paisCargado = pais;

        if (pais === "") {
            vaciarCiudades("Primero elige un país");
            return;
        }

        const fichero = ficheros[pais];

        if (fichero === undefined) {
            vaciarCiudades("No hay ciudades disponibles para este país");
            return;
        }

        vaciarCiudades("Cargando ciudades…");

        $.ajax({
            url: "ciudades/" + fichero,
            dataType: "text",
            cache: false
        })
        .done(function (texto) {
            // Una ciudad por línea: se parte por saltos de línea y se quitan las vacías
            const ciudades = texto.split("\n")
                .map(function (linea) { return linea.trim(); })
                .filter(function (linea) { return linea !== ""; });

            campoCiudad.empty();
            campoCiudad.append($("<option>").val("").text("Elige una ciudad"));

            for (const ciudad of ciudades) {
                campoCiudad.append($("<option>").val(ciudad).text(ciudad));
            }

            campoCiudad.prop("disabled", false);

            // Si había una ciudad guardada, se vuelve a seleccionar
            if (ciudadElegida) {
                campoCiudad.val(ciudadElegida);
            }
        })
        .fail(function () {
            vaciarCiudades("No se han podido cargar las ciudades");
            paisCargado = null;
        });
    }

    // Cada vez que cambia el país
    campoPais.on("input change", function () {
        cargarCiudades("");
    });

    // Si había una configuración guardada, se cargan sus ciudades y se marca la ciudad
    const guardado = localStorage.getItem("configuracionSmartRoom");
    if (guardado !== null) {
        try {
            cargarCiudades(JSON.parse(guardado).ciudad);
        } catch (error) {
            // Si los datos guardados están estropeados, no se hace nada
        }
    }

    // Al pulsar "Restablecer configuración", el desplegable vuelve a su estado inicial
    $("#formConfig").on("reset", function () {
        setTimeout(function () {
            paisCargado = null;
            vaciarCiudades("Primero elige un país");
        }, 0);
    });

});