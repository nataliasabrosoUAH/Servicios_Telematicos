const formulario = document.getElementById("formConfig");
const campoPais = document.getElementById("pais");
const campoCiudad = document.getElementById("ciudad");
const campoLocalizacion = document.getElementById("localizacion");
const listaPaises = document.getElementById("paises");
const campoTempActual = document.getElementById("tempActual");
const campoPassword = document.getElementById("password");
const indicadorPassword = document.getElementById("indicadorPassword");
const campoTempMax = document.getElementById("tempMax");
const campoTempMin = document.getElementById("tempMin");

const modalErrores = document.getElementById("modalErrores");
const listaErrores = document.getElementById("listaErrores");
const cerrarModal = document.getElementById("cerrarModal");

const campoCoordenadas = document.getElementById("coordenadas");
const campoMapa = document.getElementById("mapa");
const botonGenerarMapa = document.getElementById("generarMapa");
const enlaceMapa = document.getElementById("abrirMapa");
const botonUsarUbicacion = document.getElementById("usarUbicacion");

const sensores = document.querySelectorAll(
    'input[name="sensores"]'
);

function guardarConfiguracion() {
    const sensoresSeleccionados = [];

    for (const sensor of sensores) {
        if (sensor.checked) {
            sensoresSeleccionados.push(sensor.value);
        }
    }
    const configuracion = {
        pais: campoPais.value,
        ciudad: campoCiudad.value,
        localizacion: campoLocalizacion.value,
        coordenadas: campoCoordenadas.value,
        mapa: campoMapa.value,
        temperaturaActual: campoTempActual.value,
        temperaturaMaxima: campoTempMax.value,
        temperaturaMinima: campoTempMin.value,
        sensores: sensoresSeleccionados
    };

    localStorage.setItem(
        "configuracionSmartRoom",
        JSON.stringify(configuracion)
    );
}

function cargarConfiguracion() {
    const datosGuardados = localStorage.getItem("configuracionSmartRoom");

    if (datosGuardados === null) {
        return;
    }

    const configuracion = JSON.parse(datosGuardados);

    campoPais.value = configuracion.pais;
    campoCiudad.value = configuracion.ciudad;
    campoLocalizacion.value = configuracion.localizacion;
    campoCoordenadas.value = configuracion.coordenadas;
    campoMapa.value = configuracion.mapa;
    campoTempActual.value = configuracion.temperaturaActual;
    campoTempMax.value = configuracion.temperaturaMaxima;
    campoTempMin.value = configuracion.temperaturaMinima;

    if (Array.isArray(configuracion.sensores)) {
    for (const sensor of sensores) {
        sensor.checked = configuracion.sensores.includes(sensor.value);
    }
}

    if (configuracion.mapa !== "") {
        enlaceMapa.href = configuracion.mapa;
        enlaceMapa.hidden = false;
    }
}
cargarConfiguracion();
function paisValido() {
    const paisIntroducido = campoPais.value.trim().toLowerCase();

    if (paisIntroducido === "") {
        return false;
    }

    for (const opcion of listaPaises.options) {
        const paisLista = opcion.value.trim().toLowerCase();

        if (paisIntroducido === paisLista) {
            return true;
        }
    }

    return false;
}
function temperaturaValida() {
    const valorTemperatura = campoTempActual.value.trim();

    if (valorTemperatura === "") {
        return false;
    }

    const temperatura = Number(valorTemperatura);

    if (Number.isNaN(temperatura)) {
        return false;
    }

    return true;
}

function temperaturaFueraDeRango() {
    const temperatura = Number(campoTempActual.value);

    return temperatura < 22 || temperatura > 26;
}

function temperaturasMaxMinValidas() {
    if (campoTempMax.value.trim() === "" || campoTempMin.value.trim() === "") {
        return true;
    }

    const maxima = Number(campoTempMax.value);
    const minima = Number(campoTempMin.value);

    return maxima >= minima;
}

function passwordValida() {
    const password = campoPassword.value;

    return password.length >= 9;
}

campoPassword.addEventListener("input", function () {
    const longitud = campoPassword.value.length;

    if (longitud < 9) {
        indicadorPassword.textContent =
            "Evaluación de longitud: insuficiente (" + longitud + " caracteres)";

    } else if (longitud <= 11) {
        indicadorPassword.textContent =
            "Evaluación de longitud: adecuada (" + longitud + " caracteres)";

    } else if (longitud <= 15) {
        indicadorPassword.textContent =
            "Evaluación de longitud: buena (" + longitud + " caracteres)";

    } else {
        indicadorPassword.textContent =
            "Evaluación de longitud: muy buena (" + longitud + " caracteres)";
    }
});

cerrarModal.addEventListener("click", function () {
    modalErrores.close();
});

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const errores = [];

    if (!paisValido()) {
        errores.push("El país introducido no es válido.");
    }

    if (!temperaturaValida()) {
        errores.push("La temperatura actual debe contener un número válido.");
    }

    if (!passwordValida()) {
        errores.push("La contraseña debe tener al menos 9 caracteres.");
    }

    if (!temperaturasMaxMinValidas()) {
        errores.push("La temperatura máxima debe ser mayor o igual a la mínima.");
    }

    if (errores.length > 0) {
        listaErrores.innerHTML = "";

        for (const error of errores) {
            const elemento = document.createElement("li");
            elemento.textContent = error;
            listaErrores.appendChild(elemento);
        }

        modalErrores.showModal();

    } else if (temperaturaFueraDeRango()) {
        guardarConfiguracion();

        listaErrores.innerHTML = "";

        const aviso = document.createElement("li");
        aviso.textContent = "Advertencia: la temperatura está fuera del intervalo recomendado de 22 a 26 ºC.";
        listaErrores.appendChild(aviso);

        modalErrores.showModal();

    } else {
        guardarConfiguracion();

        listaErrores.innerHTML = "";

        const mensaje = document.createElement("li");
        mensaje.textContent = "Los datos introducidos son válidos.";
        listaErrores.appendChild(mensaje);

        modalErrores.showModal();
    }

});

function leerCoordenadasDecimales() {
    const partes = campoCoordenadas.value.split(",");

    if (partes.length !== 2) {
        return null;
    }

    const textoLatitud = partes[0].trim();
    const textoLongitud = partes[1].trim();

    if (textoLatitud === "" || textoLongitud === "") {
        return null;
    }

    const latitud = Number(textoLatitud);
    const longitud = Number(textoLongitud);

    if (Number.isNaN(latitud) || Number.isNaN(longitud)) {
        return null;
    }

    if (latitud < -90 || latitud > 90) {
        return null;
    }

    if (longitud < -180 || longitud > 180) {
        return null;
    }

    return {
        latitud: latitud,
        longitud: longitud
    };
}

function generarEnlaceMapa() {
    let coordenadas = leerCoordenadasDecimales();

    if (coordenadas === null) {
        coordenadas = leerCoordenadasDMS();
    }

    if (coordenadas === null) {
        campoMapa.value = "";
        enlaceMapa.href = "#";
        enlaceMapa.hidden = true;

        listaErrores.innerHTML = "";

        const error = document.createElement("li");
        error.textContent =
            "Las coordenadas GPS no tienen un formato válido.";

        listaErrores.appendChild(error);
        modalErrores.showModal();

        return;
    }

    const latitud = Number(coordenadas.latitud.toFixed(4));
    const longitud = Number(coordenadas.longitud.toFixed(4));

    const urlMapa =
        "https://maps.google.com/maps?q=" +
        latitud + "," +
        longitud;

    campoMapa.value = urlMapa;

    enlaceMapa.href = urlMapa;
    enlaceMapa.hidden = false;
}

botonGenerarMapa.addEventListener("click", generarEnlaceMapa);

function obtenerUbicacionActual() {
    if (!navigator.geolocation) {
        listaErrores.innerHTML = "";

        const error = document.createElement("li");
        error.textContent =
            "La geolocalización no está disponible en este navegador.";

        listaErrores.appendChild(error);
        modalErrores.showModal();

        return;
    }

    navigator.geolocation.getCurrentPosition(
        function (posicion) {
            const latitud = posicion.coords.latitude.toFixed(6);
            const longitud = posicion.coords.longitude.toFixed(6);

            campoCoordenadas.value =
                latitud + ", " + longitud;

            generarEnlaceMapa();
        },

        function () {
            listaErrores.innerHTML = "";

            const error = document.createElement("li");
            error.textContent =
                "No se ha podido obtener la ubicación actual.";

            listaErrores.appendChild(error);
            modalErrores.showModal();
        }
    );
}

botonUsarUbicacion.addEventListener(
    "click",
    obtenerUbicacionActual
);

function convertirDMSaDecimal(grados, minutos, segundos, direccion) {
    let decimal = grados + minutos / 60 + segundos / 3600;

    if (direccion === "S" || direccion === "O" || direccion === "W") {
        decimal = -decimal;
    }

    return decimal;
}

function leerUnaCoordenadaDMS(texto) {
    const textoLimpio = texto
        .replaceAll("°", " ")
        .replaceAll("º", " ")
        .replaceAll("'", " ")
        .replaceAll('"', " ")
        .trim();

    const partes = textoLimpio.split(" ").filter(parte => parte !== "");

    if (partes.length !== 4) {
        return null;
    }

    const direccion = partes[0].toUpperCase();
    const grados = Number(partes[1]);
    const minutos = Number(partes[2]);
    const segundos = Number(partes[3]);

    if (
        Number.isNaN(grados) ||
        Number.isNaN(minutos) ||
        Number.isNaN(segundos)
    ) {
        return null;
    }
    if (!["N", "S", "E", "O", "W"].includes(direccion)) {
        return null;
    }

    if (
        grados < 0 ||
        minutos < 0 ||
        minutos >= 60 ||
        segundos < 0 ||
        segundos >= 60
    ) {
        return null;
    }

    return {
        direccion: direccion,
        grados: grados,
        minutos: minutos,
        segundos: segundos
    };
}

function leerCoordenadasDMS() {
    const partes = campoCoordenadas.value.split(",");

    if (partes.length !== 2) {
        return null;
    }

    const latitudDMS = leerUnaCoordenadaDMS(partes[0].trim());
    const longitudDMS = leerUnaCoordenadaDMS(partes[1].trim());

    if (latitudDMS === null || longitudDMS === null) {
        return null;
    }

    if (
        latitudDMS.direccion !== "N" &&
        latitudDMS.direccion !== "S"
    ) {
        return null;
    }

    if (
        longitudDMS.direccion !== "E" &&
        longitudDMS.direccion !== "O" &&
        longitudDMS.direccion !== "W"
    ) {
        return null;
    }

    const latitud = convertirDMSaDecimal(
        latitudDMS.grados,
        latitudDMS.minutos,
        latitudDMS.segundos,
        latitudDMS.direccion
    );

    const longitud = convertirDMSaDecimal(
        longitudDMS.grados,
        longitudDMS.minutos,
        longitudDMS.segundos,
        longitudDMS.direccion
    );

    if (latitud < -90 || latitud > 90) {
        return null;
    }

    if (longitud < -180 || longitud > 180) {
        return null;
    }

    return {
        latitud: latitud,
        longitud: longitud
    };
}