# Blackjack game

This is a browser-based one player blackjack game. It was started as a part of a module on the "Learn JavaScript" course from the Scrimba bootcamp. 

<a href="https://blackjack-game-mauro.netlify.app">Play now</a>

<img width="700px" heigth="900" src="https://github.com/maurobusso/Blackjack_game/blob/main/img.png">

#

How It's Made: 

<img align="left" alt="HTML" width="25px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain-wordmark.svg"/>
<img align="left" alt="CSS" width="25px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain-wordmark.svg" />
<img align="left" alt="JavaScript" width="25px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg" />
<img align="left" alt="typescript" width="25px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" />
<br>
<br>
It was first started by the core function of the game, which checks what is the sum of the card in the hand of the player and give a response accordingly. This was first tried with hard coded value then the function in charge of randomize the card was implemented. Some refactoring has been done from the original version, such as: </br>
</br>-Different and more responsive design.
</br>-Improvement in code redability.

#

Optimizations: 

The optimization that were added includes, changes in desing and responsiveness with Tailwind.css, use on a deck of card API to show the images of the cards, the app was the migrated to TypeScript to enhance type safety and code mantainability.

#

Lessons Learned: 

Initially, thanks to this project I was able to improve and put into practice: array manipulation, Boolean, conditionals, objects. The easy way to create randomization with the Math. method. I was also able to integrate a responsive design with CSS.

With this project i was also able to improve my proficiency in front-end web development, including DOM manipulation and fetching data from external APIs using the Fetch API. The game features interactive buttons, dynamic card rendering, and updates to player chips based on wins and losses. The project was developed in an organized and modular manner, with TypeScript modules used to handle shared variables and functions efficiently. The code follows best practices for readability and maintainability.

The TypeScript code has explicitly defined types for various variables, allowing for better type checking and code safety.

In this TypeScript code, the document.querySelector calls can potentially return null if no matching elements are found in the DOM. To handle the possibility of a null value, the variables that store the results of these calls are declared with union types, which include Element and null.

Here's a summary of the TypeScript features used in this code:

Union Types: For variables like button, messageEl, sumEl, cardsEl, newCardBtn, playerEl, div, and totalDiv, the types are declared as Element | null, indicating that they can hold either an Element or null.

Object Type Annotation: The player variable is explicitly declared as an object with properties name (string) and chips (number).

Type Assertion: The totalEl.innerText is set using total.toString(), which is a type assertion (type-casting) to ensure that the innerText property is set with a string value.

TypeScript provides static typing and additional features that enhance code safety and maintainability, making it a powerful tool for developing large-scale JavaScript applications.

 



