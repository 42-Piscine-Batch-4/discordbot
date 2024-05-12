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
  const usernames =
    memList
      ?.filter((member) => member.user.username.includes(substr))
      .map((member) => `<@${member.user.id}>`) ?? []
  const nicknames =
    memList
      ?.filter((member) => member.nickname?.includes(substr))
      .map((member) => `<@${member.user.id}>`)
      .filter((member) => !usernames?.includes(member)) ?? []
  let output = `Substring:\n"${substr}"\n\n`
  if (usernames.length > 0) {
    output = output + "Usernames matching:\n" + usernames.join(", ")
  }
  if (nicknames.length > 0) {
    if (usernames.length > 0) {
      output = output + "\n\n"
    }
    output = output + "Nicknames matching:\n" + nicknames.join(", ")
  }
  if (usernames.length < 1 && nicknames.length < 1) {
    await interaction.reply(`${output}No members match the substring.`)
  } else {
    await interaction.reply({
      content: `${output}`,
      allowedMentions: { parse: [] },
    })
  }
}
