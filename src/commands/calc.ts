import { calc } from "a-calc"
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"

const calculate = (expression: string): number | string => {
  try {
    return calc(expression)
  } catch (error) {
    throw new Error("Invalid expression format.")
  }
}

export const data = new SlashCommandBuilder()
  .setName("calc")
  .setDescription("Perform a simple arithmetic calculation")
  .addStringOption((option) =>
    option
      .setName("expression")
      .setDescription("The mathematical expression to calculate")
      .setRequired(true)
  )

export const execute = async (interaction: ChatInputCommandInteraction) => {
  const expression = interaction.options.getString("expression", true)
  try {
    const result = calculate(expression)
    await interaction.reply(
      `Expression: \\\`${expression}\\\`\nResult: \\\`${result}\\\``
    )
  } catch (error) {
    if (error instanceof Error) {
      await interaction.reply(`Error: ${error.message}`)
    } else {
      await interaction.reply("An unknown error occurred.")
    }
  }
}
