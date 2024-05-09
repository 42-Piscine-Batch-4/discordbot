import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"
import mydayjs from "../utils/dayjs"

const COMMAND_NAME = "bedtime"

// Sets the start and end timings here for easier access in future
type Time = { hour: number; minute: number }

const MINUTES: number = 60

const startTime: Time = { hour: 1, minute: 0 }
const endTime: Time = { hour: 16, minute: 0 }

const startMinutes: number = startTime.hour * MINUTES + startTime.minute
const endMinutes: number = endTime.minute * MINUTES + startTime.minute

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
  const currentTime = mydayjs().tz()

  const bedTime = mydayjs()
    .tz()
    .set("hour", startTime.hour)
    .set("minute", startTime.minute)
    .add(startMinutes >= endMinutes ? 1 : 0, "day")

  const wakeTime = mydayjs()
    .tz()
    .set("hour", endTime.hour)
    .set("minute", endTime.minute)

  const isBedTime =
    (startMinutes <= endMinutes && currentTime.isBetween(bedTime, wakeTime)) ||
    (startMinutes > endMinutes &&
      (currentTime.isAfter(bedTime) ||
        currentTime.isBefore(wakeTime.add(1, "day"))))

  const bedHoursDiff = Math.abs(currentTime.diff(bedTime, "hours"))
  const bedMinutesDiff = Math.abs(
    currentTime.diff(bedTime, "minutes") % MINUTES
  )

  const wakeHoursDiff = Math.abs(currentTime.diff(wakeTime, "hours"))
  const wakeMinutesDiff = Math.abs(
    currentTime.diff(wakeTime, "minutes") % MINUTES
  )
  console.log(
    `bedTime: ${bedTime}\nwakeTime: ${wakeTime}\ncurrentTime: ${currentTime}\n`
  )
  console.log(
    `isBedTime: ${isBedTime}\nbedHoursDiff: ${bedHoursDiff} bedMinutesDiff: ${bedMinutesDiff}\nwakeHoursDiff: ${wakeHoursDiff} wakeMinutesDiff: ${wakeMinutesDiff}\n`
  )

  if (!isBedTime) {
    interaction.reply(
      `It's still ${bedHoursDiff <= 1 ? (bedHoursDiff === 0 ? "" : bedHoursDiff + " hour and ") : bedHoursDiff + " hours and "}${bedMinutesDiff} minutes before bed!`
    )
  } else {
    if (interaction.options.getString("defy")) {
      interaction.reply(
        `It's past ${bedTime.format("h:mm a")} but I don't care!!!`
      )
    } else {
      interaction.reply(
        `It's past ${bedTime.format("h:mm a")}. I have ${wakeHoursDiff <= 1 ? (wakeHoursDiff === 0 ? "" : wakeHoursDiff + " hour and ") : wakeHoursDiff + " hours and "}${wakeMinutesDiff} more minutes left to sleep.`
      )
    }
  }
}
