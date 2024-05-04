import { CommandInteraction, SlashCommandBuilder } from "discord.js"

const COMMAND_NAME = "icon_42"

export const data = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Delivers a URL to the 42 icon")

/**
 * Executes the "icon_42" command.
 * @param {CommandInteraction} interaction - The interaction event triggered by the command.
 */
export const execute = async (interaction: CommandInteraction) => {
  // Reply with URL to the 42 icon
  interaction.reply(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS2NAGtlAgDehBnS7KFd34hVRF4edBXX0RmxeiuHi9Qw&s"
  )
}
