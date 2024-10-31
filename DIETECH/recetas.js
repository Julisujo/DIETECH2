let recetasGlobales = [];
let dificultadSeleccionada = 'todas'; //

function mostrarRecetas(recetas, esFiltradoPorDificultad = false) {
    const recetasContainer = document.getElementById("recetas-container");
    recetasContainer.innerHTML = "";

    recetas.forEach((receta, index) => {
        let nombre, ingredientes, dificultad, calorias, tiempoCoccion;

        if (esFiltradoPorDificultad) {
            [nombre, ingredientes, dificultad, calorias, tiempoCoccion] = receta;
        } else {
            ({ nombre, ingredientes, dificultad, calorias, tiempo_coccion: tiempoCoccion } = receta);
        }

        const recetaCard = `
            <div class="receta-card">
                <h3>${nombre}</h3>
                <p><strong>Ingredientes:</strong> ${ingredientes}</p>
                <p><strong>Dificultad:</strong> ${dificultad}</p>
                <p><strong>Calorías:</strong> ${calorias}</p>
                <p><strong>Tiempo de Cocción:</strong> ${tiempoCoccion}</p>
                <button class="btn-agregar-receta" onclick="agregarARecetasGuardadas(${index}, ${esFiltradoPorDificultad})">+</button>
            </div>
        `;
        recetasContainer.innerHTML += recetaCard;
    });
}

function agregarARecetasGuardadas(index, esFiltradoPorDificultad) {
    let recetaSeleccionada;

    if (esFiltradoPorDificultad) {
        recetaSeleccionada = recetasGlobales[index];
    } else {
        recetaSeleccionada = recetasGlobales[index];
    }

    let recetasGuardadas = JSON.parse(localStorage.getItem("misRecetas")) || [];
    recetasGuardadas.push(recetaSeleccionada);
    localStorage.setItem("misRecetas", JSON.stringify(recetasGuardadas));

    alert("Receta agregada a 'Mis Recetas'.");
}

function filtrarRecetas() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    let recetasFiltradas = recetasGlobales;

    if (dificultadSeleccionada === 'todas') {
        recetasFiltradas = recetasFiltradas.filter(receta =>
            receta.nombre.toLowerCase().includes(searchInput)
        );
        mostrarRecetas(recetasFiltradas);
    } else {
        recetasFiltradas = recetasFiltradas.filter(receta =>
            receta[0].toLowerCase().includes(searchInput)
        );
        mostrarRecetas(recetasFiltradas, true);
    }
}

function obtenerRecetasPorDificultad(dificultad) {
    let url = "http://127.0.0.1:5000/recetas";

    if (dificultad !== 'todas') {
        url = `http://127.0.0.1:5000/recetas/dificultad/${dificultad}`;
    }

    axios.get(url)
        .then(response => {
            const recetas = response.data.recetas || [];
            recetasGlobales = recetas;
            dificultadSeleccionada = dificultad;

            if (dificultad === 'todas') {
                mostrarRecetas(recetas);
            } else {
                filtrarRecetas();
            }
        })
        .catch(error => {
            console.error("Error al obtener las recetas:", error);
        });
}

axios.get("http://127.0.0.1:5000/recetas")
    .then(response => {
        const recetas = response.data.recetas || [];
        recetasGlobales = recetas;
        mostrarRecetas(recetas);
    })
    .catch(error => {
        console.error("Error al obtener las recetas:", error);
    });

document.getElementById('search-input').addEventListener('input', filtrarRecetas);

document.getElementById('btn-facil').addEventListener('click', () => obtenerRecetasPorDificultad('facil'));
document.getElementById('btn-medio').addEventListener('click', () => obtenerRecetasPorDificultad('medio'));
document.getElementById('btn-dificil').addEventListener('click', () => obtenerRecetasPorDificultad('dificil'));
document.getElementById('btn-todas').addEventListener('click', () => obtenerRecetasPorDificultad('todas'));
