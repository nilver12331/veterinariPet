document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("form").addEventListener("submit", function(event) {
        event.preventDefault(); // Evita el envío del formulario

        const email = document.getElementById("email").value;
        const contraseña = document.getElementById("contraseña").value;

        fetch('/servicios/cliente/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                contraseña: contraseña
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();  // Obtener la respuesta JSON
            } else {
                return response.json().then(data => { throw new Error(data.message); });
            }
        })
        .then(data => {
            localStorage.setItem('emailUsuario', email);
            // Guarda el email del usuario para usarlo en el perfil

            window.location.href = "/index.html";
            // Redirige a la vista del perfil
        })

        .catch(error => alert(error.message));
    });
});
