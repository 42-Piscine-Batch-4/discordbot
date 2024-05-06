import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"

const COMMAND_NAME = "caesar"

export const data = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Runs Caesar cipher on text.")
  .addStringOption((option) =>
    option.setName("message").setDescription("user message.").setRequired(true)
  )
  .addNumberOption((option) =>
    option.setName("cipher").setDescription("number to shift by.")
  )

const cipherConvert = (char: string, cipher: number): number => {
  const charnum = char.charCodeAt(0)
  if (64 < charnum && charnum < 91) {
    const num = (charnum + cipher) % 91
    return num < 65 ? num + 65 : num
  } else if (96 < charnum && charnum < 123) {
    const num = (charnum + cipher) % 123
    return num < 97 ? num + 97 : num
  } else {
    return charnum
  }
}

export const execute = async (interaction: ChatInputCommandInteraction) => {
  const message = interaction.options.getString("message", true)
  const cipher = (interaction.options.getNumber("cipher") ?? 0) % 26
  const output = Array.from(message)
    .map((c) => String.fromCharCode(cipherConvert(c, cipher)))
    .join("")
  await interaction.reply(`Encrypted message:\n${output}`)
}
