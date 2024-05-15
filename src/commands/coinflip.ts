/// This program is for flipping a coin with 2 outcomes : Head or Tail
/// More functions will be add in the future
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"
import { random } from "lodash"

export const data = new SlashCommandBuilder()
  .setName("coinflip")
  .setDescription("Generate random outcome of head or tail")
  .addNumberOption((option) =>
    option
      .setName("num-flip")
      .setDescription("Enter the number of flips")
      .setRequired(true)
  )
 
export const execute = async (interaction: ChatInputCommandInteraction) => {
  const flip = interaction.options.getNumber("num-flip", true)
  for (let i = 0; i < flip; i++)
  {
    const outcome = random(0, 1);
    const result = outcome === 0 ? "Heads" : "Tails";
    const response = `**${interaction.user.tag}** flipped a coin and got **${result}**!`;
    await interaction.reply(response);
  }

};