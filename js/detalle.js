document.addEventListener("DOMContentLoaded", async () => {
const urlParams = new URLSearchParams(window.location.search);
const planId = urlParams.get("id");

if (!planId) {
    document.getElementById("contenedor-plan").innerText = "No se especificó un plan.";
    return;
}

try {
    const res = await fetch("/json/marketing.json");
    const planes = await res.json();

    const plan = planes.find(p => p.id === planId);

    if (!plan) {
    document.getElementById("contenedor-plan").innerText = "Plan no encontrado.";
    return;
    }

    if (!plan.imagen) {
        const img = document.querySelector(".imagen-plan");
        if (img) {
            img.remove();
        }
    }

    const contenedor = document.getElementById("contenedor-plan");
    contenedor.innerHTML = `
    <img src="${plan.imagen}" class="imagen-plan"/>
    <p><strong id="precio">${plan.precio}</strong>/mes</p>
    <h1>${plan.nombre}</h1>
    <p>${plan.descripcion}</p>
    <span>Este plan incluye:</span>
    <ul>
        ${plan.beneficios.map(b => `<li>${b}</li>`).join("")}
        
    </ul>
    `;
    contenedor.setAttribute("style", `--color: ${plan.color};`);
} catch (error) {
    document.getElementById("contenedor-plan").innerText = "Error cargando datos.";
    console.error(error);
}

});


document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const planSeleccionado = urlParams.get("plan");
  
    if (planSeleccionado) {
      const select = document.getElementById("plan");
      select.value = planSeleccionado;
    }
  });