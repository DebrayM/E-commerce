
//gestion du menu burger
//btnBurger : bouton d'affichage du menu burger
document.getElementById('btnBurger').addEventListener('click', afficheMenu);

function afficheMenu(){
    //mnuBurger : DIV du menu burger
    //ajoute la classe affiche dur la div
    document.getElementById('mnuBurger').classList.toggle('affiche');
}