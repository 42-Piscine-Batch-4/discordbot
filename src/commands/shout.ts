import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"

const COMMAND_NAME = "shout"

export const data = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Capitalises all alphabets in the string.")
  .addStringOption((option) =>
    option.setName("input").setDescription("raw user input.").setRequired(true)
  )

export const execute = async (interaction: ChatInputCommandInteraction) => {
  const input: String = interaction.options.getString("input", true)
  const output = input.toUpperCase()
  await interaction.reply(output)
}
