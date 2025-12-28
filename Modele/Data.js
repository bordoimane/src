const clients = [
  {
    name:"imane",
    nom: "imane@gmail.com",
    password: "1234",
    solde: 10340.5 ,
    operations: [
      { type: "retrait", montant: 200, date: "2025-12-20",description:"Reservation hotel" },
      { type: "retrait", montant: 500, date: "2025-12-22" ,description:"shoping"},
      { type: "dépôt", montant: 300, date: "2025-12-22" ,description:"salaire"}
    ]
  },
  {
    name:"ahmed",
    nom: "ahmed@yahoo.com",
    password: "abcd123",
    solde: 4300,
    operations: [
      { type: "dépôt", montant: 1000, date: "2025-12-18" ,description:"salaire"},
      { type: "retrait", montant: 200, date: "2025-12-21",description:"Reservation hotel"},
       { type: "retrait", montant: 150, date: "2025-12-23",description:"restaurant" }
    ]
  },
  {
    name:"sara",
    nom: "sara@hotmail.com",
    password: "pass567",
    solde: 1200,
    operations: [
      { type: "dépôt", montant: 1200, date: "2025-12-20",description:"Reservation hotel" },
      { type: "dépôt", montant: 300, date: "2025-12-22",description:"restaurant" }
    ]
  },
  {
    name:"youssef",
    nom: "youssef@gmail.com",
    password: "yous1234",
    solde: 5000,
    operations: [
      { type: "dépôt", montant: 5000, date: "2025-12-19",description:"Reservation hotel" }
    ]
  }
];


 

 
  function findUser(login, password) {
    let user= clients.find((u) =>u.nom === login && u.password === password) ;
    return user;
}

export{findUser};