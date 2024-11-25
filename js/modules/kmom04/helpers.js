/**
 * @module helpers
 * @author Jesper Liljeroos
 */

/**
 * Centers the HTML element on the screen, called everytime the window is resized.
 */
function center () {
  const box1 = document.getElementById('box1')

  box1.style.top = (window.innerHeight / 2) - (box1.clientHeight / 2) + 'px'
  box1.style.left = (window.innerWidth / 2) - (box1.clientWidth / 2) + 'px'
}

/**
 * Types the width and height of the current window in the console.
 */
function info () {
  const winHeight = window.innerHeight
  const winWidth = window.innerWidth

  console.log(`Window height: ${winHeight}`)
  console.log(`Window width: ${winWidth}`)
}

export { center, info }
