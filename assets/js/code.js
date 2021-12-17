let temps;


    //gestion du menu burger
    //btnBurger : bouton d'affichage du menu burger
    document.getElementById('btnBurger').addEventListener('click', afficheMenu);
    //getion de l'affichage des images du carousel avec les bouton "dots"
    document.getElementById('bt1').style.display = 'flex';
    document.getElementById('bt2').style.display = 'none';
    document.getElementById('bt3').style.display = 'none';
  
    const flechdroite = document.getElementById('droite');
    /** décalage à droite des images */
    flechdroite.addEventListener('click', moveright);
  
    const flechgauche = document.getElementById('gauche');
    /** décalage à droite des images */
    flechgauche.addEventListener('click', moveleft);
  
    const img01 = document.getElementById('carousel');
    img01.onmouseover = function () {
      /** on arrête le défilement */
      clearTimeout(temps);
    };
    img01.onmouseout = function () {
      /** on reprend le défilement */
      temps = setTimeout(moveright, 300);
    };
  
    const dt1 = document.getElementById('dot1');
    dt1.addEventListener('click', modeDot);
    const dt2 = document.getElementById('dot2');
    dt2.addEventListener('click', modeDot);
    const dt3 = document.getElementById('dot3');
    dt3.addEventListener('click', modeDot);
  
    temps = setTimeout(moveright, 300);


function afficheMenu(){
    //mnuBurger : DIV du menu burger
    //ajoute la classe affiche dur la div
    document.getElementById('mnuBurger').classList.toggle('affiche');
}

function currentImg() {
    /** recherche d'index de la boite affichant l'image en cours */
    let maboite = '';
    for (let i = 1; i <= 5; i++) {
      maboite = `bt${i}`;
      if (document.getElementById(maboite).style.display === 'flex') {
        return (i);
      }
      maboite = `bt${i}`;
    }
    return null;
  }
  
  function modeDot() {
    /** quelle image est actuellement chargée */
    /** cI indice de l'image courante */
    /** btCache div à cacher */
    const cI = currentImg();
    const btCache = `bt${cI}`;
    document.getElementById(btCache).style.display = 'none';
    /** quel bouton à déclencher l'action */
    // eslint-disable-next-line default-case
    switch (this.id) {
      case 'dot1':
        document.getElementById('bt1').style.display = 'flex';
        break;
      case 'dot2':
        document.getElementById('bt2').style.display = 'flex';
        break;
      case 'dot3':
        document.getElementById('bt3').style.display = 'flex';
        break;
    }
  }
  
  function moveright() {
    /** recherche l'image actuellement affichée */
    const maboite = currentImg();
    // eslint-disable-next-line default-case
    switch (maboite) {
      case 1:
        document.getElementById('bt1').style.display = 'none';
        document.getElementById('bt2').style.display = 'flex';
        break;
      case 2:
        document.getElementById('bt2').style.display = 'none';
        document.getElementById('bt3').style.display = 'flex';
        break;
      case 3:
        document.getElementById('bt3').style.display = 'none';
        document.getElementById('bt1').style.display = 'flex';
        break;
    }
  }
  
  function moveleft() {
    /** recherche l'image actuellement affichée */
    const maboite = currentImg();
    switch (maboite) {
      case 1:
        document.getElementById('bt1').style.display = 'none';
        document.getElementById('bt3').style.display = 'flex';
        break;
      case 2:
        document.getElementById('bt2').style.display = 'none';
        document.getElementById('bt1').style.display = 'flex';
        break;
      case 3:
        document.getElementById('bt3').style.display = 'none';
        document.getElementById('bt2').style.display = 'flex';
        break;
    }
  }