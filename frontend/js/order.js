const order = JSON.parse(localStorage.getItem("commande")) || [];
// affiche Mes informations
const informations = document.querySelector(".confirmation");
informations.innerHTML += `
<h2 class="congrats">Félicitations !${order.contact.firstName} <br>Votre commande a bien été prise en compte</h2>
<p class="total">Le montant total est de </p>            
<p class="orderid">Votre numéro de commande est le : </p>
    `;
