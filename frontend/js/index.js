
getTeddies()

.then((data)=> {
    console.log("value", data);
    let figureTab = [];
    for(let teddy of data) {
      let figure = `
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
      // string interpolation ${variable}

      figureTab.push(figure);
      console.log("id", teddy._id, "name", teddy.name, "price", teddy.price, "imageUrl", teddy.imageUrl);
      
  }
  

  let div = `<p class="store_desc">Nous confectionnons des nounours pour petits et grands : 100% MadeinHands !</p>
  <h2 class="store_title">Nos produits</h3> <div class="teddy__cards">${figureTab.join("")}</div>`;


  document.querySelector("#storeJs").innerHTML = div;
})
.catch((error) => {
  let bug = document.getElementById("storeJs");
  bug.innerHTML =
  "Une erreur est survenue.<br>Veuillez relancer votre serveur local (port:3000)";
  bug.style.textAlign = "center";});
