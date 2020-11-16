const gameContainer = document.getElementById("game");
const cards = document.querySelectorAll(".game-card");
let firstCard = null;
let secondCard = null;
let preventClicks = false;
let revealedCards = 0;
let currentScore = 0;
let lowScore = localStorage.getItem("low-score")
let finalScore = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

const deckCount = COLORS.length;

let startButton = document.querySelector("#btn-start-game");
startButton.addEventListener("click", startGame);

for(let card of cards){
  card.addEventListener("click", handleCardClick);
}

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");

    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);

    gameContainer.append(newDiv);
  }
}

function resetOldGame() {
  setScore(0);
  document.querySelector("#current-score").innerHTML = "";
  document.querySelector("#final-score").innerHTML = "";
  document.querySelector("#game-over").innerHTML = "";
  document.querySelector("#play-again").innerText = "";
}

function initializeNewGame() {
  let game = document.querySelector("#game");
  game.innerHTML = "";
  let newDeck = shuffle(COLORS);
  createDivsForColors(newDeck);
}

function startGame() {
  resetOldGame();
  initializeNewGame();
}

const chooseCards = function(chosenCard) {
  if (firstCard === null) {
    firstCard = chosenCard;
    setScore(currentScore + 1);
  } else if (secondCard === null) {
    secondCard = chosenCard;
    setScore(currentScore + 1);
  }

  if (firstCard && secondCard) {
    preventClicks = true;
  }
  
  chosenCard.classList.add("revealed");
  chosenCard.style.backgroundColor = chosenCard.classList[0];
}

const checkForMatch = function() {
  if (firstCard.className === secondCard.className) {
    revealedCards += 2;
    removeEventListener();
    preventClicks = false;
  } else {
    setTimeout(function() {
      forgetChosenCards();
      preventClicks = false;
    }, 1000);
  }
}

const removeEventListener = function() {
  firstCard.removeEventListener('click', handleCardClick);
  secondCard.removeEventListener('click', handleCardClick);
  firstCard = null;
  secondCard = null;
}

const forgetChosenCards = function() {
  firstCard.style.backgroundColor = null;
  firstCard.classList.remove("revealed");
  firstCard = null;

  secondCard.style.backgroundColor = null;
  secondCard.classList.remove("revealed");
  secondCard = null;
}

function handleCardClick(event) {
  if (preventClicks) return;
  chosenCard = event.target;
  
  chooseCards(chosenCard);
  checkForMatch();

  if (revealedCards === deckCount) { endGame() };
}


function setScore(newScore) {
  currentScore = newScore;
  document.querySelector("#current-score").innerText = `Current Score: ${currentScore}`;
}

function printGameEndMsg() {
  document.querySelector("#final-score").innerText = `Final Score: ${finalScore}`;
  document.querySelector("#game-over").innerText = "Game Over";
  document.querySelector("#play-again").innerText = "Would you like to play again?";
}

function determineLowScore() {
  lowScore = +localStorage.getItem("low-score") || Infinity;
  
  if (currentScore < lowScore) {
    document.querySelector("#final-score").innerText += " - NEW BEST SCORE!";
    localStorage.setItem("low-score", currentScore);
  } else {
    document.querySelector("#current-score").innerHTML = "";
    document.querySelector("#final-score").innerText += ` (Your best score was ${lowScore})`;
  }
}

function endGame() {
  finalScore = currentScore;

  printGameEndMsg();
  determineLowScore();
}

createDivsForColors(shuffledColors);
