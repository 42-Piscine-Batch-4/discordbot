import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} from "@discordjs/voice"
import {
  ChatInputCommandInteraction,
  GuildMember,
  SlashCommandBuilder,
} from "discord.js"
import ytdl from "ytdl-core"
import client from "../index"

const COMMAND_NAME = "nggyu"

export const data = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Please be in a voice channel before invoking this command")

export const execute = async (interaction: ChatInputCommandInteraction) => {
  const stream = ytdl("https://www.youtube.com/watch?v=dQw4w9WgXcQ", {
    filter: "audioonly",
  })
  const player = createAudioPlayer()
  const resource = createAudioResource(stream)
  const member = interaction.member
  if (member) {
    const channel = (member as GuildMember).voice.channel
    if (channel) {
      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      })
      await interaction.reply("Get ready...")
      connection.subscribe(player)
      player.play(resource)
      client.on("voiceStateUpdate", (_, newState) => {
        if (newState.channelId == null) {
          if (!(member as GuildMember).voice.channel) {
            connection.disconnect()
          }
        }
      })
      player.on(AudioPlayerStatus.Idle, () => {
        connection.disconnect()
      })
    } else {
      await interaction.reply("You need to be in a voice channel!")
    }
  } else {
    await interaction.reply("Unable to find user!")
  }
}
