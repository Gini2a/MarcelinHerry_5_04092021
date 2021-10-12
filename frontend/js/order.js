const params = new URL(document.location).searchParams;
var id = params.get("id");
var totalCart = params.get("price");

const informations = document.querySelector(".confirmation");
informations.innerHTML += `
<h2 class="congrats">Félicitations ! <br>Votre commande a bien été prise en compte</h2>
<p class="total">Le montant total est de ${formatPrice(totalCart)} </p>            
<p class="orderid">Votre numéro de commande est le : ${id} </p>
    `;

    localStorage.clear()
