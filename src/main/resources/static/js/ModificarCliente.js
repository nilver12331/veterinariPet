document.addEventListener("DOMContentLoaded", function() {
    const emailUsuario = localStorage.getItem('emailUsuario');
    if (emailUsuario) {
        fetch(`/servicios/cliente/perfil/${emailUsuario}`)
            .then(response => {
                if (!response.ok) throw new Error("Error al obtener los datos del cliente");
                return response.json();
            })
            .then(data => {
                document.getElementById('nombre').value = data.nombre_cliente;
                document.getElementById('apellido').value = data.apellido_cliente;
                document.getElementById('tipoDocumento').value = data.tipo_Documento;
                document.getElementById('numeroDocumento').value = data.numero_Documento;
                document.getElementById('direccion').value = data.direccion;
                document.getElementById('telefono').value = data.telefono;
                document.getElementById('email').value = data.email;
                document.getElementById('contraseña').value = data.contraseña;
            })
            .catch(error => console.error(error));
    } else {
        alert("Por favor, inicie sesión.");
        window.location.href = "login.html";
    }
});

function guardarCambios() {
    const emailUsuario = localStorage.getItem('emailUsuario');
    const clienteModificado = {
        nombre_cliente: document.getElementById('nombre').value,
        apellido_cliente: document.getElementById('apellido').value,
        tipo_Documento: document.getElementById('tipoDocumento').value,
        numero_Documento: document.getElementById('numeroDocumento').value,
        direccion: document.getElementById('direccion').value,
        telefono: document.getElementById('telefono').value,
        email: document.getElementById('email').value,
        contraseña: document.getElementById('contraseña').value,
    };

    fetch(`/servicios/cliente/modificar/${emailUsuario}`, {
        method: 'PUT',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clienteModificado)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.message === "Datos actualizados exitosamente") {
            // Aquí puedes actualizar el localStorage con los nuevos datos si es necesario
            localStorage.setItem('nombreCliente', clienteModificado.nombreCliente);
            localStorage.setItem('apellidoCliente', clienteModificado.apellidoCliente);
            // Redirigir a la vista de perfil
            window.location.href = "/index.html";
        }
    })
    .catch(error => console.error("Error:", error));
}
