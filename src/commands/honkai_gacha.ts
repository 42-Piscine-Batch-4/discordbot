import axios from "axios"
import {
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js"
import { get, join, map, random, size, toString } from "lodash"
import outputCode from "../utils/output-code"

const COMMAND_NAME = "honkai_gacha"
const CHAR_BASE_URL = "https://hsr-api.vercel.app/api/v1/characters"
const STAR_RAIL_BASE_URL = "https://genshin.gg/star-rail/characters/"

const printStar = (input: number) => {
  const output = map(Array(input), () => "⭐️")
  return join(output, "")
}

export const data = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Try your luck at pulling these honkai characters!")

export const execute = async (interaction: CommandInteraction) => {
  try {
    const res = await axios({ method: "get", url: CHAR_BASE_URL })
    const { data: characters } = res
    const character = get(characters, random(1, size(characters)))
    const { rarity, name, img, introduction, path, element } = character
    if (!character) throw new Error("Unable to find character!")
    const output = new EmbedBuilder()
      .setColor("DarkOrange")
      .setTitle(`You obtained: **${name}**`)
      .setURL(STAR_RAIL_BASE_URL + name)
      .setDescription(
        `Path: **${path}**\nElement: **${element}**\n\n${introduction}`
      )
      .setImage(img)
      .setTimestamp()
      .setFooter({ text: printStar(rarity), iconURL: img })
    await interaction.reply({ embeds: [output] })
  } catch (err) {
    await interaction.reply(`ERROR!\n${outputCode(toString(err))}`)
  }
}
