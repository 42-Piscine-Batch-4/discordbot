import axios from "axios"
import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js"
import capitalizeFirstLetter from "../utils/capitalize-first-letter"
import formatString from "../utils/format-string"

const COMMAND_NAME = "horoscope"
const HOROSCOPE_BASE_URL =
  "https://horoscope-app-api.vercel.app/api/v1/get-horoscope"
const SIGN_ICONS = {
  aries: "♈",
  taurus: "♉",
  gemini: "♊",
  cancer: "♋",
  leo: "♌",
  virgo: "♍",
  libra: "♎",
  scorpio: "♏",
  sagittarius: "♐",
  capricorn: "♑",
  aquarius: "♒",
  pisces: "♓",
}

const removeHeader = (text: string): string => {
  const monthNames =
    "January|February|March|April|May|June|July|August|September|October|November|December"
  const regexPattern = new RegExp(
    `(${monthNames})\\s+Premium\\s+Horoscope`, 'gi'
  )

  return text.replace(regexPattern, "")
}

export const data = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Check your horoscope.")
  .addStringOption((option) =>
    option
      .setName("sign")
      .setDescription("astrological sign")
      .setRequired(true)
      .addChoices(
        { name: "Aries", value: "aries" },
        { name: "Taurus", value: "taurus" },
        { name: "Gemini", value: "gemini" },
        { name: "Cancer", value: "cancer" },
        { name: "Leo", value: "leo" },
        { name: "Virgo", value: "virgo" },
        { name: "Libra", value: "libra" },
        { name: "Scorpio", value: "scorpio" },
        { name: "Sagittarius", value: "sagittarius" },
        { name: "Capricorn", value: "capricorn" },
        { name: "Aquarius", value: "aquarius" },
        { name: "Pisces", value: "pisces" }
      )
  )
  .addStringOption((option) =>
    option
      .setName("period")
      .setDescription("prediction period")
      .setRequired(true)
      .addChoices(
        { name: "Daily", value: "daily" },
        { name: "Weekly", value: "weekly" },
        { name: "Monthly", value: "monthly" }
      )
  )

export const execute = async (interaction: ChatInputCommandInteraction) => {
  try {
    const period = interaction.options.getString("period", true)
    const sign = interaction.options.getString("sign", true)
    const horoscope_url =
      period == "daily"
        ? HOROSCOPE_BASE_URL + `/${period}?sign=${sign}&day=TODAY`
        : HOROSCOPE_BASE_URL + `/${period}?sign=${sign}`

    const response = await axios({ method: "get", url: horoscope_url })

    if (!response.data.success) {
      throw new Error("Failed to fetch horoscope data")
    }

    if (period == "daily") {
      var msgPeriod = `Period: ${response.data.data.date}\n`
    } else if (period == "weekly") {
      var msgPeriod = `Period: ${response.data.data.week}\n`
    } else {
      var msgPeriod = `Period: ${response.data.data.month}\n`
    }

    const embedMessage = new EmbedBuilder()
      .setTitle(
        `${SIGN_ICONS[sign as keyof typeof SIGN_ICONS]} ${capitalizeFirstLetter(sign)} Horoscope`
      )
      .setColor("Purple")
      .setDescription(
        `${msgPeriod}\n${formatString(removeHeader(response.data.data.horoscope_data))}`
      )

    await interaction.reply({ embeds: [embedMessage] })
  } catch (err) {
    await interaction.reply(`Oops something went wrong.`)
  }
}
