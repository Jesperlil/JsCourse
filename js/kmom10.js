import { runTests } from './modules/kmom10/testManager.js'

/**
 * Show user some information, then proceeds to the test manager.
 */
function startScreen () {
  const container = document.getElementById('firstContainer')

  container.innerHTML = `
    <h2>This is an IQ test!</h2>
    <p>This Quiz will test your IQ in various forms and grade you based on your performance.</p>
    <button class="buttons" id="startButton">Start test!</button>
  `

  const button = document.getElementById('startButton')
  button.addEventListener('click', () => {
    runTests()
  })
}

startScreen()

export { startScreen }
