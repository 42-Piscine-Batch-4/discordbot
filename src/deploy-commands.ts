/**
 * deployCommands.ts
 *
 * This file contains functions to deploy application commands to a Discord guild.
 * It retrieves command data from the "commands" module, interacts with the Discord REST API
 * to update the guild's commands, and logs the process.
 */

import { map, values } from "lodash"
import { commands } from "./commands"
import { REST, Routes } from "discord.js"
import { config } from "./config"

/**
 * Retrieves the data for all commands defined in the "commands" module.
 * @returns {Array} An array containing the data for all commands.
 */
const commandsData = map(values(commands), (command) => {
  return command.data
})

// Initialize a new REST client for interacting with Discord API
const rest = new REST({ version: "10" }).setToken(config.BOT_TOKEN)

/**
 * Represents the properties required for deploying commands to a guild.
 */
type DeployCommandProps = {
  guildId: string // The ID of the guild where commands will be deployed
}

/**
 * Deploys the application commands to a specific guild.
 * @param {DeployCommandProps} props - The properties required for deploying commands.
 * @returns {Promise<void>} A Promise that resolves once the commands are deployed successfully.
 */
export const deployCommands = async (
  props: DeployCommandProps
): Promise<void> => {
  const { guildId } = props

  try {
    console.log("Started refreshing application's (/) commands.")

    // Update the guild's commands with the latest data
    await rest.put(Routes.applicationGuildCommands(config.CLIENT_ID, guildId), {
      body: commandsData,
    })

    console.log("Successfully reloaded application (/) commands.")
  } catch (error) {
    console.error(error)
  }
}
