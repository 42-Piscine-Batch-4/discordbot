import { Dayjs } from "dayjs"
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"
import mydayjs from "../utils/dayjs"

const COMMAND_NAME = "bedtime"

// Avoids having to scroll through the code to change timings
type Time = { day: number; hour: number; minute: number }
const startTime: Time = { day: 0, hour: 23, minute: 42 }
const endTime: Time = { day: 1, hour: 7, minute: 42 }

const timeClass = (
  currentTime: Dayjs,
  targetTime: Time
): { time: Dayjs; hmDiff: { hours: number; minutes: number } } => {
  const time = mydayjs()
    .tz()
    .set("hour", targetTime.hour)
    .set("minute", targetTime.minute)
    .add(targetTime.day, "day")
  const hmDiff = {
    hours: Math.abs(currentTime.diff(time, "hours")),
    minutes: Math.abs(currentTime.diff(time, "minutes") % 60),
  }
  return { time, hmDiff }
}

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
  const bedTime = timeClass(currentTime, startTime)
  const wakeTime = timeClass(currentTime, endTime)

  const isBedTime: boolean =
    currentTime.isBetween(bedTime.time, wakeTime.time) ||
    currentTime.isSame(bedTime.time)

  if (!isBedTime) {
    interaction.reply(
      `It's still ${bedTime.hmDiff.hours <= 1 ? (bedTime.hmDiff.hours === 0 ? "" : bedTime.hmDiff.hours + " hour and ") : bedTime.hmDiff.hours + " hours and "}${bedTime.hmDiff.minutes} minutes before bed!`
    )
  } else {
    if (interaction.options.getString("defy")) {
      interaction.reply(
        `It's${currentTime.isSame(bedTime.time) ? "" : " past"} ${bedTime.time.format("h:mm a")} but I don't care!!!`
      )
    } else {
      interaction.reply(
        `It's${currentTime.isSame(bedTime.time) ? "" : " past"} ${bedTime.time.format("h:mm a")}. I have ${wakeTime.hmDiff.hours <= 1 ? (wakeTime.hmDiff.hours === 0 ? "" : wakeTime.hmDiff.hours + " hour and ") : wakeTime.hmDiff.hours + " hours and "}${wakeTime.hmDiff.minutes} minutes left to sleep 💤`
      )
    }
  }
}
