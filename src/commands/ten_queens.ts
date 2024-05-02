/**
 * ten_queens.ts
 *
 * This file contains the definition of the "/ten_queens" command for a Discord bot.
 * The command responds with "Hell No!" when invoked.
 * It utilizes the Discord.js library for interacting with the Discord API.
 */

import { CommandInteraction, SlashCommandBuilder } from "discord.js";

//Name of command
const COMMAND_NAME = "ten_queens";

/**
 * Represents the data required to define the "ten_queens" command.
 * This includes the command name and description.
 */
export const data = new SlashCommandBuilder()
    .setName(COMMAND_NAME)
    .setDescription("Executes the ten_queens function");

/**
 * Executes the "ten_queens" command.
 * @param {CommandInteraction} interaction - The interaction event triggered by the command.
 */
export const execute = async (interaction: CommandInteraction) => {
    // Reply to the interaction with "Hell No!"
    interaction.reply("Hell No!");
};
