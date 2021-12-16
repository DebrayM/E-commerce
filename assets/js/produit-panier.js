let productArray=[];

document.querySelector('#add').addEventListener('click', ajouterAuPanier);


function ajouterAuPanier(event) {
    event.preventDefault();

    let montantTotal = 0;
    let nbArticle = 0;

    let pID = document.querySelector('#id').innerHTML;
    let pQT = parseFloat(document.querySelector('#quantite').value);
    let pPX = parseFloat(document.querySelector('#price').innerHTML);


    let productJSON;

     //existe-t-il déjà un panier ?
    if(localStorage.getItem('product')!==null){
      //Oui : dans ce cas on l'affiche'
      // étape 1 : on récupère sont contenu
      productArray = localStorage.getItem('product');
      // étape 2 : on transforme le texte en objet JSON
      productJSON = JSON.parse(productArray);
      //console.log(productJSON);
      // étape 3 : on récupère le nombre d'article et le total
      montantTotal = productJSON[0].prixTotal;
      nbArticle = productJSON[0].nbArticles;
      // étape 4 : on vérifie si l'article doit être ajouté ou modifié
      let panier = productJSON[0].panier;
      let y = panier.length;
      let z = 0;
      let av = 0;
      let ap = 0;
      let nbav = 0;
      let flag = false;
      for(let i=0; i<y; i++){
        if(panier[i].panier_id === pID){
          flag = true;
          z=i;
        }
      }
      if (flag === true){
        //on sauvegarde le prix et la quantité d'avant
        av = panier[z].panier_px * panier[z].panier_qt;
        nbav = panier[z].panier_qt;
        //on sauvegarde le nouveau prix
        ap = pPX * pQT;
        //on modifie
        panier[z] = {"panier_id":pID, "panier_qt":pQT, "panier_px":pPX};
      }else{
        //on sauvegarde le prix
        ap = pPX * pQT;
        //on ajoute
        productJSON[0].panier[y] = {"panier_id":pID, "panier_qt":pQT, "panier_px":pPX};
        //console.log("y  ", y);
        //console.log("productJSON  ", productJSON);
      }
      //on met à jour le montant total et le nombre d'article
      montantTotal = montantTotal - av + ap;
      nbArticle = nbArticle - nbav + pQT;
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
}
