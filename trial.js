const id = localStorage.getItem("usuarioID");

// Si es creador → infinito
if (localStorage.getItem("modoCreador") === "true") {
    document.getElementById("diasRestantes").innerText = "∞";
    return;
}

const activa = localStorage.getItem(id + "_pruebaActiva");
const finRaw = localStorage.getItem(id + "_pruebaFin");

// PROTECCIÓN: si finRaw no existe o no es número → premium
if (activa !== "true" || !finRaw || isNaN(Number(finRaw))) {
    location.href = "premium.html";
    return;
}

const fin = Number(finRaw);
const ahora = Date.now();

// 🔥 CÁLCULO PERFECTO DE DÍAS
const dias = Math.floor((fin - ahora) / (1000 * 60 * 60 * 24)) + 1;

// Si terminó → premium
if (dias <= 0) {
    localStorage.removeItem(id + "_pruebaActiva");
    localStorage.removeItem(id + "_pruebaFin");
    location.href = "premium.html";
    return;
}

document.getElementById("diasRestantes").innerText = dias;
