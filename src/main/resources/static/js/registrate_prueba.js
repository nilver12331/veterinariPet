document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Evita el envío del formulario por defecto

        // Captura los valores del formulario
        const cliente = {
            nombreCliente: document.getElementById("txt-nombre").value,
            apellidoCliente: document.getElementById("txt-apellidos").value,
            tipoDocumento: document.getElementById("documento_identidad").value,
            numDocumento: document.getElementById("numero_documento").value,
            direccion: document.getElementById("txt-direccion").value,
            email: document.getElementById("txt-email").value,
            password: document.getElementById("password").value,
            telefono: document.getElementById("txt-telefono").value,
        };

        try {
            // Envía los datos al backend
            const response = await fetch("http://localhost:8080/servicios/cliente", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cliente),
            });

            // Verifica la respuesta del servidor
            if (response.ok) {
                alert("¡Registro exitoso!");
                window.location.href = "login.html";
} else if(response.status===409){
    alert("Ya te encuentras registrado");
    window.location.href = "login.html";
}else{
    alert("Error al registrar. Inténtalo de nuevo.");
}
} catch (error) {
    console.error("Error en la solicitud:", error);
    alert("Ocurrió un error al enviar los datos.");
}
});
});

// Variables para la contraseña y confirmación
const contrasenia = document.querySelector('#password'); // Asegúrate de que el ID coincida con el HTML
const confirmPassword = document.getElementById("confirmPassword"); // Asegúrate de que el ID coincida
const divclave = document.querySelector('.divclave'); // Clase para mostrar mensajes de error
const mensajeConfirmacion = document.createElement('p'); // Para mostrar mensaje de coincidencia
mensajeConfirmacion.style.display = "none";
confirmPassword.insertAdjacentElement('afterend', mensajeConfirmacion);

// Validación en tiempo real
contrasenia.addEventListener('input', validarContrasenia);
confirmPassword.addEventListener('input', confirmarContrasenia);

// Función para mostrar errores de contraseña
function validarContrasenia() {
    const contraseniaInput = contrasenia.value;
    let errores = [];

    // Validar que la contraseña tenga al menos 6 caracteres
    if (contraseniaInput.length < 6) {
        errores.push("La contraseña debe tener más de 5 caracteres.");
    }

    // Validacion adicional
    // if (!/[A-Z]/.test(contraseniaInput)) {
    //     errores.push("La contraseña debe contener al menos una letra mayúscula.");
    // }
    if (!/\d/.test(contraseniaInput)) {
    errores.push("La contraseña debe contener al menos un número.");
   }

    mostrarErrores(errores);
}

// Función para mostrar errores en el HTML sin alertas
function mostrarErrores(errores) {
    divclave.innerHTML = ""; // Limpiar mensajes previos
    if (errores.length > 0) {
        errores.forEach(error => {
            let errorTexto = document.createElement('p');
            errorTexto.textContent = error;
            errorTexto.style.color = "red";
            divclave.appendChild(errorTexto);
        });
    }
}

// Función para confirmar que las contraseñas coinciden
function confirmarContrasenia() {
    const contraseniaValue = contrasenia.value;
    const confirmarValue = confirmPassword.value;

    if (confirmarValue === "") {
        mensajeConfirmacion.style.display = "none"; // Ocultar mensaje si está vacío
        return;
    }

    // Verificar si las contraseñas coinciden
    if (contraseniaValue === confirmarValue) {
        mensajeConfirmacion.style.color = "green";
        mensajeConfirmacion.textContent = "Las contraseñas coinciden";
    } else {
        mensajeConfirmacion.style.color = "red";
        mensajeConfirmacion.textContent = "Las contraseñas no coinciden";
    }
    mensajeConfirmacion.style.display = "block"; // Mostrar mensaje
}
