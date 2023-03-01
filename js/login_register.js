"use strict"

const loginPage = document.querySelector("body");

loginPage.querySelector(".to-register-page").addEventListener("click", showRegisterPage);
loginPage.querySelector(".login-button").addEventListener("click", loginWithAccount);
loginPage.querySelector("input[name = 'username']").addEventListener("keyup", printUsername);

function printUsername(event) {
  const userName = event.target.value;
  document.querySelector(".userName").textContent = userName;
  localStorage.setItem("userName", userName);
}

/* Go to register page from login page */
function showRegisterPage() {
  loginPage.querySelector(".container").classList.add("register-container");
  loginPage.querySelector(".container").classList.remove("login-container");
  loginPage.querySelector("h1").textContent = "REGISTER";
  loginPage.querySelector(".slogan").textContent = "Ready when you are...";
  loginPage.querySelector(".slogan").style.backgroundColor = "transparent";
  loginPage.querySelector(".to-register-page").textContent = "Already have an account? Go to login";
  loginPage.querySelector("input[name = 'username']").value = "";
  loginPage.querySelector("input[name = 'password']").value = "";

  const toLoginPage = document.createElement("div");
  toLoginPage.classList.add("to-login-page");
  toLoginPage.textContent = "Already have an account? Go to login";
  toLoginPage.addEventListener("click", showLoginPage);
  loginPage.querySelector(".to-register-page").replaceWith(toLoginPage);

  const registerButton = document.createElement("button");
  registerButton.classList.add("register-button");
  registerButton.textContent = "Register";
  loginPage.querySelector(".login-button").replaceWith(registerButton);

  document.querySelector(".register-button").addEventListener("click", registerNewUser);
}

/* Go to login page from register page*/
function showLoginPage() {
  loginPage.querySelector(".container").classList.add("login-container");
  loginPage.querySelector(".container").classList.remove("register-container");
  loginPage.querySelector("h1").textContent = "LOGIN";
  loginPage.querySelector(".slogan").textContent = "Let the magic start!";
  loginPage.querySelector(".to-login-page").textContent = "New to this? Register for free";
  loginPage.querySelector("input[name = 'username']").value = "";
  loginPage.querySelector("input[name = 'password']").value = "";

  const toRegister = document.createElement("div");
  toRegister.classList.add("to-register-page");
  toRegister.textContent = "New to this? Register for free";
  toRegister.addEventListener("click", showRegisterPage);
  loginPage.querySelector(".to-login-page").replaceWith(toRegister);

  const loginButton = document.createElement("button");
  loginButton.classList.add("login-button");
  loginButton.textContent = "Login";
  loginPage.querySelector(".register-button").replaceWith(loginButton);

  loginPage.querySelector(".login-button").addEventListener("click", loginWithAccount);
}

function callContactingServer() {
  document.querySelector(".alert-container").classList.add("alert-container-visible");
  document.querySelector(".alert-box").classList.add("alert-box-visible");
  document.querySelector(".alert-box").classList.add("contacting-server");
  document.querySelector(".alert-text").textContent = "Contacting Server...";
}

function callMalfunction() {
  document.querySelector(".alert-box").classList.remove("contacting-server");
  document.querySelector(".alert-text").textContent = "The server thinks it's not a teapot!";
  document.querySelector(".alert-close").classList.remove("hidden");
  document.querySelector(".alert-close").addEventListener("click", closeAlert);
}

/* Login with account */
async function loginWithAccount() {
  const usernameInput = document.querySelector("input[name='username']").value;
  const passwordInput = document.querySelector("input[name='password']").value;

  const getRequest = `${prefix}?action=check_credentials&user_name=${usernameInput}&password=${passwordInput}`;

  callContactingServer();

  const response = await connect(getRequest);

  if (response.ok) {
    window.localStorage.setItem("isLoggedIn", true);
    showQuizPage();
  }

  // Non-existed username or wrong password
  else if (response.status === 404) {
    document.querySelector(".alert-container").classList.remove("alert-container-visible");
    document.querySelector(".slogan").textContent = "Wrong user name or password."
    document.querySelector(".slogan").style.backgroundColor = "white";
    document.querySelector(".slogan").style.padding = "6px";
  }

  // Malfunction
  else if (response.status === 418) {
    callMalfunction();
  }
}

async function registerNewUser() {
  const usernameInput = document.querySelector("input[name='username']").value;
  const passwordInput = document.querySelector("input[name='password']").value;

  const postRequest = new Request(prefix, {
    method: "POST",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({
      action: "register",
      user_name: usernameInput,
      password: passwordInput,
    }),
  });

  callContactingServer();

  const response = await connect(postRequest);

  // Register successfully
  if (response.ok) {
    document.querySelector(".alert-box").classList.remove("contacting-server");
    document.querySelector(".alert-text").innerHTML = `Registration Complete. <br>Please proceed to login.`;
    document.querySelector(".alert-close").classList.remove("hidden");
    document.querySelector(".alert-close").addEventListener("click", closeAlert);
  }

  // The user_name is already in the register
  else if (response.status === 409) {
    document.querySelector(".alert-box").classList.remove("contacting-server");
    document.querySelector(".alert-text").innerHTML = `Sorry! That name is taken. <br>Please try with another one.`;
    document.querySelector(".alert-close").classList.remove("hidden");
    document.querySelector(".alert-close").addEventListener("click", closeAlert);
  }

  // Malfunction
  else if (response.status === 418) {
    callMalfunction();
  }
}

function closeAlert() {
  document.querySelector(".alert-container").classList.remove("alert-container-visible");
  document.querySelector(".alert-close").classList.add("hidden");
}
