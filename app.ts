let hand: string[] = []
let hasBlackjack: boolean = false
let isAlive: boolean = true 
let sum: number = 0
let message: string = ""
let button: Element | null = document.querySelector('.btn')
let messageEl: HTMLElement  | null = document.querySelector('.message-el')
let sumEl: HTMLElement | null = document.querySelector('.sum-el')
let cardsEl: Element | null = document.querySelector('.cards-el')
let newCardBtn: Element | null = document.querySelector('.new-card')
let playerEl: Element | null = document.querySelector('.player-el')
let myHand: Element | null = document.querySelector('.hand')
let totalDiv: Element | null = document.querySelector('.sum-el')
let dealerHand: Element | null = document.querySelector('.dealerHand')
const cardBack = 'https://i.pinimg.com/originals/0a/c9/80/0ac980faf82b5e7c51ad33539d98d218--black-goddess-vintage-playing-cards.jpg'

//Player object for future feature
let player: {name:string, chips: number} = {
    name: "you",
    chips: 100
}

// const hand = {
//     player: [],
//     dealer: [],
// };

if(playerEl){
    playerEl.textContent = player.name +': '+ player.chips
}

if(button){
    button.addEventListener('click', startGame)
}
if(newCardBtn){
    newCardBtn.addEventListener('click', newCard)
}

function initialDraw() {
    let img = document.createElement('img')
    fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=4')
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(data => {
            console.log(data)
            if(myHand){

                let cards = data.cards
                console.log(cards)

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
                getRandomCardForDealer(cards)
                getRandomCardForPlayer(cards)
                
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error)
            if(messageEl){
                messageEl.innerText = 'Error fetching card. Please try again later.'
            }
        })
}

//this refactorer version of above code more concise and mantainable

function getRandomCardForDealer(cards) {
    const cardBack = 'https://i.pinimg.com/originals/0a/c9/80/0ac980faf82b5e7c51ad33539d98d218--black-goddess-vintage-playing-cards.jpg'
    if (dealerHand) {
        for (let i = 2; i <= 3; i++) {
            const cardImage = createCardImage(cards[i].image);
            dealerHand.appendChild(cardImage);
        }

        calculateTotal();
        checkForBlackjack();
    }
}

function getRandomCardForPlayer(cards) {
    if (myHand) {
        for (let i = 0; i < 2; i++) {
            hand.push(cards[i].code)
            const cardImage = createCardImage(cards[i].image)
            myHand.appendChild(cardImage)
        }

        calculateTotal();
        checkForBlackjack();
    }
}

function createCardImage(imageSrc) {
    //const cardBack = 'https://i.pinimg.com/originals/0a/c9/80/0ac980faf82b5e7c51ad33539d98d218--black-goddess-vintage-playing-cards.jpg'
    const cardImage = document.createElement('img');
    cardImage.classList.add('w-20', 'h-26', 'md:w-36', 'md:h-48');
    cardImage.src = imageSrc;
    return cardImage;
}

//The method Math.random give a value between o and 0.999999999 by moltyply * 13 and adding 13 and using Math.floor 
//it gives us a number between 0 and 13. that would work for any range of numbers.

function startGame(){

    makeHeadersVisible()

    hand = []
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

function drawOneCard(){
    let img = document.createElement('img')
    fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(data => {
            console.log(data)
            if(myHand){

                let cards = data

                myHand.appendChild(img)
                
    
                img.src = data.cards[0].image
    
                // Add Tailwind classes to control size for each card that is drawn
                img.classList.add('w-20', 'h-26', 'md:w-36', 'md:h-48')
    
    
                let cardVal = data.cards[0].value
    
                hand.push(cardVal)
    
                calculateTotal()
                checkForBlackjack()
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error)
            if(messageEl){
                messageEl.innerText = 'Error fetching card. Please try again later.'
            }
        })
}


function newCard(){
    if(isAlive === true &&
       hasBlackjack === false &&
       sum < 21 
       ){
        drawOneCard()
    }
}

function calculateTotal() {
    let total = 0
    for(let i = 0; i <= hand.length - 1; i++){
        if(hand[i] === 'ACE'){
            if(total - 11 <= 21){
                total +=11
            }else{
                total += 1
            }
        }else if(hand[i] === 'JACK' || hand[i] === 'QUEEN' || hand[i] === 'KING' ){
            total += 10
        }else{
            total += parseInt(hand[i])
        }
    }
    if(sumEl){
        sumEl.innerText = total.toString()
    }
    sum = total
}

function checkForBlackjack() {
    if(sum === 21 && messageEl){
        messageEl.innerText = 'BLACKJACK'
        player.chips ++
    }else if(sum > 21 && messageEl){
        messageEl.innerText = 'SORRY YOU ARE OUT!'
        isAlive = false
        player.chips -= 10
    }
}

function makeHeadersVisible() {
    const yourCardsHeader = document.querySelector('.yourCards');
    const dealerCardsHeader = document.querySelector('.dealerCards');

    if (yourCardsHeader) {
        yourCardsHeader.classList.remove('hidden');
    }

    if (dealerCardsHeader) {
        dealerCardsHeader.classList.remove('hidden');
    }
}