    let IDproduit="";
    let type="";
    let typeref="Z";
    let index=0;
    let nbpromo="";
    let topflex=0;
    let nodtopflex="";
    let topNB = 0;
    let idNB = "";
    /* -----------*/
    let promos;
    let nodeDIV;
    let nodeT;
    let nodeTF;
    let tendances;
    let nodeNB;
    let NewBest;
    /* -----------*/
    // 1) on supprimer le contenu de la DIV "promo"
    promos = document.querySelectorAll('.promo div');
    promos.forEach(element => {
        element.remove();
    });
    // 1) on supprimer le contenu de la DIV "tendances"
    tendances = document.querySelectorAll('.top div');
    tendances.forEach(element => {
        element.remove();
    });
    // 1) on supprimer le contenu de la DIV "Nouveautés et Meillieures ventes"
    NewBest = document.querySelectorAll('.new_best div');
    NewBest.forEach(element => {
        element.remove();
    });
    /* -----------*/
    // au chargement de la page, j'affiche les produits du fichier JSON
    fetch("assets/js/products.json")
    .then(response => response.json())
    .then(produits => {
        produits.forEach(produit => {
            /* ---- */
            IDproduit = produit.id;
            type = IDproduit.substring(0, 1);
            if (type === "P"){
                if (type !== typeref){
                    // on affiche les produits de type promo
                    typeref = type;
                }
                index++
                nbpromo = "promo"+index;
                // 2) on reconstruit le contenu de la DIV "promo"
                nodeDIV = document.createElement('div');
                nodeDIV.classList.add("promo_cadre");
                nodeDIV.classList.add(nbpromo);

                nodeDIV.innerHTML = `
                <img src="assets/images/${produit.id}.png" alt="image du produit ${produit.id}">
                <p class="libel">${produit.title}</p>
                <div class="prix">
                    <p class="prixJaune">${produit.price} €</p>
                    <p class="prixrouge">1500 €</p>
                </div>
                <a href="produit.html?${produit.id}" class="bouton">Voir le produit</a>
                `;
                //on affiche la div promo
                document.querySelector('.promo').append(nodeDIV);
                //on réinitialise index
            }
            if (type === "T"){
                if (type !== typeref){
                    // on affiche les produits tendances
                    // 2) on reconstruit une div "top_flex"
                    // c'est une DIV de 4 div "top_box"
                    nodeTF = document.createElement('div');
                    nodeTF.classList.add("top_flex");
                    topflex++;
                    nodtopflex = "topflex"+topflex;
                    nodeTF.id = nodtopflex;
                    nodtopflex = "#" + nodtopflex;
                    document.querySelector('.top').append(nodeTF);
                    /*--*/
                    typeref = type;
                    index = 0;
                }
                // 3) on reconstruit les DIV "top_box"
                nodeT = document.createElement('div');
                nodeT.classList.add("top_box");
                nodeT.innerHTML = `
                <div class="cadre">
                <img src="assets/images/${produit.id}.png" alt="image du produit ${produit.id}">
                <a href="produit.html?${produit.id}" class="bouton">Voir le produit</a>
                </div>
                <div class="top_box_text">
                <p class="TxtG">${produit.title}</p>
                <p class="TxtJ">${produit.price} €</p>
                </div>
                `
                document.querySelector(nodtopflex).append(nodeT);
                index++
                if (index === 4){
                    //on réinitialise index
                    index = 0;
                    typeref="Z"; // on recrée une DIV de 4 div "top_box"
                }
            }

            if (type === "V"){
                if (type !== typeref){
                    // on affiche les produits Meilleures ventes et Nouvelles arrivées

                    // 2) on reconstruit le contenu de la DIV "newbest"
                    // c'est une DIV de 4 div "nb_cadre"
                    nodeNB = document.createElement('div');
                    nodeNB.classList.add("newbest");
                    topNB++;
                    idNB = "NB"+topNB;
                    nodeNB.id = idNB;
                    idNB = "#" + idNB;
                    nodeNB.innerHTML = `
                        <h2>Nos meilleurs ventes</h2>
                    `;
                    /*--*/
                    document.querySelector('.new_best').append(nodeNB);
                    /*--*/
                    typeref = type;
                    index = 0;
                }
                                // 3) on reconstruit les DIV "nb_cadre"
                nodeT = document.createElement('div');
                nodeT.classList.add("nb_cadre");
                nodeT.innerHTML = `
                <div class="nb_cadre_produit">
                    <img src="assets/images/${produit.id}.png" alt="image du produit ${produit.id}">
                    <div class="nb_text">
                        <p class="nblibel">${produit.title}</p>
                        <p class="nbprix">${produit.price} €</p>
                    </div>
                </div>
                <a href="produit.html?${produit.id}" class="bouton">Voir le produit</a>
                `;
                document.querySelector(idNB).append(nodeT);
                index++
                if (index === 5){
                    //on réinitialise index
                    index = 0;
                    typeref="Z"; // on recrée une DIV de 5 div "top_box"
                }
            }
        })
    })
