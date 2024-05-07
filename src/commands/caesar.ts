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

const cipherConvert = (char: string, cchar: number, cnum: number): number => {
  const charnum = char.charCodeAt(0)
  if (64 < charnum && charnum < 91) {
    const num = (charnum + cchar) % 91
    return num < 65 ? num + 65 : num
  } else if (96 < charnum && charnum < 123) {
    const num = (charnum + cchar) % 123
    return num < 97 ? num + 97 : num
  } else if (47 < charnum && charnum < 58) {
    const num = (charnum + cnum) % 58
    return num < 48 ? num + 48 : num
  } else {
    return charnum
  }
}

export const execute = async (interaction: ChatInputCommandInteraction) => {
  const message = interaction.options.getString("message", true)
  const cipher = interaction.options.getNumber("cipher") ?? 0
  const cchar = (26 + (cipher % 26)) % 26
  const cnum = (10 + (cipher % 10)) % 10
  const output = Array.from(message)
    .map((c) => String.fromCharCode(cipherConvert(c, cchar, cnum)))
    .join("")
  await interaction.reply(`Encrypted message:\n${output}`)
}
