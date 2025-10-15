function generarLista(arrayPersonajes) {
    let listaHTML = "";
    for (let i = 0; i < arrayPersonajes.length; i++) {
        
        let id = arrayPersonajes[i].uid;

        
        let name = arrayPersonajes[i].name 
            ? arrayPersonajes[i].name 
            : (arrayPersonajes[i].properties?.name || "Desconocido");

        listaHTML += `
        <div class="c-lista-personaje person-${id}" onclick="Detalle('${id}')">
            <p>#${id}</p>
            <p>${name}</p>
        </div>`;
    }

    return listaHTML;
}


function buscadorfuncion(sza) {
    if (sza.length >= 3) {
        const filtrados = [];
        for (let i = 0; i < personajes.length; i++) {
            const nombre = personajes[i].name 
                ? personajes[i].name.toLowerCase() 
                : (personajes[i].properties?.name.toLowerCase() || "");

            if (nombre.includes(sza.toLowerCase())) {
                filtrados.push(personajes[i]);
            }
        }
        let listaHTML = generarLista(filtrados);
        document.getElementById("la-lista").innerHTML = listaHTML;
    } else {
        let listaHTML = generarLista(personajes);
        document.getElementById("la-lista").innerHTML = listaHTML;
    }
}


function Home() {
    const root = document.getElementById("root");
    root.innerHTML = ""; 

    
    const buscador = document.createElement("input");
    buscador.classList.add("c-buscador");
    buscador.type = "text";
    buscador.placeholder = "Buscar Personaje...";
    buscador.addEventListener("input", () => {
        buscadorfuncion(buscador.value);
    });

    
    const categorias = [
        { id: "people", titulo: "Personajes" },
        { id: "films", titulo: "Películas" },
        { id: "species", titulo: "Especies" },
        { id: "planets", titulo: "Planetas" },
        { id: "starships", titulo: "Naves" },
        { id: "vehicles", titulo: "Vehículos" }
    ];

    const contenedorCategorias = document.createElement("div");
    contenedorCategorias.classList.add("categorias-container");

    categorias.forEach(cat => {
        const btn = document.createElement("button");
        btn.textContent = cat.titulo;
        btn.addEventListener("click", () => {
            MostrarCategoria(cat.id, cat.titulo);
        });
        contenedorCategorias.appendChild(btn);
    });

    
    const listaHTML = generarLista(personajes);
    const contenedorPersonajes = document.createElement("section");
    contenedorPersonajes.id = "la-lista";
    contenedorPersonajes.innerHTML = listaHTML;

    
    root.appendChild(buscador);
    root.appendChild(contenedorCategorias);
    root.appendChild(contenedorPersonajes);
}


async function MostrarCategoria(categoria, titulo) {
    const root = document.getElementById("root");
    root.innerHTML = `<h2>${titulo}</h2><p>Cargando...</p>`;

    try {
        const res = await fetch(`https://www.swapi.tech/api/${categoria}?limit=100`);
        const data = await res.json();

        let listaHTML = "";

        if (data.results) {
            
            data.results.forEach(item => {
                listaHTML += `
                <div class="c-lista-personaje">
                    <p>${item.name}</p>
                    <small>UID: ${item.uid}</small>
                </div>`;
            });
        } else if (data.result) {
            
            data.result.forEach(item => {
                listaHTML += `
                <div class="c-lista-personaje">
                    <p>${item.properties.title}</p>
                    <small>Episode: ${item.properties.episode_id}</small>
                </div>`;
            });
        }

        root.innerHTML = `
            <h2>${titulo}</h2>
            <section class="c-lista">
                ${listaHTML}
            </section>
            <button onclick="General()">⬅ Volver al Home</button>
        `;

    } catch (error) {
        console.error(error);
        root.innerHTML = `<p>Error cargando ${titulo}</p>`;
    }
}
