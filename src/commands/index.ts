/**
 * index.ts
 *
 * This file serves as the entry point for accessing all commands within the "commands" folder.
 * It exports an object containing all available commands, allowing easy access to each command module.
 */

// Import the "hamster" command
import * as hamster from "./hamster";

// Import the "ping" command
import * as ping from "./ping";

// Import the "sort_desc" command
import * as sort_desc from "./sort_desc";

// Import the "ten_queens" command
import * as ten_queens from "./ten_queens";
//Import the "echo" command
import * as echo from "./echo";

/**
 * Object containing all available commands.
 * Each property corresponds to a command module.
 */
export const commands = {
    hamster,
    ping,
    sort_desc,
    ten_queens,
    echo
};
