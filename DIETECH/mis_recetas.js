function mostrarMisRecetas(recetas = null) {
    const recetasContainer = document.getElementById("recetas-container");
    recetasContainer.innerHTML = ""; // Limpiar el contenedor

    const recetasGuardadas = recetas || JSON.parse(localStorage.getItem("misRecetas")) || [];

    if (recetasGuardadas.length === 0) {
        recetasContainer.innerHTML = "<p>No hay recetas guardadas.</p>";
    } else {
        recetasGuardadas.forEach((receta, index) => {
            const recetaCard = `
                <div class="receta-card" id="receta-${index}">
                    <h3>${receta.nombre}</h3>
                    <p><strong>Ingredientes:</strong> 
                        <span contenteditable="false">${receta.ingredientes}</span>
                    </p>
                    <p><strong>Calorías:</strong> 
                        <span contenteditable="false">${receta.calorias}</span>
                    </p>
                    <p><strong>Dificultad:</strong> 
                        <span contenteditable="false">${receta.dificultad}</span>
                    </p>
                    <p><strong>Tiempo de Cocción:</strong> 
                        <span contenteditable="false">${receta.tiempo_coccion}</span>
                    </p>

                    <div class="botones-card">
                        <button class="btn-editar" onclick="habilitarEdicion(${index})">Editar</button>
                        <button class="btn-guardar" onclick="guardarCambios(${index})" style="display:none;">Guardar</button>
                        <button class="btn-eliminar" onclick="eliminarReceta(${index})">Eliminar</button>
                    </div>
                </div>
            `;
            recetasContainer.innerHTML += recetaCard;
        });
    }
}

function habilitarEdicion(index) {
    const recetaCard = document.getElementById(`receta-${index}`);
    const spans = recetaCard.querySelectorAll("span[contenteditable='false']");
    spans.forEach(span => span.setAttribute("contenteditable", "true"));

    recetaCard.querySelector(".btn-editar").style.display = "none";
    recetaCard.querySelector(".btn-guardar").style.display = "inline-block";
}

function guardarCambios(index) {
    const recetaCard = document.getElementById(`receta-${index}`);
    const spans = recetaCard.querySelectorAll("span[contenteditable='true']");
    let recetas = JSON.parse(localStorage.getItem("misRecetas")) || [];

    recetas[index].ingredientes = spans[0].innerText.trim();
    recetas[index].calorias = parseInt(spans[1].innerText.trim());
    recetas[index].dificultad = spans[2].innerText.trim();
    recetas[index].tiempo_coccion = spans[3].innerText.trim();

    localStorage.setItem("misRecetas", JSON.stringify(recetas));
    mostrarMisRecetas();
}

document.getElementById("agregar-receta").addEventListener("click", () => {
    const nombre = document.getElementById("nombre-receta").value.trim();
    const ingredientes = document.getElementById("ingredientes-receta").value.trim();
    const calorias = parseInt(document.getElementById("calorias-receta").value.trim());
    const dificultad = document.getElementById("dificultad-receta").value;
    const tiempoCoccion = document.getElementById("tiempo-coccion").value.trim();

    if (nombre && ingredientes && calorias && tiempoCoccion) {
        let recetas = JSON.parse(localStorage.getItem("misRecetas")) || [];

        recetas.push({ nombre, ingredientes, calorias, dificultad, tiempo_coccion: tiempoCoccion });

        localStorage.setItem("misRecetas", JSON.stringify(recetas));

        mostrarMisRecetas();
    } else {
        alert("Por favor, complete todos los campos.");
    }
});

function eliminarReceta(index) {
    let recetas = JSON.parse(localStorage.getItem("misRecetas")) || [];
    recetas.splice(index, 1);
    localStorage.setItem("misRecetas", JSON.stringify(recetas));
    mostrarMisRecetas();
}

document.getElementById("search-input").addEventListener("input", () => {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const recetasGuardadas = JSON.parse(localStorage.getItem("misRecetas")) || [];

    const recetasFiltradas = recetasGuardadas.filter(receta =>
        receta.nombre.toLowerCase().includes(searchInput)
    );
    mostrarMisRecetas(recetasFiltradas);
});

document.getElementById("btn-facil").addEventListener("click", () => filtrarPorDificultad("facil"));
document.getElementById("btn-medio").addEventListener("click", () => filtrarPorDificultad("medio"));
document.getElementById("btn-dificil").addEventListener("click", () => filtrarPorDificultad("dificil"));
document.getElementById("btn-todas").addEventListener("click", () => mostrarMisRecetas());

function filtrarPorDificultad(dificultad) {
    const recetasGuardadas = JSON.parse(localStorage.getItem("misRecetas")) || [];
    const recetasFiltradas = recetasGuardadas.filter(receta => receta.dificultad === dificultad);
    mostrarMisRecetas(recetasFiltradas);
}

document.getElementById("filtrar-por-ingredientes").addEventListener("click", () => {
    const inputIngredientes = document.getElementById("ingredientes-filtrados").value.trim().toLowerCase();
    const ingredientesArray = inputIngredientes.split(',').map(ingr => ingr.trim());

    if (ingredientesArray.length === 0 || ingredientesArray[0] === "") {
        alert("Por favor, ingrese al menos un ingrediente.");
        return;
    }

    const recetasGuardadas = JSON.parse(localStorage.getItem("misRecetas")) || [];

    const recetasFiltradas = recetasGuardadas.filter(receta =>
        ingredientesArray.every(ingr => receta.ingredientes.toLowerCase().includes(ingr))
    );

    mostrarMisRecetas(recetasFiltradas);
});

document.getElementById("reiniciar-filtro").addEventListener("click", () => {
    mostrarMisRecetas();
    document.getElementById("ingredientes-filtrados").value = ""; // Limpiar el input
});

mostrarMisRecetas();
