let esFavorito = false;

// 💾 Agregar o quitar personaje de favoritos
function toggleFavorito(uid, name) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    let existe = favoritos.some(fav => fav.uid === uid);

    if (existe) {
        favoritos = favoritos.filter(fav => fav.uid !== uid);
        esFavorito = false;
    } else {
        favoritos.push({ uid, name });
        esFavorito = true;
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    // Cambiar el ícono si el botón existe
    const boton = document.querySelector(`#corazon-${uid}`);
    if (boton) boton.textContent = esFavorito ? "❤️" : "🤍";
}

// 🧑‍🚀 Mostrar detalle del personaje
async function Detalle(uid) {
    const root = document.getElementById("root");
    root.innerHTML = `<p>Cargando detalle...</p>`;

    try {
        const res = await fetch(`https://www.swapi.tech/api/people/${uid}`);
        const data = await res.json();
        const personaje = data.result.properties;

        // Revisar si ya está en favoritos
        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        esFavorito = favoritos.some(fav => fav.uid === uid);

        // Plantilla HTML del detalle
        root.innerHTML = `
            <section class="c-detalle">
                <h2>${personaje.name}</h2>
                <p><strong>Altura:</strong> ${personaje.height} cm</p>
                <p><strong>Peso:</strong> ${personaje.mass} kg</p>
                <p><strong>Color de cabello:</strong> ${personaje.hair_color}</p>
                <p><strong>Color de piel:</strong> ${personaje.skin_color}</p>
                <p><strong>Género:</strong> ${personaje.gender}</p>
                <p><strong>Año de nacimiento:</strong> ${personaje.birth_year}</p>

                <button onclick="toggleFavorito('${uid}', '${personaje.name}')">
                    <span id="corazon-${uid}">${esFavorito ? '❤️' : '🤍'}</span> Favorito
                </button>

                <br><br>
                <button onclick="General()">⬅ Volver al Home</button>
            </section>
        `;
    } catch (error) {
        console.error(error);
        root.innerHTML = `<p>Error al cargar el detalle del personaje.</p>`;
    }
}
