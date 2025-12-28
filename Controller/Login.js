import { findUser } from "../Modele/Data.js";
 
 const loginInput = document.getElementById("mail");
const passwordInput = document.getElementById("password");
const connecter = document.getElementById("submitbtn");
const msg = document.getElementById("result");
 connecter.addEventListener("click", () => {
    const log = loginInput.value; 
    const pass = passwordInput.value;
 
     let user=findUser(log,pass);
     console.log(user);
    if (user) {
        msg.textContent = "Connexion réussie !";
        msg.style.color = "green";
 
        sessionStorage.setItem("currentUser",JSON.stringify(user));
        setTimeout(() => {
            window.location.href = "../View/dashboard.html";
        }, 1000);
    } else {
         msg.textContent = "Login ou mot de passe incorrect";
        msg.style.color = "red";
    }
});

const visuel=document.getElementById("display");
visuel.addEventListener("click",()=>
{
    if(passwordInput.type==='password')
    {passwordInput.type='text';
        return;
    }
    if(passwordInput.type==='text'){
    {passwordInput.type='password';
        return;}
}
}

);
