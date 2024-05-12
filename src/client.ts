import { Client } from "discord.js"

const client = new Client({
  intents: [
    "DirectMessages",
    "Guilds",
    "GuildMembers",
    "GuildMessages",
    "GuildVoiceStates",
  ],
})

export default client
