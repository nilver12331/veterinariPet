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
// Inicializar ambos carruseles
initializeCarousel("carousel1", "content1", "prev1", "next1");
initializeCarousel("carousel2", "content2", "prev2", "next2");