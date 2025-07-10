const contenedorPortafolio = document.getElementById('contenedor-portafolio');

for (let i = 4000; i >= 3600; i--) {
  const img = new Image();
  img.src = `/assets/img/portafolio/IMG_${i}.webp`;
  img.alt = `Imagen del portafolio ${i}`;
  img.classList.add('imagen-portafolio');

  img.onload = () => {
    contenedorPortafolio.appendChild(img);
    setTimeout(() => {
      img.classList.add('visible');
    }, 50);
  };

  img.onerror = () => {
    // No hace nada, simplemente ignora la imagen que no existe
    console.warn(`Imagen IMG_${i}.webp no encontrada`);
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
