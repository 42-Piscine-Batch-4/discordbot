import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

const COMMAND_NAME = "sort_desc";

export const data = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Sorts list of integers in descending order.")
  .addStringOption((option) =>
    option.setName("input").setDescription("raw user input.").setRequired(true),
  );

export const execute = async (interaction: ChatInputCommandInteraction) => {
  const input: string = interaction.options.getString("input", true);
  const strsplit = input
    .split(/\s/)
    .filter((c) => c)
    .map((c) => parseInt(c));
  if (strsplit.includes(NaN)) {
    await interaction.reply("Invalid argument: only digits!");
  } else {
    const finum = strsplit
      .slice()
      .sort((a, b) => b - a)
      .join(", ");
    await interaction.reply(
      `Initial list:${strsplit.join(", ")}\nSorted array:${finum}`,
    );
  }
};
