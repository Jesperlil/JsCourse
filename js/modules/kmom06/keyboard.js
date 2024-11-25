import { hangman } from './hangman.js'
import { gameOver, checkWin } from './game.js'

let wrongLetters = 0

/**
 * Creates and displays the keyboard for the Hangman game.
 * @param {string} currentWord - The word for the Hangman game.
 *                               This word will be used for game initialization.
 */
function createKeyboard (currentWord) {
  const keyboardDiv = document.querySelector('.keyboard')

  console.log(currentWord)

  for (let i = 97; i <= 122; i++) {
    const button = document.createElement('button')
    button.innerText = String.fromCharCode(i)
    keyboardDiv.appendChild(button)
    button.addEventListener('click', e => initGame(e.target, String.fromCharCode(i), currentWord))
  }
}

/**
 * Initializes the Hangman game based on user input.
 * @param {HTMLElement} button - The button element that triggered the game action.
 * @param {string} clickedLetter - The letter clicked/selected by the user.
 * @param {string} currentWord - The word being guessed in the Hangman game.
 */
function initGame (button, clickedLetter, currentWord) {
  clickedLetter = clickedLetter.toUpperCase()
  if (currentWord.includes(clickedLetter)) {
    const wordDisplay = document.querySelector('.worddisplay')
    const letters = wordDisplay.querySelectorAll('li')

    Array.from(currentWord).forEach((letter, index) => {
      if (letter === clickedLetter) {
        letters[index].innerHTML = letter
        letters[index].classList.add('correct')
      }
    })
  } else {
    const partsToShow = hangman.validParts.filter(part => !currentWord.includes(part))

    if (partsToShow.length > wrongLetters) {
      hangman.show(partsToShow[wrongLetters])
      wrongLetters++
    }
  }

  button.disabled = true

  if (wrongLetters === hangman.validParts.length) {
    gameOver('loss', currentWord)
  } else if (checkWin(currentWord)) {
    gameOver('win', currentWord)
  }
}

export { createKeyboard }
