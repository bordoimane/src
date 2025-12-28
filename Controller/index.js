const loginbtn = document.getElementById("Loginbtn");
 
loginbtn.addEventListener("click", handleLogin);

function handleLogin() {
    loginbtn.textContent = "Loading...";

    setTimeout(() => {
        window.location.href = "src/View/Login.html";
    }, 100);
}
