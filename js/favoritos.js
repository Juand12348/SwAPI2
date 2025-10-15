function Favoritos() {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const root = document.getElementById("root");

    if (favoritos.length === 0) {
        root.innerHTML = `<p>No hay favoritos</p>`;
    } else {
        let listaHTML = "";
        for (let i = 0; i < favoritos.length; i++) {
            listaHTML += `
            <div class="c-lista-personaje" onclick="Detalle('${favoritos[i].uid}')">
                <p>#${favoritos[i].uid}</p>
                <p>${favoritos[i].name}</p>
            </div>`;
        }

        root.innerHTML = `
            <h2>Favoritos</h2>
            <section class="c-lista">
                ${listaHTML}
            </section>
            <button onclick="General()">⬅ Volver al Home</button>
        `;
    }
}
