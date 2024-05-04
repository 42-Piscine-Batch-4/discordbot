import { ChatInputCommandInteraction, SlashCommandBuilder, GuildMember } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("member_count")
    .setDescription("Get detailed information about the server members");

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const guild = interaction.guild;

    if (!guild) {
        await interaction.reply("This command can only be used in a server.");
        return;
    }

    const memberCount = guild.memberCount;
    const members = guild.members.cache.map((member) => member);
    const botMembers = members.filter((member): member is GuildMember & { user: { bot: true } } => member.user.bot);
    const humanMembers = memberCount - botMembers.length


    console.log(`Bot Status: ${botMembers}`);

    const memberCountMessage = `
    **Server Member Count:** 
    
    Total Members: ${memberCount} 
    Total Human: ${humanMembers} 
    Total Bots: ${botMembers.length} 

    `;

    await interaction.reply(memberCountMessage);
};