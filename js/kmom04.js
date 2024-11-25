import { center, info } from './modules/kmom04/helpers.js'
import { selection, vanish } from './modules/kmom04/mouseevents.js'
import * as KeyboardEvents from './modules/kmom04/keyboardevents.js'

const box1 = document.getElementById('box1')

center()
info()

window.addEventListener('resize', center)
box1.addEventListener('click', function (event) {
  if (event.target.classList.contains('box')) {
    selection(event.target)
  }
})

box1.addEventListener('dblclick', function (event) {
  vanish(event.target)
  setTimeout(function () {
    event.target.remove()
  }, 2000)
})

document.addEventListener('keydown', function (event) {
  const key = event.key
  const steps = 10

  switch (key) {
    case 'ArrowUp':
      KeyboardEvents.move(0, -steps)
      break
    case 'ArrowDown':
      KeyboardEvents.move(0, steps)
      break
    case 'ArrowLeft':
      KeyboardEvents.move(-steps, 0)
      break
    case 'ArrowRight':
      KeyboardEvents.move(steps, 0)
      break
    case 'e':
      KeyboardEvents.makeCircle()
      break
    case 'w':
      KeyboardEvents.sizeUp()
      break
    case 'q':
      KeyboardEvents.sizeDown()
      break
    case 't':
      KeyboardEvents.copyBoxes()
      break
    case 'u':
      KeyboardEvents.toggleSelectedFalse()
      break
    case 'i':
      KeyboardEvents.toggleSelectedTrue()
      break
    case 'y':
      KeyboardEvents.eraseSelected()
      break
    case 'r':
      KeyboardEvents.changeColor()
      break
    case 'p':
      KeyboardEvents.randomizedClone()
      break
  }
  KeyboardEvents.ownCreation()
})
