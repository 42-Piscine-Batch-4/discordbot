/**
 * Broader check for alphabetical characters compared to regex
 */
const isLetter = (c: string) => {
  return c.toLowerCase() !== c.toUpperCase()
}

/**
 * Implement a state machine using a hybrid programming style thanks rbd03
 * This function ignores any non-alphabetical characters in the way
 */
const altCaps = (str: string) => {
  let toCaps = true
  return str
    .split("")
    .map((c) => {
      if (isLetter(c)) {
        toCaps = !toCaps
        return toCaps ? c.toUpperCase() : c.toLowerCase()
      }
      return c
    })
    .join("")
}

export default altCaps
