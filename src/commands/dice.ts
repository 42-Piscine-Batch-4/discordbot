/**
 *dice.ts
 *
 *This file contains the definition of a "dice" command for a Discord bot.
 *The command takes no arguments. When invoked, the bot will simulate
 *rolling a six-sided die and generate a random number between 1 and 6.
 *The bot should respond with the randomly generated number.
 */

import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"
import { random } from "lodash"

//Name of the command
const COMMAND_NAME = "dice"

/**
 * Represents the data required to define the "dice" command.
 * This includes the command name and description.
 */
export const data = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Generates random number between 1 and 6")

/**
 * Executes the "echo" command.
 * @param {ChatInputCommandInteraction} interaction - The interaction event triggered by the command.
 */

export const execute = async (interaction: ChatInputCommandInteraction) => {
  //generates random number
  const outcome = random(1, 6)
  //reply to interaction with outcome of die roll
  const response = `**${interaction.user.tag}** rolled a **${outcome}** on the die!`
  await interaction.reply(response)
}
