
let params = new URL(document.location).searchParams;
let id = params.get("id");
let idTeddy=`http://localhost:3000/api/teddies/${id}`;
	
			getTeddy(id)
			  .then((teddy)=> {
			    	        
					document.querySelector("#teddy").innerHTML = buildTeddy(teddy);
					const buttonAdd=document.querySelector(".btn__add");
			 buttonAdd.addEventListener('click', function(event) {
				addTeddyToCart(teddy);
				
				alert("votre produit a bien été ajouté au panier")




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
		
				
		