import { findLogin } from "../Modele/Data.js";
  

let user = JSON.parse(sessionStorage.getItem("currentUser"));
 /*user.operations = user.operations.filter(op => op.type !=="dépôt");
localStorage.setItem("user", JSON.stringify(user));//pour supprimer les type=debit*/
function sauvegarder() {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

const welcomeMessage = document.getElementById("welcome_message");
const solde = document.getElementById("balance");
const transactions = document.getElementById("transactions");
const filter = document.getElementById("type");

  
 welcomeMessage.textContent = "Bonjour "+user.name;
 solde.textContent = user.solde + " DH";

 function afficherTransactions(liste) {
  transactions.innerHTML = "";

  if (!liste || liste.length === 0) {
    transactions.innerHTML =
      "<tr><td colspan='4'>Aucune transaction</td></tr>";
    return;
  }
  const tr=document.createElement("tr");
  liste.forEach(op => {
  transactions.innerHTML +=
    "<tr>" +
      "<td>" + op.date + "</td>" +
      "<td>" + (op.description || "Transaction") + "</td>" +
      "<td>" + op.type + "</td>" +
      "<td>" + op.montant + " DH</td>" +
    "</tr>";
 

    transactions.appendChild(tr);
  });
}

 filter.addEventListener("change", handleChange);

function handleChange() {
  const valeur = filter.value.toLowerCase();

  if (valeur === "toutes") {
    afficherTransactions(user.operations);

  } else if (valeur === "debit" || valeur === "debuter") {
    const debits = user.operations.filter(op =>
      op.type==="dépôt"
    );
    afficherTransactions(debits);

  } else if (valeur === "credit" || valeur === "crediter") {
    const credits = user.operations.filter(op =>
      op.type==="retrait"
    );
    afficherTransactions(credits);
  }
}

 afficherTransactions(user.operations);



  

 


const btnTransferer = document.getElementById("transferer");
const btnRecharger = document.getElementById("recharger");
const btnPayer = document.getElementById("payer");
  


btnPayer.addEventListener("click", () => {
  function handleUser() {
  return new Promise((resolve, reject) => {
    if (!user) {
      reject("Aucun utilisateur trouvé");
      return;
    }
    resolve(user);
  });
}
  handleUser()
    .then(user => {
      return new Promise((resolve, reject) => {
        const montant = Number(prompt("Entrer le montant à payer :"));
        if (isNaN(montant) || montant <= 0) {
          reject("Montant invalide !");
        } else if (montant > user.solde) {
          reject("Solde insuffisant !");
        } else {
          resolve(montant);
        }
      });
    })
    .then(montant => {
       user.solde -= montant;
      solde.textContent = user.solde + " DH";

       const today = new Date().toLocaleDateString("fr-FR");
      user.operations.unshift({
        date: today,
        description: "Paiement",
        type: "retrait",
        montant: montant
      });
 
       afficherTransactions(user.operations);
       sauvegarder();

      alert("Paiement effectué avec succès !");
    })
    .catch(erreur => alert(erreur));
});

btnRecharger.addEventListener("click",
()=>{function handlRecharger()
{
  return new Promise((resolve,reject)=>
  {
    if(user)
    {
      resolve(user);
    }
    else
    {
      reject("user n'existe pas");
    }
  }
);
}
handlRecharger()
.then(user=>{return new Promise((resolve,reject)=>
  {
     const montant=Number(prompt("entrer le montant a recharger:"));
    if(montant>0&&!isNaN(montant))
    {
      resolve(montant);
    }
    else
    {
      reject("le montant invalide");
    }
  });})
  .then(montant=>{
    user.solde+=montant;
      solde.textContent=user.solde;
      alert("l operations est bien faite!");
      const today = new Date().toLocaleDateString("fr-FR");
    user.operations.unshift({
      date: today,
      description: "recharger",
      type: "dépôt",
      montant: montant
    });
    sauvegarder();
 afficherTransactions(user.operations);
    })

.catch(msg=>alert(msg));
}
);

 btnTransferer.addEventListener("click",()=>
{
  function handlTransferer()
  {
     const destinataire = prompt("Nom du destinataire :");
     let destinatair=findLogin(destinataire);
      return new Promise((resolve,reject)=>
    {if(destinatair)
    {
       resolve(destinatair);
    }
    else
    {
      reject("le destinataire introuvalble!!!");
    }
    }
    );
  }
  handlTransferer()
  .then(destinatair=>{
    return new Promise((resolve,reject)=>{
     const montant=Number(prompt("entrer le montant a recharger:"));
    if(montant>0&&!isNaN(montant))
    {
      resolve({montant,destinatair});
    }
    else
    {
      reject("le montant invalide");
    }
  });})
  .then(data=>{
     const {montant,destinatair}=data;
      destinatair.solde+=montant;
       user.solde-=montant;
      solde.textContent=user.solde;
      alert("l operations est bien faite!");
      const today = new Date().toLocaleDateString("fr-FR");
    user.operations.unshift({
      date: today,
      description: "transferer",
      type: "retrait",
      montant: montant
    });
    sauvegarder();
     afficherTransactions(user.operations);
 
    })
  
  .catch(msg=>alert(msg));
  
})





























































 /*
btnPayer.addEventListener("click",()=>
{
  const montant=Number(prompt("entrer le montant payer:"));
     if(0<montant<user.solde ||montant!==""||montant>0)
    {
      user.solde-=montant;
      solde.textContent=user.solde;
      alert("l operations est bien faite!");
      const today = new Date().toLocaleDateString("fr-FR");
    user.operations.unshift({
      date: today,
      description: "Paiement",
      type: "retrait",
      montant: montant
    });
    sauvegarder();
 afficherTransactions(user.operations);
 return;
  }
    else{
      alert("le montant insuffisant !!!");
      return;
     }

});

btnRecharger.addEventListener("click",()=>
{

 const montant=Number(prompt("entrer le montant a recharger:"));
     if(montant>0 || !isNaN(montant))
    {
      user.solde+=montant;
      solde.textContent=user.solde;
       const today = new Date().toLocaleDateString("fr-FR");
      user.operations.unshift(
    {
      type:"dépôt",
      montant:montant,
      date:today,
      description:"recharger"
    }
  );
  sauvegarder();
 afficherTransactions(user.operations);
alert("Le rechargement a été effectué avec succès !");
    } else {
        alert("Montant invalide. Veuillez réessayer !");
    }
});

btnTransferer.addEventListener("click",()=>{



});




btnTransferer.addEventListener("click", function () {
  const destinataire = prompt("Nom du destinataire :");
  const montant = Number(prompt("Montant à transférer :"));

  if (destinataire && montant > 0 && montant <= user.solde) {
    user.solde -= montant;
    const today = new Date().toLocaleDateString("fr-FR");

  user.operations.unshift({
    date: today,
    description: "Transfert vers "+destinataire,
    type: "retrait",
    montant: montant
  });
  sauvegarder();

  afficherTransactions(user.operations);
}
  else {
    alert("Erreur dans les informations !");
  }
});*/