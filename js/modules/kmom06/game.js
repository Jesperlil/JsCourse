/**
 * Fetches a random word from a JSON file and displays it in the game.
 * @returns {Promise<string>} A Promise that resolves to a randomly selected word in uppercase from the JSON file.
 */
async function createWord () {
  const url = 'data/words.json'
  const wordDisplay = document.querySelector('.worddisplay')

  const data = await fetch(url)
  const json = await data.json()

  const min = Math.ceil(0)
  const max = Math.floor(49)
  const randomNumber = Math.floor(Math.random() * (max - min) + min)

  const randomWord = json[randomNumber].toUpperCase()

  wordDisplay.innerHTML = randomWord.split('').map(() => '<li class="letter"></li>').join('')

  return randomWord
}

/**
 * Checks if all letters of the current word have been correctly guessed.
 * @param {string} currentWord - The word to be guessed in the Hangman game.
 * @returns {boolean} Returns true if all letters in the current word have been guessed correctly, otherwise returns false.
 */
function checkWin (currentWord) {
  const wordDisplay = document.querySelector('.worddisplay')
  const letters = wordDisplay.querySelectorAll('li')

  for (let i = 0; i < currentWord.length; i++) {
    const letterElement = letters[i]
    const correctLetter = currentWord[i]

    if (!letterElement.classList.contains('correct') || letterElement.textContent !== correctLetter) {
      return false
    }
  }
  return true
}

/**
 * Displays the game over modal with appropriate messages based on the game result.
 * @param {string} status - The status of the game ('win' or 'loss').
 * @param {string} currentWord - The correct word in the Hangman game. This word is displayed in the game over modal.
 */
function gameOver (status, currentWord) {
  const gameModal = document.querySelector('.gameModal')
  const playAgainBtn = document.querySelector('.playAgain')
  if (status === 'win') {
    gameModal.classList.add('show')
    gameModal.querySelector('h4').innerText = 'Congratulaions!'
    gameModal.querySelector('p').innerText = `The correct word was ${currentWord}`
    playAgainBtn.addEventListener('click', () => {
      location.reload()
    })
  } else if (status === 'loss') {
    gameModal.classList.add('show')
    gameModal.querySelector('h4').innerText = 'Unforunatly you did not win!'
    gameModal.querySelector('p').innerText = `The correct word was ${currentWord}`
    playAgainBtn.addEventListener('click', () => {
      location.reload()
    })
  }
}

/*
imorgon att göra:
game-modal, kolla yt historik.
jsdoc
*/

export { createWord, checkWin, gameOver }
