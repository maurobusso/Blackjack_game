var hand = [];
var hasBlackjack = false;
var isAlive = true;
var sum = 0;
var message = "";
var button = document.querySelector('.btn');
var messageEl = document.querySelector('.message-el');
var sumEl = document.querySelector('.sum-el');
var cardsEl = document.querySelector('.cards-el');
var newCardBtn = document.querySelector('.new-card');
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
if (playerEl) {
    playerEl.textContent = player.name + ': ' + player.chips;
}
if (button) {
    button.addEventListener('click', startGame);
}
if (newCardBtn) {
    newCardBtn.addEventListener('click', newCard);
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
            // myHand.appendChild(img)
            // dealerHand.appendChild(img)
            // img.src = data.cards[0].image
            // img.src = data.cards[1].image
            // // Add Tailwind classes to control size for each card that is drawn
            // img.classList.add('w-20', 'h-26', 'md:w-36', 'md:h-48')
            // let cardVal = data.cards[0].value
            // hand.push(cardVal)
            // calculateTotal()
            // checkForBlackjack()
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
// function getRandomCardForDealer(cards){
//     if(dealerHand){
//         let firstCard = document.createElement('img')
//         let secondCard = document.createElement('img')
//         dealerHand.appendChild(firstCard)
//         dealerHand.appendChild(secondCard)
//         firstCard.classList.add('w-20', 'h-26', 'md:w-36', 'md:h-48')
//         secondCard.classList.add('w-20', 'h-26', 'md:w-36', 'md:h-48')
//         firstCard.src = cards[2].image
//         secondCard.src = cards[3].image
//     }
// }
// function getRandomCardForPlayer(cards){
//     if(myHand){
//         let firstCard = document.createElement('img')
//         let secondCard = document.createElement('img')
//         myHand.appendChild(firstCard)
//         myHand.appendChild(secondCard)
//         firstCard.classList.add('w-20', 'h-26', 'md:w-36', 'md:h-48')
//         secondCard.classList.add('w-20', 'h-26', 'md:w-36', 'md:h-48')
//         firstCard.src = cards[0].image
//         secondCard.src = cards[1].image
//         calculateTotal()
//         checkForBlackjack()
//     }
// }
//this refactorer version of above code more concise and mantainable
function getRandomCardForDealer(cards) {
    if (dealerHand) {
        for (var i = 2; i <= 3; i++) {
            var cardImage = createCardImage(cards[i].image);
            dealerHand.appendChild(cardImage);
        }
        calculateTotal();
        checkForBlackjack();
    }
}
function getRandomCardForPlayer(cards) {
    if (myHand) {
        for (var i = 0; i < 2; i++) {
            var cardImage = createCardImage(cards[i].image);
            myHand.appendChild(cardImage);
        }
        calculateTotal();
        checkForBlackjack();
    }
}
function createCardImage(imageSrc) {
    var cardImage = document.createElement('img');
    cardImage.classList.add('w-20', 'h-26', 'md:w-36', 'md:h-48');
    cardImage.src = imageSrc;
    return cardImage;
}
//The method Math.random give a value between o and 0.999999999 by moltyply * 13 and adding 13 and using Math.floor 
//it gives us a number between 0 and 13. that would work for any range of numbers.
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
function makeHeadersVisible() {
    var yourCardsHeader = document.querySelector('.yourCards');
    var dealerCardsHeader = document.querySelector('.dealerCards');
    if (yourCardsHeader) {
        yourCardsHeader.classList.remove('hidden');
    }
    if (dealerCardsHeader) {
        dealerCardsHeader.classList.remove('hidden');
    }
}
