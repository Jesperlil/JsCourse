import { hangman } from './modules/kmom06/hangman.js'
import { createKeyboard } from './modules/kmom06/keyboard.js'
import { createWord } from './modules/kmom06/game.js'

const randomWord = await createWord()
createKeyboard(randomWord)

for (const part of hangman.validParts) {
  hangman.hide(part)
}

const restartButton = document.getElementById('restartButton')

restartButton.addEventListener('click', () => {
  location.reload()
})
