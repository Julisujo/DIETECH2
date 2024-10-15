let recetasGlobales = [];
let dificultadSeleccionada = 'todas';  // Cambiamos a 'todas'

// Función para mostrar las recetas en el contenedor
function mostrarRecetas(recetas, esFiltradoPorDificultad = false) {
    const recetasContainer = document.getElementById("recetas-container");
    recetasContainer.innerHTML = ""; // Limpiar el contenedor antes de mostrar nuevas recetas

    // Iterar sobre las recetas y crear las cards
    recetas.forEach(receta => {
        let nombre, ingredientes, dificultad, calorias, tiempoCoccion;

        // Estructura para recetas filtradas por dificultad (que vienen en arrays)
        if (esFiltradoPorDificultad) {
            nombre = receta[0] || "No especificado";
            ingredientes = receta[1] || "No especificado";
            dificultad = receta[2] || "No especificado";
            calorias = receta[3] || "No especificado";
            tiempoCoccion = receta[4] || "No especificado";
        } else {
            // Estructura para todas las recetas (que vienen en objetos)
            nombre = receta.nombre || "No especificado";
            ingredientes = receta.ingredientes || "No especificado";
            dificultad = receta.dificultad || "No especificado";
            calorias = receta.calorias || "No especificado";
            tiempoCoccion = receta.tiempo_coccion || "No especificado";
        }

        const recetaCard = `
            <div class="receta-card">
                <h3>${nombre}</h3>
                <p><strong>Ingredientes:</strong> ${ingredientes}</p>
                <p><strong>Dificultad:</strong> ${dificultad}</p>
                <p><strong>Calorías:</strong> ${calorias}</p>
                <p><strong>Tiempo de Cocción:</strong> ${tiempoCoccion}</p>
            </div>
        `;
        recetasContainer.innerHTML += recetaCard;
    });
}

// Función para combinar la búsqueda por nombre y dificultad
function filtrarRecetas() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();

    let recetasFiltradas = recetasGlobales;

    if (dificultadSeleccionada === 'todas') {
        // Para todas las recetas, manejar como objetos
        recetasFiltradas = recetasFiltradas.filter(receta =>
            receta.nombre.toLowerCase().includes(searchInput)
        );
        mostrarRecetas(recetasFiltradas);  // Mostrar recetas filtradas
    } else {
        // Para recetas filtradas por dificultad (manejar como arrays)
        recetasFiltradas = recetasFiltradas.filter(receta =>
            receta[0].toLowerCase().includes(searchInput)
        );
        mostrarRecetas(recetasFiltradas, true);  // Mostrar recetas filtradas por dificultad
    }
}

// Función para obtener recetas por dificultad
function obtenerRecetasPorDificultad(dificultad) {
    let url = "http://127.0.0.1:5000/recetas";

    if (dificultad !== 'todas') {
        url = `http://127.0.0.1:5000/recetas/dificultad/${dificultad}`;
    }

    axios.get(url)
        .then(response => {
            const recetas = response.data.recetas || [];
            recetasGlobales = recetas;  // Almacenar las recetas globalmente
            dificultadSeleccionada = dificultad;  // Actualizar el filtro de dificultad

            if (dificultad === 'todas') {
                mostrarRecetas(recetas);  // Mostrar todas las recetas
            } else {
                filtrarRecetas();  // Aplicar el filtro de búsqueda y dificultad
            }
        })
        .catch(error => {
            console.error("Error al obtener las recetas por dificultad:", error);
        });
}

// Obtener todas las recetas al cargar la página
axios.get("http://127.0.0.1:5000/recetas")
    .then(response => {
        const recetas = response.data.recetas || [];
        recetasGlobales = recetas;  // Almacenar todas las recetas globalmente
        mostrarRecetas(recetas);  // Mostrar todas las recetas inicialmente
    })
    .catch(error => {
        console.error("Error al obtener las recetas:", error);
    });

// Escuchar el evento de escritura en la barra de búsqueda
document.getElementById('search-input').addEventListener('input', filtrarRecetas);

// Asignar las funciones de filtrado a los botones de dificultad
document.getElementById('btn-facil').addEventListener('click', () => obtenerRecetasPorDificultad('facil'));
document.getElementById('btn-medio').addEventListener('click', () => obtenerRecetasPorDificultad('medio'));
document.getElementById('btn-dificil').addEventListener('click', () => obtenerRecetasPorDificultad('dificil'));
document.getElementById('btn-todas').addEventListener('click', () => obtenerRecetasPorDificultad('todas'));
