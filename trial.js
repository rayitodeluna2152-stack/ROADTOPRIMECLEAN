const id = localStorage.getItem("usuarioID");

// Si es creador → infinito
if (localStorage.getItem("modoCreador") === "true") {
    document.getElementById("diasRestantes").innerText = "∞";
    return;
}

// Leer estado de prueba
const activa = localStorage.getItem(id + "_pruebaActiva");
const finRaw = localStorage.getItem(id + "_pruebaFin");

// 🔒 PROTECCIÓN REAL: solo entra si la prueba está activada correctamente
if (activa !== "true") {
    // La prueba NO está activada → premium
    location.href = "premium.html";
    return;
}

// 🔒 PROTECCIÓN: fecha corrupta o inexistente
if (!finRaw || isNaN(Number(finRaw))) {
    // La prueba está mal guardada → se elimina y se manda a premium
    localStorage.removeItem(id + "_pruebaActiva");
    localStorage.removeItem(id + "_pruebaFin");
    location.href = "premium.html";
    return;
}

const fin = Number(finRaw);
const ahora = Date.now();

// 🔥 CÁLCULO PERFECTO DE DÍAS RESTANTES
const dias = Math.ceil((fin - ahora) / (1000 * 60 * 60 * 24));

// Si terminó → borrar prueba y mandar a premium
if (dias <= 0) {
    localStorage.removeItem(id + "_pruebaActiva");
    localStorage.removeItem(id + "_pruebaFin");
    location.href = "premium.html";
    return;
}

// Mostrar días restantes
document.getElementById("diasRestantes").innerText = dias;
