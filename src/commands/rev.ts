/**
 * rev.ts
 *
 * This file contains the definition of the /rev command for the discord bot.
 * The command will take one argument and respond with the string reversed
 * It utilizes the Discord.js library for interacting with the Discord API.
 */

import {
  ChatInputCommandInteraction,
  CommandInteraction,
  Message,
  SlashCommandBuilder,
} from "discord.js";

// Name of command
const COMMAND_NAME = "rev";

/**
 * Represents the data required to define the "rev" command.
 * This includes the command name and description.
 */
export const data = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Reverses the entered message")
  .addStringOption((option) =>
    option
      .setName("message")
      .setDescription("The message to reverse")
      .setRequired(true),
  );

/**
 * Executes the "rev" command.
 * @param {ChatInputCommandInteraction} interaction - The interaction event triggered by the command.
 */

export const execute = async (interaction: ChatInputCommandInteraction) => {
  //retrieve message from interaction options
  const message = interaction.options.getString("message", true); //true ensures that the option is required

  // function to reverse message
  function reverseString(str: String): string {
    return str.split("").reverse().join("");
  }

  // To call the function and put the results into reverseMessage
  const reversedMessage = reverseString(message);

  // output the reversed message
  await interaction.reply(reversedMessage);
};
