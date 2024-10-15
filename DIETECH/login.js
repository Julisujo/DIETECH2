const formLogin = document.getElementById("login-form");

formLogin.addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    console.log(username, password);  // Verifica que estés obteniendo correctamente los valores

    // Enviar la solicitud de login al backend con axios
    axios.post("http://127.0.0.1:5000/login", {
        username: username,  // Cambia 'user' a 'username'
        password: password
    })
    .then(response => {
        if(response.data.status === "success") {
            alert("Login exitoso");
            window.location.href = "logged.html";  // Redirigir si el login es exitoso
        } else {
            alert("Credenciales inválidas, por favor intenta de nuevo.");
        }
    })
    .catch(error => {
        alert("Ocurrió un error al intentar iniciar sesión");
        console.error("Error:", error);  // Mostrar el error en la consola para verificar qué está fallando
    });
});
