getTeddies()
.then((teddies)=> {
    let figureTab = [];
    for(let teddy of teddies) {
      let figure = (buildTeddies(teddy));
      figureTab.push(figure);    
  }
  
  let div = `<p class="store_desc">Nous confectionnons des nounours pour petits et grands : 100% MadeinHands !</p>
  <h2 class="store_title">Nos produits</h2> <div class="teddy__cards">${figureTab.join("")}</div>`;

  document.querySelector("#storeJs").innerHTML = div;
})
.catch((error) => {
  let bug = document.getElementById("storeJs");
  bug.innerHTML =
  "Une erreur est survenue.<br>Veuillez relancer votre serveur local (port:3000)";
  bug.style.textAlign = "center";});
