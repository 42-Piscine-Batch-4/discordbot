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
  .addBooleanOption((option) =>
    option.setName("defy").setDescription("Defies bedtime").setRequired(false)
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

  if (currentTime < bedTime && currentTime > wakeTime) {
    interaction.reply(
      `It's still ${Math.abs(currentTime.hour() - bedTime.hour())} hours and ${Math.abs(currentTime.minute() - bedTime.minute())} minutes before bed!`
    )
  } else {
    if (interaction.options.getBoolean("defy")) {
      interaction.reply(
        `It's past ${startTime.hour % 12}:${startTime.minute} pm but I don't care!!!`
      )
    } else {
      interaction.reply(
        `It's past ${startTime.hour % 12}:${startTime.minute} pm, time to sleep.`
      )
    }
  }
}
