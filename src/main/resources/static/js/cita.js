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
        nombre: cardMascota.querySelector('.card-titulo').textContent,
        raza:cardMascota.querySelector('.raza').textContent,
        edad:cardMascota.querySelector('.edad').textContent,
        peso:cardMascota.querySelector('.peso').textContent
    };
    console.log(mascotaObj);
    mostrarHtml(mascotaObj);
    sincronizarLocalStorage(); // Guarda el objeto actualizado en localStorage
}

function mostrarHtml(mascotaObj) {
    if (mascotaObj && mascotaObj.nombre) {
        alertaMascota.textContent = `Mascota Seleccionada es: ${mascotaObj.nombre}`;
        alertaMascota.classList.add('alertaMascota');
        limpiarDivResultado();
        const img = document.createElement('img');
        img.src = mascotaObj.img;
        divResultado.appendChild(img);
        const divDescripcionMascota=document.createElement('div');
        divDescripcionMascota.classList.add('pt-3');

        const divRaza=document.createElement('div');
        divRaza.classList.add('d-flex','flex-row')
        const spanRaza=document.createElement('span');
        spanRaza.textContent='Raza:';
        spanRaza.classList.add('fw-bold','me-4','ms-2')
        const pRaza=document.createElement('p');
        pRaza.textContent=mascotaObj.raza;
        divRaza.appendChild(spanRaza);
        divRaza.appendChild(pRaza);
        
        const divEdad=document.createElement('div');
        divEdad.classList.add('d-flex','flex-row')
        const spanEdad=document.createElement('span');
        spanEdad.textContent='Edad:';
        spanEdad.classList.add('fw-bold','me-4','ms-2')
        const pEdad=document.createElement('p');
        pRaza.textContent=mascotaObj.raza;
        divRaza.appendChild(spanRaza);
        divRaza.appendChild(pRaza);

        divDescripcionMascota.appendChild(divRaza);
        divResultado.appendChild(divDescripcionMascota);


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
});