import { Client } from "discord.js"
import { commands } from "./commands"
import { config } from "./config"

// Create a new Discord client instance
const client = new Client({
  intents: ["Guilds", "GuildMessages", "DirectMessages"],
})

// Log a message when the bot is ready
client.once("ready", () => {
  console.log("This bot is ready Pisciners!")
})

/**
 * Handle interactions with commands.
 * @param {Interaction} interaction - The interaction event triggered by a command.
 * @returns {void} No return value.
 */
client.on("interactionCreate", async (interaction): Promise<void> => {
  if (!interaction.isCommand()) return

  const { commandName } = interaction

  // Check if the command name exists as a key in the commands object
  // The `commands` object contains all available commands defined in the "commands" module
  // Using `keyof typeof commands` allows us to ensure that `commandName` is a valid command key
  // The `keyof` operator in TypeScript retrieves the union of known public property names of a type
  // Here, `typeof commands` refers to the type of the `commands` object, and `keyof` helps ensure type safety
  // By checking if `commandName` is a valid key in the `commands` object, we ensure that it's a registered command
  if (commands[commandName as keyof typeof commands]) {
    // Execute the command if it exists
    commands[commandName as keyof typeof commands].execute(interaction as any)
  }
})

// Log in to Discord using the bot token
client.login(config.BOT_TOKEN)

process.on("SIGINT", () => {
  console.log("Exiting app...")
  process.exit()
})

process.on("SIGTERM", () => {
  console.log("Exiting app...")
  process.exit()
})
