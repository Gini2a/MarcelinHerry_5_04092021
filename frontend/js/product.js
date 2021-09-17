let params = new URL(document.location).searchParams;
let id = params.get("id");


			
			fetch(`http://localhost:3000/api/teddies/${id}`)
			  .then(function(res) {
			  	console.log("Response", res);
			    if (res.ok) {
			      	return res.json();
			    }
			  })
			  .then(function(teddy) {
			    	console.log("Value", teddy);
			    	var optionColor = "";
			    	for(let color of teddy.colors) {
			    		optionColor += `<option value="${color}">${color}</option>`;
			    	}
			    	var teddyHtml = `
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
                            ${teddy.price}
                            </p>
                            <select class="teddy-color">
					  			${optionColor}
					  		</select>	
                            </div>
					  	</div>
					  	`;                 
					document.querySelector("#teddy").innerHTML = teddyHtml;
			  })
			  .catch(function(err) {
			    console.log("Error", err)
			  });