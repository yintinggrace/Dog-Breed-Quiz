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
  setTimeout(async () => {
    document.querySelector(".alert-container").classList.remove("alert-container-visible");
    const dogOptions = getRandomFourDogs();
    createQuizButton(dogOptions);
    const shownDog = getOneRandomDogFromQuizOptions(dogOptions);
    const shownDogURL = await getDog(shownDog);

    setTimeout(() => {
      getDogImg(shownDogURL);
    }, 50);

  }, 500);
}

function getRandomFourDogs() {
  let randomQuizOptions = [];
  for (let i = 0; i < 4; i++) {
    const randomDog = arrayRandomElement(ALL_BREEDS);
    randomQuizOptions.push(randomDog);
  }
  return randomQuizOptions;
}

function createQuizButton(dogOptions) {
  for (let i = 0; i < 4; i++) {
    const quizButton = document.createElement("button");
    quizButton.classList.add("quiz-option");
    quizButton.textContent = dogOptions[i].name;
    document.querySelector(".options").append(quizButton);
    quizButton.addEventListener("click", tellCorrectOrNot);
  }
}

function getOneRandomDogFromQuizOptions(dogOptions) {
  const randomDog = arrayRandomElement(dogOptions);
  return randomDog;
}

async function getDog(shownDog) {
  const breedArrayRequest = `https://dog.ceo/api/breed/${shownDog.url}/images`;
  const response = await getBreedArray(breedArrayRequest);
  const resource = await response.json();
  const breedArray = resource.message;
  const randomDogFromBreedArray = arrayRandomElement(breedArray);
  return randomDogFromBreedArray;
}

function getDogImg(shownDogURL) {
  document.querySelector(".dog-background-image").classList.add("hidden");

  const dogPicture = document.createElement("img");
  const options = document.querySelector(".options");
  const mainDom = document.querySelector("main");
  mainDom.insertBefore(dogPicture, options);
  dogPicture.setAttribute("src", shownDogURL);
  dogPicture.classList.add("shown-dog-picture");
}

function arrayRandomElement(array) {
  const randomIndex = getRandomNumber(array.length);
  return array[randomIndex];
}

function getRandomNumber(max, min = 0) {
  return min + Math.floor(max * Math.random());
}

function tellCorrectOrNot(event) {
  const chosenDogOption = event.target.textContent.split(' ');;
  const shownDog = document.querySelector(".shown-dog-picture").src;
  if (shownDog.includes(chosenDogOption[0]) && shownDog.includes(chosenDogOption[1])) {
    // Correct answer
    document.querySelector(".alert-container").classList.add("alert-container-visible");
    document.querySelector(".alert-box").classList.add("alert-box-visible");
    document.querySelector(".alert-box").classList.add("correct");
    document.querySelector(".alert-close").classList.remove("hidden");
    document.querySelector(".alert-text").textContent = "CORRECT!";
    document.querySelector(".alert-close").textContent = "ONE MORE";
    document.querySelector(".alert-close").addEventListener("click", showNextQuestion);

  } else {
    // Wrong answer
    document.querySelector(".alert-container").classList.add("alert-container-visible");
    document.querySelector(".alert-box").classList.add("alert-box-visible");
    document.querySelector(".alert-box").classList.add("wrong");
    document.querySelector(".alert-close").classList.remove("hidden");
    document.querySelector(".alert-text").textContent = "I'm afraid not...:-(";
    document.querySelector(".alert-close").textContent = "ONE MORE";
    document.querySelector(".alert-close").addEventListener("click", showNextQuestion);
  }
}

function showNextQuestion(event) {
  console.log(event);
  showQuizPage();
  document.querySelector(".alert-box").classList.remove("correct");
  document.querySelector(".alert-box").classList.remove("wrong");
  document.querySelector(".alert-close").classList.add("hidden");
  document.querySelector(".alert-box").classList.add("contacting-server");
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
