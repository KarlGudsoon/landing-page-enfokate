document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const cursoId = urlParams.get("id");

  if (!cursoId) {
    document.getElementById("contenedor-curso").innerText = "No se especificó un curso.";
    return;
  }

  try {
    const res = await fetch("/json/cursos.json");
    const cursos = await res.json();

    const curso = cursos.find(c => c.id === cursoId);

    if (!curso) {
      document.getElementById("contenedor-curso").innerText = "Curso no encontrado.";
      return;
    }

    // Insertar datos en el HTML
    document.getElementById("nombre-curso").textContent = curso.nombre;
    document.getElementById("descripcion-curso").textContent = curso.descripcion;
    document.getElementById("tiempo-curso").textContent = curso.tiempo;
    document.getElementById("duracion-curso").textContent = curso.duracion;
    document.getElementById("modalidad-curso").textContent = curso.modalidad;
    document.getElementById("plataforma-curso").textContent = curso.plataforma;
    document.getElementById("incluye-curso").textContent = curso.incluye;
    document.getElementById("precio-curso").textContent = curso.valor;
    document.querySelectorAll(".tipo-curso").forEach(el => {
      el.textContent = curso.tipo;
    });

    // ¿Para quién es este curso?
    const quienDiv = document.getElementById("quien-curso");
    if (curso.quien && Array.isArray(curso.quien)) {
      quienDiv.innerHTML = `
        <ul>
          ${curso.quien.map(q => `<li>${q}</li>`).join("")}
        </ul>
      `;
    } else {
      return;
    }

    // Contenido del curso
    curso.contenido.forEach((sesion, index) => {
      let details = document.getElementById(`contenido-curso-${index + 1}`);

      // Crear el <details> si no existe
      if (!details) {
        details = document.createElement("details");
        details.id = `contenido-curso-${index + 1}`;
        document.getElementById("contenedor-curso").appendChild(details);
      }

      details.innerHTML = `
        <summary>${sesion.titulo}</summary>
        <ul>
          ${sesion.temas.map(t => `<li>${t}</li>`).join("")}
        </ul>
      `;
    });

    // Eliminar <details> sobrantes
    let totalDetails = document.querySelectorAll('[id^="contenido-curso-"]').length;
    for (let i = curso.contenido.length + 1; i <= totalDetails; i++) {
      const extra = document.getElementById(`contenido-curso-${i}`);
      if (extra) extra.remove();
    }

    // Insertar resultados (si existen)
    if (curso.resultados) {
      const resultadosDiv = document.getElementById("resultados-curso");
      resultadosDiv.innerHTML = `
        <h1>${curso.resultados.titulo}</h1>
        <ul>
          ${curso.resultados.temas.map(t => `<li>${t}</li>`).join("")}
        </ul>
      `;
    }

  } catch (error) {
    document.getElementById("contenedor-curso").innerText = "Error cargando datos.";
    console.error(error);
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const planSeleccionado = urlParams.get("sesion");

  if (planSeleccionado) {
    const select = document.getElementById("sesion");
    select.value = planSeleccionado;
  }
});