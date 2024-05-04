/**
 *echo.ts
 *
 *This file contains the definition of an "echo" command for a Discord bot.
 *It echoes a message the user types back to the user in the same channel.
 *The command takes a single argument, which is the message to be echoed.
 *Upon receiving command, bot immediately respond with provided message in same
 *channel where the command was invoked.
 *Bot's response will include original message, and info about who invoked.
 */

import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"

//Name of the command
const COMMAND_NAME = "echo"

/**
 * Represents the data required to define the "echo" command.
 * This includes the command name and description.
 */
export const data = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Echoes a message back to the user")
  .addStringOption((option) =>
    option
      .setName("message")
      .setDescription("The message to echo")
      .setRequired(true)
  )

/**
 * Executes the "echo" command.
 * @param {ChatInputCommandInteraction} interaction - The interaction event triggered by the command.
 */

export const execute = async (interaction: ChatInputCommandInteraction) => {
  //retrieve message from interaction options
  const message = interaction.options.getString("message", true) //true ensures that the option is required
  //construct response message
  const response = `**Echoed Message:** ${message}\n**Invoked by:** ${interaction.user.tag}`
  //reply to interaction with echoed message and user info
  await interaction.reply(response)
}
