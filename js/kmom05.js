import { generateYears, clearTable, fetchData, addScore } from './modules/kmom05/test.js'

generateYears()

const swedenURL = 'https://raw.githubusercontent.com/dbwebb-se/js-v2/master/example/co2-json/sweden.json'
const norwayURL = 'https://raw.githubusercontent.com/dbwebb-se/js-v2/master/example/co2-json/norway.json'
const denmarkURL = 'https://raw.githubusercontent.com/dbwebb-se/js-v2/master/example/co2-json/denmark.json'

const option = document.getElementById('myselect')

option.addEventListener('change', async function (event) {
  const year = event.target.value

  clearTable()

  const swedenData = await fetchData(swedenURL, year, 'Sweden')
  const norwayData = await fetchData(norwayURL, year, 'Norway')
  const denmarkData = await fetchData(denmarkURL, year, 'Denmark')

  addScore(swedenData, norwayData, denmarkData)
})

const resetScore = document.getElementById('resetscore')
const storage = window.sessionStorage

resetScore.addEventListener('click', function (event) {
  storage.clear()
  clearTable()
})
