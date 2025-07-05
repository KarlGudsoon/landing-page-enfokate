document.addEventListener("DOMContentLoaded", async () => {
const urlParams = new URLSearchParams(window.location.search);
const planId = urlParams.get("id");

if (!planId) {
    document.getElementById("contenedor-plan").innerText = "No se especificó un plan.";
    return;
}

try {
    const res = await fetch("/json/servicio.json");
    const planes = await res.json();

    const plan = planes.find(p => p.id === planId);

    if (!plan) {
    document.getElementById("contenedor-plan").innerText = "Plan no encontrado.";
    return;
    }

    const contenedor = document.getElementById("contenedor-plan");
    contenedor.innerHTML = `
    <h1>${plan.nombre}</h1>
    <p>${plan.descripcion}</p>
    ${plan.beneficios.map(b => `
          <ul style="width: 100%;">
          <h1>${b.titulo}</h1>
            ${b.detalles.map(detalle => `<li>${detalle}</li>`).join('')}
            <p class="precio-curso">Valor: ${b.valor}</p>
          </ul>
      `).join('')}
  
    `;
    contenedor.setAttribute("style", `--color: ${plan.color};`);
} catch (error) {
    document.getElementById("contenedor-plan").innerText = "Error cargando datos.";
    console.error(error);
}

});


document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const planSeleccionado = urlParams.get("servicio");
  
    if (planSeleccionado) {
      const select = document.getElementById("servicio");
      select.value = planSeleccionado;
    }
  });