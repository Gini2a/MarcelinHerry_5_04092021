//fonction pour récupérer les infos de tous les teddies
async function getTeddies() {
  let response = await fetch(baseUrl + "/teddies", {
    method: "GET"
  });
  let json = await response.json();
  return json;
}

//fonction pour récupérer les infos d'un seul teddy
async function getTeddy(id) {
let response = await fetch (baseUrl + `/teddies/${id}`, {
  method: "GET"
});
let json = await response.json();
return json;

}

//fonction pour construire l'html des teddies 
function buildTeddies(teddy) {

return `
<a href="product.html?id=${teddy._id}">
<figure class="teddy__figure">
  <img class="teddy__image" src="${teddy.imageUrl}" alt="joli ourson" />
  <figcaption class="teddy__figcaption">
  <h2 class="teddy__name">
  ${teddy.name}
  </h2>
    <p class="teddy_desc">
    ${teddy.description}
  </p>
  <p class="teddy__price">    
  <strong>${teddy.price/100} €</strong>
  </p>
  </figcaption>
  </figure>
</a>

`;
}


function optionColors(teddy) {
  // Déclaration de la vaiable optionLense
  let optionColor = "";
  // Boucle qui permet de d'afficher des lentilles pour chaque lentilles présentes dans le backend (cela changera en fonction de l'id du produit)
  for (let color of teddy.colors) {
      optionColor += `<option value="${color}">${color}</option>`;
  }
  // Construction du select html grâce auquel on verra l'option de chaque lentille
  return `<select class="teddy-color">
              ${optionColor}
          </select>`
}


//fonction pour construire l'html d'un teddy page product
function buildTeddy(teddy) {

  let selectColor = optionColors(teddy);

return`
<div class="row">
    <figure class="teddy__figure-pdt">
      <img class="ted__img" src="${teddy.imageUrl}" alt="joli ourson" />
      <figcaption class="teddy__figcaption">
        <h2 class="teddy__name">
        ${teddy.name}
        </h2>
        <p class="teddy_desc">
        ${teddy.description}
        </p>
        <div class=teddy__price-color>
        <p class="teddy__price">    
        <strong> ${teddy.price/100} €
        </p>
        <form class="teddy-color">
        ${selectColor}
        </form>	
        </div>
        <button class="btn__add">Ajouter au panier</button>
      </figcaption>
    </figure> 
  </div>`
}


// fonction qui permet de rajouter mes teddies dans le localStorage
function addTeddyToCart(teddy) {
let teddiesJSON = localStorage.getItem(cartKey);
if(teddiesJSON == null) {
    let teddies = [];
    teddies.push(teddy);
    teddiesJSON = JSON.stringify(teddies);
} else {
    let teddies = JSON.parse(teddiesJSON);
    teddies.push(teddy);
    teddiesJSON = JSON.stringify(teddies);
}
localStorage.setItem("cart", teddiesJSON);

}


/*
//fonction qui permet de supprimer mes teddies dans le localStorage
function removeTeddyToCart(teddy) {
let teddiesJSON = localStorage.RemoveItem(cartKey);
if(teddiesJSON == null) {
    let teddies = [];
    teddies.push(teddy);
    teddiesJSON = JSON.stringify(teddies);
} else {
    let teddies = JSON.parse(teddiesJSON);
    teddies.push(teddy);
    teddiesJSON = JSON.stringify(teddies);
}
localStorage.setItem("cart", teddiesJSON);
}
;
*/



//  fonction qui me permet de construire mes teddies présents dans le localStorage dans le panier

function getTeddiesFromCart(){
getTeddies()
let panier = JSON.parse(localStorage.getItem("cart"));
console.log(panier)
let panierTab=[];

for (let produit of panier){
  let cartHtlm=
  `<tr>
  <td class="td_img"><img class="teddy__image" src="${produit.imageUrl}" alt="joli ourson" /></td>
  <td class="td_name">${produit.name}</td>
  <td>${produit.description}</td>
  <td>"1"</td>
  <td>${produit.price/100} €</td>
  </tr>`;
    
panierTab.push(cartHtlm);
console.log(produit)
 

}
document.querySelector("#tbody").innerHTML=`${panierTab.join("")}`;
}


// on prépare les infos pour l'envoie en POST

// on valide que le formulaire soit correctement rempli

function validateContact(){
  submit.addEventListener("click", (event) => {
  let contact = {
    firstName: document.querySelector("#nom").value,
    lastName: document.querySelector("#prenom").value,
    address: document.querySelector("#adresse").value,
    city: document.querySelector("#ville").value,
    email: document.querySelector("#email").value
};
     
      if (
          (regexMail.test(contact.email) == true) &
          (regexName.test(contact.firstName) == true) &
          (regexName.test(contact.lastName) == true) &
          (regexCity.test(contact.city) == true) &
          (regexAddress.test(contact.address) == true)
      ) {
          event.preventDefault();
          getTeddies()
.then((teddies)=>{
 let idsTab=[];
 for(let teddy of teddies){
   idsTab.push(teddy._id);
}})
          if (window.confirm(`Êtes-vous sûr de vouloir passer la commande `)) {
            window.location.href = "./order.html"
        } else {
            window.location.href = "./index.html"
            localStorage.clear();
        }
        fetch("http://localhost:3000/api/teddies/order", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ contact, idsTab }),
      })
      .then((response) => response.json())
      .then((data) => {
          //Stockage de la commande dans local Storage
          localStorage.setItem("commande", JSON.stringify(data));
      
      })
      .catch((erreur) => console.log("erreur : " + erreur));
    }else {
        alert(
            "Tous les champs du formulaire doivent être complétés"
        );
    }
          

      });
    }
     
    
       /*   function confirmation() {
            if (window.confirm(`Êtes-vous sûr de vouloir passer la commande `)) {
                window.location.href = "./confirmation.html"
            } else {
                window.location.href = "../index.html"
                localStorage.clear();
            }
        }
        // -------  Envoi de la requête POST au back-end --------
        // Envoie de la requête avec l'en-tête. le local Storage contiendra les données de l'acheteur, id de la commande  ,les infos du produits
        fetch("http://localhost:3000/api/teddies/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ contact, products }),
            })
            .then((response) => response.json())
            .then((data) => {
                //Stockage de la commande dans local Storage
                localStorage.setItem("commande", JSON.stringify(data));
                confirmation()
            })
            .catch((erreur) => console.log("erreur : " + erreur));
    } else {
        alert(
            "Tous les champs du formulaire sont obligatoires!!!!."
        );
    }
});
}




/
function confirmationOrder(){
let contact = buildContact("", "", "", "", "");
let message = validateContact(contact);

if(message != null) {
  alert(message);
  return;
}
}


console.log(buildContact())
*/
//  Fonction qui me calcule le prix total de mon panier

function computeTotalPriceFromCart() {
let panier = JSON.parse(localStorage.getItem("cart"));
console.log(panier[0].price)
let totalPrice = 0;
   for (let i=0; i<panier.length; i++) {
       totalPrice = totalPrice + panier[i].price;
   }
return totalPrice/100 + '€'
 }

// fonction qui me construit ma ligne totale dans mon tableau sur la page Panier

 function buildTeddiesTotalPriceForTable() {
  return `<tr>
              <td colspan="4">TOTAL</td>
              <td>${computeTotalPriceFromCart()}</td>
          </tr>`;
}

//fonction qui prend en paramètre un tableau full de teddies et retourne un tableau des _id de ces teddies
function getIdFromTeddies(){
getTeddies()
.then((teddies)=>{
 let idsTab=[];
 for(let teddy of teddies){
   idsTab.push(teddy._id);
 }
 return idsTab;
})}

function toEmptyCart() {

// Lorsque qu'on clique sur le bouton, le panier se vide ainsi que le localStorage
const buttonToEmptyCart = document.querySelector("#empty_cart");
buttonToEmptyCart.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});
}


function buildContact(){
let contact = {
  firstName: document.querySelector("#nom").value,
  lastName: document.querySelector("#prenom").value,
  address: document.querySelector("#adresse").value,
  city: document.querySelector("#ville").value,
  email: document.querySelector("#email").value
};
  return contact 
}



function main(){
  getTeddiesFromCart()
computeTotalPriceFromCart()
toEmptyCart()
validateContact()

}