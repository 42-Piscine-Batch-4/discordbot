/**
 * palindrome.ts
 *
 * This file contains the definition of a simple "palindrome" command for a Discord bot.
 * The command responds with "Wow! (message)" when a palindrome is found.
 * The command responds with "(message) is not a palindrome :|" when a palindrome is not found
 * It utilizes the Discord.js library for interacting with the Discord API.
 */

import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import reverseString from "../utils/reverse-string";


//command name and data
const COMMAND_NAME = "palindrome";
export const data = new SlashCommandBuilder()
    .setName(COMMAND_NAME)
    .setDescription("Checks if the message is a palindrome")
    .addStringOption((option) =>
    option
        .setName("Message")
        .setDescription("Message to find a palindrome")
        .setRequired(true)
    );

//function to remove all puncation and space
function stripPunctuationSpaces(text: string): string {
    // Regular expression to match punctuation and spaces
    const regex = /[^\w\s]/g;
    return text.replace(regex, "");
};


//excute the palindrome command
export const excute = async (interaction: ChatInputCommandInteraction) => {

    //save input to message variable
    const message = interaction.options.getString("Message", true);

    //strip message to characters only
    const string = stripPunctuationSpaces(message);

    //call function reverseString to palindrome
    const palindrome = reverseString(string);

    if(palindrome == string)
    {
        await interaction.reply(`Wow! ${message}`);
    }
    else
    {
        await interaction.reply(`${message} is not a palindrome :|`);
    }
}