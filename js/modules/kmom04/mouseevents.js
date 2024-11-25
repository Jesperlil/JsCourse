/**
 * Toggles the selected class for an element.
 * @param {HTMLElement} box - The element to toggle the selected class.
 */
function selection (box) {
  box.classList.toggle('selected')
}

/**
 * Makes the elemnt shrink and then dissapear.
 * @param {HTMLElement} box - The element to toggle the selected class.
 */
function vanish (box) {
  box.classList.add('animateSize')
  box.style.width = '2px'
  box.style.height = '2px'
}

export { selection, vanish }
