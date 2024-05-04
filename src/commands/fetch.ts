import axios from "axios"
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"
import { isEmpty, join, map, toString } from "lodash"
import outputCode from "../utils/output-code"

const COMMAND_NAME: string = "fetch"
const OPTION_NAME: string = "url"
const DEFAULT_METHOD: string = "get"

export const data = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Fetches from an API and returns the JSON object")
  .addStringOption((option) =>
    option
      .setName(OPTION_NAME)
      .setDescription("The URL to be fetched")
      .setRequired(true)
  )

export const execute = async (interaction: ChatInputCommandInteraction) => {
  try {
    const url = interaction.options.getString(OPTION_NAME, true)
    if (isEmpty(url)) throw new Error("Please input URL!")
    const res = await axios({
      method: DEFAULT_METHOD,
      url,
    })
    const { data } = res
    const output = join(
      map(data, (datum) => JSON.stringify(datum, null, "\t")),
      "\n"
    )
    await interaction.reply(`FETCH SUCCESS!\n${outputCode(output)}`)
    await interaction.reply(`FETCH SUCCESS!\n${outputCode(output)}`)
  } catch (err) {
    await interaction.reply(`FETCH ERROR!\n${outputCode(toString(err))}`)
  }
}
