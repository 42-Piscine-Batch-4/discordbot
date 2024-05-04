/**
 * palindrome.ts
 *
 * This file contains the definition of a simple "palindrome" command for a Discord bot.
 * The command responds with "Wow! (message)" when a palindrome is found.
 * The command responds with "(message) is not a palindrome :|" when a palindrome is not found
 * It utilizes the Discord.js library for interacting with the Discord API.
 */

import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"
import { replace } from "lodash"
import reverseString from "../utils/reverse-string"

const OPTION_NAME = "message"

//command name and data
const COMMAND_NAME = "palindrome"
export const data = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Checks if the message is a palindrome")
  .addStringOption((option) =>
    option
      .setName(OPTION_NAME)
      .setDescription("Message to find a palindrome")
      .setRequired(true)
  )

//function to remove all puncation and space
const stripPunctuationSpaces = (text: string): string => {
  // Regular expression to match punctuation and spaces
  const regex = /\W/g
  return replace(text, regex, "")
}

//excute the palindrome command
export const execute = async (interaction: ChatInputCommandInteraction) => {
  //save input to message variable
  const message = interaction.options.getString(OPTION_NAME, true)

  //strip message to characters only
  const string = stripPunctuationSpaces(message)

  //call function reverseString to palindrome
  const palindrome = reverseString(string)

  if (palindrome == string) {
    await interaction.reply(`Wow! ${message}`)
  } else {
    await interaction.reply(`${message} is not a palindrome :|`)
  }
}
