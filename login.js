document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("users.json")
        .then((response) => response.json())
        .then((users) => {

            const userExists = users.some((user) => user.username === username && user.password === password);  
            

            if (userExists) {
                localStorage.setItem("username", username);
                alert("Autentificare reusita!");
                setTimeout(function () {
                    window.location.href = "extra.html";
                }, 500); /// trb sa aibe timp sa redirecționeze - cred -- exemplu de setTimeout
                
            }
            else {
                window.location.href = "404.html";
            }

        })
        .catch((error) => {
            console.error("Error la preluarea listei de utilizatori: ", error);
        });

});