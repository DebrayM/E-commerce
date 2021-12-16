let productArray=[];

RecherchePanier();

function RecherchePanier() {
    //existe-t-il un panier ?
    if(localStorage.getItem('product')!==null){
        //Oui : dans ce cas on l'affiche'
        // étape 1 : on récupère sont contenu
        productArray = localStorage.getItem('product');
        // étape 2 : on transforme le texte en objet JSON
        let productJSON = JSON.parse(productArray);
        // étape 3 : on récupère le nombre d'article et le total
        let montantTotal = productJSON[0].prixTotal;
        let nbArticle = productJSON[0].nbArticles;

        // génère l'entête du panier
        let nodeTH = document.createElement('tr');
        nodeTH.innerHTML = `    
            <th class="col1"></th>
            <th class="col2">Description des produits</th>
            <th class="col3">Prix</th>
        `;
        // Affiche d'entête du panier
        let lignes = document.querySelectorAll('#tbPanier tr')
        lignes.forEach(element => {
            element.remove();
        });
        let ligne = document.querySelector('#tbPanier');
        ligne.append(nodeTH);
        // récupère le nombre d'articles du panier et le prix total
        nodeTH = document.createElement('tr');
        nodeTH.innerHTML = `  
        <tr>
        <th></th>
        <th>Nombre d'articles : ${nbArticle} - Prix Total : ${montantTotal} €</th>
        <th></th>
        </tr>
        `;
        ligne = document.querySelector('#tbPanier');
        ligne.append(nodeTH);
        // traitement des articles du panier
         let monPamier = productJSON[0].panier;
         let y = monPamier.length;
        for (let i=0; i<y; i++) {
            let produit = monPamier[i];
            //console.log(produit);

            /* création de la structure d'affichage du nom et du prix du produit * */
            nodeTH = document.createElement('tr');
            nodeTH.innerHTML = `
                <td><img src="assets/images/${produit.panier_id}.png" alt=""></td>
                <td><p class="libel">Libellé du bijoux</p></td>
                <td><p class="prixJaune">${produit.panier_px} €</p></td>
            `;
            ligne = document.querySelector('#tbPanier');
            ligne.append(nodeTH);

            //pour chaque article, afficher les actions possibles
            nodeTH = document.createElement('tr');
            nodeTH.innerHTML = ` 
            <td class="bordure prixJaune">${produit.panier_id}</td>
            <td class="tbActions bordure">
                <form>
                    <label for="quantite">Qté: <input type="number" name="quantite" class="qte" id="qte${produit.panier_id}" min="1" max="10" value="${produit.panier_qt}"></label>
                </form>
                <a href="#" class="sup" id="sup${produit.panier_id}">supprimer</a>
            </td>
            <td class="bordure"></td>
            `;
            ligne = document.querySelector('#tbPanier');
            ligne.append(nodeTH);
        }
        //on pose les écouteurs d'évènements sur la quantité et le bouton supprimer
        let qts = document.querySelectorAll('.qte');
        qts.forEach(element => {
            element.addEventListener("change", changer)
        });
        let sps = document.querySelectorAll('.sup');
        sps.forEach(element => {
            element.addEventListener("click", supprimer)
        });


    }else{
        //le panier est vide
    }
}

function changer(){
    let a = this.id;
    let b = a.substring(3, a.length);
    let c = a.substring(0, 3);
    let d = this.value;
    modifierPanier(c, b, d);
}

function supprimer(event){
    event.preventDefault();
    let a = this.id;
    let b = a.substring(3, a.length);
    let c = a.substring(0, 3);
    modifierPanier(c, b, 0);
}

function modifierPanier(action, article, quantite){
    let montantTotal = 0;
    let nbArticle = 0;
    //le panier existe mais on fait le test quand même
    if(localStorage.getItem('product')!==null){
        // étape 1 : on récupère son contenu
        productArray = localStorage.getItem('product');
        // étape 2 : on transforme le texte en objet JSON
        productJSON = JSON.parse(productArray);
        // étape 3 : on récupère le nombre d'article et le montant total
        montantTotal = productJSON[0].prixTotal;
        nbArticle = productJSON[0].nbArticles;
        // étape 4 : on vérifie si l'article doit être supprimé ou modifié
        let flagSuppr = false;
        //
        if (action === 'sup') {
            flagSuppr = true;
        }
        //
        // on recherche la quantité et le prix de l'article dans le panier
        let panier = productJSON[0].panier;
        let y = panier.length;
        let z = 0;
        let av = 0;
        let ap = 0;
        let nbav = 0;
        let prix = 0;
        let flag = false;
        
        for(let i=0; i<y; i++){
            //console.log(panier[i].panier_id, article)
            if(panier[i].panier_id === article){
                flag = true;
                z=i;
            }
        }
        if (flag === true){
            //on sauvegarde l'ancien montant et la quantité d'avant
            av = panier[z].panier_px * panier[z].panier_qt;
            nbav = panier[z].panier_qt;
            ap = 0;
            if (flagSuppr === false){
                //on sauvegarde le nouveau montant
                ap = panier[z].panier_px * quantite;
                //on met à jour le nouveau montant et le prix
                prix = panier[z].panier_px;
                productJSON[0].panier[z] = {"panier_id":article, "panier_qt":quantite, "panier_px":prix};
            }else{
                //on supprimer la ligne dans le panier
                productJSON[0].panier.splice(z, 1);
            }
        }

        //on met à jour le montant total et le nombre d'article
        montantTotal = montantTotal - av + ap;
        nbArticle = nbArticle - nbav + parseInt(quantite);
        //
        //on met à jour le fichier JSON
        productJSON[0].prixTotal = montantTotal;
        productJSON[0].nbArticles = nbArticle;
      
        //on supprime l'ancien fichier JSON
        localStorage.removeItem('product');
        //Et puis : on crée le local storage
        localStorage.setItem('product', JSON.stringify(productJSON));  
        }
    else{
        //Non : dans ce cas on le crée
        productJSON = {"nbArticles":pQT, "prixTotal":pPX, "panier":
                    [{"panier_id":pID, "panier_qt":pQT, "panier_px":pPX}]};
         // on le sauvegarde dans le local storage
        productArray.push(productJSON);  
        localStorage.setItem('product', JSON.stringify(productArray));   
    }
    // on réaffiche le panier
    RecherchePanier();
}