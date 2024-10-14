const formRegister = document.getElementById("register-form");

formRegister.addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // Enviar la solicitud de registro al backend con axios
    axios.post("http://127.0.0.1:5000/register", {
        username: username,
        password: password
    })
    .then(response => {
        if(response.data.status === "success") {
            alert("Registro exitoso");
            window.location.href = "home.html";  // Redirigir al home.html si el registro es exitoso
        } else {
            alert(response.data.message);  // Mostrar el mensaje de error del backend
        }
    })
    .catch(error => {
        alert("Ocurrió un error al intentar registrar.");
        console.error("Error:", error);
    });
});
