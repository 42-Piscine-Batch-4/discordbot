/**
 * index.ts
 *
 * This file serves as the entry point for accessing all commands within the "commands" folder.
 * It exports an object containing all available commands, allowing easy access to each command module.
 */

// Import the "ping" command module
import * as ping from "./ping";

/**
 * Object containing all available commands.
 * Each property corresponds to a command module.
 */
export const commands = {
  ping,
};
