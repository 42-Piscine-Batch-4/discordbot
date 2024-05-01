/**
 * index.ts
 *
 * This file serves as the entry point for accessing all commands within the "commands" folder.
 * It exports an object containing all available commands, allowing easy access to each command module.
 */

// Import the "ping" command module
import * as ping from "./ping";
import * as hamster from "./hamster";

//Import the "ten_queens" command
import * as ten_queens from "./ten_queens";

/**
 * Object containing all available commands.
 * Each property corresponds to a command module.
 */
export const commands = {
    ping,
    hamster,
    ten_queens,
};
