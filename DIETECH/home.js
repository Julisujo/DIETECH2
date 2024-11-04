const formLogin = document.getElementById("login-form");

formLogin.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    console.log(username, password);

    axios.post("http://127.0.0.1:5000/login", {
        username: username,
        password: password
    })
    .then(response => {
        if(response.data.status === "success") {
            alert("Login exitoso");
            window.location.href = "logged.html";
        } else {
            alert("Credenciales inválidas, por favor intenta de nuevo.");
        }
    })
    .catch(error => {
        alert("Ocurrió un error al intentar iniciar sesión");
        console.error("Error:", error);
    });
});
