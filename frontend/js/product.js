
let params = new URL(document.location).searchParams;
let id = params.get("id");
let idTeddy=`http://localhost:3000/api/teddies/${id}`;
	
			getTeddy(id)
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
                           <strong> ${teddy.price/100} €
                            </p>
                            <select class="teddy-color">
					  			${optionColor}
					  		</select>	
                            </div>
							</figcaption>
						</figure> 
					  	</div>
					  	`;                 
					document.querySelector("#teddy").innerHTML = teddyHtml;
			  });

			  getTeddy(id)
			  .then((teddy)=> {
		     const buttonAdd=document.querySelector("#btn_add");
			 buttonAdd.addEventListener('click', function(event) {
				addTeddyToCart(teddy);
			 });


			})
	  /*  	 getTeddy(id)
			.then((teddy)=>{ 
			const buttonRemove=document.querySelector("#btn_remove");
			buttonRemove.addEventListener('click',function(event){
				removeTeddyToCart(teddy);
			})
			})
		
*/
		
				
		