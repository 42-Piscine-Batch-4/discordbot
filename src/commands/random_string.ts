import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"
import { isInteger } from "lodash"
import { generatePrintable } from "../utils/generate-printable"
import { isNumeric } from "../utils/is-numeric"

const OPTION_NAME = "length"
const COMMAND_NAME = "random_string"
export const data = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Generates a random string of a certain length")
  .addStringOption((option) =>
    option
      .setName(OPTION_NAME)
      .setDescription("Length of random string")
      .setRequired(true)
  )
const s = generatePrintable()

export const execute = async (interaction: ChatInputCommandInteraction) => {
  //save input to length variable
  let length = interaction.options.getString(OPTION_NAME, true)

  let error = ""
  let str = ""

  // check if length is only positive numbers, not floats or chars
  if (!isNumeric(length)) error = "Length is not numeric."
  length = Number(length)
  if (length < 0) error = "Length is not positive."
  if (!isInteger(length)) error = "Length cannot be floating point."

  if (error) {
    await interaction.reply({ content: error })
  } else {
    // generate the random string using Math.random
    for (let i = 0; i < length; i++) {
      str += s[Math.floor(Math.random() * s.length)]
    }
    await interaction.reply({
      content: `This is the random string generated: \n ${str}`,
    })
  }
}
