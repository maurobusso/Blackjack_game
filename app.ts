let computerHand: string[] = []
let hasBlackjack: boolean = false
let isAlive: boolean = true 
let sum: number = 0
let message: string = ""
let button: Element | null = document.querySelector('.btn')
let messageEl: HTMLElement  | null = document.querySelector('.message-el')
let sumEl: HTMLElement | null = document.querySelector('.sum-el')
let cardsEl: Element | null = document.querySelector('.cards-el')
let newCardBtn: Element | null = document.querySelector('.new-card')
let stayBtn: Element | null = document.querySelector('.stay-btn')
let playerEl: Element | null = document.querySelector('.player-el')
let totalDiv: Element | null = document.querySelector('.sum-el')

let myHand: Element | null = document.querySelector('.hand')
let dealerHand: Element | null = document.querySelector('.dealerHand')

const cardBack: string = 'https://i.pinimg.com/originals/0a/c9/80/0ac980faf82b5e7c51ad33539d98d218--black-goddess-vintage-playing-cards.jpg'

let dealerCards: Card[] = []
let playerCards: Card[] = []

let player = {
    name: '',
    chips: 10
}

//separate the types on a different file
type Card = {
    code: string
    image: string
    images: {
      png: string
      svg: string
    }
    suit: string
    value: string
  }

type DeckData = {
    success: boolean
    deck_id: string
    cards: []
    remaining: number
}

if(playerEl){
    playerEl.textContent = player.name +': '+ player.chips
}

if(button){
    button.addEventListener('click', startGame)
}

if(newCardBtn){
    newCardBtn.addEventListener('click', newCard)
}

if(stayBtn){
    stayBtn.addEventListener('click', showDealerCards)
}


function startGame(){

    makeHeadersVisible()

    playerCards = []
    dealerCards = []
    sum = 0  
    hasBlackjack = false
    isAlive = true

    if(messageEl){
        messageEl.textContent = ''
    }
    
    if(myHand){
        while (myHand.firstChild) {
            myHand.firstChild.remove();
        }
    }

    if(dealerHand){
        while (dealerHand.firstChild) {
            dealerHand.firstChild.remove();
        }
    }

    if(sumEl){
        sumEl.innerText = '0'
    }

    initialDraw()
}

//draw for player
async function initialDraw() {
    try {
        while (playerCards.length < 2 && dealerCards.length < 2) {
            const response = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=2');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            
            playerCards.push(data.cards[0].image)
            dealerCards.push(data.cards[1].image)
        }
        displayCard()
        calculateTotal()
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        if (messageEl) {
            messageEl.innerText = 'Error fetching cards. Please try again later.';
        }
    }
}

//this refactorer version of above code more concise and mantainable

function getRandomCardForDealer(cards: any) {
    const cardBack = 'https://i.pinimg.com/originals/0a/c9/80/0ac980faf82b5e7c51ad33539d98d218--black-goddess-vintage-playing-cards.jpg'
    if (dealerHand) {
        for (let i = 2; i <= 3; i++) {
            const cardImage = createCardImage(cards[i].image)
            dealerHand.appendChild(cardImage)
            if(playerCards.length === 0){
                cardImage.src = cardBack
            }
        }

        calculateTotal();
        checkForBlackjack();
    }
}

// function getRandomCardForPlayer(cards: any) {
//     if (myHand) {
//         console.log("done")
//         for (let i = 0; i < 2; i++) {
//             playerCards.push(cards[i].code)
//             const cardImage = createCardImage(cards[i].image)
//             myHand.appendChild(cardImage)
//         }

//         calculateTotal();
//         checkForBlackjack();
//     }
// }

function displayCard(){
    if(playerCards && myHand){
        for(let i = 0; i < playerCards.length; i++){
            const cardImage = createCardImage(playerCards[i])
            myHand.appendChild(cardImage)
        }
    }
}

function createCardImage(imageSrc: any) {
    const cardImage = document.createElement('img');
    cardImage.classList.add('w-20', 'h-26', 'md:w-36', 'md:h-48');
    cardImage.src = imageSrc;
    return cardImage;
}

async function drawOneCard(){
    try{
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            
            playerCards.push(data.cards[0].image)
    }catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        if (messageEl) {
            messageEl.innerText = 'Error fetching cards. Please try again later.';
        }
    }
    console.log(playerCards)
}

function newCard(){
    if(isAlive === true &&
       hasBlackjack === false
       ){
        console.log("done")
        drawOneCard()
    }
}

function calculateTotal() {
    let total = 0
    for(let i = 0; i <= playerCards.length - 1; i++){
        if(playerCards[i].value === 'ACE'){
            if(total - 11 <= 21){
                total +=11
            }else{
                total += 1
            }
        }
        if(playerCards[i].value === 'JACK' || playerCards[i].value === 'QUEEN' || playerCards[i].value === 'KING' ){
            total += 10
        }else{
            total += parseInt(playerCards[i].value)
        }
    }
    if(sumEl){
        sumEl.innerText = total.toString()
    }
    sum = total
}

function checkForBlackjack() {
    if(sum === 21 && messageEl){
        messageEl.innerText = 'BLACKJACK babe'
        player.chips ++
    }else if(sum > 21 && messageEl){
        messageEl.innerText = 'SORRY YOU ARE OUT!'
        isAlive = false
        player.chips -= 10
    }
}

function makeHeadersVisible() {
    const yourCardsHeader = document.querySelector('.yourCards')
    const dealerCardsHeader = document.querySelector('.dealerCards')
    const gameButtons = document.querySelector('.gameButtons')

    const stayBtn = document.querySelector('.stay-btn')
    const newCardBtn = document.querySelector('.new-card')

    if (yourCardsHeader) {
        yourCardsHeader.classList.remove('hidden')
    }

    if (dealerCardsHeader) {
        dealerCardsHeader.classList.remove('hidden')
    }

    if (gameButtons) {
        gameButtons.classList.remove('hidden')
    }
}

function showDealerCards(){
    if(dealerHand){
        for (let i = 0; i <= dealerCards.length; i++) {
            const cardImage = createCardImage(dealerCards[i])
            dealerHand.appendChild(cardImage)
        }
    }
}