//GENERAL

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelectorAll(".close");

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
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
  // birtdate value
  let userDateInput = formSignup.birthdate.value;

  // convert to DateFormat and calcDiff
  let userBirthdate = new Date(userDateInput);
  let diff = Date.now() - userBirthdate.getTime();

  // final age calcul
  let age = new Date(diff);
  let finalAge = Math.abs(age.getUTCFullYear() - 1970);
  return finalAge>=13;
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
		if (!firstValidation()) {
			isValid = false;
		} else if (!lastValidation()) {
			isValid = false;
		} else if (!emailValidation()) {
			isValid = false;
		} else if (!birthdateValidation()) {
			isValid = false;
		} else if (!quantityValidation()) {
			isValid = false;
		} else if (!locationValidation()) {
			isValid = false;
		} else if (!checkboxValidation()) {
			isValid = false;
		}
		if (isValid) {
			formSignup.submit();
		}
	});