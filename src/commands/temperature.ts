import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";

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
            .setDescription("Original temperature scale (Celsius, Kelvin or Fahrenheit)")
            .setRequired(true)
            .addChoices(
                { name: "Celsius", value: "Celsius" },
                { name: "Kelvin", value: "Kelvin" },
                { name: "Fahrenheit", value: "Fahrenheit" }
            )
    );

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const temperature = interaction.options.getNumber("value", true);
    const fromScale = interaction.options.getString("from-scale", true);
    const userTag = interaction.user.tag;

    if (
        fromScale.toLowerCase() !== "celsius" &&
        fromScale.toLowerCase() !== "kelvin" &&
        fromScale.toLowerCase() !== "fahrenheit"
    ) {
        await interaction.reply(
            "Invalid original temperature scale. Choose Celsius, Kelvin or Fahrenheit."
        );
        return;
    }

    const celsiusTemp = convertTocelsius(temperature, fromScale);
    const otherScales = getOtherScales(fromScale);
    const convertedTemps = otherScales.map(scale => convertTemperature(celsiusTemp, "celsius", scale));
    const temperatureEmoji = getTemperatureEmoji(celsiusTemp);

    const temperatureEmbed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("Temperature Conversion")
        .setDescription(`Hi **@${userTag}**,
        \nYour input is: **${temperature}°${fromScale}**  ${temperatureEmoji}
        \n\nIn ${otherScales[0]}, that would be **${convertedTemps[0].toFixed(2)}°${otherScales[0][0].toUpperCase() + otherScales[0].slice(1)}**
        \nIn ${otherScales[1]}, that would be **${convertedTemps[1].toFixed(2)}°${otherScales[1][0].toUpperCase() + otherScales[1].slice(1)}**`);

    await interaction.reply({ embeds: [temperatureEmbed] });
};

const convertTocelsius = (temp: number, fromScale: string): number => {
    switch (fromScale.toLowerCase()) {
        case "celsius":
            return temp;
        case "kelvin":
            return temp - 273.15;
        case "fahrenheit":
            return (temp - 32) * (5 / 9);
        default:
            throw new Error("Invalid temperature scale.");
    }
};

const convertTemperature = (temp: number, fromScale: string, toScale: string): number => {
    const celsiusTemp = fromScale.toLowerCase() === "celsius" ? temp : convertTocelsius(temp, fromScale);

    switch (toScale.toLowerCase()) {
        case "celsius":
            return celsiusTemp;
        case "kelvin":
            return celsiusTemp + 273.15;
        case "fahrenheit":
            return celsiusTemp * (9 / 5) + 32;
        default:
            throw new Error("Invalid temperature scale.");
    }
};

const getOtherScales = (scale: string): string[] => {
    const scales = ["celsius", "kelvin", "fahrenheit"];
    return scales.filter(s => s !== scale.toLowerCase());
};

const getTemperatureEmoji = (temp: number): string => {
    if (temp >= 30) {
        return "🥵";
    } else if (temp <= 10) {
        return "🥶";
    } else {
        return "😎";
    }
};