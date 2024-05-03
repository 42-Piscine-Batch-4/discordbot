import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { random } from "lodash";

const COMMAND_NAME = "rps";

export const data = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Plays rock paper scissors.")
  .addStringOption((option) =>
    option.setName("input").setDescription("raw user input.").setRequired(true),
  );

export const execute = async (interaction: ChatInputCommandInteraction) => {
  const input: string = interaction.options.getString("input", true);
  const rps = input.trim().toUpperCase();
  if (rps != "R" && rps != "P" && rps != "S") {
    await interaction.reply("Input either R, P or S.");
  } else {
    const com = random(1, 3);
    let user = 0;
    if (rps == "R") {
      user = 1;
    } else if (rps == "S") {
      user = 2;
    } else {
      user = 3;
    }
    let comstr = "";
    if (com == 1) {
      comstr = "R";
    } else if (com == 2) {
      comstr = "S";
    } else {
      comstr = "P";
    }
    let output = `**${interaction.user.tag}** chose **${rps}**\n**Bot** chose **${comstr}**\n`;
    if (com == user) {
      output = output + "It's a draw.";
    } else if ((user + 1) % 3 == com % 3) {
      output = output + `**${interaction.user.tag}** Wins!`;
    } else {
      output = output + "**Bot** Wins!";
    }
    await interaction.reply(output);
  }
};
