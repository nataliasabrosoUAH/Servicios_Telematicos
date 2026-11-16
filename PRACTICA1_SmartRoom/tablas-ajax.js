// ===== Apartado 2.2: tablas con AJAX =====

// ----- Página 3: datos en XML, tratados con JavaScript puro -----

function cargarPagina3XML() {
    const cuerpo = document.querySelector("#pagina3 tbody");
    const peticion = new XMLHttpRequest();

    peticion.open("GET", "datos/pagina3.xml", true);

    // Cuando llega la respuesta
    peticion.onload = function () {
        if (peticion.status !== 200) {
            cuerpo.innerHTML = "<tr><td colspan='6'>No se han podido cargar los datos</td></tr>";
            return;
        }

        const xml = peticion.responseXML;
        const estaciones = xml.getElementsByTagName("estacion");
        const campos = ["ciudad", "temperatura", "humedad", "ruido", "luz", "color"];

        cuerpo.innerHTML = "";

        // Una fila de la tabla por cada <estacion> del XML
        for (const estacion of estaciones) {
            const fila = document.createElement("tr");

            for (const campo of campos) {
                const celda = document.createElement("td");
                celda.textContent = estacion.getElementsByTagName(campo)[0].textContent;
                celda.style.border = "1px solid black";
                celda.style.padding = "8px";
                fila.appendChild(celda);
            }

            cuerpo.appendChild(fila);
        }
    };

    // Si la petición no llega a hacerse (sin conexión, sin servidor...)
    peticion.onerror = function () {
        cuerpo.innerHTML = "<tr><td colspan='6'>No se han podido cargar los datos</td></tr>";
    };

    peticion.send();
}

document.getElementById("enlacePagina3").addEventListener("click", cargarPagina3XML);

// ----- Página 4: datos en JSON, tratados con jQuery -----

function cargarPagina4JSON() {
    const cuerpo = $("#pagina4 tbody");
    const campos = ["ciudad", "temperatura", "humedad", "ruido", "luz", "color"];

    $.getJSON("datos/pagina4.json")
        .done(function (datos) {
            cuerpo.empty();

            // Una fila de la tabla por cada estación del JSON
            $.each(datos.estaciones, function (indice, estacion) {
                const fila = $("<tr>");

                $.each(campos, function (i, campo) {
                    fila.append($("<td>").text(estacion[campo]));
                });

                cuerpo.append(fila);
            });

            // Mismo formato que el resto de tablas, con jQuery
            cuerpo.find("td").css({
                "border": "1px solid black",
                "padding": "8px"
            });
        })
        .fail(function () {
            cuerpo.html("<tr><td colspan='6'>No se han podido cargar los datos</td></tr>");
        });
}

$("#enlacePagina4").click(cargarPagina4JSON);