import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

const COMMAND_NAME = "sort_desc";

export const data = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Sorts list of integers in descending order.")
  .addStringOption((option) =>
    option.setName("input").setDescription("raw user input.").setRequired(true)
  );

export const execute = async (interaction: ChatInputCommandInteraction) => {
  const input: String = interaction.options.getString("input");
  const strsplit = input
    .split(/ |\t|\f|\n|\r|\v/)
    .filter((c) => c)
    .map((c) => parseInt(c));
  if (strsplit.includes(NaN)) {
    await interaction.reply("Invalid argument: only digits!");
  } else {
    const finum = strsplit.slice().sort((a, b) => b - a);
    await interaction.reply(
      `initial list: ${strsplit}\nsorted array: ${finum}`
    );
  }
};
