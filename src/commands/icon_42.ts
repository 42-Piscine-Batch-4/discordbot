import { CommandInteraction, SlashCommandBuilder } from "discord.js";

const COMMAND_NAME = "icon_42";

export const data = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Delivers a URL to the 42 icon");

/**
 * Executes the "icon_42" command.
 * @param {CommandInteraction} interaction - The interaction event triggered by the command.
 */
export const execute = async (interaction: CommandInteraction) => {
  // Reply with URL to the 42 icon
  interaction.reply(
    "https://www.42singapore.sg/wp-content/uploads/2023/02/42SingaporeLogo-Black.svg"
  );
};
