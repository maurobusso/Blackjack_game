const hand = [];
const hasBlackjack = false;
const isAlive = true;
const sum = 0;
const message = "";
const button = document.querySelector('.btn');
const messageEl = document.querySelector('.message-el');
const sumEl = document.querySelector('.sum-el');
const cardsEl = document.querySelector('.cards-el');
const newCardBtn = document.querySelector('.new-card');
const playerEl = document.querySelector('.player-el');
const imgCardOne = document.querySelector('.card-one');
const imgCardTwo = document.querySelector('.card-two');
const div = document.querySelector('.hand');
const totalDiv = document.querySelector('.sum-el');
//Player object for future feature
const player = {
    name: "you",
    chips: 100
};
if (playerEl) {
    playerEl.textContent = player.name + ': ' + player.chips;
}
if (button) {
    button.addEventListener('click', startGame);
}
if (newCardBtn) {
    newCardBtn.addEventListener('click', newCard);
}
function getRandomCard() {
    var img = document.createElement('img');
    fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
        .then(function (response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then(function (data) {
        console.log(data);
        if (div) {
            div.appendChild(img);
            img.src = data.cards[0].image;
            // Add Tailwind classes to control size for each card that is drawn
            img.classList.add('w-20', 'h-26', 'md:w-36', 'md:h-48');
            var cardVal = data.cards[0].value;
            hand.push(cardVal);
            calculateTotal();
            checkForBlackjack();
        }
    })
        .catch(function (error) {
        console.error('There was a problem with the fetch operation:', error);
    });
}
//The method Math.random give a value between o and 0.999999999 by moltyply * 13 and adding 13 and using Math.floor it gives us a number between 0 and 13. that would work for any range of numbers.
function startGame() {
    hand = [];
    sum = 0;
    if (messageEl) {
        messageEl.textContent = '';
    }
    if (div) {
        while (div.firstChild) {
            div.firstChild.remove();
        }
    }
    getRandomCard();
    getRandomCard();
}
function newCard() {
    if (isAlive === true &&
        hasBlackjack === false &&
        sum < 21 &&
        sum != 0) {
        getRandomCard();
    }
}
function calculateTotal() {
    var total = 0;
    for (var i = 0; i <= hand.length - 1; i++) {
        if (hand[i] === 'ACE') {
            if (total - 11 <= 21) {
                total += 11;
            }
            else {
                total += 1;
            }
        }
        else if (hand[i] === 'JACK' || hand[i] === 'QUEEN' || hand[i] === 'KING') {
            total += 10;
        }
        else {
            total += parseInt(hand[i]);
        }
    }
    if (sumEl) {
        sumEl.innerText = total.toString();
    }
    sum = total;
}
function checkForBlackjack() {
    if (sum === 21 && messageEl) {
        messageEl.innerText = 'BLACKJACK';
        player.chips++;
    }
    else if (sum > 21 && messageEl) {
        messageEl.innerText = 'SORRY YOU ARE OUT!';
        isAlive = false;
        player.chips -= 10;
    }
}

//constats
// const MAX_SCORE = 21;
// const WINNING_SCORE = 21;
// const CARD_API_URL = 'https://deckofcardsapi.com/api/deck/new/draw/?count=1';

// DOM Elements
// const messageEl = document.querySelector('.message-el');
// const sumEl = document.querySelector('.sum-el');
// const cardsEl = document.querySelector('.cards-el');
// const playerEl = document.querySelector('.player-el');
// const newCardBtn = document.querySelector('.new-card');

// Player object for future features
// const player = {
//     name: 'you',
//     chips: 100,
//   };
  
  // Initialize the player display
//   if (playerEl) {
//     playerEl.textContent = `${player.name}: ${player.chips}`;
//   }
  
  // Event listeners
//   if (newCardBtn) {
//     newCardBtn.addEventListener('click', () => {
//       if (sum < MAX_SCORE) {
//         getRandomCard();
//       }
//     });
//   }

  // Function to fetch a random card
// function getRandomCard() {
//     fetch(CARD_API_URL)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         const card = data.cards[0];
//         hand.push(card.value);
//         displayCard(card);
//         calculateTotal();
//         checkForBlackjack();
//       })
//       .catch((error) => {
//         console.error('There was a problem with the fetch operation:', error);
//       });
//   }
  
  // Function to display a card
// function displayCard(card) {
//     const img = document.createElement('img');
//     img.src = card.image;
//     img.classList.add('card-image');
//     cardsEl.appendChild(img);
//   }

  // Function to calculate the total sum of card values
// function calculateTotal() {
//     sum = hand.reduce((total, card) => {
//       if (card === 'ACE') {
//         return total + 11 <= MAX_SCORE ? total + 11 : total + 1;
//       } else if (['JACK', 'QUEEN', 'KING'].includes(card)) {
//         return total + 10;
//       } else {
//         return total + parseInt(card);
//       }
//     }, 0);
  
//     if (sumEl) {
//       sumEl.innerText = sum.toString();
//     }
//   }

// Function to check for blackjack
// function checkForBlackjack() {
//     if (sum === WINNING_SCORE) {
//       messageEl.innerText = 'BLACKJACK! You win!';
//       player.chips++;
//     } else if (sum > WINNING_SCORE) {
//       messageEl.innerText = 'SORRY YOU ARE OUT!';
//       player.chips -= 10;
//     }
//   }
  
//   // Function to start a new game
//   function startGame() {
//     hand = [];
//     sum = 0;
//     messageEl.textContent = '';
//     while (cardsEl.firstChild) {
//       cardsEl.firstChild.remove();
//     }
//     getRandomCard();
//     getRandomCard();
//   }
  
//   // Initialize the game by calling startGame
//   startGame();