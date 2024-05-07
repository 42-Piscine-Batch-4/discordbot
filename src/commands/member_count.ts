import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"

export const data = new SlashCommandBuilder()
  .setName("member_count")
  .setDescription("Get detailed information about the server members")

export const execute = async (interaction: ChatInputCommandInteraction) => {
  const guild = interaction.guild

  if (!guild) {
    await interaction.reply("This command can only be used in a server.")
    return
  }

  const memberCount = guild.memberCount
  const memberCountMessage = `
    **Server Member Count:** 
    
    Total Members: ${memberCount} 
    `

  await interaction.reply(memberCountMessage)
}
