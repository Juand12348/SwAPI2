var esFavorito = false;

// 🔹 Agregar o quitar un personaje de favoritos
function toggleFavorito(paramid, paramname) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    let existe = false;

    // Verificar si ya está en favoritos
    for (let i = 0; i < favoritos.length; i++) {
        if (favoritos[i].name === paramname) {
            existe = true;
            break;
        }
    }

    if (existe) {
        favoritos = favoritos.filter(per => per.name !== paramname);
        esFavorito = false;
    } else {
        favoritos.push({
            name: paramname,
            url: `https://www.swapi.tech/api/people/${paramid}/`
        });
        esFavorito = true;
    }

    // Guardar cambios
    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    // Actualizar icono
    const boton = document.querySelector(`#corazon-${paramid}`);
    if (boton) boton.textContent = esFavorito ? "❤️" : "🤍";
}

// 🔹 Mostrar detalle de personaje
async function Detalle(parametro) {
    const root = document.getElementById("root");
    root.innerHTML = `<p>Cargando personaje...</p>`;

    try {
        const res = await fetch(`https://www.swapi.tech/api/people/${parametro}`);
        const data = await res.json();
        const person = data.result.properties;

        // Verificar si ya está en favoritos
        const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        esFavorito = favoritos.some(per => per.name === person.name);

        // Construcción del detalle
        root.innerHTML = `
        <section class="c-detalle">
            <h2>${person.name}</h2>
            <p><b>Género:</b> ${person.gender}</p>
            <p><b>Color de piel:</b> ${person.skin_color}</p>
            <p><b>Color de cabello:</b> ${person.hair_color}</p>
            <p><b>Altura:</b> ${person.height} cm</p>
            <p><b>Color de ojos:</b> ${person.eye_color}</p>
            <p><b>Peso:</b> ${person.mass} kg</p>

            <button onClick="toggleFavorito('${parametro}', '${person.name}')">
                <span id="corazon-${parametro}">${esFavorito ? '❤️' : '🤍'}</span> Favorito
            </button>

            <br><br>
            <button onClick="General()">⬅ Volver al Home</button>
        </section>
        `;
    } catch (error) {
        console.error(error);
        root.innerHTML = `<p>Error al cargar personaje</p>`;
    }
}
