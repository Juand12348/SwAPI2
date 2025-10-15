function Informativa() {
    const root = document.getElementById("root");
    root.innerHTML = `
    <section class="informativa">
        <h1 class="titulo">SWA API</h1>
        <p class="autor">Juan David Martínez Niño</p>
        <img class="logo" src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg" alt="Logo Star Wars"/>
        <div class="descripcion">
            <p>API con información de los 83 personajes de Star Wars</p>
        </div>
        <p class="link"><a href="https://github.com/Juand12348" target="_blank">github.com/Juand12348</a></p>
        <p class="version">v 1.1.0</p>
    </section>
    `;
}
