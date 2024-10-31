
const formRegister = document.getElementById("register-form");

formRegister.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    axios.post("http://127.0.0.1:5000/register", {
        username: username,
        password: password
    })
    .then(response => {
        if(response.data.status === "success") {
            alert("Registro exitoso");
            window.location.href = "home.html";
        } else {
            alert(response.data.message);
        }
    })
    .catch(error => {
        alert("Ocurrió un error al intentar registrar.");
        console.error("Error:", error);
    });
});
