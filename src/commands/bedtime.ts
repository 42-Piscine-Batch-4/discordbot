import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"
import mydayjs from "../utils/dayjs"

const COMMAND_NAME = "bedtime"

// Sets the start and end timings here for easier access in future
type Time = { day: number; hour: number; minute: number }
const startTime: Time = { day: 1, hour: 0, minute: 0 }
const endTime: Time = { day: 1, hour: 8, minute: 0 }

export const data = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Checks if it's bedtime")
  .addStringOption((option) =>
    option
      .setName("defy")
      .setDescription("Choose to defy bedtime")
      .setRequired(false)
      .addChoices({ name: "defy", value: "defy bedtime" })
  )

export const execute = async (interaction: ChatInputCommandInteraction) => {
  const currentTime = mydayjs()

  const bedTime = mydayjs()
    .set("hour", startTime.hour)
    .set("minute", startTime.minute)
    .add(startTime.day, "day")

  const wakeTime = mydayjs()
    .set("hour", endTime.hour)
    .set("minute", endTime.minute)
    .add(endTime.day, "day")

  const isBedTime =
    currentTime.isBetween(bedTime, wakeTime) || currentTime.isSame(bedTime)

  const bedHoursDiff = Math.abs(currentTime.diff(bedTime, "hours"))
  const bedMinutesDiff = Math.abs(currentTime.diff(bedTime, "minutes") % 60)

  const wakeHoursDiff = Math.abs(currentTime.diff(wakeTime, "hours"))
  const wakeMinutesDiff = Math.abs(currentTime.diff(wakeTime, "minutes") % 60)

  if (!isBedTime) {
    interaction.reply(
      `It's still ${bedHoursDiff <= 1 ? (bedHoursDiff === 0 ? "" : bedHoursDiff + " hour and ") : bedHoursDiff + " hours and "}${bedMinutesDiff} minutes before bed!`
    )
  } else {
    if (interaction.options.getString("defy")) {
      interaction.reply(
        `It's${currentTime.isSame(bedTime) ? "" : " past"} ${bedTime.format("h:mm a")} but I don't care!!!`
      )
    } else {
      interaction.reply(
        `It's${currentTime.isSame(bedTime) ? "" : " past"} ${bedTime.format("h:mm a")}. I have ${wakeHoursDiff <= 1 ? (wakeHoursDiff === 0 ? "" : wakeHoursDiff + " hour and ") : wakeHoursDiff + " hours and "}${wakeMinutesDiff} more minutes left to sleep.`
      )
    }
  }
}
