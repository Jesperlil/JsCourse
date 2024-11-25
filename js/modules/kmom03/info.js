const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
const persons = [
  'Nelson Mandela',
  'John F. Kennedy',
  'Ifti Nasim',
  'Malcolm X',
  'Sojourner Truth',
  'Eleanor Roosevelt',
  'Rosa Parks'
]
const years = [
  '1918 - 2013',
  '1917 - 1963',
  '1946 - 2011',
  '1925 - 1965',
  '1797 - 1883',
  '1884 - 1962',
  '1913 - 2005'
]

/**
 * Creates a box and adds picture & text to it.
 * @param { object } counterObj - The counter keeping track of which box is added, and what is to be added next.
 * @param { HTMLElement } btn - The button which triggers actions.
 */
function newBox (counterObj, btn) {
  const temp = document.createElement('div')
  const person = persons[counterObj.count]
  const year = years[counterObj.count]

  btn.style.backgroundColor = colors[counterObj.count + 1]

  temp.className = 'box'
  temp.style.backgroundColor = colors[counterObj.count]
  temp.id = counterObj.count

  temp.addEventListener('click', function boxClick (event) {
    const contentDiv = document.createElement('div')
    contentDiv.innerHTML =
        `
        <p>${person}</p>
        <img src="img/logo.png" height="100" alt="logga">
        <p>${year}</p>
        `
    event.target.appendChild(contentDiv)
    event.target.removeEventListener('click', boxClick)
  })

  counterObj.count++

  document.getElementsByClassName('content')[0].appendChild(temp)
}

export { newBox }
