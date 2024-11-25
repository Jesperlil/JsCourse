import { selection, vanish } from './mouseevents.js'

/**
 * Moves all selected elements set number of steps on the y or x axel.
 * @param {number} x - The amount of steps moved on the x-axel.
 * @param {number} y - The amount of steps moved on the y-axel.
 */
function move (x, y) {
  const all = document.getElementsByClassName('selected')

  for (const box of all) {
    const oldTop = parseInt(box.style.top)
    const oldLeft = parseInt(box.style.left)

    if (oldTop + y >= 40 && (oldTop + box.clientHeight) + y <= window.innerHeight && oldLeft + x >= -1 && (oldLeft + box.clientWidth) + x <= window.innerWidth) {
      box.style.top = `${oldTop + y}px`
      box.style.left = `${oldLeft + x}px`
    }
  }
}

/**
 * Toggles the 'circle' css class for all selected elements, to change the shape.
 */
function makeCircle () {
  const all = document.getElementsByClassName('selected')
  for (const box of all) {
    box.classList.toggle('circle')
  }
}

/**
 * Increases size of all selected elements and calling resizeAtCenter to make center of box to stay at same position.
 */
function sizeUp () {
  const all = document.getElementsByClassName('selected')
  for (const box of all) {
    // Gör boxarna större och sen centrera.
    const oldSize = box.getBoundingClientRect()
    box.style.width = `${oldSize.width + 10}px`
    box.style.height = `${oldSize.height + 10}px`
    resizeAtCenter(box, oldSize)
  }
}

/**
 * Decrease size of all selected elements and calling resizeAtCenter to make center of box to stay at same position.
 */
function sizeDown () {
  const all = document.getElementsByClassName('selected')
  for (const box of all) {
    // Gör boxarna mindre och sen centrera.
    const oldSize = box.getBoundingClientRect()
    box.style.width = `${oldSize.width - 10}px`
    box.style.height = `${oldSize.height - 10}px`
    resizeAtCenter(box, oldSize)
  }
}

/**
 * Make center of box to stay at same position.
 * @param {HTMLElement} box - The targeted box which is to be repositioned.
 * @param {DOMRect} oldSize - The old information of the box, used as reference for new position.
 */
function resizeAtCenter (box, oldSize) {
  const oldCenterX = oldSize.left + oldSize.width / 2
  const oldCenterY = oldSize.top + oldSize.height / 2

  const newCenter = box.getBoundingClientRect()
  const newCenterX = newCenter.left + newCenter.width / 2
  const newCenterY = newCenter.top + newCenter.height / 2

  const newX = oldCenterX - newCenterX
  const newY = oldCenterY - newCenterY

  // Justera position Y / X för hålla element centrerad
  box.style.left = `${box.offsetLeft + newX}px`
  box.style.top = `${box.offsetTop + newY}px`
}

/**
 * Generates a random position within the window, taken into account the navbar for the element.
 * @param {HTMLElement} box - The element for which the position will be generated.
 * @returns {number[]} An array containing the randomized X and Y coordinates.
 */
function createPosition (box) {
  const mostLeft = parseInt(box.style.left) / 2
  const mostTop = (parseInt(box.style.top) / 2) + 40

  const mostRight = window.innerWidth - (parseInt(box.style.left) / 2) - 10
  const mostBottom = window.innerHeight - (parseInt(box.style.top) / 2) - 15

  const randomizedX = Math.random() * (mostRight - mostLeft) + mostLeft
  const randomizedY = Math.random() * (mostBottom - mostTop) + mostTop
  return [randomizedX, randomizedY]
}

/**
 * Creates copies of selected elemnts and positions randomly on the window.
 */
function copyBoxes () {
  const selectedBoxes = document.querySelectorAll('.selected')

  selectedBoxes.forEach(function (box) {
    const cloneBox = box.cloneNode(true)

    const [positionX, positionY] = createPosition(box)

    // Skapa nya boxen
    cloneBox.style.position = 'absolute'
    cloneBox.style.left = `${positionX}px`
    cloneBox.style.top = `${positionY}px`

    document.body.appendChild(cloneBox)

    cloneBox.addEventListener('click', function (event) {
      if (event.target.classList.contains('box')) {
        selection(event.target)
      }
    })

    cloneBox.addEventListener('dblclick', function (event) {
      vanish(event.target)
      setTimeout(function () {
        event.target.remove()
      }, 2000)
    })
  })
}

/**
 * Makes all selected elemnts unselected.
 */
function toggleSelectedFalse () {
  const selectedBoxes = document.querySelectorAll('.selected')
  selectedBoxes.forEach(function (box) {
    box.classList.toggle('selected')
  })
}

/**
 * Makes all unselected elemnts selected.
 */
function toggleSelectedTrue () {
  const selectedBoxes = document.querySelectorAll('.box:not(.selected)')
  selectedBoxes.forEach(function (box) {
    box.classList.toggle('selected')
  })
}

/**
 * Removes all elemnts selected.
 */
function eraseSelected () {
  const selectedBoxes = document.querySelectorAll('.selected')
  selectedBoxes.forEach(function (box) {
    box.remove()
  })
}

/**
 * Changes colors of all selected elements, defined by a predefined order.
 */
function changeColor () {
  const selectedBoxes = document.querySelectorAll('.selected')
  selectedBoxes.forEach(function (box) {
    let currentColor = window.getComputedStyle(box).backgroundColor

    switch (currentColor) {
      case 'rgb(255, 0, 0)':
        currentColor = 'red'
        break
      case 'rgb(255, 165, 0)':
        currentColor = 'orange'
        break
      case 'rgb(255, 255, 0)':
        currentColor = 'yellow'
        break
      case 'rgb(0, 128, 0)':
        currentColor = 'green'
        break
      case 'rgb(0, 0, 255)':
        currentColor = 'blue'
        break
      case 'rgb(75, 0, 130)':
        currentColor = 'indigo'
        break
      case 'rgb(238, 130, 238)':
        currentColor = 'violet'
        break
    }

    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
    const firstIndex = colors.indexOf(currentColor)
    let secondIndex = (firstIndex + 1)
    if (secondIndex === 7) {
      secondIndex = 0
    }
    const nextColor = colors[secondIndex]
    box.style.backgroundColor = nextColor
  })
}

/**
 * Creates one randomized clone with randomized attributes.
 */
function randomizedClone () {
  const box = document.getElementById('box1')
  const cloneBox = box.cloneNode(true)
  const [positionX, positionY] = createPosition(box)

  // Skapa nya boxen
  cloneBox.style.position = 'absolute'
  cloneBox.style.left = `${positionX}px`
  cloneBox.style.top = `${positionY}px`
  const randomColorIndex = Math.floor(Math.random() * 7)
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
  cloneBox.style.backgroundColor = colors[randomColorIndex]
  const randomForm = Math.floor(Math.random() * 2)
  if (randomForm === 0) {
    cloneBox.classList.toggle('circle')
  }

  document.body.appendChild(cloneBox)

  cloneBox.addEventListener('click', function (event) {
    if (event.target.classList.contains('box')) {
      selection(event.target)
    }
  })

  cloneBox.addEventListener('dblclick', function (event) {
    vanish(event.target)
    setTimeout(function () {
      event.target.remove()
    }, 2000)
  })
}

/**
 * Makes a counter which keeps track of total amount of boxes or circles on the screen.
 */
function ownCreation () {
  const elementCount = document.querySelectorAll('.box').length
  const counterElement = document.getElementById('counter')
  if (counterElement) {
    counterElement.textContent = `Objects Count: ${elementCount}`
  }
  console.log('Varje gång en klon skapas uppdateras siffran för elementCount')
}

export { move, makeCircle, sizeDown, sizeUp, copyBoxes, toggleSelectedFalse, toggleSelectedTrue, eraseSelected, changeColor, randomizedClone, ownCreation }
