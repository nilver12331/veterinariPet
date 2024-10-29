const cards = document.querySelectorAll('.card');
const btnSeleccionar = document.querySelectorAll('.elegir-mascota');
const alertaMascota = document.querySelector('.alerta-mascota');
const divResultado = document.querySelector('.resultado-img');
let mascotaObj = {};

document.addEventListener('DOMContentLoaded', () => {
    // Carga el objeto de mascota desde el localStorage al inicio
    mascotaObj = JSON.parse(localStorage.getItem('mascota')) || {};
    mostrarHtml(mascotaObj);
});

btnSeleccionar.forEach(mascota => {
    mascota.addEventListener('click', seleccionarMascota);
});

function seleccionarMascota(e) {
    e.preventDefault();
    const cardMascota = e.target.parentElement.parentElement;

    mascotaObj = {
        id: cardMascota.querySelector('.card-titulo').dataset.id,
        img: cardMascota.querySelector('img').src,
        nombre: cardMascota.querySelector('.card-titulo').textContent
    };

    mostrarHtml(mascotaObj);
    sincronizarLocalStorage(); // Guarda el objeto actualizado en localStorage
}

function mostrarHtml(mascotaObj) {
    if (mascotaObj && mascotaObj.nombre) {
        alertaMascota.textContent = `Mascota seleccionada para generar cita: ${mascotaObj.nombre}`;
        limpiarDivResultado();
        const img = document.createElement('img');
        img.src = mascotaObj.img;
        divResultado.appendChild(img);
    }
}

function limpiarDivResultado() {
    divResultado.innerHTML = '';
}

function sincronizarLocalStorage() {
    localStorage.setItem('mascota', JSON.stringify(mascotaObj));
}

cards.forEach(card => {
    card.classList.add('card-loaded');
    // Selecciona la descripción dentro de cada tarjeta específica
    const descripcionMascota = card.querySelector('.descripcion-mascota');
    // Muestra la descripción al pasar el cursor
    card.addEventListener('mouseenter', () => {
        descripcionMascota.classList.remove('d-none');
        descripcionMascota.classList.add('d-flex');
    });
    // Oculta la descripción al quitar el cursor
    card.addEventListener('mouseleave', () => {
        descripcionMascota.classList.remove('d-flex');
        descripcionMascota.classList.add('d-none');
    });
});