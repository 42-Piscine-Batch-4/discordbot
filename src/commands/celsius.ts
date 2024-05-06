import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("celsius")
  .setDescription("Convert temperature to or from Celsius")
  .addIntegerOption((option) =>
    option
      .setName("temperature-integer")
      .setDescription("Integer part of the temperature value")
      .setRequired(true)
  )
  .addIntegerOption((option) =>
    option
      .setName("temperature-decimal")
      .setDescription("Decimal part of the temperature value")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("from-scale")
      .setDescription("Original temperature scale (Kelvin or Fahrenheit)")
      .setRequired(true)
      .addChoices(
        { name: "Kelvin", value: "Kelvin" },
        { name: "Fahrenheit", value: "Fahrenheit" }
      )
  )
  .addBooleanOption((option) =>
    option
      .setName("reverse")
      .setDescription(
        "Reverse the conversion (from Celsius instead of to Celsius)"
      )
  );

export const execute = async (interaction: ChatInputCommandInteraction) => {
  const temperatureInteger = interaction.options.getInteger("temperature-integer", true);
  const temperatureDecimal = interaction.options.getInteger("temperature-decimal", true);
  const temperature = parseFloat(`${temperatureInteger}.${temperatureDecimal.toFixed(2)}`);
  const fromScale = interaction.options.getString("from-scale", true);
  const reverse = interaction.options.getBoolean("reverse") || false;

  if (fromScale.toLowerCase() !== "kelvin" && fromScale.toLowerCase() !== "fahrenheit") {
    await interaction.reply("Invalid temperature scale. Choose either Kelvin or Fahrenheit.");
    return;
  }

  const convertedTemp = convertTemperature(temperature, fromScale, "Celsius", reverse);

  if (reverse) {
    await interaction.reply(`${temperature.toFixed(2)}°Celsius is equal to ${convertedTemp.toFixed(2)}°${fromScale}`);
  } else {
    await interaction.reply(`${temperature.toFixed(2)}°${fromScale} is equal to ${convertedTemp.toFixed(2)}°Celsius`);
  }
};

function convertTemperature(temp: number, fromScale: string, toScale: string, reverse: boolean = false): number {
  if (fromScale === "Kelvin") {
    if (reverse) {
      return temp + 273.15;
    } else {
      return temp - 273.15;
    }
  } else if (fromScale === "Fahrenheit") {
    if (reverse) {
      return (temp * 9 / 5) + 32; 
    } else {
      return (temp - 32) * 5 / 9;
    }
  } else {
    return temp;
  }
}