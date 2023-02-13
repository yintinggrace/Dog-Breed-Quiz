"use strict"

document.querySelector(".logout-button").addEventListener("click", logoutFromAccount);

function showQuizPage() {
  loginPage.querySelector(".container").classList.remove("login-container");
  loginPage.querySelector(".container").classList.add("quiz-container");
  document.querySelector(".alert-text").textContent = "Getting a random image...";
  document.querySelector(".name-logout").classList.remove("hidden");
  document.querySelector("main").innerHTML = `
    <img class="dog-background-image" src="media/logo.png" alt="dog_logo">
    <div class="options"></div>
  `;
  setTimeout(() => {
    document.querySelector(".alert-container").classList.remove("alert-container-visible");
    const animalOptions = getRandomFourAnimals();
    createQuizButton(animalOptions);
  }, 500);
}

function createQuizButton(animalOptions) {
  for (let i = 0; i < 4; i++) {
    const quizButton = document.createElement("button");
    quizButton.classList.add("quiz-option");
    quizButton.textContent = animalOptions[i].name;
    document.querySelector(".options").append(quizButton);
  }
}

function getRandomFourAnimals() {
  let randomQuizOptions = [];
  for (let i = 0; i < 4; i++) {
    const randomAnimal = arrayRandomElement(ALL_BREEDS);
    randomQuizOptions.push(randomAnimal);
  }
  return randomQuizOptions;
}

function arrayRandomElement(array) {
  const randomIndex = getRandomNumber(array.length);
  return array[randomIndex];
}

function getRandomNumber(max, min = 0) {
  return min + Math.floor(max * Math.random());
}

function logoutFromAccount() {
  document.querySelector("body").innerHTML = `
    <div class="container login-container">
      <header>
        <img class="dog-logo" src="media/logo.png" alt="dog_logo">
        <h3>Dog Breed Quiz</h3>
      </header>

      <div class="name-logout hidden">
        <div class="userName"></div>
        <button class="logout-button">logout</button>
      </div>

      <main>
        <h1>LOGIN</h1>
        <div class="info">
          <label for="username">User Name:</label>
          <input name="username" type="text">
          <label for="password">Password:</label>
          <input name="password" type="password">
        </div>
        <p class="slogan">Let the magic start!</p>
        <button class="login-button">Login</button>
        <div class="to-register-page">New to this? Register for free</div>
      </main>

      <footer>The Dog Breed Quiz is made possible thanks to the free API by <a href="#">DOG CEO Zine</a></footer>

      <!-- Alert messages -->

      <div class="alert-container">
        <div class="alert-overlay"></div>
        <div class="alert-box">
          <div class="alert-text"></div>
          <button class="alert-close hidden">CLOSE</button>
        </div>
      </div>
     </div>
  `;

  const loginPage = document.querySelector("body");
  loginPage.querySelector(".container").classList.remove("quiz-container");

  loginPage.querySelector(".to-register-page").addEventListener("click", showRegisterPage);
  loginPage.querySelector(".login-button").addEventListener("click", loginWithAccount);
  loginPage.querySelector("input[name = 'username']").addEventListener("keyup", printUsername);
  loginPage.querySelector(".logout-button").addEventListener("click", logoutFromAccount);

}
