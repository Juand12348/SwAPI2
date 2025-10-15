let personajes = [];
let totalPersonajes = 82;

// 🔹 Conexión para obtener la lista de personajes
async function Conexion(filtroEspecie) {
    if (filtroEspecie == "All") {
        const res = await fetch(`https://www.swapi.tech/api/people?limit=${totalPersonajes}`);
        const data = await res.json();
        return data.results;
    } else {
        const res = await fetch(`https://www.swapi.tech/api/species/${filtroEspecie}`);
        const data = await res.json();

        // Ojo: aquí está la ruta correcta a los personajes de esa especie
        const personajeEspecie = data.result.properties.people;

        return personajeEspecie;
    }
}

// 🔹 Cargar todos los Personajes al iniciar
async function General() {
    if (personajes.length === 0) {
        personajes = await Conexion("All");
    }
    Home();
}

General();

// 🔹 Filtro por especie
async function FiltroConexion(Elfiltro) {
    document.getElementById("la-lista").innerHTML = "";
    personajes = await Conexion(Elfiltro);
    const listaHTML = generarLista(personajes);
    document.getElementById("la-lista").innerHTML = listaHTML;
}
