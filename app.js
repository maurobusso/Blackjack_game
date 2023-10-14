var hand = [];
var computerHand = [];
var hasBlackjack = false;
var isAlive = true;
var sum = 0;
var message = "";
var button = document.querySelector('.btn');
var messageEl = document.querySelector('.message-el');
var sumEl = document.querySelector('.sum-el');
var cardsEl = document.querySelector('.cards-el');
var newCardBtn = document.querySelector('.new-card');
var stayBtn = document.querySelector('.stay-btn');
var playerEl = document.querySelector('.player-el');
var myHand = document.querySelector('.hand');
var totalDiv = document.querySelector('.sum-el');
var dealerHand = document.querySelector('.dealerHand');
var cardBack = 'https://i.pinimg.com/originals/0a/c9/80/0ac980faf82b5e7c51ad33539d98d218--black-goddess-vintage-playing-cards.jpg';
//Player object for future feature
var player = {
    name: "you",
    chips: 100
};
// const hand = {
//     player: [],
//     dealer: [],
// };
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
function initialDraw() {
    var img = document.createElement('img');
    fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=4')
        .then(function (response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then(function (data) {
        console.log(data);
        if (myHand) {
            var cards = data.cards;
            console.log(cards);
            getRandomCardForDealer(cards);
            getRandomCardForPlayer(cards);
        }
    })
        .catch(function (error) {
        console.error('There was a problem with the fetch operation:', error);
        if (messageEl) {
            messageEl.innerText = 'Error fetching card. Please try again later.';
        }
    });
}
//this refactorer version of above code more concise and mantainable
function getRandomCardForDealer(cards) {
    var cardBack = 'https://i.pinimg.com/originals/0a/c9/80/0ac980faf82b5e7c51ad33539d98d218--black-goddess-vintage-playing-cards.jpg';
    if (dealerHand) {
        for (var i = 2; i <= 3; i++) {
            var cardImage = createCardImage(cards[i].image);
            dealerHand.appendChild(cardImage);
            if (hand.length === 0) {
                cardImage.src = cardBack;
            }
        }
        calculateTotal();
        checkForBlackjack();
    }
}
function getRandomCardForPlayer(cards) {
    if (myHand) {
        for (var i = 0; i < 2; i++) {
            hand.push(cards[i].code);
            var cardImage = createCardImage(cards[i].image);
            myHand.appendChild(cardImage);
        }
        calculateTotal();
        checkForBlackjack();
    }
}
function createCardImage(imageSrc) {
    //const cardBack = 'https://i.pinimg.com/originals/0a/c9/80/0ac980faf82b5e7c51ad33539d98d218--black-goddess-vintage-playing-cards.jpg'
    var cardImage = document.createElement('img');
    cardImage.classList.add('w-20', 'h-26', 'md:w-36', 'md:h-48');
    cardImage.src = imageSrc;
    return cardImage;
}
function startGame() {
    makeHeadersVisible();
    hand = [];
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
function drawOneCard() {
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
        if (myHand) {
            var cards = data;
            myHand.appendChild(img);
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
        if (messageEl) {
            messageEl.innerText = 'Error fetching card. Please try again later.';
        }
    });
}
function newCard() {
    if (isAlive === true &&
        hasBlackjack === false &&
        sum < 21) {
        drawOneCard();
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
        if (hand[i] === 'JACK' || hand[i] === 'QUEEN' || hand[i] === 'KING') {
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
function makeHeadersVisible() {
    var yourCardsHeader = document.querySelector('.yourCards');
    var dealerCardsHeader = document.querySelector('.dealerCards');
    var gameButtons = document.querySelector('.gameButtons');
    var stayBtn = document.querySelector('.stay-btn');
    var newCardBtn = document.querySelector('.new-card');
    if (yourCardsHeader) {
        yourCardsHeader.classList.remove('hidden');
    }
    if (dealerCardsHeader) {
        dealerCardsHeader.classList.remove('hidden');
    }
    if (gameButtons) {
        gameButtons.classList.remove('hidden');
    }
    // if (stayBtn) {
    //     stayBtn.classList.remove('hidden')
    //     newCardBtn.classList.remove('hidden')
    // }
}
function showDealerCards(cards) {
    if (dealerHand) {
        for (var i = 2; i <= 3; i++) {
            var cardImage = createCardImage(cards[i].image);
            dealerHand.appendChild(cardImage);
        }
    }
}
//--- OOP version
// class Dealer {
//     public hand:
// }
