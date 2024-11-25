/**
 * Runs the first IQ test, the trivia game.
 */
let score = 0

/**
 * Start the first test, which is a trivia game.
 * @param {Function} completionCallback - A callback function to be called when the test is completed.
 */
function testOne (completionCallback) {
  const currentQuestion = 0
  score = 0

  const container = document.getElementById('firstContainer')
  container.innerHTML = `
    <h2>The first test is a Trivia</h2>
    <p>You will be given a question and 5 options.</p>
    <p>One answer will be correct for each question.<p>
    <button id="startTrivia" class="buttons">Press here to start!</button>
    `
  const button = document.getElementById('startTrivia')

  button.addEventListener('click', async () => {
    await triviaQuestions(currentQuestion, completionCallback)
  })
}

/**
 * Display trivia questions and options, and handle user interactions with buttons.
 * @param {number} currentQuestion - The index of the current trivia question.
 * @param {Function} completionCallback - A callback function to be called when the trivia test is completed.
 */
async function triviaQuestions (currentQuestion, completionCallback) {
  const container = document.getElementById('firstContainer')

  const { question, options } = await gatherTrivia(currentQuestion)

  container.innerHTML = `
    <h2>${question}</h2>
    `

  for (let i = 0; i < 5; i++) {
    const button = document.createElement('button')
    button.classList.add('buttons')
    button.innerText = options[i].text
    container.appendChild(button)
    button.addEventListener('click', e => checkOption(e.target, options[i]))
  }

  const nextButton = document.createElement('button')
  nextButton.setAttribute('id', 'nextTrivia')
  nextButton.classList.add('buttons')
  nextButton.classList.add('unable')
  nextButton.style.background = 'beige'
  nextButton.innerText = `Next question ${currentQuestion + 1}/5`
  container.appendChild(nextButton)
  nextButton.addEventListener('click', async () => {
    currentQuestion++
    if (currentQuestion < 5) {
      await triviaQuestions(currentQuestion, completionCallback)
    } else {
      triviaCompleted(completionCallback)
    }
  })
}

/**
 * Callback function to indicate the completion of the trivia test.
 * @param {Function} completionCallback - A callback function to be called with the final trivia test score.
 */
function triviaCompleted (completionCallback) {
  if (typeof completionCallback === 'function') {
    completionCallback(score)
  }
}

/**
 * Gathers data from a JSON file for displaying trivia questions and answer options.
 * @param {number} number - The index of the trivia question to fetch from the JSON file.
 * @returns {Promise<{question: string, options: Array<{text: string, correct: boolean}>}>} An object containing the question and answer options.
 */
async function gatherTrivia (number) {
  const url = '../data/trivia.json'

  const data = await fetch(url)
  const json = await data.json()

  const { question, options } = json[number]
  return { question, options }
}

/**
 * Handles the user's choice in a trivia question, updates the score, and prepares for the next question.
 * @param {HTMLElement} button - The HTML button element representing the selected answer.
 * @param {object} pressedAnswer - The answer option object with information about correctness.
 */
function checkOption (button, pressedAnswer) {
  const buttons = document.querySelectorAll('.buttons')
  buttons.forEach(btn => {
    if (btn !== button) {
      btn.disabled = true
    }
  })

  if (pressedAnswer.correct === true) {
    score++
    button.style.background = 'green'
  } else {
    button.style.background = 'red'
  }

  const nextButton = document.getElementById('nextTrivia')
  nextButton.classList.remove('unable')
  nextButton.disabled = false

  const secondContainer = document.getElementById('secondContainer')
  secondContainer.innerHTML =
  `
  <h3>This test current score: ${score}</h3>
  `
}

export { testOne }
