document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const planId = urlParams.get("id");
    
    if (!planId) {
        document.getElementById("contenedor-curso").innerText = "No se especificó un curso.";
        return;
    }
    
    try {
        const res = await fetch("/json/cursos.json");
        const planes = await res.json();
    
        const plan = planes.find(p => p.id === planId);
    
        if (!plan) {
        document.getElementById("contenedor-curso").innerText = "Plan no encontrado.";
        return;
        }
    
        const contenedor = document.getElementById("contenedor-curso");
        contenedor.innerHTML = `
        <p><strong id="precio">${plan.precio}</strong>/mes</p>
        <h1>${plan.nombre}</h1>
        <p>${plan.descripcion}</p>
        <span>Este plan incluye:</span>
        <ul>
            ${plan.beneficios.map(b => `<li>${b}</li>`).join("")}
            
        </ul>
        `;
    } catch (error) {
        document.getElementById("contenedor-curso").innerText = "Error cargando datos.";
        console.error(error);
    }
    
    });