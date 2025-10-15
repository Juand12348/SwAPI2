let personajes = [];
let totalPersonajes = 83;

// 🔹 Función de conexión principal
async function Conexion(filtroOrigen) {
  if (filtroOrigen === "All") {
    // Trae todos los personajes
    const res = await fetch("https://www.swapi.tech/api/people?page=1&limit=1000");
    const data = await res.json();
    return data.results;
  } else {
    // Trae personajes por planeta
    const res = await fetch(`https://www.swapi.tech/api/planets/${filtroOrigen}`);
    const data = await res.json();
    const residents = data.result.properties.residents;

    const personajesOrigen = [];

    // Si el planeta no tiene residentes, devolver array vacío
    if (!residents || residents.length === 0) {
      return [];
    }

    // 🔹 Hacer fetch por cada residente
    for (let url of residents) {
      try {
        const resPerson = await fetch(url);
        const dataPerson = await resPerson.json();
        personajesOrigen.push({
          uid: dataPerson.result.uid,
          name: dataPerson.result.properties.name,
        });
      } catch (error) {
        console.error("Error cargando personaje de planeta:", error);
      }
    }

    return personajesOrigen;
  }
}

// 🔹 Cargar todos los personajes al iniciar
async function General() {
  const root = document.getElementById("root");
  root.innerHTML = "<p>Cargando personajes...</p>";

  if (personajes.length === 0) {
    personajes = await Conexion("All");
  }

  // Mostrar en pantalla
  Home();
}

General();

// 🔹 Filtro de planetas
async function FiltroConexion(Elfiltro) {
  const root = document.getElementById("root");
  root.innerHTML = "<p>Cargando personajes del planeta...</p>";

  const personajesFiltrados = await Conexion(Elfiltro);

  if (personajesFiltrados.length === 0) {
    root.innerHTML = `<p>No hay personajes registrados en este planeta.</p>
                      <button onclick="General()">⬅ Volver</button>`;
    return;
  }

  // Mostrar resultados filtrados
  const listaHTML = generarLista(personajesFiltrados);
  root.innerHTML = `
    <button onclick="General()">⬅ Volver</button>
    <section id="la-lista">${listaHTML}</section>
  `;
}
