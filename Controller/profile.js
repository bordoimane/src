let user = JSON.parse(localStorage.getItem("user"));
const profileName = document.getElementById("name");
const profileEmail = document.getElementById("email");
const profilePassword=document.getElementById("password");
if (user) {
    profileName.value = user.name;
    profileEmail.value = user.nom;
    profilePassword.value=user.password;
}
 
const button=document.getElementById("button");
button.addEventListener("click",()=>{
    if(profileName.value===""||profileEmail.value===""||profilePassword.value==="")
        alert("remplir les champs");
        else{
    user.name =profileName.value;
    user.nom =profileEmail.value;
    user.password =profilePassword.value;
    localStorage.setItem("user", JSON.stringify(user));
    alert("modification bien faite");
   }
});