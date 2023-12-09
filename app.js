"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let hasBlackjack = false;
let isAlive = true;
let sum = 0;
let message = "";
let button = document.querySelector('.btn');
let messageEl = document.querySelector('.message-el');
let sumEl = document.querySelector('.sum-el');
let cardsEl = document.querySelector('.cards-el');
let newCardBtn = document.querySelector('.new-card');
let stayBtn = document.querySelector('.stay-btn');
let playerEl = document.querySelector('.player-el');
let totalDiv = document.querySelector('.sum-el');
//let computerHand: string[] = []
let myHand = document.querySelector('.hand');
let dealerHand = document.querySelector('.dealerHand');
const cardBack = 'https://i.pinimg.com/originals/0a/c9/80/0ac980faf82b5e7c51ad33539d98d218--black-goddess-vintage-playing-cards.jpg';
let dealerCards = [];
let playerCards = [];
let player = {
    name: '',
    chips: 10
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
if (stayBtn) {
    stayBtn.addEventListener('click', showDealerCards);
}
function startGame() {
    makeHeadersVisible();
    playerCards = [];
    dealerCards = [];
    sum = 0;
    hasBlackjack = false;
    isAlive = true;
    if (messageEl) {
        messageEl.textContent = '';
    }
    if (myHand) {
        while (myHand.firstChild) {
            myHand.firstChild.remove();
        }
    }
    if (dealerHand) {
        while (dealerHand.firstChild) {
            dealerHand.firstChild.remove();
        }
    }
    if (sumEl) {
        sumEl.innerText = '0';
    }
    initialDraw();
}
//draw for player
function initialDraw() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            while (playerCards.length < 2 && dealerCards.length < 2) {
                const response = yield fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=2');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = yield response.json();
                //console.log(data)
                playerCards.push(data.cards[0]);
                dealerCards.push(data.cards[1].image);
            }
            displayCard();
            calculateTotal();
        }
        catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            if (messageEl) {
                messageEl.innerText = 'Error fetching cards. Please try again later.';
            }
        }
    });
}
//this refactorer version of above code more concise and mantainable
// function getRandomCardForDealer(cards: any) {
//     const cardBack = 'https://i.pinimg.com/originals/0a/c9/80/0ac980faf82b5e7c51ad33539d98d218--black-goddess-vintage-playing-cards.jpg'
//     if (dealerHand) {
//         for (let i = 2; i <= 3; i++) {
//             const cardImage = createCardImage(cards[i].image)
//             dealerHand.appendChild(cardImage)
//             if(playerCards.length === 0){
//                 cardImage.src = cardBack
//             }
//         }
//         calculateTotal();
//         checkForBlackjack();
//     }
// }
function displayCard() {
    if (playerCards && myHand) {
        //reset content of div
        myHand.innerHTML = '';
        for (let i = 0; i < playerCards.length; i++) {
            const cardImage = createCardImage(playerCards[i].image);
            myHand.appendChild(cardImage);
        }
    }
}
// function displayCard(array: Card[]){
//     if(array && myHand){
//         //reset content of div
//         myHand.innerHTML = ''
//         for(let i = 0; i < array.length; i++){
//             const cardImage = createCardImage(array[i].image)
//             myHand.appendChild(cardImage)
//         }
//     }
// }
function createCardImage(imageSrc) {
    const cardImage = document.createElement('img');
    cardImage.classList.add('w-20', 'h-26', 'md:w-36', 'md:h-48');
    cardImage.src = imageSrc;
    return cardImage;
}
function drawOneCard() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = yield response.json();
            playerCards.push(data.cards[0]);
            displayCard();
            calculateTotal();
        }
        catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            if (messageEl) {
                messageEl.innerText = 'Error fetching cards. Please try again later.';
            }
        }
        console.log(playerCards);
    });
}
function newCard() {
    if (isAlive === true &&
        hasBlackjack === false) {
        drawOneCard();
    }
}
function calculateTotal() {
    let total = 0;
    for (let i = 0; i <= playerCards.length - 1; i++) {
        if (playerCards[i].value === 'ACE') {
            if (total - 11 <= 21) {
                total += 11;
            }
            else {
                total += 1;
            }
        }
        if (playerCards[i].value === 'JACK' || playerCards[i].value === 'QUEEN' || playerCards[i].value === 'KING') {
            total += 10;
        }
        else {
            total += parseInt(playerCards[i].value);
        }
    }
    if (sumEl) {
        sumEl.innerText = total.toString();
    }
    sum = total;
    checkForBlackjack();
}
//should get two params, dealer cards and player hands
//compare the sum 
//and spit the message
function checkForBlackjack() {
    if (sum === 21 && messageEl) {
        messageEl.innerText = 'BLACKJACK!!!';
        player.chips++;
    }
    else if (sum > 21 && messageEl) {
        messageEl.innerText = 'SORRY YOU ARE OUT!';
        isAlive = false;
        player.chips -= 10;
    }
}
function makeHeadersVisible() {
    const yourCardsHeader = document.querySelector('.yourCards');
    const dealerCardsHeader = document.querySelector('.dealerCards');
    const gameButtons = document.querySelector('.gameButtons');
    const stayBtn = document.querySelector('.stay-btn');
    const newCardBtn = document.querySelector('.new-card');
    if (yourCardsHeader) {
        yourCardsHeader.classList.remove('hidden');
    }
    if (dealerCardsHeader) {
        dealerCardsHeader.classList.remove('hidden');
    }
    if (gameButtons) {
        gameButtons.classList.remove('hidden');
    }
}
function showDealerCards() {
    if (dealerHand) {
        for (let i = 0; i < dealerCards.length; i++) {
            const cardImage = createCardImage(dealerCards[i]);
            dealerHand.appendChild(cardImage);
        }
    }
    //console.log(dealerCards)
}
//# sourceMappingURL=app.js.map