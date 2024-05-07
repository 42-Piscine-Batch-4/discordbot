import axios from "axios"
import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js"
import capitalizeFirstLetter from "../utils/capitalize-first-letter"

const COMMAND_NAME = "horoscope"

export const data = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Check your horoscope.")
  .addStringOption(option =>
    option.setName('sign')
      .setDescription('astrological sign')
      .setRequired(true)
      .addChoices(
        { name: 'Aries', value: 'aries' },
        { name: 'Taurus', value: 'taurus' },
        { name: 'Gemini', value: 'gemini' },
        { name: 'Cancer', value: 'cancer' },
        { name: 'Leo', value: 'leo' },
        { name: 'Virgo', value: 'virgo' },
        { name: 'Libra', value: 'libra' },
        { name: 'Scorpio', value: 'scorpio' },
        { name: 'Sagittarius', value: 'sagittarius' },
        { name: 'Capricorn', value: 'capricorn' },
        { name: 'Aquarius', value: 'aquarius' },
        { name: 'Pisces', value: 'pisces' },
      ))
  .addStringOption(option =>
    option.setName('period')
      .setDescription('prediction period')
      .setRequired(true)
      .addChoices(
        { name: 'Daily', value: 'daily' },
        { name: 'Weekly', value: 'weekly' },
        { name: 'Monthly', value: 'monthly' },
      ));

export const execute = async (interaction: ChatInputCommandInteraction) => {
  try {
    const period = interaction.options.getString("period", true);
    const sign = interaction.options.getString("sign", true);
    const BASE_URL = period == 'daily' ?
      `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/${period}?sign=${sign}&day=TODAY` :
      `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/${period}?sign=${sign}`;

    const response = await axios({ method: "get", url: BASE_URL })

    if (!response.data.success) {
      throw new Error("Failed to fetch horoscope data");
    }

    if (period == 'daily') {
      var msgPeriod = `Period: ${response.data.data.date}\n`;
    } else if (period == 'weekly') {
      var msgPeriod = `Period: ${response.data.data.week}\n`;
    } else {
      var msgPeriod = `Period: ${response.data.data.month}\n`;
    }

    const embedMessage = new EmbedBuilder()
      .setTitle(`${capitalizeFirstLetter(sign)} Horoscope`)
      .setColor("Random")
      .setDescription(`${msgPeriod}\n${response.data.data.horoscope_data}`)

    await interaction.reply({ embeds: [embedMessage] })
  } catch (err) {
    await interaction.reply(`Oops something went wrong.`)
  }
}
