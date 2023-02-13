"use strict"

const loginPage = document.querySelector("body");

loginPage.querySelector(".to-register-page").addEventListener("click", showRegisterPage);

/* Go to register page from login page */
function showRegisterPage() {
  loginPage.querySelector(".container").classList.add("register-container");
  loginPage.querySelector(".container").classList.remove("login-container");
  loginPage.querySelector("h1").textContent = "REGISTER";
  loginPage.querySelector(".slogan").textContent = "Ready when you are...";
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

  const response = await register(postRequest);
}
