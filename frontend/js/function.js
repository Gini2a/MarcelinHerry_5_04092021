async function getTeddies() {
    let url = "http://localhost:3000/api/teddies"
    let response = await fetch(url,{
      method: "GET"
    });
    let json = await response.json();
    return json;
}

function buildTeddies() {
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

