let personajes = [];
let totalPersonajes = 83;

// 🔹 Conexión para obtener todos los personajes (todas las páginas de la API)
async function Conexion() {
  let allResults = [];
  let page = 1;
  let seguir = true;

  try {
    while (seguir) {
      const res = await fetch(`https://www.swapi.tech/api/people?page=${page}&limit=10`);
      const data = await res.json();

      if (data.results && data.results.length > 0) {
        allResults = allResults.concat(data.results);
        page++;
      } else {
        seguir = false;
      }
    }

    console.log("✅ Personajes cargados:", allResults.length);
    return allResults;
  } catch (error) {
    console.error("❌ Error al cargar personajes:", error);
    return [];
  }
}

// 🔹 Función principal: inicializa toda la app
async function General() {
    try {
        await Home();
    } catch (error) {
        console.error("Error al iniciar la app:", error);
        document.getElementById("root").innerHTML = "<p>Error al conectar con la API</p>";
    }
}

General();

