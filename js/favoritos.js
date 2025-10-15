function Favoritos() {
    // Leer favoritos del localStorage
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const root = document.getElementById("root");

    // Si no hay favoritos, mostrar mensaje
    if (favoritos.length === 0) {
        root.innerHTML = `<p>No hay favoritos ❤️‍🩹</p>`;
        return;
    }

    // Asegurar que cada favorito tenga uid y name (por compatibilidad)
    const listaLimpia = favoritos.map(fav => ({
        uid: fav.uid || fav.id || "?", // por si el formato cambia
        name: fav.name || fav.properties?.name || "Desconocido",
        properties: fav.properties || {}
    }));

    // Generar HTML de la lista usando la misma función global
    const listaHTML = generarLista(listaLimpia);

    // Mostrar en pantalla
    root.innerHTML = `
        <h2>Favoritos</h2>
        <section id="la-lista">${listaHTML}</section>
        <button onclick="General()">⬅ Volver al Home</button>
    `;
}
