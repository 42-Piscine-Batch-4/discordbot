import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

const COMMAND_NAME = "display_image";

export const data = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Displays an image from a URL.")
  .addStringOption((option) =>
    option.setName("input").setDescription("raw user input.").setRequired(true),
  );

export const execute = async (interaction: ChatInputCommandInteraction) => {
  const input = interaction.options.getString("input", true);
  try {
    const test = await fetch(input);
    const blob = await test.blob();
    if (blob.type.startsWith("image/")) {
      await interaction.reply(input);
    } else {
      await interaction.reply("Invalid image URL!");
    }
  } catch (_) {
    await interaction.reply("Invalid image URL!");
  }
};
