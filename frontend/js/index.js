
let url="http://localhost:3000/api/teddies"
fetch(url)
.then(function(response) {
  console.log( response);
  if (response.ok) {
      return response.json();
  }
})
.then(function(data) {
    console.log("value", data);
    let htmlImages = [];
    for(let teddy of data) {
      let imageHtml = `
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
        ${teddy.price}
        </p>
        </figcaption>
        </figure>
      </a>
      `;
      // string interpolation ${variable}

      htmlImages.push(imageHtml);
      console.log("id", teddy._id, "name", teddy.name, "price", teddy.price, "imageUrl", teddy.imageUrl);
  }

  let div = `<p class="store_desc">Nous confectionnons des nounours pour petits et grands : 100% MadeinHands !</p>
  <h2 class="store_title">Nos produits</h3> <div class="teddy__cards">${htmlImages.join("")}</div>`;


  document.querySelector("#storeJs").innerHTML = div;
})
.catch(function(error){
  let bug = document.getElementById("storeJs");
  bug.innerHTML =
  "Une erreur est survenue.<br>Veuillez relancer votre serveur local (port:3000)";
  bug.style.textAlign = "center";
})