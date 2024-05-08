import {
  ChatInputCommandInteraction,
  Collection,
  EmbedBuilder,
  GuildMember,
  Message,
  SlashCommandBuilder,
  User,
} from "discord.js"

import altCaps from "../utils/alt-capitalize-string"
import capitalizeString from "../utils/capitalize-string"
import { formatTime } from "../utils/dayjs"
import reverseString from "../utils/reverse-string"

const COMMAND_NAME = "last"
const SEARCH_RANGE = 100

const tagReverse = "rev"
const tagShout = "shout"
const tagAlt = "altcaps"
const tagBold = "bold"
const tagItalics = "italics"
const tagStrike = "strikethrough"
const tagSpoil = "spoiler"

/**Checks through all fetched messages where author matches the target we're searching for*/
const findMessage = (
  target: User,
  messages: Collection<string, Message> | undefined
): Message | undefined => {
  if (messages) {
    return messages.find((msg) => msg.author.id === target.id && msg.content)
  }
}

/**Adds an operation to modify the string if necessary */
const parseMessage = (inputMessage: string, opChoice: string | null) => {
  const prepend = `said:\n\n`
  switch (opChoice) {
    case tagReverse:
      return `dias:\n\n${reverseString(inputMessage)}`
    case tagShout:
      return `shouted:\n\n${capitalizeString(inputMessage)}!!!`
    case tagAlt:
      return `${prepend}${altCaps(inputMessage)}`
    case tagBold:
      return `${prepend}**${inputMessage}**`
    case tagItalics:
      return `${prepend}*${inputMessage}*`
    case tagStrike:
      return `${prepend}~~${inputMessage}~~`
    case tagSpoil:
      return `${prepend}||${inputMessage}||`
    default:
      return `${prepend}${inputMessage}`
  }
}

export const data = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription(
    `Checks the last ${SEARCH_RANGE} messages for a member's last message`
  )
  .addUserOption((option) =>
    option
      .setName("member")
      .setDescription("Specify the member's ID")
      .setRequired(false)
  )
  .addStringOption((option) =>
    option
      .setName("operation")
      .setDescription("Modify the output")
      .setRequired(false)
      .addChoices(
        { name: "reverse", value: tagReverse },
        { name: "shout", value: tagShout },
        { name: "altcaps", value: tagAlt },
        { name: "bold", value: tagBold },
        { name: "italics", value: tagItalics },
        { name: "strikethrough", value: tagStrike },
        { name: "spoiler", value: tagSpoil }
      )
  )

export const execute = async (interaction: ChatInputCommandInteraction) => {
  // Gets the first SEARCH RANGE messages
  const search = await interaction.channel?.messages.fetch({
    limit: SEARCH_RANGE,
    before: interaction.id,
  })

  // Gets the target member, defaulting to sender if undefined
  const targetMember: GuildMember | null =
    (interaction.options.getMember("member") as GuildMember | null) ??
    (interaction.member as GuildMember)

  // Gets the optional operation command
  const opChoice = interaction.options.getString("operation")

  // Finds the matched message, if any, and makes sure it's not a bot
  const foundMessage = targetMember.user.bot
    ? undefined
    : findMessage(targetMember.user, search)

  if (!foundMessage || !foundMessage.content) {
    if (targetMember.user.bot) {
      await interaction.reply(`Cannot target bot!`)
    } else {
      await interaction.reply({
        content: `Could not find message from <@${targetMember.user.id}> in the last **${SEARCH_RANGE}** messages!`,
        allowedMentions: { parse: [] },
      })
    }
  } else {
    const finalMessage = parseMessage(foundMessage.content, opChoice)
    const embedMessage = new EmbedBuilder()
      .setTitle("Last message")
      .setURL(foundMessage.url)
      .setColor("Random")
      .setAuthor({
        name: targetMember.displayName as string,
        iconURL: foundMessage.author.displayAvatarURL(),
      })
      .setDescription(
        `At ${formatTime(foundMessage.createdTimestamp)}\n<@${targetMember.user.id}> ${finalMessage}`
      )
    await interaction.reply({
      embeds: [embedMessage],
      allowedMentions: { parse: [] },
    })
  }
}
