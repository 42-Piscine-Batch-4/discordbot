import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

const COMMAND_NAME = "sort_asc";
const defaultSeparator = ", ";
let separator = defaultSeparator;

export const data = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Sorts integers in ascending order")
  .addStringOption((option) =>
    option.setName("inputlist").setDescription("Input list").setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("delimiter")
      .setDescription("[Optional] Choose a delimiter (/s for space)")
      .setRequired(false)
  );

export const execute = async (interaction: ChatInputCommandInteraction) => {
  // This takes the first option which should be the list of integers
  const userInput = interaction.options.getString("inputlist");

  // This checks if the user input an optional delimiter
  const inputDelimiter = interaction.options.getString("delimiter");
  if (inputDelimiter) {
    separator = inputDelimiter.replace(/\/s/g, " ");
  }

  // Idk why typescript complains without the if check it's literally setRequired(true)
  if (userInput) {
    const intArray = userInput
      .trim()
      .split(/\s+/)
      .map(Number)
      .sort((a, b) => a - b);

    if (intArray.some(isNaN)) {
      await interaction.reply("Are you sure they're all numbers bruh");
    } else {
      await interaction.reply(
        `Certainly! I will sort the following \`\`\`${userInput
          .trim()
          .split(/\s+/)
          .join(separator)}\`\`\`\nin ascending order: \`\`\`${intArray.join(
          separator
        )}\`\`\``
      );
    }
    // Reset the separator back to default
    separator = defaultSeparator;
  }
};
