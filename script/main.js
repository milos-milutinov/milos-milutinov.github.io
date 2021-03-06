var user = {};
var users = [];
var logged_user = {};

var login,
  register,
  loginForm,
  regForm,
  loggedIN,
  loggedOUT,
  loginFormElement,
  registrationForm,
  logged_in;

function main() {
  //retrieve all html elements that we will use
  getAllElements();
  setElementEvents();
  /* if (logged_in !== null && logged_in.user_name !== null) {
    register.setAttribute("class", "btn-delete");
    login.setAttribute("class", "btn-delete");
    loggedIN.setAttribute("class", "btn");
    loggedIN.textContent = logged_in.user_name;
    loggedOUT.setAttribute("class", "btn");
  } */
  preventFormsFromReloading();
}

function getRegisteredUser() {
  return JSON.parse(localStorage.getItem("usersOfApp"));
}

/* ON CLICK EVENT FUNCTIONS */

function loggedOutOnClickEvent() {
  var answer = window.confirm("Are you sure?");

  if (!answer) {
    return;
  }
  var empty = {};
  localStorage.setItem("loggedUser", JSON.stringify(empty));
  window.location.reload();
  window.location.href = "./index.html";
}

// ------------Hiding registration form------------

function hideRegistrationForm() {
  registrationForm.setAttribute("class", "delete");
}

/*
 ------------Showing login form------------
 */
function loginFormIsVisible() {
  return loginFormElement.getAttribute("class") === "logging";
}

function handleLoginFormToggle() {
  hideRegistrationForm();
  if (loginFormIsVisible()) {
    loginFormElement.setAttribute("class", "delete");
  } else {
    loginFormElement.setAttribute("class", "logging");
  }
}

/*
 ------------Logging in event------------
 */
function loginOnClickEvent() {
  var user = getRegisteredUser();
  //Checks if there are any registered users in database
  if (user === null) {
    alert("There are no registered users!");
    return;
  } else {
    handleLoginFormToggle();
  }

  //Toggles login and registration form on click
  if (loginForm.getAttribute("id") === "delete") {
    loginForm.setAttribute("id", "show");
    regForm.setAttribute("class", "delete");
  } else {
    loginForm.setAttribute("id", "delete");
  }
}

/*
 ------------Show registration form------------
 */
function registerOnClickEvent() {
  if (regForm.getAttribute("class") === "delete") {
    regForm.setAttribute("class", "show");
    loginForm.setAttribute("id", "delete");
  } else {
    regForm.setAttribute("class", "delete");
  }
}

/*
 ------------Submitting and checking registration information------------
 */
function registerOnSubmitEvent() {
  var error = document.getElementById("error1");
  var name = document.getElementById("name_reg").value.trim();
  var email = document.getElementById("email").value.trim();
  var user_name = document.getElementById("id_reg").value.trim();

  if (name === "") {
    error.textContent = "You did not enter your name";
    return;
  }

  if (user_name === "") {
    error.textContent = "You must enter a username";
    return;
  }

  if (email === "") {
    error.textContent = "You did not enter your email";
    return;
  }

  if (!stringContainsLowerCase(name)) {
    error.textContent = "Your name must contain lower case letters";
    return;
  }

  if (!stringContainsUpperCase(name)) {
    error.textContent = "Your name must contain upper case letters";
    return;
  }

  if (stringContainsSpecialCharacter(name) || stringContainsANumber(name)) {
    error.textContent = "Your name must contain only letters";
    return;
  }

  if (!emailIsValid(email)) {
    error.textContent = "Email is not valid";
    return;
  }

  var registeredUser = getRegisteredUser();
  if (registeredUser !== null) {
    for (var i = 0; i < registeredUser.length; i++) {
      if (registeredUser[i].user_name === user_name) {
        error.textContent = "This username is already in use";
        return;
      }
    }
  }

  var password = document.getElementById("reg_pass").value.trim();
  if (password === "") {
    error.textContent = "You did not enter password";
    return;
  }
  if (
    !stringContainsLowerCase(password) ||
    !stringContainsUpperCase(password)
  ) {
    error.textContent =
      "Password must contain at least one upper case letter and a lower case letter";
    return;
  }

  setUserProperties(name, email, user_name, password);

  if (registeredUser !== null) {
    registeredUser.push(user);
    arrayTaken = JSON.stringify(registeredUser);
  } else {
    users.push(user);
    arrayTaken = JSON.stringify(users);
  }
  localStorage.setItem("usersOfApp", arrayTaken);
  setTimeout(() => {
    location.reload();
  }, 300);
}

function setUserProperties(name, email, userName, password) {
  user.name = name;
  user.email = email;
  user.user_name = userName;
  user.password = password;
}

/*
 ------------Submitting and checking login form------------
 */
function loginFormElementOnSubmit() {
  var user = getRegisteredUser();
  var errorMSG = document.getElementById("error");
  var user_name = document.getElementById("id_log").value.trim();
  var password = document.getElementById("id_pass").value.trim();

  for (let i = 0; i < user.length; i++) {
    if (user[i].user_name === user_name) {
      if (user[i].user_name === user_name && user[i].password === password) {
        localStorage.setItem(
          "currentUSER",
          JSON.stringify({
            user_name: user_name,
            password: password,
          })
        );
        window.location.href = "./userInterface.html";
        return;
      } else if (
        user[i].user_name === user_name &&
        user[i].password !== password
      ) {
        errorMSG.textContent = "Password is not correct";
        return;
      }
    } else {
      errorMSG.textContent = "Username is not correct";
      return;
    }
  }
}

/*
 ------------Conformation of logout------------
 */
function loginFormElementOnResetEvent() {
  var odgovor = window.confirm("Are you sure?");
  if (!odgovor) {
    return false;
  }
  localStorage.removeItem("currentUSER");
  window.location.reload();
}

/*
 ------------Prevens reloading after form is submitted------------
 */
function preventFormsFromReloading() {
  registrationForm.addEventListener("submit", function (e) {
    e.preventDefault();
  });

  loginFormElement.addEventListener("submit", function (e) {
    e.preventDefault();
  });
}

/* --------------------------------- */

/*
 ------------DOM elements------------
 */
function getAllElements() {
  logged_in = JSON.parse(localStorage.getItem("loggedUser"));
  login = document.getElementById("login");
  register = document.getElementById("register");
  loginForm = document.getElementsByTagName("form")[0];
  regForm = document.getElementsByTagName("form")[1];
  loggedIN = document.getElementById("logged");
  loggedOUT = document.getElementById("logout");
  loginFormElement = document.getElementById("logInForm");
  registrationForm = document.getElementById("registration");
}

/*
 ------------ONCLICK events------------
 */
function setElementEvents() {
  loggedOUT.onclick = loggedOutOnClickEvent;
  login.onclick = loginOnClickEvent;
  registrationForm.onsubmit = registerOnSubmitEvent;
  register.onclick = registerOnClickEvent;
  loginFormElement.onsubmit = loginFormElementOnSubmit;
  loginFormElement.onreset = loginFormElementOnResetEvent;
}

/* --------------------------------- */

main();
