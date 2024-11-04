// Mostrar los ingredientes guardados en LocalStorage
function mostrarMisIngredientes(ingredientes = null) {
    const ingredientesContainer = document.getElementById("mis-ingredientes-container");
    ingredientesContainer.innerHTML = "";

    const ingredientesGuardados = ingredientes || JSON.parse(localStorage.getItem("misIngredientes")) || [];

    if (ingredientesGuardados.length === 0) {
        ingredientesContainer.innerHTML = "<p>No hay ingredientes guardados.</p>";
    } else {
        ingredientesGuardados.forEach((ingrediente, index) => {
            const ingredienteCard = `
                <div class="ingrediente-card">
                    <h3>${ingrediente.nombre}</h3>
                    <p><strong>Tipo:</strong> ${ingrediente.tipo}</p>
                    <p><strong>Cantidad:</strong> ${ingrediente.cantidad}</p>

                    <div class="botones-card">
                        <button class="btn-editar" onclick="editarCantidad(${index})">Editar</button>
                        <button class="btn-eliminar" onclick="eliminarIngrediente(${index})">Eliminar</button>
                    </div>
                </div>
            `;
            ingredientesContainer.innerHTML += ingredienteCard;
        });
    }
}

document.getElementById("search-input").addEventListener("input", () => {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const ingredientesGuardados = JSON.parse(localStorage.getItem("misIngredientes")) || [];

    const ingredientesFiltrados = ingredientesGuardados.filter(ingrediente =>
        ingrediente.nombre.toLowerCase().includes(searchInput)
    );

    mostrarMisIngredientes(ingredientesFiltrados);
});

function agregarNuevoIngrediente() {
    const nombre = document.getElementById("nombre-nuevo").value.trim();
    const tipo = document.getElementById("tipo-nuevo").value.trim();
    const cantidad = document.getElementById("cantidad-nuevo").value.trim();

    if (nombre && tipo && cantidad) {
        let ingredientes = JSON.parse(localStorage.getItem("misIngredientes")) || [];

        ingredientes.push({ nombre, tipo, cantidad });

        localStorage.setItem("misIngredientes", JSON.stringify(ingredientes));

        document.getElementById("nombre-nuevo").value = "";
        document.getElementById("tipo-nuevo").value = "";
        document.getElementById("cantidad-nuevo").value = "";

        mostrarMisIngredientes();
    } else {
        alert("Por favor, complete todos los campos.");
    }
}

function eliminarIngrediente(index) {
    let ingredientes = JSON.parse(localStorage.getItem("misIngredientes")) || [];
    ingredientes.splice(index, 1);
    localStorage.setItem("misIngredientes", JSON.stringify(ingredientes));
    mostrarMisIngredientes(); // Actualizar la vista
}

function editarCantidad(index) {
    let ingredientes = JSON.parse(localStorage.getItem("misIngredientes")) || [];
    const nuevaCantidad = prompt("Ingresa la nueva cantidad:");

    if (nuevaCantidad) {
        ingredientes[index].cantidad = nuevaCantidad;
        localStorage.setItem("misIngredientes", JSON.stringify(ingredientes));
        mostrarMisIngredientes(); // Actualizar la vista
    }
}

mostrarMisIngredientes();

