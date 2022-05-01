/***Jeu niveau avancé - Space Invaders 
 
https://ascii.co.uk/art/spaceinvaders

                    ############
                ####################    
              ########################
            ####  ####  ####  ####  ####
          ################################
              ######    ####    ######
                ##                ##

Créer la grille
Créer les aliens et le tireur
Déplacer le tireur
Déplacer les aliens

 */


/* 
--- Les variables globales
*/



const container = document.querySelector('.grille');
let toutesLesDivs;
let alienInvaders = [];

/*
Placement du tireur dans la div n° 229 sur les 240 div du damier au total 
La dernière ligne va de 220  à 240
*/
let tireurPosition = 229;
//let tireurPosition = 189;

// Afficher le score
const affichage = document.querySelector('h2');
let resultats = 0;/*


/* Bouger les aliens */

let descendreDroite = true;
let descendreGauche = true;
// On bouge bloc par bloc
let direction = 1;






/* 
--- GRILLE ALIENS 
*/

function creationGrilleEtAliens() {
    //Dans une rangée de 500px je peux mettre 20 $ 25 carrés de div
    //Quand les aliens descendent 

    let indexAttr = 0;
    //20 div rangée en hauteur * 20 rangées en largeur = 240
    for (i = 0; i < 240; i++) {
        const bloc = document.createElement('div');
        if (indexAttr === 0) {
            bloc.setAttribute('data-left', 'true');//Attribut pour le 1er élément
            container.append(bloc);
            indexAttr++;
        } else if (indexAttr === 19) {//dernière div de la rangée à droite
            bloc.setAttribute('data-right', 'true');//Attribut pour le 1er élément
            container.append(bloc);
            indexAttr = 0; // On remet l'index à 0 puisqu'on passe en dessous nouvelle ligne
        }
        else {
            const bloc = document.createElement('div');
            container.append(bloc);
            indexAttr++;
        }
    }

    /*
    On fait démarrer les aliens à une unité à gauche
    Chaque rangée possède 20 éléments 
    0 | 1 ... 13
    - | 21 ... 41 ...
    - | 41 ... 53
    */

    for (i = 1; i < 53; i++) {
        if (i === 13) {
            i = 21;
            alienInvaders.push(i);
        } else if (i === 33) {
            i = 41;
            alienInvaders.push(i);
        }
        else {
            alienInvaders.push(i);
        }
    }

    toutesLesDivs = document.querySelectorAll('.grille div');
    /*Pour chaque alien placé dans le tableau on ajoute le background, 
    chaque élément du tableau est remplacé par une dic qui correspond à un alien*/
    alienInvaders.forEach(invader => {
        toutesLesDivs[invader].classList.add('alien');
    })

    console.log(alienInvaders);

    /* Ajout du style aux div qui ont l'indice tireurPosition dans le tableau */
    toutesLesDivs[tireurPosition].classList.add('tireur')

}

//appel de la fonction pour le rendu
creationGrilleEtAliens();



/* 
--- TIREUR
*/

/* Déplacement du tireur
On récupère l'objet événement Event */

function deplacerLeTireur(e) {
    // On enlève la classe tireur
    toutesLesDivs[tireurPosition].classList.remove('tireur');
    /*On replace la classe selon certaines conditions des touches tapées au clavier
    Site Web pour identifier une clé pour chaque touche : https://www.toptal.com/developers/keycode
    Flèche directionnelle gauche : 37
    Flèche directionnelle droite : 39
    Flèche directionnelle haut : 38
    Flèche directionnelle bas : 40
    */
    if (e.keyCode === 37) {
        // Si le tireur dépasse la position 220 le bord gauche de la dernière rangée
        if (tireurPosition > 220) {
            // décrémentation déplacement vers la gauche
            tireurPosition -= 1;
        }
    }
    if (e.keyCode === 39) {
        // Si le tireur ne dépasse pas la position 239 le bord droit de la dernière rangée + 0
        if (tireurPosition < 239) {
            // décrémentation déplacement vers la droite
            tireurPosition += 1;
        }
    }
    //Lorsque la div est replacée on redessine
    toutesLesDivs[tireurPosition].classList.add('tireur');


}

//On écoute l'événement. Si la touche est pressée on lance la fonction deplacerLeTireur
document.addEventListener('keydown', deplacerLeTireur);




/* 
--- BOUGER LES ALIENS
*/


function bougerLesAliens() {


    //2. Descendre et partir en sens inverse, on itère sur le tableau 
    for (let i = 0; i < alienInvaders.length; i++) {
        /*est-ce que pour la div qui correspond à l'alien en cours son attribut data-right 
        est strictement égal à true dans la chaîne de caractères : tout à droite, 
        alors on les fait redescendre de la hauteur de la rangée 20*/
        // si on est à droite
        if (toutesLesDivs[alienInvaders[i]].getAttribute('data-right') === 'true') {
            if (descendreDroite) {
                direction = 20;
                /*au bout de 50 millisicondes si d'autres aliens se trouvent à droite, 
                laisser le temps à la boucle for de se terminer et interdire*/
                setTimeout(() => {
                    descendreDroite = false;
                }, 50);
            }
            //Quand ils ont sauté une ligne ils repartent en sens inverse
            else if (descendreDroite === false) {
                // de droite à gauche
                direction = -1;
            }
            //repasser à la ligne quand on touche le côté gauche de l'autre côté
            descendreGauche = true;
        }
        // si on est à gauche
        else if (toutesLesDivs[alienInvaders[i]].getAttribute('data-left') === 'true') {
            if (descendreGauche) {
                direction = 20;
                setTimeout(() => {
                    descendreGauche = false;
                }, 50);
            }
            else if (descendreGauche === false) {
                // de gauche à droite
                direction = 1;
            }
            //repasser à la ligne quand on touche le côté droit
            descendreDroite = true;

        }
    }


    //1. On boucle sur le tableau d'aliens 
    for (let i = 0; i < alienInvaders.length; i++) {
        toutesLesDivs[alienInvaders[i]].classList.remove('alien');
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction;
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        toutesLesDivs[alienInvaders[i]].classList.add('alien');
    }


    /* JEU PERDU */
    // Si la div tireur contient alien et tireur en même temps
    if(toutesLesDivs[tireurPosition].classList.contains('alien', 'tireur')){
        affichage.textContent = "Game Over";
        toutesLesDivs[tireurPosition].classList.add('boom');
        clearInterval(invaderId);/* Les aliens ne bougent plus */
    }

    //Si les aliens viennent derrière nous, qu'ils nous ont envahi
    for(let i = 0; i < alienInvaders.length; i++){

        if(alienInvaders[i] > toutesLesDivs.length - width){
            affichage.textContent = 'Game Over';
            clearInterval(invaderId);
        }

    };

}

/*bougerLesAliens();
bougerLesAliens();
bougerLesAliens();*/

/*Faire un intervalle pour que les aliens se déplacent tout seul toutes les 500 millisecondes*/

//invaderId = setInterval(bougerLesAliens, 500);
//Bouger plus rapidement
invaderId = setInterval(bougerLesAliens, 500);


/* 
--- LE LASER
*/


let width = 20;

function tirer(e) {
    let laserId;
    let laserEnCours = tireurPosition;


    function deplacerLaser() {
        // Faire d'abord disparaître le laser
        toutesLesDivs[laserEnCours].classList.remove('laser');
        //remonter sur l'axe Y
        laserEnCours -= width;
        toutesLesDivs[laserEnCours].classList.add('laser');



        //dès que le laser dépasse la première rangée
        if (laserEnCours < width) {
            clearInterval(laserId);
            setInterval(() => {
                toutesLesDivs[laserEnCours].classList.remove('laser');
            }, 100);
            //On enlève la classe laser
        }



        //Détecter la collision afficher la class boom et la retirer au bout de quelques millisecondes

        //Si le laser est une div qui contient la classe alien
        if (toutesLesDivs[laserEnCours].classList.contains('alien')){
            toutesLesDivs[laserEnCours].classList.remove('laser');
            toutesLesDivs[laserEnCours].classList.remove('alien');
            toutesLesDivs[laserEnCours].classList.add('boom');

            //La méthode filter() filtre un tableau et retourne un nouveau tableau

            alienInvaders = alienInvaders.filter(el => el !== laserEnCours);
            // On fait disparaître la classe rouge.
            setTimeout(() => toutesLesDivs[laserEnCours].classList.remove('boom'), 250)
            clearInterval(laserId);

            /* Afficher le résultat selon les collisions et JEU GAGNÉ */

            resultats++;
            //Si le résulat est égal à 3 * 12
            if(resultats === 36){
                affichage.textContent = "BRAVO c'est GAGNÉ !";
                clearInterval(invaderId);
            }else{
                //Rappel backtik `sur Mac OS, sur clavier PC Windows Linux AltGr + 7 + espace les variables sont interpolées avec ${}
                affichage.textContent = `Score : ${resultats}`;
            }

        }



    }

    //Appeler le laser
    // 32 barre espace
    if (e.keyCode === 32) {
        laserId = setInterval(() => {
            deplacerLaser();
        }, 100);
    }


}

//Quand la touche est levée
document.addEventListener('keyup', tirer);

