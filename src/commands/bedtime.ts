import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"
import mydayjs from "../utils/dayjs"

const COMMAND_NAME = "bedtime"

// Sets the start and end timings here for easier access in future
type Time = { hour: number; minute: number }

const startTime: Time = { hour: 8, minute: 42 }
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

  if (bedTime > wakeTime) {
    wakeTime.add(1, "day")
  }

  const isBedTime = !(
    currentTime.isAfter(wakeTime) && currentTime.isBefore(bedTime.add(1, "day"))
  )
  const bedHoursDiff = Math.abs(currentTime.diff(bedTime, "hours"))
  const bedMinutesDiff = Math.abs(currentTime.diff(bedTime, "minutes") % 60)

  // this is wrong. diff doesn't check direction properly. if startTime is 8:42 and endTime is 7:42 it thinks there's 1 hour left to sleep
  const wakeHoursDiff = Math.abs(currentTime.diff(wakeTime, "hours"))
  const wakeMinutesDiff = Math.abs(currentTime.diff(wakeTime, "minutes") % 60)

  if (!isBedTime) {
    interaction.reply(
      `It's still ${bedHoursDiff <= 1 ? (bedHoursDiff === 0 ? "" : bedHoursDiff + " hour and ") : bedHoursDiff + " hours and "}${bedMinutesDiff} minutes before bed!`
    )
  } else {
    if (interaction.options.getString("defy")) {
      interaction.reply(
        `It's past ${bedTime.hour() % 12}:${bedTime.minute()} ${bedTime.hour() > 12 ? "pm" : "am"} but I don't care!!!`
      )
    } else {
      interaction.reply(
        `It's past ${bedTime.hour() % 12}:${bedTime.minute()} ${bedTime.hour() > 12 ? "pm" : "am"}. You have ${wakeHoursDiff <= 1 ? (wakeHoursDiff === 0 ? "" : wakeHoursDiff + " hour and ") : wakeHoursDiff + " hours and "}${wakeMinutesDiff} more minutes left to sleep.`
      )
    }
  }
}
