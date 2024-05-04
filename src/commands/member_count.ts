import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("member_count")
    .setDescription("Get detailed information about the server members");

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const guild = interaction.guild;

    if (!guild) {
        await interaction.reply("This command can only be used in a server.");
        return;
    }

    let totalBotCount = 0;
    const botIds = ["1235290868043485274", "1235168962535231541"];

    for (const botId of botIds) {
        try {
            const botMember = await guild.members.fetch(botId);
            if (botMember.user.bot) {
                totalBotCount++;
            }
        } catch (error) {
            console.error(`Error fetching bot with ID ${botId}:`, error);
        }
    }

    const memberCount = guild.memberCount;
    const members = guild.members.cache.map((member) => member);
    const awakeBots = members.filter((member) => member.user.bot);
    const humanMembers = memberCount - totalBotCount

    const memberCountMessage = `
    **Server Member Count:** 
    
    Total Members: ${memberCount} 
    Total Human: ${humanMembers} 
    
    Total Bots: ${totalBotCount}
    Awake Bot: ${awakeBots} 

    `;

    await interaction.reply(memberCountMessage);
};