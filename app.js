let hand = []
let sum = 0
let hasBlackjack = false
let isAlive = false
let message = ""
let button = document.querySelector('.btn')
let messageEl = document.querySelector('.message-el')
let sumEl = document.querySelector('.sum-el')
let cardsEl = document.querySelector('.cards-el')
let newCardBtn = document.querySelector('.new-card')
let playerEl = document.querySelector('.player-el')


//Player object for future feature
let player = {
    name: "name",
    chips: "£100"
}

playerEl.textContent = player.name +': '+ player.chips


button.addEventListener('click', startGame)

newCardBtn.addEventListener('click',newCard)

function getRandomCard(){
    let randomCard = Math.floor(Math.random()*13) + 1
    if(randomCard >=11){
        return 10
    }else if (randomCard === 1){
        return 11
    }else{ 
    return randomCard
    }    
}

//The method Math.random give a value between o and 0.999999999 by moltyply * 13 and adding 13 and using Math.floor it gives us a number between 0 and 13. that would work for any range of numbers.

function startGame(){
    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    hand = [firstCard, secondCard]
    sum = firstCard + secondCard
    runGame()
}

function runGame(){
    cardsEl.textContent = 'Your hand: ' 

    for (let i=0; i<hand.length; i++){
        cardsEl.textContent += hand[i] +' '
    }

    sumEl.textContent = "sum: " + sum 
    if (sum <= 20){
        message = "New Card?"
    }else if ( sum === 21){
        message = "You have Blackjack!!"
        hasBlackjack = true
    }else {
        message = "YOU ARE OUT!!"
        isAlive = false       
    } 
    messageEl.textContent = message
}

function newCard(){
    if(isAlive && hasBlackjack === false ){
        let card = getRandomCard()
        sum += card
        hand.push(card)
        runGame() 
    }
}