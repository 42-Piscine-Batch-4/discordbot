import { CommandInteraction, SlashCommandBuilder } from "discord.js"
import mydayjs from "../utils/dayjs"

const COMMAND_NAME = "bedtime"

export const data = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Checks if it's bedtime")

/**
 * Executes the "ping" command.
 * @param {CommandInteraction} interaction - The interaction event triggered by the command.
 */
export const execute = async (interaction: CommandInteraction) => {
  const currentTime = mydayjs().tz()

  const bedTime = mydayjs().tz().set("hour", 23).set("minute", 42)

  const wakeTime = mydayjs().tz().set("hour", 7).set("minute", 42)

  if (currentTime < bedTime && currentTime > wakeTime) {
    interaction.reply(`It's still too early for bed!`)
  } else {
    interaction.reply(`It's past 11.42pm, time to sleep.`)
  }
}
