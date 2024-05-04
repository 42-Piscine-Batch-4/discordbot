import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

const COMMAND_NAME = "avatar";

export const data = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Returns image of user avatar.")
  .addUserOption((option) =>
    option.setName("input").setDescription("user input."),
  );

export const execute = async (interaction: ChatInputCommandInteraction) => {
  const input = interaction.options.getUser("input") ?? interaction.user;
  const avatar = input.avatarURL();
  const user = avatar ? avatar : "User does not have an avatar.";
  await interaction.reply(user);
};
