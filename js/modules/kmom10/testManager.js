/*
 * IQ Test Program
 *
 * The bread and butter of this program.
 *
 * This program is designed to conduct an IQ test composed of three different tests: Trivia, FizzBuzz, and Readingcomprehension (Object Recognition).
 * The user's performance in each test is evaluated, and their estimated IQ score is calculated based on their scores in these tests.
 * The program uses asyncs and promises to ensure that each test is completed before moving on to the next one.
 *
 * It also provides an option to restart the test and displays the user's estimated IQ score at the end.
 *
 * Author: Jesper Liljeroos
 * Date: 2024/01/13
 */

import { testOne } from './test1.js'
import { testTwo } from './test2.js'
import { testThree } from './test3.js'
import { startScreen } from '../../kmom10.js'

const firstContainer = document.getElementById('firstContainer')
const secondContainer = document.getElementById('secondContainer')

secondContainer.innerHTML = '<h3>Score will be displayed here after each test.</h3>'

let currentTest = 0

let testOneScore = 0
let testTwoScore = 0
let testThreeScore = 0

/**
 * The main source for running all the test.
 * Runs one test at a time, waiting for the previous to be completed.
 */
async function runTests () {
  if (currentTest === 3) {
    currentTest = 0
  }
  if (currentTest === 0) {
    testOneScore = await runTest(testOne)
    currentTest++
  }
  if (currentTest === 1) {
    testTwoScore = await runTest(testTwo)
    currentTest++
  }
  if (currentTest === 2) {
    testThreeScore = await runTest(testThree)
    currentTest++
  }

  const totalScore = testOneScore + testTwoScore + testThreeScore
  testSummary(totalScore)
}

/**
 * Run a test function and return the test score as a promise.
 * @param {Function} testFunction - The test function to run.
 * @param {number} score - The initial score for the test.
 * @returns {Promise<number>} A promise that resolves with the test score when the test is completed.
 */
async function runTest (testFunction, score) {
  return new Promise((resolve) => {
    testFunction((testScore) => {
      resolve(testScore)
    }, score)
  })
}

/**
 * Calculating and displaying the users estimated IQ score based on tests.
 * @param {number} score - The total score from all tests.
 */
function testSummary (score) {
  const iqScore = score
  const iqValue = 50 + iqScore * 5

  firstContainer.innerHTML = `
    <h1>Thank you for completing this IQ test! Here comes your results!</h1>
    <h2>Total score: ${score}</h2>
    <h2>Your IQ is estimated to be: ${iqValue}</h2>
  `

  secondContainer.innerHTML = `
    <button class="buttons" id="restart">Press here to try the test again!</button>
  `

  const restartButton = document.getElementById('restart')
  restartButton.addEventListener('click', () => {
    startScreen()
  })
}

/**
 * Resets the scores and reruns the function "runTests", which runs currently active test using variable "currentTest".
 */
function resetTest () {
  testOneScore = 0
  testTwoScore = 0
  testThreeScore = 0

  runTests()
}

window.reset = () => {
  resetTest()
}

export { runTests }
