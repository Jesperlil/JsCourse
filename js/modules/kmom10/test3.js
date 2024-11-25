/**
 * Runs last IQ test, a reading/reaction test with a time limiter. Not displayed but after 15 seconds user is unable to press any buttons.
 */

let score = 0
let testActive = true

const firstContainer = document.getElementById('firstContainer')
const secondContainer = document.getElementById('secondContainer')

const shapes = ['square', 'circle', 'triangle', 'rectangle']
const colors = ['Red', 'Green', 'Yellow', 'Blue', 'Black']

const options = []

colors.forEach(color => {
  shapes.forEach(shape => {
    options.push(color + ' ' + shape)
  })
})

/**
 * Initiates the third test, where the user must press objects in a specific order within a time limit.
 * @param {Function} completionCallback - Callback function to be called when the test is completed.
 */
function testThree (completionCallback) {
  score = 0
  testActive = true
  firstContainer.innerHTML = `
  <h2>This is the third and last test!</h2>
  <p>In this test you will be shown 10 objects with different shapes and colors.</p>
  <p>Your task will be to press each of the objects in the correct order.</p>
  <p>When pressing the start button a 15 second timer will start, finnish before it ends.</p>
  <button id="startTestThree" class="buttons">Press here to start!</button>
  `
  secondContainer.innerHTML = `
  <h3>This test current score: ${score}</h3>
  `

  const button = document.getElementById('startTestThree')

  button.addEventListener('click', async () => {
    readingTest(completionCallback)
  })
}

/**
 * Handles the reading test where objects are displayed and the user must click them in the correct order.
 * @param {Function} completionCallback - Callback function to be called when the test is completed.
 */
function readingTest (completionCallback) {
  setTimeout(() => {
    testActive = false
    const secondContainer = document.getElementById('secondContainer')
    secondContainer.innerHTML = `
    <h3>This test current score: ${score}</h3>
    <h3>Time's up, well done!</h3>
    <button id=testCompleted class="buttons">IQ test completed</button>
    `
    const nextTestButton = document.getElementById('testCompleted')

    nextTestButton.addEventListener('click', () => testThreeCompleted(completionCallback))
  }, 15000)
  let currentStep = 0
  const correctSequence = []

  firstContainer.innerHTML = `
  <div id="elements" class="elements">
  </div>
  <ol id="elementsList" class="lists">
  </ol>
  `

  const randomIntegersArray = randomIntegers()
  const shuffledArray = shuffleArray(randomIntegersArray)

  for (let i = 0; i < 10; i++) {
    const currentElementListObject = options[randomIntegersArray[i]]
    correctSequence.push(options[randomIntegersArray[i]])
    const shuffledElementDisplay = options[shuffledArray[i]]

    displayElementsList(currentElementListObject)
    displayElements(shuffledElementDisplay)
  }

  const elementsDiv = document.getElementById('elements')

  elementsDiv.addEventListener('click', event => {
    if (testActive) {
      const clickedObject = event.target

      // Get the shape and style of the clicked object for future comparisons.
      const shape = Array.from(clickedObject.classList).find(c => shapes.includes(c))
      const style = window.getComputedStyle(clickedObject)
      let colorRGB = ''

      if (shape === 'triangle') {
        colorRGB = style.color
      } else {
        colorRGB = style.backgroundColor
      }
      let color = ''

      switch (colorRGB) {
        case 'rgb(0, 128, 0)':
          color = 'Green'
          break
        case 'rgb(0, 0, 255)':
          color = 'Blue'
          break
        case 'rgb(255, 255, 0)':
          color = 'Yellow'
          break
        case 'rgb(255, 0, 0)':
          color = 'Red'
          break
        case 'rgb(0, 0, 0)':
          color = 'Black'
          break
      }

      const clickedObjectRedone = color + ' ' + shape
      const elementsListQuery = document.querySelector('#elementsList')

      const childNodes = elementsListQuery.childNodes

      // Checks the clicked object with the current description.
      if (correctSequence[currentStep] === clickedObjectRedone) {
        score++
        currentStep++
        childNodes[currentStep].style.color = 'green'
      } else {
        currentStep++
        childNodes[currentStep].style.color = 'red'
      }

      const secondContainer = document.getElementById('secondContainer')
      secondContainer.innerHTML =
      `
      <h3>Current score: ${score}</h3>
      `
    }
  })
}

/**
 * Shuffles an array randomly.
 * @param {Array} array - The array to be shuffled.
 * @returns {Array} - The shuffled array.
 */
function shuffleArray (array) {
  const shuffled = array.slice()
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = shuffled[i]
    shuffled[i] = shuffled[j]
    shuffled[j] = temp
  }
  return shuffled
}

/**
 * Generates an array of random integers with unique values.
 * @returns {Array} - An array of random unique integers.
 */
function randomIntegers () {
  const randomIntegersArray = []

  while (randomIntegersArray.length < 10) {
    const randomInteger = Math.floor(Math.random() * 20)

    if (!randomIntegersArray.includes(randomInteger)) {
      randomIntegersArray.push(randomInteger)
    }
  }

  return randomIntegersArray
}

/**
 * Displays an object in the elements list.
 * @param {string} object - The object to be displayed in the list.
 */
function displayElementsList (object) {
  const elementsList = document.getElementById('elementsList')
  const li = document.createElement('li')
  li.textContent = object
  elementsList.appendChild(li)
}

/**
 * Displays an object in the elements container.
 * @param {string} object - The object to be displayed in the container.
 */
function displayElements (object) {
  const [color, shape] = object.split(' ')
  const elementsDiv = document.getElementById('elements')

  const element = document.createElement('div')
  element.classList.add('object')
  element.classList.add(shape.toLowerCase())
  if (shape.toLowerCase() === 'triangle') {
    element.style.color = color.toLowerCase()
  } else {
    element.style.backgroundColor = color.toLowerCase()
  }

  elementsDiv.appendChild(element)
}

/**
 * Callback function to be called when the third test is completed.
 * @param {Function} completionCallback - Callback function to be called when the test is completed.
 */
function testThreeCompleted (completionCallback) {
  if (typeof completionCallback === 'function') {
    completionCallback(score)
  }
}

export { testThree }
