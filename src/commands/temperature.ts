import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"

export const data = new SlashCommandBuilder()
  .setName("temperature")
  .setDescription("Convert temperature between different scales")
  .addNumberOption((option) =>
    option
      .setName("value")
      .setDescription("Temperature value")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("from-scale")
      .setDescription(
        "Original temperature scale (Celsius, Kelvin or Fahrenheit)"
      )
      .setRequired(true)
      .addChoices(
        { name: "Celsius", value: "Celsius" },
        { name: "Kelvin", value: "Kelvin" },
        { name: "Fahrenheit", value: "Fahrenheit" }
      )
  )
  .addStringOption((option) =>
    option
      .setName("to-scale")
      .setDescription(
        "Target temperature scale (Celsius, Kelvin or Fahrenheit)"
      )
      .setRequired(true)
      .addChoices(
        { name: "Celsius", value: "Celsius" },
        { name: "Kelvin", value: "Kelvin" },
        { name: "Fahrenheit", value: "Fahrenheit" }
      )
  )

export const execute = async (interaction: ChatInputCommandInteraction) => {
  const temperature = interaction.options.getNumber("value", true)
  const fromScale = interaction.options.getString("from-scale", true)
  const toScale = interaction.options.getString("to-scale", true)

  if (
    fromScale.toLowerCase() !== "celsius" &&
    fromScale.toLowerCase() !== "kelvin" &&
    fromScale.toLowerCase() !== "fahrenheit"
  ) {
    await interaction.reply(
      "Invalid original temperature scale. Choose Celsius, Kelvin or Fahrenheit."
    )
    return
  }

  if (
    toScale.toLowerCase() !== "celsius" &&
    toScale.toLowerCase() !== "kelvin" &&
    toScale.toLowerCase() !== "fahrenheit"
  ) {
    await interaction.reply(
      "Invalid target temperature scale. Choose Celsius, Kelvin or Fahrenheit."
    )
    return
  }

  const convertedTemp = convertTemperature(temperature, fromScale, toScale)
  await interaction.reply(
    `${temperature.toFixed(2)}°${fromScale} is equal to ${convertedTemp.toFixed(2)}°${toScale}`
  )
}

const convertTemperature = (
  temp: number,
  fromScale: string,
  toScale: string
): number => {
  const celsiusTemp = (() => {
    switch (fromScale.toLowerCase()) {
      case "celsius":
        return temp
      case "kelvin":
        return temp - 273.15
      case "fahrenheit":
        return (temp - 32) * (5 / 9)
      default:
        throw new Error("Invalid temperature scale.")
    }
  })()

  switch (toScale.toLowerCase()) {
    case "celsius":
      return celsiusTemp
    case "kelvin":
      return celsiusTemp + 273.15
    case "fahrenheit":
      return celsiusTemp * (9 / 5) + 32
    default:
      throw new Error("Invalid temperature scale.")
  }
}
