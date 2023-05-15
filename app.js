let hand = []
let hasBlackjack = false
let isAlive = true 
let sum = 0
let message = ""
let button = document.querySelector('.btn')
let messageEl = document.querySelector('.message-el')
let sumEl = document.querySelector('.sum-el')
let cardsEl = document.querySelector('.cards-el')
let newCardBtn = document.querySelector('.new-card')
let playerEl = document.querySelector('.player-el')
const imgCardOne = document.querySelector('.card-one')
const imgCardTwo = document.querySelector('.card-two')
const div = document.querySelector('.hand')
const totalDiv = document.querySelector('.sum-el')

//Player object for future feature
let player = {
    name: "you",
    chips: 100
}

playerEl.textContent = player.name +': '+ player.chips

button.addEventListener('click', startGame)
newCardBtn.addEventListener('click',newCard)

// function startingHand(){
//     fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
//         .then(response => {
//             if (!response.ok) {
//             throw new Error('Network response was not ok')
//             }
//             return response.json()
//         })
//         .then(data => {
//             //console.log(data)

//             imgCardOne.src = data.cards[0].image
//             //imgCardTwo.src = data.cards[1].image
        
//             let valOne = data.cards[0].value
//             //let valTwo = data.cards[1].value

//             hand.push(valOne)
//             //hand.push(valTwo)

//             calculateTotal()
//             checkForBlackjack()
//         })
//         .catch(error => {
//             console.error('There was a problem with the fetch operation:', error)
//         }) 
// }

function getRandomCard() {
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
            div.appendChild(img)

            img.src = data.cards[0].image
            // Add Tailwind classes to control size for each card that is drawn
            img.classList.add('w-20', 'h-26', 'md:w-36', 'md:h-48')


            let cardVal = data.cards[0].value

            hand.push(cardVal)

            calculateTotal()
            checkForBlackjack()
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error)
        })
}

//The method Math.random give a value between o and 0.999999999 by moltyply * 13 and adding 13 and using Math.floor it gives us a number between 0 and 13. that would work for any range of numbers.

function startGame(){
    hand = []
    total = 0
    sum = 0  
    messageEl.textContent = ''

    while (div.firstChild) {
        div.firstChild.remove();
    }

    getRandomCard()
    getRandomCard()
    // hand = [firstCard, secondCard]
    // sum = firstCard + secondCard
    // runGame()
    //sumEl.innertext += total
    //console.log(total)
}

// function runGame(){
//     cardsEl.textContent = 'Your hand: ' 

//     for (let i=0; i<hand.length; i++){
//         cardsEl.textContent += hand[i] +' '
//     }

//     sumEl.textContent = "sum: " + sum 
//     if (sum <= 20){
//         message = 'here is you hand do you want a New Card?'
//     }else if ( sum === 21){
//         message = "You have Blackjack!!"
//         hasBlackjack = true
//     }else {
//         message = "YOU ARE OUT!!"
//         isAlive = false       
//     } 
//     messageEl.textContent = message
// }

function newCard(){
    if(isAlive === true &&
       hasBlackjack === false &&
       sum < 31 &&
       sum != 0
       ){
        getRandomCard()
    }
}

function calculateTotal() {
    let total = 0
    for(let i = 0; i <= hand.length - 1; i++){
        if(hand[i] === 'ACE'){
            if(total - 11 <= 31){
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
    sumEl.innerText = total
    sum = total
}

function checkForBlackjack() {
    if(sum == 31){
        messageEl.innerText = 'BLACKJACK'
        player.chips ++
    }else if(sum > 31){
        messageEl.innerText = 'SORRY YOU ARE OUT!'
        isAlive === false
        player.chips -= 10
    }
}