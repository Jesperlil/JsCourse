/**
 * @module animals
 * @ignore
 */

const africanAnimals = [
  'Ethiopian wolf',
  'Pangolin',
  'Black rhino',
  'White rhino',
  'Mountain gorilla',
  'African wild dog',
  'African penguin',
  'Giraffe',
  'Hooded vulture',
  'Chimpanzee'
]

const americanAnimals = [
  'Florida panther',
  'Lesser prairie chicken',
  "Devil's Hole pupfish",
  "Bryde's whale",
  'North Atlantic right whale',
  'Monarch butterfly',
  'Delta Smelt',
  'Giant sea bass',
  "Franklin's bumble bee"
]

const europeanAnimals = [
  'Hooded seal',
  'Blue whale',
  'Polar bear',
  'Golden eagle',
  'Lynx',
  'Crayfish',
  'Amazon ant',
  'European mink',
  'Gerfalcon',
  'Long-fingered bat'
]

/**
 * Get a random animal from the desired continent.
 * @param {string} continent - The continent desired.
 * @returns {string} A random animal from the continent.
 */
function randomAnimals (continent) {
  return continent[Math.floor(Math.random() * continent.length)]
}

export { randomAnimals, americanAnimals, europeanAnimals, africanAnimals }
