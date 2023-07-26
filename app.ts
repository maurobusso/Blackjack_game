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
const div: Element | null = document.querySelector('.hand')
const totalDiv: Element | null = document.querySelector('.sum-el')

//Player object for future feature
let player: {name:string, chips: number} = {
    name: "you",
    chips: 100
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
            if(div){

                div.appendChild(img)
    
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

//The method Math.random give a value between o and 0.999999999 by moltyply * 13 and adding 13 and using Math.floor it gives us a number between 0 and 13. that would work for any range of numbers.

function startGame(){

    hand = []
    sum = 0  
    hasBlackjack = false
    isAlive = true

    if(messageEl){
        messageEl.textContent = ''
    }
    
    if(div){
        while (div.firstChild) {
            div.firstChild.remove();
        }
    }

    if(sumEl){
        sumEl.innerText = '0'
    }

    getRandomCard()
    getRandomCard()
}

function newCard(){
    if(isAlive === true &&
       hasBlackjack === false &&
       sum < 21 
       ){
        getRandomCard()
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