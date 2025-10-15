// Guardar personajes descubiertos
var misNumeros = JSON.parse(localStorage.getItem("misNumeros")) || [];

// Generar 4 personajes aleatorios
function Aleatorios() {
    document.getElementById("nuevos").innerHTML = "";
    console.log("----------------------------------");

    let nuevosPersonajes = "";

    for (let i = 0; i < 4; i++) {
        let num = Math.floor(Math.random() * personajes.length) + 1; // de 1 a 83
        let personaje = personajes[num - 1];
        let nombre = personaje?.name || personaje?.properties?.name || "Desconocido";

        // Mostrar los nuevos personajes aleatorios
        nuevosPersonajes += `
            <div class="c-lista-personaje c-un_aleatorio">
                <p>#${num}</p>
                <p>${nombre}</p>
            </div>`;

        // Comprobar si ya existe
        misNumeros = JSON.parse(localStorage.getItem("misNumeros")) || [];
        let existe = misNumeros.includes(num);

        // Si no existe, agregarlo
        if (!existe) {
            misNumeros.push(num);
            localStorage.setItem("misNumeros", JSON.stringify(misNumeros));

            // Mostrarlo en el álbum
            document.getElementById("c-unper-" + num).innerHTML = `
                <div onclick="Personaje('${personaje.uid}')">
                    <p>#${num}</p>
                    <p>${nombre}</p>
                </div>`;
            document.getElementById("c-unper-" + num).classList.add("c-mios-personajes");
        }
    }

    // Mostrar los nuevos en pantalla
    document.getElementById("nuevos").innerHTML += nuevosPersonajes;
    document.getElementById("contador").innerHTML = `${misNumeros.length} / ${personajes.length}`;
}

// Mostrar álbum original (todos los personajes)
function Original() {
    const root = document.getElementById("root");
    let misNumeros = JSON.parse(localStorage.getItem("misNumeros")) || [];

    // Estructura principal con el botón arriba
    let misPersonajes = `
        <section class="c-misper">
            <button class="btn-aleatorios" onclick="Aleatorios()">🎲 Generar Aleatorios</button>
            <div id="nuevos" class="c-nuevos"></div>
            <p id="contador">${misNumeros.length} / ${personajes.length}</p>
            <div class="c-album">
    `;

    // Recorrer todos los personajes
    for (let i = 1; i <= personajes.length; i++) {
        let personaje = personajes[i - 1];
        let nombre = personaje?.name || personaje?.properties?.name || "Desconocido";

        if (misNumeros.includes(i)) {
            misPersonajes += `
                <div class="c-unper c-mios-personajes" id="c-unper-${i}" onclick="Personaje('${personaje.uid}')">
                    <p>#${i}</p>
                    <p>${nombre}</p>
                </div>`;
        } else {
            misPersonajes += `
                <div class="c-unper no-capturado" id="c-unper-${i}">
                    <p>#${i}</p>
                    <p>???</p>
                </div>`;
        }
    }

    misPersonajes += `
            </div> <!-- cierre álbum -->
        </section>
    `;

    root.innerHTML = misPersonajes;
}
