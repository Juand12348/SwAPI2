function Informativa() {
    const root = document.getElementById("root");
    root.innerHTML = "<h2>Información de la API</h2><p>Cargando...</p>";

    fetch("https://www.swapi.tech/api/")
        .then(res => res.json())
        .then(data => {
            const categorias = data.result;
            let html = "<ul>";
            for (const key in categorias) {
                html += `<li><b>${key}</b>: ${categorias[key]}</li>`;
            }
            html += "</ul>";
            root.innerHTML = "<h2>Información de la API</h2>" + html;
        })
        .catch(err => {
            root.innerHTML = "<p>Error cargando la información</p>";
            console.error(err);
        });
}