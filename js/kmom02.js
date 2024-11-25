import { randomAnimals, africanAnimals, americanAnimals, europeanAnimals } from './modules/kmom02/animals.js'
import { hourGreeting } from './modules/kmom02/greeting.js'

const europeanDiv = document.getElementById('europeandiv')
const americanDiv = document.getElementById('americandiv')
const africanDiv = document.getElementById('africandiv')
const greetDiv = document.getElementById('greetdiv')

europeanDiv.innerHTML = `<h3>${randomAnimals(europeanAnimals)}</h3>`
africanDiv.innerHTML = `<h3>${randomAnimals(africanAnimals)}</h3>`
americanDiv.innerHTML = `<h3>${randomAnimals(americanAnimals)}</h3>`
greetDiv.innerHTML = `<h3>${hourGreeting()}</h3>`
