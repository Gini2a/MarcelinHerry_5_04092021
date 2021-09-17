let params = new URL(document.location).searchParams;
let id = params.get("id");
let idTeddy=`http://localhost:3000/api/teddies/${id}`;
	
			fetch(idTeddy)
			  .then((response)=> {
			  	console.log(response);
			    if (response.ok) {
			      	return response.json();
			    }
			  })
			  .then((teddy)=> {
			    	console.log("Value", teddy);
			    	let optionColor = "";
			    	for(let color of teddy.colors) {
			    		optionColor += `<option value="${color}">${color}</option>`;
			    	}
			    	let teddyHtml = `
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
                           <strong> ${teddy.price/100} €</strong>
                            </p>
                            <select class="teddy-color">
					  			${optionColor}
					  		</select>	
                            </div>
					  	</div>
					  	`;                 
					document.querySelector("#teddy").innerHTML = teddyHtml;
			  })
			  .catch((err) =>console.log("Error", err));
			