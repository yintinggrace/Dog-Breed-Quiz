"use strict"

function showQuizPage() {
  loginPage.querySelector(".container").classList.remove("login-container");
  loginPage.querySelector(".container").classList.add("quiz-container");
  document.querySelector(".alert-text").textContent = "Getting a random image...";
  document.querySelector("main").innerHTML = `
    <img class="dog-background-image" src="media/logo.png" alt="dog_logo">
  `;
  setTimeout(() => {
    document.querySelector(".alert-container").classList.remove("alert-container-visible");
  }, 500);
}
