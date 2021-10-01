/*--------------------------Fonctions page Index------------------------------*/


//fonction pour récupérer les infos de tous les teddies
async function getTeddies() {
  let response = await fetch(baseUrl + "/teddies", {
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

/*-----------------------------fonctions page product--------------------------*/


//fonction pour récupérer les infos d'un seul teddy
async function getTeddy(id) {
  let response = await fetch (baseUrl + `/teddies/${id}`, {
    method: "GET"
  });
  let json = await response.json();
  return json; 
  }


// fonction concernant le choix de la couleur
function optionColors(teddy) {
  let optionColor = "";
  for (let color of teddy.colors) {
      optionColor += `<option value="${[color]}">${[color]}</option>`;
  }
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
localStorage.setItem(cartKey, teddiesJSON);
}

/*--------------------------fonctions de la page cart------------------------*/

// fonction qui me permet de construire mes teddies présents dans le localStorage dans le panier

function getTeddiesFromCart() {
  let teddiesJSON = localStorage.getItem(cartKey);
  if(teddiesJSON == null) {
      return [];
  } else {
      return JSON.parse(teddiesJSON);
  }
}

//fonction pour construire un teddy sous forme de ligne de tableau pour affichage dans un tableau
function buildTeddyForTable(teddy){
  
 return `<tr>
  <td class="td_img"><img class="teddy__image" src="${teddy.imageUrl}" alt="joli ourson" /></td>
  <td class="td_name">${teddy.name}</td>
  <td>${teddy.description}</td>
  <td>1</td>
  <td>${teddy.price/100} €</td>
  </tr>`;
}


// fonction qui me construit ma ligne totale dans mon tableau sur la page Panier

function buildTeddiesTotalPriceForTable() {
  return `<tr>
              <td colspan="4">TOTAL</td>
              <td>${computeTotalPriceFromCart()}</td>
          </tr>`;
}

// Lorsque qu'on clique sur le bouton, le panier se vide ainsi que le localStorage

function toEmptyCart() {  
  const buttonToEmptyCart = document.querySelector("#empty_cart");
  buttonToEmptyCart.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
  });
  }


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
  


function buildContact(firstName, lastName, email, address, city) {

  return {
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "address": address,
      "city": city,
  };
}

function validateContact(contact) {
      if 
      (regexMail.test(contact.email) == false){
       return "veuillez écrire une adresse mail valide"
      }else if (regexName.test(contact.firstName) == false){
      return " veuillez renseigner le champs prénom"
      }else if (regexName.test(contact.lastName) == false){
      return "veuillez renseigner le champs nom de famille"
      }else if (regexCity.test(contact.city) == false){
      return "veuillez renseigner le champs ville"
      }else if (regexAddress.test(contact.address) == false){
      return " veuillez renseigner le champs adresse"

     }else{
      return null;
  }
}



function getIdFromTeddies(teddies) {
  let teddiesIds = [];
  for (let teddy of teddies) {
      teddiesIds.push(teddy._id);
  }

  return teddiesIds;

}

async function sendOrder(contact, teddies) {

  let response = await fetch(baseUrl + "/teddies/order", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
          "contact": contact,
          "products": teddies,
      }),

  });
  let json = await response.json();
  return json;
}






