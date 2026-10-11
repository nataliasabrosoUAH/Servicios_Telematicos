const formulario = document.getElementById("formConfig");
const campoPais = document.getElementById("pais");
const listaPaises = document.getElementById("paises");
const campoTempActual = document.getElementById("tempActual");
const campoPassword = document.getElementById("password");
const indicadorPassword = document.getElementById("indicadorPassword");
const campoTempMax = document.getElementById("tempMax");
const campoTempMin = document.getElementById("tempMin");

const modalErrores = document.getElementById("modalErrores");
const listaErrores = document.getElementById("listaErrores");
const cerrarModal = document.getElementById("cerrarModal");

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
        listaErrores.innerHTML = "";

        const aviso = document.createElement("li");
        aviso.textContent = "Advertencia: la temperatura está fuera del intervalo recomendado de 22 a 26 ºC.";
        listaErrores.appendChild(aviso);

        modalErrores.showModal();

    } else {
        listaErrores.innerHTML = "";

        const mensaje = document.createElement("li");
        mensaje.textContent = "Los datos introducidos son válidos.";
        listaErrores.appendChild(mensaje);

        modalErrores.showModal();
    }

});