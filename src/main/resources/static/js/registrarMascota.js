const idUsuario=document.querySelector('#id-usuario');
document.addEventListener('DOMContentLoaded', async () => {
    // Llama a obtenerIdCliente() y espera su resultado
     cliente = await obtenerIdCliente();
    if (cliente) {
        // Si cliente existe, llama a obtenerListaMascota(cliente) y espera su resultado
        idUsuario.value=cliente.idCliente;
    } else {
        window.location.href="../login.html";
        return;
    }

});

async function obtenerIdCliente(){
    const response= await fetch('/servicios/cliente/usuarioSesion');
     if (response.ok) {
            const usuario = await response.json();
            return usuario;
        } else {
            console.error("Error: Usuario no autenticado");
            return 0;
     }
}
