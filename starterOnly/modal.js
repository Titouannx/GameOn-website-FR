//GENERAL

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

const errorMessages = {
	lastName: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
	firstName: "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
	email: "Veuillez entrer une adresse email valide.",
	birthdate: "Vous devez entrer votre date de naissance.",
	quantity: "Vous devez entrer une quantité correcte.",
	radio: "Vous devez choisir une option.",
	checkbox: "Vous devez vérifier que vous acceptez les termes et conditions.",
};

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelectorAll(".close");

const firstNameDiv = document.querySelector("#firstDiv");
const lastNameDiv = document.querySelector("#lastDiv");
const emailDiv = document.querySelector("#emailDiv");
const birthdateDiv = document.querySelector("#birthdateDiv");
const quantityDiv = document.querySelector("#quantityDiv");
const radioDiv = document.querySelector("#radioDiv");
const checkboxDiv = document.querySelector("#checkboxDiv");

const main = document.querySelector("#main");

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  main.removeChild(document.querySelector(".success"))
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));

//FORM

// DOM Form Elements
const formSignup = document.getElementById("formSignup");

//inputs validations functions

function firstValidation() {
	let inputValue = document.getElementById("first").value;
	if (inputValue !== null && inputValue.length > 2) return true;
}

function lastValidation() {
  let inputValue = document.getElementById("last").value;
	if (inputValue !== null && inputValue.length > 2) return true;
}

function emailValidation() {
    let regex = /^([a-z0-9_\.-]+\@[\da-z\.-]+\.[a-z\.]{2,6})$/;
    let inputValue = document.getElementById("email").value;
    return regex.test(inputValue);
}

// user birthdate to age conversion and validation

function birthdateValidation() {
  let userDateInput = document.getElementById("birthdate").value;
	if (userDateInput !== "") return true;
}

function quantityValidation() {
    let regex = /^[0-9]+$/;
    let inputValue = document.getElementById("quantity").value;
    return regex.test(inputValue);
}

function locationValidation() {
    let radioButtons = document.querySelectorAll(".checkbox-input[type=radio]");
    for(let radio of radioButtons){
        if(radio.checked === true) return true;
    }
    return false;
}

function checkboxValidation() {
    let inputValue = document.getElementById("checkbox1").checked;
    return inputValue;
}

//inputs validations on submit click

document
	.getElementById("btn-submit")
	.addEventListener("click", function formValidation(event) {
		event.preventDefault();
		let isValid = true;
    removeErrors();
		if (!firstValidation()) {
			isValid = false;
      displayError(firstNameDiv,errorMessages.firstName)
		} 
    if (!lastValidation()) {
			isValid = false;
      displayError(lastNameDiv,errorMessages.lastName)
		} 
    if (!emailValidation()) {
			isValid = false;
      displayError(emailDiv,errorMessages.email)
		} 
    if (!birthdateValidation()) {
			isValid = false;
      displayError(birthdateDiv,errorMessages.birthdate)
		} 
    if (!quantityValidation()) {
			isValid = false;
      displayError(quantityDiv,errorMessages.quantity)
		} 
    if (!locationValidation()) {
			isValid = false;
      displayError(radioDiv,errorMessages.radio)
		} 
    if (!checkboxValidation()) {
			isValid = false;
      displayError(checkboxDiv,errorMessages.checkbox)
		}
		if (isValid) {
      displaySuccess(main,"Merci ! Votre réservation a été reçue.")
      closeModal();
      validate();
		}
	});

  function removeErrors(){
    document.querySelectorAll(".error").forEach(el => el.remove());
  }

  function displayError(elt,textError){
    let p = document.createElement("p");
    p.innerHTML = textError
    p.className = "error"
    p.style.color = "red"
    p.style.fontSize = "15px"
    elt.appendChild(p)
  }

  function displaySuccess(elt, textSuccess){
    let p = document.createElement("p");
    p.innerHTML = textSuccess
    p.className = "success"
    p.style.color = "green"
    p.style.fontSize = "15px"
    p.style.marginBottom = "20px"
    elt.prepend(p)
  }