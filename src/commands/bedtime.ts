import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"
import mydayjs from "../utils/dayjs"

const COMMAND_NAME = "bedtime"

// Sets the start and end timings here for easier access in future
type Time = { hour: number; minute: number }

const startTime: Time = { hour: 23, minute: 42 }
const endTime: Time = { hour: 7, minute: 42 }

export const data = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Checks if it's bedtime")
  .addStringOption((option) =>
    option
      .setName("defy")
      .setDescription("Defies bedtime")
      .setRequired(false)
      .addChoices({ name: "defy", value: "defy bedtime" })
  )

export const execute = async (interaction: ChatInputCommandInteraction) => {
  const currentTime = mydayjs().tz()

  const bedTime = mydayjs()
    .tz()
    .set("hour", startTime.hour)
    .set("minute", startTime.minute)

  const wakeTime = mydayjs()
    .tz()
    .set("hour", endTime.hour)
    .set("minute", endTime.minute)

  /**
   * This is not accounting properly for past-midnight checks
   */
  const isBedTime =
    (currentTime.isAfter(bedTime) && currentTime.isBefore(wakeTime)) ||
    (currentTime.isAfter(wakeTime) &&
      currentTime.isBefore(bedTime.add(1, "day")))

  if (!isBedTime) {
    const hoursDiff = Math.abs(currentTime.diff(bedTime, "hours"))
    const minutesDiff = Math.abs(currentTime.diff(bedTime, "minutes") % 60)
    interaction.reply(
      `It's still ${hoursDiff <= 1 ? (hoursDiff === 0 ? "" : hoursDiff + " hour and ") : hoursDiff + " hours and "}${minutesDiff} minutes before bed!`
    )
  } else {
    if (interaction.options.getString("defy")) {
      interaction.reply(
        `It's past ${bedTime.hour() % 12}:${bedTime.minute()} ${bedTime.hour() > 12 ? "pm" : "am"} but I don't care!!!`
      )
    } else {
      interaction.reply(
        `It's past ${bedTime.hour() % 12}:${bedTime.minute()} ${bedTime.hour() > 12 ? "pm" : "am"}, time to sleep.`
      )
    }
  }
}
