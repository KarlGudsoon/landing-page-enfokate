document.addEventListener("DOMContentLoaded", function () {
  const carousels = document.querySelectorAll(".inner");

  carousels.forEach((carousel) => {
    let isDragging = false;
    let startX, startScrollLeft;
    let initialTouchX, initialTouchY;

    const dragStart = (e) => {
      if (e.type === "touchstart") {
        initialTouchX = e.touches[0].clientX;
        initialTouchY = e.touches[0].clientY;
      }
      isDragging = true;
      startX = e.pageX || e.touches[0].pageX;
      startScrollLeft = carousel.scrollLeft;
      carousel.style.cursor = "grabbing";
      carousel.style.userSelect = "none";
    };

    const dragging = (e) => {
      if (!isDragging) return;
      if (e.type === "touchmove") {
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        const deltaX = Math.abs(touchX - initialTouchX);
        const deltaY = Math.abs(touchY - initialTouchY);
        if (deltaY > deltaX) {
          isDragging = false;
          return;
        }
      }

      e.preventDefault();
      const x = e.pageX || e.touches[0].pageX;
      carousel.scrollLeft = startScrollLeft - (x - startX);
    };

    const dragStop = () => {
      isDragging = false;
      carousel.style.cursor = "grab";
      carousel.style.removeProperty("user-select");
    };

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);

    carousel.addEventListener("touchstart", dragStart, { passive: false });
    carousel.addEventListener("touchmove", dragging, { passive: false });
    document.addEventListener("touchend", dragStop);

    // Botones
    const wrapper = carousel.closest(".carousel-wrapper");
    const btnPrev = wrapper.querySelector(".scroll-btn.prev");
    const btnNext = wrapper.querySelector(".scroll-btn.next");

    btnPrev.addEventListener("click", () => {
      carousel.scrollBy({ left: -200, behavior: "smooth" });
    });

    btnNext.addEventListener("click", () => {
      carousel.scrollBy({ left: 200, behavior: "smooth" });
    });
  });
});
  

const botonPlanes = document.querySelectorAll(".boton-plan");

botonPlanes.forEach((boton) => {
  boton.addEventListener("click", () => {
    const contenedorPlan = boton.getAttribute("data-contenedor");
    const contenedor = document.getElementById(`${contenedorPlan}`);

    const contenedores = document.querySelectorAll(".contenedor-cartas-planes");
    contenedores.forEach((c) => {
      c.classList.remove("active");
    });

    contenedor.classList.add("active");

    const cartas = contenedor.querySelectorAll(".cartas-plan");

    // Eliminar clase previa por si acaso y volver a agregarla con un pequeño retraso (para reiniciar la animación)
    cartas.forEach((carta) => {
      carta.classList.remove("fade-in");
      void carta.offsetWidth; // Fuerza reflow para reiniciar animación
      carta.classList.add("fade-in");
    });




  });
});