import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

const COMMAND_NAME = "sort_desc";

export const data = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Sorts list of integers in descending order.")
  .addStringOption((option) =>
    option.setName("input").setDescription("raw user input.").setRequired(true),
  );

interface Array<T> {
  joinstr(): string;
}

Array.prototype.joinstr = function () {
  return `\`\`\`${this.join(", ")}\`\`\``;
};

export const execute = async (interaction: ChatInputCommandInteraction) => {
  const input: String = interaction.options.getString("input", true);
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
      .joinstr();
    await interaction.reply(
      `initial list:${strsplit.joinstr()}\nsorted array:${finum}`,
    );
  }
};
