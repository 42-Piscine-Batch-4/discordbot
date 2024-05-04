import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { random } from "lodash";

const COMMAND_NAME = "rps";
const ROCK: string = "ROCK";
const PAPER: string = "PAPER";
const SCISSORS: string = "SCISSORS";

export const data = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Plays rock paper scissors.")
  .addStringOption((option) =>
    option.setName("input").setDescription("raw user input.").setRequired(true)
  );

const rpsToNumber = (input: string) => {
  switch (input) {
    case ROCK:
      return 1;
    case SCISSORS:
      return 2;
    case PAPER:
      return 3;
    default:
      return 3;
  }
};

const numberToRps = (input: number) => {
  switch (input) {
    case 1:
      return ROCK;
    case 2:
      return SCISSORS;
    case 3:
      return PAPER;
    default:
      return PAPER;
  }
};

const getOutput = (username: string, user: number, com: number) => {
  const output = `**${username}** chose **${numberToRps(user)}**\n**Bot** chose **${numberToRps(com)}**\n`;
  if (com == user) {
    return `${output}\nIt's a draw!`;
  } else if ((user + 1) % 3 == com % 3) {
    return `${output}\n**${username}** Wins!`;
  } else {
    return `${output}\n**Bot** Wins!`;
  }
};

const rpsToFullName = (input: string) => {
  switch (input) {
    case "R":
      return ROCK;
    case "S":
      return SCISSORS;
    case "P":
      return PAPER;
    default:
      return input;
  }
};

export const execute = async (interaction: ChatInputCommandInteraction) => {
  const input: string = interaction.options.getString("input", true);
  const rps: string = rpsToFullName(input.trim().toUpperCase());
  if (rps != ROCK && rps != PAPER && rps != SCISSORS) {
    await interaction.reply("Input either R/P/S, or Rock/Paper/Scissors.");
  } else {
    const com = random(1, 3);
    const user = rpsToNumber(rps);
    await interaction.reply(getOutput(interaction.user.tag, user, com));
  }
};
