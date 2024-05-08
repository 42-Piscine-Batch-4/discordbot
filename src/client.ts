import { Client } from "discord.js"

const client = new Client({
  intents: ["Guilds", "GuildMessages", "DirectMessages", "GuildVoiceStates"],
})

export default client
