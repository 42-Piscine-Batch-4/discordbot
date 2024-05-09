import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"

const COMMAND_NAME = "find_members"

export const data = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Find members matching a string.")
  .addStringOption((option) =>
    option.setName("substring").setDescription("user input").setRequired(true)
  )

export const execute = async (interaction: ChatInputCommandInteraction) => {
  const substr = interaction.options.getString("substring", true)
  const memList = await interaction.guild?.members.fetch()
  const message = memList
    ?.filter(
      (member) =>
        member.displayName.includes(substr) ||
        member.user.username.includes(substr)
    )
    .map((member) => `<@${member.user.id}>`)
    .join(", ")
  const output = `Substring:\n"${substr}"\n\n`
  if (message) {
    await interaction.reply({
      content: `${output}Members matching the substring:\n\n${message}`,
      allowedMentions: { parse: [] },
    })
  } else {
    await interaction.reply(`${output}No members match the substring.`)
  }
}
