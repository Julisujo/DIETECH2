// Función para mostrar los ingredientes en el contenedor
function mostrarIngredientes(ingredientes) {
    const ingredientesContainer = document.getElementById("ingredientes-container");
    ingredientesContainer.innerHTML = ""; // Limpiar el contenedor antes de mostrar nuevos ingredientes

    // Iterar sobre los ingredientes y crear las cards
    ingredientes.forEach(ingrediente => {
        const ingredienteCard = `
            <div class="ingrediente-card">
                <h3>${ingrediente[0]}</h3> <!-- Nombre del ingrediente -->
                <p><strong>Tipo:</strong> ${ingrediente[2]}</p> <!-- Tipo del alimento -->
                <p><strong>Calorías:</strong> ${ingrediente[1]}</p> <!-- Calorías -->
            </div>
        `;
        ingredientesContainer.innerHTML += ingredienteCard;
    });
}

// Función para filtrar ingredientes por nombre
function filtrarPorNombre() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();

    // Llamar a la API para obtener todos los ingredientes y luego filtrar por nombre
    axios.get("http://127.0.0.1:5000/ingredientes")
        .then(response => {
            const ingredientes = response.data.ingredientes || [];

            // Filtrar los ingredientes que contienen el texto ingresado en el nombre
            const ingredientesFiltrados = ingredientes.filter(ingrediente =>
                ingrediente[0].toLowerCase().includes(searchInput)
            );
            mostrarIngredientes(ingredientesFiltrados); // Mostrar los ingredientes filtrados
        })
        .catch(error => {
            console.error("Error al obtener los ingredientes:", error);
        });
}

// Llamada a la API al cargar la página para mostrar todos los ingredientes inicialmente
axios.get("http://127.0.0.1:5000/ingredientes")
    .then(response => {
        const ingredientes = response.data.ingredientes || [];
        mostrarIngredientes(ingredientes);  // Mostrar todos los ingredientes inicialmente
    })
    .catch(error => {
        console.error("Error al obtener los ingredientes:", error);
    });

// Escuchar el evento de escritura en la barra de búsqueda para filtrar por nombre
document.getElementById('search-input').addEventListener('input', filtrarPorNombre);
