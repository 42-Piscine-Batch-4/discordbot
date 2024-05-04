import {
  ChatInputCommandInteraction,
  Collection,
  Message,
  SlashCommandBuilder,
  User,
  EmbedBuilder,
} from "discord.js";
import capitalizeString from "../utils/capitalize-string";
import reverseString from "../utils/reverse-string";

const COMMAND_NAME = "last";
const SEARCH_RANGE = 100;

const tagReverse = "rev";
const tagShout = "shout";

/**Checks through all fetched messages where author matches the target we're searching for*/
const findMessage = (
  target: User,
  messages: Collection<string, Message> | undefined
): Message | undefined => {
  if (messages) {
    return messages.find((msg) => msg.author.id === target.id && msg.content);
  }
};

/**Adds an operation to modify the string if necessary */
const parseMessage = (inputMessage: string, opChoice: string | null) => {
  switch (opChoice) {
    case tagReverse:
      return `dias:\n\n${reverseString(inputMessage)}`;
    case tagShout:
      return `shouted:\n\n${capitalizeString(inputMessage)}`;
    default:
      return `said:\n\n${inputMessage}`;
  }
};

export const data = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription(
    `Checks the last ${SEARCH_RANGE} messages for a user's last message`
  )
  .addUserOption((option) =>
    option
      .setName("user")
      .setDescription("Specify the User's ID")
      .setRequired(false)
  )
  .addStringOption((option) =>
    option
      .setName("operation")
      .setDescription("Modify the output")
      .setRequired(false)
      .addChoices(
        { name: "reverse", value: tagReverse },
        { name: "shout", value: tagShout }
      )
  );

export const execute = async (interaction: ChatInputCommandInteraction) => {
  // Gets the first SEARCH RANGE messages
  const search = await interaction.channel?.messages.fetch({
    limit: SEARCH_RANGE,
    before: interaction.id,
  });

  // Gets the target user, defaulting to sender if undefined
  const targetUser: User =
    interaction.options.getUser("user") || interaction.user;

  // Gets the optional operation command
  const opChoice = interaction.options.getString("operation");

  // Finds the matched message, if any, and makes sure it's not a bot
  const foundMessage = targetUser.bot
    ? undefined
    : findMessage(targetUser, search);

  if (!foundMessage || !foundMessage.content) {
    if (targetUser.bot) {
      await interaction.reply(`Cannot target bot!`);
    } else {
      await interaction.reply({
        content: `Could not find message from <@${targetUser.id}> in the last **${SEARCH_RANGE}** messages!`,
        allowedMentions: { parse: [] },
      });
    }
  } else {
    const finalMessage = parseMessage(foundMessage.content, opChoice);
    const embedMessage = new EmbedBuilder()
      .setTitle("Last message")
      .setColor("Random")
      .setAuthor({
        name: foundMessage.author.displayName,
        iconURL: foundMessage.author.displayAvatarURL(),
      })
      .setDescription(
        `At ${new Date(foundMessage.createdTimestamp).toLocaleString()}\n<@${targetUser.id}> ${finalMessage}`
      );
    await interaction.reply({
      embeds: [embedMessage],
      allowedMentions: { parse: [] },
    });
  }
};
