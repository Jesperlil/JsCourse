import { newBox } from './modules/kmom03/info.js'

const btn = document.getElementById('startButton')

const newTop = (window.innerHeight / 2) - (btn.clientHeight / 2)
const newLeft = (window.innerWidth / 2) - (btn.clientWidth / 2)
btn.style.top = `${newTop}px`
btn.style.left = `${newLeft}px`

const counter = { count: 0 }

btn.addEventListener('click', () => {
  newBox(counter, btn)

  if (counter.count === 7) {
    btn.style.display = 'none'
  }
})
