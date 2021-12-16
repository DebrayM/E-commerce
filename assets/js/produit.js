let article = window.location.search.substr(1);

RechercheProduit(article);

function RechercheProduit(article) {

    fetch("assets/js/products.json")
    .then(response => response.json())
    .then(produits => {
        //console.log(produits);
        produits.forEach(produit => {
            //console.log(produit, article);
            if (produit.id === article){
                //console.log("produit trouvé");
                /* création de la structure d'affichage du nom et du prix du produit * */

                let nodeImg = document.createElement('div');
                nodeImg.classList.add("pImg");
                nodeImg.innerHTML = `
                <img src="assets/images/${produit.id}.png" alt="${produit.title}">
                `;
                let cadreImg = document.querySelector('.pImg');
                cadreImg.remove();
                cadreImg = document.querySelector('.pCadreProduit');
                cadreImg.append(nodeImg);

                let nodeTxt = document.createElement('div');
                nodeTxt.classList.add("pText");
                nodeTxt.innerHTML = `
                    <h5>${produit.title}</h5>
                    <p id="price">${produit.price} €</p>
                    <p id="id">${produit.id}</p>
                `;
 
                let cadreProduit = document.querySelector('.pText');
                cadreProduit.remove();
                cadreProduit = document.querySelector('.pCadreProduit');
                cadreProduit.append(nodeTxt);
                }
        });


    })
}
