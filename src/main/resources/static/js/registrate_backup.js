function registrar(event) {
    event.preventDefault(); // Prevenir el envío

    const Cliente = {
        nombreCliente: document.getElementById("nombres").value,
        apellidoCliente: document.getElementById("apellidos").value,
        tipoDocumento: document.getElementById("tipoDocumento").value,
        numeroDocumento: document.getElementById("numeroDocumento").value,
        direccion: document.getElementById("direccion").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value,
        contraseña: document.getElementById("contraseña").value
    };

    console.log("Datos del cliente a enviar:", Cliente);

    fetch('http://localhost:8080/servicios/cliente/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Cliente)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Error en el envío de información');
        }
        return res.json();
    })
    .then(data => {
        console.log('Usuario creado:', data);
        window.location.href = "iniciarsesion.html";
    })
    .catch(error => console.error('Error:', error));
}

document.querySelector("form").addEventListener("submit", registrar);
