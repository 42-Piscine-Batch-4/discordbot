import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"

const COMMAND_NAME = "avatar"

export const data = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Returns image of user avatar.")
  .addUserOption((option) =>
    option.setName("input").setDescription("user input.")
  )

export const execute = async (interaction: ChatInputCommandInteraction) => {
  const input = interaction.options.getUser("input") ?? interaction.user
  await interaction.reply(input.displayAvatarURL())
}
