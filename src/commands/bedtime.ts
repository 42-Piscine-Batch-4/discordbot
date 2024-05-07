import { CommandInteraction, SlashCommandBuilder } from "discord.js"

const COMMAND_NAME = "bedtime"

export const data = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Checks if it's bedtime")

/**
 * Executes the "ping" command.
 * @param {CommandInteraction} interaction - The interaction event triggered by the command.
 */
export const execute = async (interaction: CommandInteraction) => {
  const currentTime = new Date()
  console.log("roby -> execute -> currentTime:", currentTime.toString())

  const bedTime = new Date(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    currentTime.getDate(),
    23,
    42,
    0
  )
  console.log("roby -> execute -> bedTime:", bedTime.toString())

  const wakeTime = new Date(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    currentTime.getDate(),
    7,
    42,
    0
  )
  console.log("roby -> execute -> wakeTime:", wakeTime.toString())

  if (currentTime < bedTime && currentTime > wakeTime) {
    interaction.reply(`It's still too early for bed!`)
  } else {
    interaction.reply(`It's past 11.42pm, time to sleep.`)
  }
}
