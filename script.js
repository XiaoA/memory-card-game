const gameContainer = document.getElementById("game");
let firstCard = null;
let secondCard = null;
let preventClicks = false;

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

function handleCardClick(event) {
  function chooseCards() {
    if (preventClicks) return;
    
    let chosenCard = event.target;

    if (firstCard === null) {
      firstCard = chosenCard;
    } else if (secondCard === null) {
      secondCard = chosenCard;
    }
    
    if (firstCard && secondCard) {
      preventClicks = true;
    }
    
    chosenCard.classList.add("revealed");
    chosenCard.style.backgroundColor = chosenCard.classList[0];

    if (firstCard.className === secondCard.className) {
      firstCard.removeEventListener('click', handleCardClick);
      secondCard.removeEventListener('click', handleCardClick);
      firstCard = null;
      secondCard = null
      preventClicks = false;
    } else {
      console.log('try again');
    }
  }
  chooseCards();
}

createDivsForColors(shuffledColors);
