/**
 * @module helpers
 * @author Jesper Liljeroos
 */

/**
 * Gathers data from website depending on called year, then returns an array.
 * @param {string} countryURL - The url for the country.
 * @param {string} yearRequested - The requested year.
 * @param {string} country - Name of country.
 * @returns {Array} - Returns array of all neccessary data from URL.
 */
async function fetchData (countryURL, yearRequested, country) {
  const data = await fetch(countryURL)
  const json = await data.json()

  const targetYear = json.data.find(targetYear => targetYear.year === parseInt(yearRequested))

  const year = targetYear.year
  const co2 = targetYear.co2
  const co2GDP = targetYear.co2_per_gdp
  const co2Coal = targetYear.coal_co2
  const co2Share = targetYear.share_global_co2
  const population = targetYear.population
  const targetArray = [year, co2, co2GDP, co2Coal, co2Share, population]

  addToTable(targetArray, country)

  return targetArray
}

/**
 * Clears table when called.
 */
function clearTable () {
  const table = document.getElementById('mytable')

  table.innerHTML = `
    <table id="mytable">
        <tr>
            <th>Country</th><th>Year</th><th>co2</th><th>co2 per gdp</th><th>coal co2</th><th>share global co2</th><th>population</th>
        </tr>
    </table>
    `
  document.getElementById('swedescore').textContent = 0
  document.getElementById('norwayscore').textContent = 0
  document.getElementById('denmarkscore').textContent = 0
}

/**
 * Makes option for user to choose between the years 1900-2019.
 */
function generateYears () {
  const option = document.getElementById('myselect')

  for (let i = 1900; i < 2020; i++) {
    option.innerHTML += `
        <option value="${i}">${i}</option>
        `
  }
}

/**
 * Creates new tablerow containing the requested country's data.
 * @param {Array} countryArray - An array containing neccesary data.
 * @param {string} country - Name of the country for data.
 */
function addToTable (countryArray, country) {
  const table = document.getElementById('mytable')

  table.innerHTML += `
    <tr>
        <td>${country}
        <td>${countryArray[0]}</td>
        <td>${countryArray[1]}</td> 
        <td>${countryArray[2]}</td>
        <td>${countryArray[3]}</td>
        <td>${countryArray[4]}</td>
        <td>${countryArray[5]}</td>
    </tr>
    `
}

/**
 * Function returning the winning country aswell ass marking the cell winning in each column.
 * @param {Array} sweden - An array containing Swedens data.
 * @param {Array} norway - An array containing Norways data.
 * @param {Array} denmark - An array containing Denmarks data.
 * @returns {string} - String of country with most wins.
 */
function winner (sweden, norway, denmark) {
  let swedenScore = 0
  let norwayScore = 0
  let denmarkScore = 0

  const table = document.getElementById('mytable')

  for (let i = 1; i < 5; i++) {
    const swedenValue = parseFloat(sweden[i])
    const norwayValue = parseFloat(norway[i])
    const denmarkValue = parseFloat(denmark[i])

    const min = Math.min(swedenValue, norwayValue, denmarkValue)

    if (swedenValue === min) {
      swedenScore++
      table.rows[1].cells[i + 1].classList.add('winning-cell')
    } else if (norwayValue === min) {
      norwayScore++
      table.rows[2].cells[i + 1].classList.add('winning-cell')
    } else if (denmarkValue === min) {
      denmarkScore++
      table.rows[3].cells[i + 1].classList.add('winning-cell')
    }
  }
  if (swedenScore > norwayScore && swedenScore > denmarkScore) {
    return 'Sweden'
  } else if (norwayScore > swedenScore && norwayScore > denmarkScore) {
    return 'Norway'
  } else if (denmarkScore > swedenScore && denmarkScore > norwayScore) {
    return 'Denmark'
  } else { return 'Tie' }
}

/**
 * Keeps track of each time a country has won, keeps in local on the session.
 * @param {Array} sweden - An array containing Swedens data.
 * @param {Array} norway - An array containing Norways data.
 * @param {Array} denmark - An array containing Denmarks data.
 */
function addScore (sweden, norway, denmark) {
  const country = winner(sweden, norway, denmark)
  const storage = window.sessionStorage
  let swedenValue = storage.getItem('swedescore') || 0
  let norwayValue = storage.getItem('norwayscore') || 0
  let denmarkValue = storage.getItem('denmarkscore') || 0

  if (country === 'Sweden') {
    swedenValue++
  } else if (country === 'Norway') {
    norwayValue++
  } else if (country === 'Denmark') {
    denmarkValue++
  }

  storage.setItem('swedescore', swedenValue)
  storage.setItem('norwayscore', norwayValue)
  storage.setItem('denmarkscore', denmarkValue)

  document.getElementById('swedescore').textContent = swedenValue
  document.getElementById('norwayscore').textContent = norwayValue
  document.getElementById('denmarkscore').textContent = denmarkValue
}

export { fetchData, generateYears, clearTable, addScore }
