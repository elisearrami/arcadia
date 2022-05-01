//On recupère toutes les cartes
const cartes = document.querySelectorAll('.carte');

// par défaut une carte est retournée
let carteRetournee = false;
// variables déclarées en undefined
let premiereCarte, secondeCarte;
/*quand 2 cartes sont ouvertes on applique un verrouillage
interdiction de cliquer ailleurs ou sur les images sur l'écran */
let verouillage = false;

// Pour chaque carte on capture l'évenement au clic. Dans ce cas on lance la fonction retourneCarte
cartes.forEach(carte => {
    carte.addEventListener('click', retourneCarte)
})

/* Fonction retouner une carte */

function retourneCarte() {

    //Afficher la référence de l'objet stocké en mémoire
    //console.log(this);
    //Afficher les noeuds enfants avec le html et le retour à la ligne
    //console.log(this.childNodes);
    //cibler la div doubleface
    //console.log(this.childNodes[1]);

    //Quand le verouilage est sur true on n'exécute pas la Fonction
    /*if (verouillage === true) {
        return
    }*/
    if (verouillage) return;

    /* Avec la méthode toggle on utilise un booléen true false, si la classe est active cela
    retourne la carte avec la class CSS .active présente dans le fichier css */
    this.childNodes[1].classList.toggle('active');


    /* La condition est exécutée une fois sur deux.
    La carte retournée est démarrée à false.
    La condition s'applique sur l'objet avec this
    Si la carte est retournée au clic est elle stockée.
    Si une seconde est retournée au clic elle est à tour stockée. 
    Comme la première carte est déjà retournée aucun changement n'est apporté sur la première */
    if (!carteRetournee) {

        carteRetournee = true;
        premiereCarte = this;
        // On sort de la fonction
        return;
    }

    carteRetournee = false;
    secondeCarte = this;

    //Loguer le cartes
    console.log(premiereCarte, secondeCarte);


    /* A la fin de la fonction on lance une autre fonction pour vérifier si
    les cartes correspondent ou pas */
    correspondance();
}

function correspondance() {

    /*Si les cartes correspondent on enlève les événements au clic 
    qui renvoient la fonction retourneCarte() avec
    la méthode removeEventLister() sur les 2 cartes
     */
    if (premiereCarte.getAttribute('data-attr') === secondeCarte.getAttribute('data-attr')) {

        premiereCarte.removeEventListener('click', retourneCarte);
        secondeCarte.removeEventListener('click', retourneCarte);

    } else {
        verouillage = true;
        //On montre à l'utilisateur pendant 1,5 seconde le résultat puis on enlève la classe active.
        setTimeout(() => {

            premiereCarte.childNodes[1].classList.remove('active');
            secondeCarte.childNodes[1].classList.remove('active');

            verouillage = false;
        }, 1500)
    }

}
/*
Ajouter dynamiquement un index aux cartes avec la propriété order.
Un attribut supplémentaire s'ajoute dans le HTML order 
ex. : style="order: 9;" */

function aleatoire() {
    cartes.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })
}
aleatoire();