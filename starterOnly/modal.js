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
	name: "Veuillez entrer 2 caractères ou plus et ne pas utilisez de chiffres ou caractères spéciaux.",
	email: "Veuillez entrer une adresse email valide.",
	birthdate: "Veuillez entrer une date de naissance valide.",
	quantity: "Veuillez entrer une quantité correcte.",
	radio: "Veuillez entrer choisir une option.",
	checkbox: "Vous devez vérifier que vous acceptez les termes et conditions.",
};

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelectorAll(".close");

const success = document.querySelectorAll(".success");
const closeSuccess = document.querySelectorAll(".closeSuccess");

const firstNameDiv = document.querySelector("#firstDiv");
const lastNameDiv = document.querySelector("#lastDiv");
const emailDiv = document.querySelector("#emailDiv");
const birthdateDiv = document.querySelector("#birthdateDiv");
const quantityDiv = document.querySelector("#quantityDiv");
const radioDiv = document.querySelector("#radioDiv");
const checkboxDiv = document.querySelector("#checkboxDiv");

const main = document.querySelector("#main");

//regex constants
const regexName = /^[a-zA-Z]+$/;
const regexEmail = /^([a-z0-9_\.-]+\@[\da-z\.-]+\.[a-z\.]{2,6})$/;
const regexBirthdate = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
const regexQuantity = /^[0-9]+$/;

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  modalbg.children[0].removeChild(document.querySelector(".success"))
  modalbg.children[0].removeChild(document.querySelector(".closeSuccess"))
  //remove text from all imputs
  for (let i = 0; i < formData.length; i++) {
    formData[i].children[2].value = "";
  }
  //uncheck all radio buttons and checkboxes
  let radioButtons = document.querySelectorAll(".checkbox-input[type=radio]");
  for(let radio of radioButtons){
    radio.checked = false;
  }
  document.getElementById("checkbox1").checked = false;
  document.getElementById("checkbox2").checked = false;
  modalbg.children[0].children[1].style.display = "block";
}

// close modal forms
function closeModal() {
  removeErrors();
  modalbg.style.display = "none";
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));


//FORM

// DOM Form Elements
const formSignup = document.getElementById("formSignup");

//inputs validations functions

//Check if name and firstname are valid
function firstValidation() {
	let inputValue = document.getElementById("first").value;
  let regex = regexName;
	if (regex.test(inputValue) && (inputValue !== null && inputValue.length > 2)) return true;
}

function lastValidation() {
  let inputValue = document.getElementById("last").value;
  let regex = regexName;
	if (regex.test(inputValue) && (inputValue !== null && inputValue.length > 2)) return true;
}

function emailValidation() {
    let regex = regexEmail;
    let inputValue = document.getElementById("email").value;
    return regex.test(inputValue);
}

//check if birthdate is valid, if not, display error message
function birthdateValidation() {
  let inputValue = document.getElementById("birthdate").value;
  let regex = regexBirthdate;
  if (regex.test(inputValue)) {
    let date = new Date(inputValue);
    let today = new Date();
    if (date < today) return true;
  }
  return false;
}

function quantityValidation() {
    let regex = regexQuantity;
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

//On input change, check if input is valid
document.getElementById("first").addEventListener("input", function () {
  if(firstNameDiv.getElementsByTagName("p")[0]) firstNameDiv.getElementsByTagName("p")[0].remove();
  if (firstValidation()) {
    firstNameDiv.children[2].style.borderColor = "black";
  } else {
    displayError(firstNameDiv,errorMessages.name)
  }
});
document.getElementById("last").addEventListener("input", function () {
  if(lastNameDiv.getElementsByTagName("p")[0]) lastNameDiv.getElementsByTagName("p")[0].remove();
  if (lastValidation()) {
    lastNameDiv.children[2].style.borderColor = "black";
  } else {
    displayError(lastNameDiv,errorMessages.name)
  }
});
document.getElementById("email").addEventListener("input", function () {
  if(emailDiv.getElementsByTagName("p")[0]) emailDiv.getElementsByTagName("p")[0].remove();
  if (emailValidation()) {
    emailDiv.children[2].style.borderColor = "black";
  } else {
    displayError(emailDiv,errorMessages.email)
  }
});
document.getElementById("birthdate").addEventListener("input", function () {
  if(birthdateDiv.getElementsByTagName("p")[0]) birthdateDiv.getElementsByTagName("p")[0].remove();
  if (birthdateValidation()) {
    birthdateDiv.children[2].style.borderColor = "black";
  } else {
    displayError(birthdateDiv,errorMessages.birthdate)
  }
});
document.getElementById("quantity").addEventListener("input", function () {
  if(quantityDiv.getElementsByTagName("p")[0]) quantityDiv.getElementsByTagName("p")[0].remove();
  if (quantityValidation()) {
    quantityDiv.children[2].style.borderColor = "black";
  } else {
    displayError(quantityDiv,errorMessages.quantity)
  }
});

//inputs validations on submit click
document
	.getElementById("btn-submit")
	.addEventListener("click", function formValidation(event) {
		event.preventDefault();
		let isValid = true;
    removeErrors();
		if (!firstValidation()) {
			isValid = false;
      displayError(firstNameDiv,errorMessages.name)
		} 
    if (!lastValidation()) {
			isValid = false;
      displayError(lastNameDiv,errorMessages.name)
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
      displaySuccess(modalbg.children[0],"Merci pour votre inscription")
		}
	});

  function removeErrors(){
    document.querySelectorAll(".error").forEach(el => el.remove());
  }

  function displayError(elt,textError){
    elt.children[2].style.borderColor = "red"
    let p = document.createElement("p");
    p.innerHTML = textError
    p.className = "error"
    p.style.color = "red"
    p.style.fontSize = "11px"
    elt.appendChild(p)
  }

  function displaySuccess(elt, textSuccess){
    elt.children[1].style.display = "none"
    let btn = document.createElement("button");
    btn.innerHTML = "Fermer"
    btn.className = "modal-btn closeSuccess"
    btn.style.fontSize = "15px"
    btn.style.width = "auto"
    btn.style.padding = "10px 60px"
    btn.style.margin = "40px auto"
    elt.prepend(btn)

    //on click, close modal
    document.querySelector(".closeSuccess").addEventListener("click", function(){
      modalbg.style.display = "none";
    })

    let p = document.createElement("p");
    p.innerHTML = textSuccess
    p.className = "success"
    p.style.fontSize = "40px"
    p.style.fontWeight = "normal"
    p.style.textAlign = "center"
    p.style.margin = "300px auto"
    elt.prepend(p)
  }
