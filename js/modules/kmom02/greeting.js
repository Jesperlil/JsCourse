/**
 * @module greeting
 * @ignore
 */

/**
 * Get a message depending on time of day, checks if current hour is smaller than 12, from condition get a True : False.
 * @returns {string} Greeting message.
 */
function hourGreeting () {
  const currentHour = new Date().getHours()
  return currentHour < 12 ? 'God förmiddag' : 'God eftermiddag'
}

export { hourGreeting }
