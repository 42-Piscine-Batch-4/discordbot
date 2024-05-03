/**
 * pingCommand.ts
 *
 * This file contains the definition of a simple "ping" command for a Discord bot.
 * The command responds with "PONG!" when invoked.
 * It utilizes the Discord.js library for interacting with the Discord API.
 */

import {
  ChatInputCommandInteraction,
  CommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

// Name of the command
const COMMAND_NAME = "ping";

/**
 * Represents the data required to define the "ping" command.
 * This includes the command name and description.
 */
export const data = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Replies with PONG!");

/**
 * Executes the "ping" command.
 * @param {CommandInteraction} interaction - The interaction event triggered by the command.
 */
export const execute = async (interaction: ChatInputCommandInteraction) => {
  const message = interaction.options.getString("message", true);
};
