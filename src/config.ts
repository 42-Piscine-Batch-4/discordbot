/**
 * config.ts
 *
 * This file contains the configuration settings for the Discord bot.
 * It imports the 'dotenv' library to enable loading environment variables from a .env file.
 * The environment variables loaded include the bot token and client ID required for authentication with the Discord API.
 * If any of these environment variables are missing, an error will be thrown.
 * The exported 'config' object contains the retrieved BOT_TOKEN and CLIENT_ID, making them accessible throughout the application.
 */

/* IMPORTS */
import dotenv from "dotenv"

// Configuring dotenv which is a 3rd party library to enable the app to recognize .env files.
dotenv.config()

// Obtaining the values from the .env files specified in the root folder.
// This is why, it is important that you have the .env file in the root else, an error will be thrown.
const { BOT_TOKEN, CLIENT_ID, NIGHT_API_KEY } = process.env

// This is the error handling, which will throw an error if the .env values cannot be found.
if (!BOT_TOKEN || !CLIENT_ID || !NIGHT_API_KEY) {
  throw new Error("Missing environment variables!")
}

/**
 * Configs containing all required information.
 * Here we are exporting an object containing the BOT_TOKEN and CLIENT_ID,
 * which are retrieved from the .env file.
 * This allows other parts of the application to access these values easily.
 */
export const config = {
  BOT_TOKEN,
  CLIENT_ID,
  NIGHT_API_KEY,
}
