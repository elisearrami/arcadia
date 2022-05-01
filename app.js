/** 
 * Traitement du formulaire
 */

// 1. Sélectionner et stocker les éléments du formulaire

const form = document.querySelector('#formulaire');
const prenom = document.querySelector('#prenom');
const nom = document.querySelector('#nom');
const email = document.querySelector('#email');
const message = document.querySelector('#message');

const msgError  = document.querySelectorAll('.error'); 



// 2. Détecter la validation du formulaire
// L'événement est déclenché à partir du clic sur le bouton submit qui s'applique au formulaire

form.addEventListener('submit', (event) => {
    event.preventDefault();//fonction qui empêche le comportement par défaut le rafraîchissement de la page
    console.log('formulaire envoyé');


    // Je récupère les valeurs de chacun des inputs
    const prenomValue = prenom.value.trim();
    console.log(prenomValue.length, "prenom : ", prenomValue);


    const nomValue = nom.value.trim();
    console.log(nomValue.length, "nom : ", nomValue);

    const emailValue = email.value.trim();
    console.log(emailValue.length, "email : ", emailValue);


    const messageValue = message.value.trim();
    console.log(messageValue.length, "message : ", messageValue);

    /*Fixer les conditions de validation :
    Si le champ est vide, un message d'erreur apparait, sinon on affiche un message de succès
    */

    // Tous les messages d'erreur sont invisibles par défaut
    msgError.forEach(error => {
        error.classList.add('invisible');
    });

    /* Je vérifie les informations de l'utilisateur
    la prioriété length compte le nombre de caractères contenus dans la variable
    || équivaut à OU
    Si l'une des conditions est vraie, alors le bloc est exécuté (une erreur est déclenchée)
    En cas d'erreur je logue l'erreur 
    La balise input et erreur sont voisines.
    A partir du point de référence j'enlève la classe invisible à son voisin : nextSibling.
    */
    if (prenomValue.length < 2 || prenomValue.length > 10) {
        console.log('erreur prenom');
        prenom.nextElementSibling.classList.remove('invisible');
    } else if (nomValue.length < 3 || nomValue.length > 15) {
        console.log('erreur nom');
        nom.nextElementSibling.classList.remove('invisible');
    } else if (messageValue.length < 10 || messageValue.length > 100) {
        console.log('erreur message');
        message.nextElementSibling.classList.remove('invisible');
    } else {
        console.log('succès');
        //traitement du formulaire
        //https://developer.mozilla.org/fr/docs/Learn/Forms/Sending_forms_through_JavaScript
        //Passer par des services externes SMTP ou traiter le formulaire par un script serveur.
    };


})



