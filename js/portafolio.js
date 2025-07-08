const contenedorPortafolio = document.getElementById('contenedor-portafolio');

for (let i = 3635; i <= 5000; i++) {
  const img = new Image();
  img.src = `/assets/img/portafolio/IMG_${i}.webp`;
  img.alt = `Imagen del portafolio ${i}`;
  img.classList.add('imagen-portafolio');

  img.onload = () => {
    contenedorPortafolio.appendChild(img);
    // Espera un momento y luego aplica la clase "visible"
    setTimeout(() => {
      img.classList.add('visible');
    }, 50); // pequeño retardo para que la transición se active
  };

  img.onerror = () => {
    console.warn(`Imagen no encontrada: IMG_${i}.webp`);
  };
}

const visor = document.getElementById("visor");
const imagenGrande = document.getElementById("imagen-grande");
const cerrar = document.querySelector(".cerrar");

// Abrir visor al hacer clic en una miniatura
contenedorPortafolio.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    imagenGrande.src = e.target.src;
    visor.classList.add("visible");
    document.body.style.overflow = "hidden"; // Evitar scroll al abrir el visor
  }
});

// Cerrar visor
cerrar.addEventListener("click", () => {
  visor.classList.remove("visible");
  document.body.style.overflow = "auto";
});

// Cerrar haciendo clic fuera de la imagen
visor.addEventListener("click", (e) => {
  if (e.target === visor) {
    visor.classList.remove("visible");
    document.body.style.overflow = "auto";
  }
});
