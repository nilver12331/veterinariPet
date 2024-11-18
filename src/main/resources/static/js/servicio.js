// Carousel configuration
const gap = 16;

function initializeCarousel(carouselId, contentId, prevId, nextId) {
    const carousel = document.getElementById(carouselId),
          content = document.getElementById(contentId),
          next = document.getElementById(nextId),
          prev = document.getElementById(prevId);
    
    let itemWidth = document.querySelector(`#${contentId} .item`).offsetWidth + gap; // Ancho inicial de un ítem
    // Desplazar a la derecha
    next.addEventListener("click", () => {
        carousel.scrollBy(itemWidth, 0);
        setTimeout(updateButtonVisibility, 100);
    });
    // Desplazar a la izquierda
    prev.addEventListener("click", () => {
        carousel.scrollBy(-itemWidth, 0);
        setTimeout(updateButtonVisibility, 100);
    });
    // Actualiza la visibilidad de los botones
    function updateButtonVisibility() {
        prev.style.display = carousel.scrollLeft <= 0 ? "none" : "flex";
        next.style.display = (carousel.scrollLeft + carousel.offsetWidth >= content.scrollWidth - itemWidth) ? "none" : "flex";
    }
    // Recalcular el ancho del ítem al redimensionar la ventana
    window.addEventListener("resize", () => {
        itemWidth = document.querySelector(`#${contentId} .item`).offsetWidth + gap;
        updateButtonVisibility();
    });
    // Inicializar la visibilidad de los botones
    updateButtonVisibility();
}


document.addEventListener('DOMContentLoaded',()=>{
    cargarServicios();
});
  // Función para obtener y mostrar los servicios
async function cargarServicios() {
        try {
            const response = await fetch('/servicios/especialidad'); // Cambia esta URL si es necesario
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            mostrarEspecialidadesHtml(data);
        } catch (error) {
            console.log('Error al cargar los servicios:', error);
        }
    }

    function mostrarEspecialidadesHtml(data) {
        const listaServicios = document.querySelector('#lista-servicios');
        data.forEach(mascota => {
            const { idEspecialidad, nombreEspecialidad, servicios } = mascota;

            const divEspecialidad = document.createElement('div');
            divEspecialidad.classList.add('row', "especialidad");

            const txtEspecialidad = document.createElement('h1');
            txtEspecialidad.textContent = nombreEspecialidad;
            divEspecialidad.appendChild(txtEspecialidad);

            const divWrapper = document.createElement('div');
            divWrapper.id = `wrapper${idEspecialidad}`;
            divWrapper.classList.add('wrapper');
            divEspecialidad.appendChild(divWrapper);

            const divCarousel = document.createElement('div');
            divCarousel.id = `carousel${idEspecialidad}`; // Cambio aquí para hacer único el ID
            divCarousel.classList.add('carousel');
            divWrapper.appendChild(divCarousel);

            const divContent = document.createElement('div');
            divContent.classList.add('content');
            divContent.id = `content${idEspecialidad}`;
            divCarousel.appendChild(divContent);

            servicios.forEach(servicio => {
                const { costo, idTipoServicio, img, nombreServicio,descripcion } = servicio;
                // Uso
                const textoTruncado = truncarTexto(descripcion, 60);
                divContent.innerHTML += `
                <div class="card card-style item" style="width: 18rem;">
                    <img src="imgEspecialidades/${img}" class="card-img-top img-card" alt="imagen">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title" data-servicio-id="${idTipoServicio}" data-especialidad-nombre="${nombreEspecialidad}" data-especialidad-id="${idEspecialidad}">${nombreServicio}</h5>
                        <p class="card-text">${textoTruncado}</p>
                        <div class="d-flex flex-row card-tex">
                            <p class="fw-bold">Precio: S/</p><span class="pb-4 fw-bold">${costo}</span>
                        </div>
                        <div class="d-flex justify-content-center">
                            <a href="#" class="btn btn-op-1 w-75 agregar-servicio">Agregar a Cita</a>
                        </div>
                    </div>
                </div>
                `;
            });
            divWrapper.innerHTML += `
            <button id="prev${idEspecialidad}" type="button" class="btn-prev"><i class="fa-solid fa-arrow-left"></i></button>
            <button id="next${idEspecialidad}" type="button" class="btn-next"><i class="fa-solid fa-arrow-right"></i></button>
            `;

            listaServicios.appendChild(divEspecialidad);

            // Llamar a initializeCarousel con los IDs correctos
            setTimeout(() => {
                initializeCarousel(
                    `carousel${idEspecialidad}`,
                    `content${idEspecialidad}`,
                    `prev${idEspecialidad}`,
                    `next${idEspecialidad}`
                );
            },200); // Ajustar el tiempo según sea necesario
        });
    }

    function truncarTexto(texto, limite) {
        return texto.length > limite ? texto.substring(0, limite) + "..." : texto;
    }