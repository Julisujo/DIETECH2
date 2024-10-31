function mostrarIngredientes(ingredientes) {
    const ingredientesContainer = document.getElementById("ingredientes-container");
    ingredientesContainer.innerHTML = "";


    ingredientes.forEach((ingrediente, index) => {
        const ingredienteCard = `
            <div class="ingrediente-card" data-nombre="${ingrediente[0]}" data-tipo="${ingrediente[2]}" data-calorias="${ingrediente[1]}">
                <h3>${ingrediente[0]}</h3> 
                <p><strong>Tipo:</strong> ${ingrediente[2]}</p> 
                <p><strong>Calorías:</strong> ${ingrediente[1]}</p> 

                <button class="agregar-ingrediente-btn" onclick="mostrarInputCantidad(${index})">+</button>
                <div class="cantidad-container" id="cantidad-container-${index}" style="display: none;">
                    <label for="cantidad-${index}">Cantidad:</label>
                    <input type="text" id="cantidad-${index}" class="cantidad-input" placeholder="Ej. 2 unidades, 100 gramos">
                    <button onclick="agregarAMisIngredientes(${index})">Agregar</button>
                </div>
            </div>
        `;
        ingredientesContainer.innerHTML += ingredienteCard;
    });
}

function mostrarInputCantidad(index) {
    const cantidadContainer = document.getElementById(`cantidad-container-${index}`);
    cantidadContainer.style.display = "block";
}

function agregarAMisIngredientes(index) {
    const card = document.querySelectorAll('.ingrediente-card')[index];
    const nombre = card.getAttribute('data-nombre');
    const tipo = card.getAttribute('data-tipo');
    const calorias = card.getAttribute('data-calorias');
    const cantidad = document.getElementById(`cantidad-${index}`).value;

    if (!cantidad) {
        alert('Por favor, ingresa una cantidad válida.');
        return;
    }

    let misIngredientes = JSON.parse(localStorage.getItem('misIngredientes')) || [];
    const ingrediente = { nombre, tipo, calorias, cantidad };

    misIngredientes.push(ingrediente);
    localStorage.setItem('misIngredientes', JSON.stringify(misIngredientes));

    alert(`${nombre} agregado a tus ingredientes.`);
}

function filtrarPorNombre() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();

    axios.get("http://127.0.0.1:5000/ingredientes")
        .then(response => {
            const ingredientes = response.data.ingredientes || [];

            const ingredientesFiltrados = ingredientes.filter(ingrediente =>
                ingrediente[0].toLowerCase().includes(searchInput)
            );
            mostrarIngredientes(ingredientesFiltrados);
        })
        .catch(error => {
            console.error("Error al obtener los ingredientes:", error);
        });
}

axios.get("http://127.0.0.1:5000/ingredientes")
    .then(response => {
        const ingredientes = response.data.ingredientes || [];
        mostrarIngredientes(ingredientes);
    })
    .catch(error => {
        console.error("Error al obtener los ingredientes:", error);
    });

document.getElementById('search-input').addEventListener('input', filtrarPorNombre);
