let teddies = getTeddiesFromCart();
let teddiesHTMLForTable = "";
for(let teddy of teddies) {
    teddiesHTMLForTable += buildTeddyForTable(teddy);
}
teddiesHTMLForTable += buildTeddiesTotalPriceForTable();

document.querySelector("#tbody").innerHTML = teddiesHTMLForTable;

let form = document.querySelector("#form");
form.addEventListener("submit", function (event) {
    event.preventDefault();

    let firstName = document.querySelector("#firstName").value;
    let lastName = document.querySelector("#lastName").value;
    let email = document.querySelector("#email").value;
    let address = document.querySelector("#address").value;
    let city = document.querySelector("#city").value;


    let contact = buildContact(firstName, lastName, email, address, city);
    let message = validateContact(contact);

    if (message != null) {
        alert(message);
        return;
    }

    let teddyIds = getIdFromTeddies(teddies);
    let orderPromise = sendOrder(contact, teddyIds);

    orderPromise.then(function (order) {


        window.location.href = `./order.html?id=${order.orderId}&price=${computeTotalPriceFromCart()}`;
  });
})
toEmptyCart();

