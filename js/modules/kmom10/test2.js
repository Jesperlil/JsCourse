/**
 * Runs the second test, a FizzBuzz test. Creating random sequences and comparing to users input.
 */

let score = 0

/**
 * Start the second test (FizzBuzz).
 * @param {Function} completionCallback - A callback function to execute upon test completion.
 */
function testTwo (completionCallback) {
  score = 0
  const container = document.getElementById('firstContainer')
  container.innerHTML = `
    <h2>The second test is a FizzBuzz</h2>
    <p>You will be given a number and you have to enter either the continous</p>
    <p>number or Fizz/Buzz depending on what number is supposed to be next.<p>
    <button id="startFizzBuzz" class="buttons">Press here to start!</button>
    `
  const button = document.getElementById('startFizzBuzz')

  button.addEventListener('click', async () => {
    fizzBuzzTest(completionCallback)
  })
}

/**
 * Generate a random integer between 1 and 50 (inclusive).
 * @returns {number} A random integer.
 */
function getRandomInteger () {
  const min = Math.ceil(1)
  const max = Math.floor(50)
  return Math.floor(Math.random() * (max - min) + min)
}

/**
 * Create a sequence of numbers or Fizz/Buzz strings starting from a given number.
 * @param {number} firstNumber - The starting number for the sequence.
 * @returns {string} A string representing the generated sequence.
 */
function createSequence (firstNumber) {
  const sequence = []
  for (let i = firstNumber; i < firstNumber + 4; i++) {
    const newArrayElement = checkRemainder(i)
    sequence.push(newArrayElement)
  }

  const sequenceString = sequence.join('  ') + '  '

  return sequenceString
}

/**
 * Perform the FizzBuzz test by generating a sequence and presenting options to the user.
 * @param {Function} completionCallback - A callback function to execute upon test completion.
 */
function fizzBuzzTest (completionCallback) {
  const container = document.getElementById('firstContainer')

  const firstNumber = getRandomInteger()

  const newSequence = createSequence(firstNumber)

  container.innerHTML = `
  <h2>${newSequence} ?</h2>
  `

  const secondContainer = document.getElementById('secondContainer')
  secondContainer.innerHTML = `
  <h3>This test current score: ${score}</h3>
  `

  const nextNumber = firstNumber + 4
  const correctAnswer = checkRemainder(nextNumber)

  for (let i = 0; i < 4; i++) {
    const button = document.createElement('button')
    button.classList.add('buttons')
    const buttonTexts = [nextNumber, 'Fizz', 'Buzz', 'Fizz-Buzz']
    button.innerText = buttonTexts[i]
    container.appendChild(button)
    button.addEventListener('click', e => checkScore(e.target, correctAnswer, completionCallback))
  }
}

/**
 * Check if a number in the sequence is supposed to be 'Fizz', 'Buzz', or 'Fizz-Buzz'.
 * @param {number} numberInSequence - The number in the sequence to check.
 * @returns {string|number} Either 'Fizz', 'Buzz', 'Fizz-Buzz', or the number itself.
 */
function checkRemainder (numberInSequence) {
  if (numberInSequence % 3 === 0 && numberInSequence % 5 === 0) {
    return 'Fizz-Buzz'
  } else if (numberInSequence % 3 === 0) {
    return 'Fizz'
  } else if (numberInSequence % 5 === 0) {
    return 'Buzz'
  } else {
    return numberInSequence
  }
}

/**
 * Check the user's score for the FizzBuzz test and display feedback.
 * @param {HTMLElement} userInput - The clicked user input button element.
 * @param {string} correctAnswer - The correct answer (Fizz/Buzz/Fizz-Buzz) for the current sequence.
 * @param {Function} completionCallback - A callback function to execute upon test completion.
 */
function checkScore (userInput, correctAnswer, completionCallback) {
  const userInputText = userInput.innerText
  const correctAnswerString = correctAnswer.toString()

  const buttons = document.querySelectorAll('.buttons')
  buttons.forEach(btn => {
    if (btn !== userInput) {
      btn.disabled = true
    }
  })

  if (userInputText === correctAnswerString) {
    userInput.style.background = 'green'
    score = 5
  } else {
    userInput.style.background = 'red'
  }

  const secondContainer = document.getElementById('secondContainer')
  secondContainer.innerHTML = `
  <h3>This test current score: ${score}</h3>
  <button id=nextTest class="buttons">Next test</button>
  `
  const nextTestButton = document.getElementById('nextTest')

  nextTestButton.addEventListener('click', () => fizzBuzzCompleted(completionCallback))
}

/**
 * Handle the completion of the FizzBuzz test and execute the callback function.
 * @param {Function} completionCallback - A callback function to execute upon test completion.
 */
function fizzBuzzCompleted (completionCallback) {
  if (typeof completionCallback === 'function') {
    completionCallback(score)
  }
}

export { testTwo }
