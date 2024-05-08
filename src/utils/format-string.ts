import capitalizeFirstLetter from "../utils/capitalize-first-letter"

const formatString = (str: string): string => {
  str = str.trim()
  str = str.replace(/,\s*/g, ', ').replace(/\.(\s*)/g, '. ')

  let sentences = str.split('. ')
  sentences = sentences.map(capitalizeFirstLetter)
  str = sentences.join('. ')

  return str
}

export default formatString