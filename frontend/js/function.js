
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

//fonction pour construire l'html d'un teddy page product

function buildTeddy(teddy) {
  return`
  <div class="row">
      <figure class="teddy__figure-pdt">
				img class="ted__img" src="${teddy.imageUrl}" alt="joli ourson" />
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
          <select class="teddy-color">
					${optionColor}
					</select>	
          </div>
					<button class="btn">Ajouter au panier</button>
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
  let panier = JSON.parse(localStorage.getItem("cart"));
  console.log(panier)
  let panierTab=[];

  for (let produit in panier){
    let cartHtlm= `<div class="row">
                            <div class="name_price">
                            <p class="name_teddy">Nom :${panier[produit].name}</p>
                            <p class="price_cart"> Prix : ${panier[produit].price/100} €</p>
                            
                </div>`;
      
  panierTab.push(cartHtlm);
   
  
  }
  let div = `<p class="cart_desc">Récapitulatif de votre panier : 100% MadeinHands !</p>
  <h2 class="cart_title">Vos produits</h2> <div class="teddy__cart">${panierTab.join("")}</div>`;
  
  
  document.querySelector("#cart_container").innerHTML=div;
  }
  



// Fonction de validation du formulaire

function validateContact(){
  const submit = document.querySelector("#submit");
  let inputNom = document.querySelector("#nom");
  let inputPrenom = document.querySelector("#prenom");
  let inputVille = document.querySelector("#ville");
  let inputAdresse = document.querySelector("#adresse");
  submit.addEventListener("click", (e) => {
    if (inputNom.value== "") {
      e.preventDefault();
      alert("Veuillez renseigner votre Nom de famille !");
      
  }else if(inputPrenom.value=="") {
    e.preventDefault();
    alert("Veuillez renseigner votre Prénom !");

  }else if(inputVille.value=="") {
    e.preventDefault();
    alert("Veuillez renseigner votre ville !");

  }else if(inputAdresse.value=="") {
    e.preventDefault();
    alert("Veuillez renseigner votre adresse !");
  }
})
}

// Fonction création et récupération de l'object contact du formulaire

function buildContact(){
  let inputNom = document.querySelector("#nom").value;
  let inputPrenom = document.querySelector("#prenom").value;
  let inputVille = document.querySelector("#ville").value;
  let inputAdresse = document.querySelector("#adresse").value;
  let inputEmail = document.querySelector("#email").value;
 
  let contact={
    firstName : inputNom,
    lastName : inputPrenom,
    city : inputVille,
    address : inputAdresse,
    email : inputEmail
    
   }
   console.log(contact)
   return contact
 }
 
 let panier = JSON.parse(localStorage.getItem("cart"));
 console.log(panier.length)
 
