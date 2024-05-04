import {
  ChatInputCommandInteraction,
  Collection,
  Message,
  SlashCommandBuilder,
  User,
} from "discord.js";

const COMMAND_NAME = "last";
const SEARCH_RANGE = 100;

const findMessage = (
  target: User,
  messages: Collection<string, Message> | undefined
): Message | undefined => {
  if (messages) {
    return messages.find((msg) => msg.author.id === target.id);
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
        { name: "reverse", value: "rev" },
        { name: "shout", value: "shout" }
      )
  );

export const execute = async (interaction: ChatInputCommandInteraction) => {
  // Gets the first SEARCH RANGE messages
  const search = await interaction.channel?.messages.fetch({
    limit: SEARCH_RANGE,
    before: interaction.id,
  });
  if (search) {
    search.forEach((message, id) => {
      console.log(
        `Message ID: ${id}, Author: ${message.author.displayName}, Content: ${message.content}`
      );
    });
  }

  // Gets the target user, defaulting to sender if undefined
  const targetUser: User =
    interaction.options.getUser("user") || interaction.user;
  console.log(targetUser.displayName);

  // Gets the optional operation command
  const operation = interaction.options.getString("operation");

  // Finds the matched message, if any, and makes sure it's not a bot
  const foundMessage = targetUser.bot
    ? undefined
    : findMessage(targetUser, search);

  if (!foundMessage || !foundMessage.content) {
    console.log(`Found message:\n${foundMessage}`);
    await interaction.reply(`No message found!`);
  } else {
    await interaction.reply(foundMessage.content);
  }
};
