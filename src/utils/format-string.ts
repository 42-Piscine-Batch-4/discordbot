import capitalizeFirstLetter from "../utils/capitalize-first-letter"

/** Checks if punctuation mark ends without a whitespace at the end.
 * This represents a paragraph
 */
const checkParagraph: RegExp = /[.?!](?!\s)/g

/** Checks if there is a space at the end.
 * This represents a normal sentence
 */
const checkSentence: RegExp = /(?<=[.?!])\s/

const formatString = (str: string): string => {
  return str
    .trim()
    .replace(checkParagraph, (match) =>
      `${match}\n\n\n`.split(checkSentence).map(capitalizeFirstLetter).join(" ")
    )
}

export default formatString
