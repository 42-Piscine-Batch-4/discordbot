import axios from "axios"
import { CommandInteraction, SlashCommandBuilder } from "discord.js"
import { get } from "lodash"
import { config } from "../config"

const COMMAND_NAME = "hamster"

export const data = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Sends a random picture of a hamster")

export const execute = async (interaction: CommandInteraction) => {
  const { data } = await axios.get(
    "https://api.night-api.com/images/animals/hamster",
    {
      headers: {
        Authorization: config.NIGHT_API_KEY,
      },
    }
  )
  interaction.reply(get(data, "content.url"))
}
