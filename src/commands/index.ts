/**
 * index.ts
 *
 * This file serves as the entry point for accessing all commands within the "commands" folder.
 * It exports an object containing all available commands, allowing easy access to each command module.
 */

// Import the "echo" command
import * as echo from "./echo";

// Import the "hamster" command
import * as hamster from "./hamster";

// Import the "ping" command
import * as ping from "./ping";

// Import the "rev" command
import * as rev from "./rev";

// Import the "sort_desc" and "sort_asc" commands
import * as sort_desc from "./sort_desc";
import * as sort_asc from "./sort_asc";

// Import the "ten_queens" command
import * as ten_queens from "./ten_queens";

// Import the "dice" command
import * as dice from "./dice";

// Import the "shout" command
import * as shout from "./shout";

/**
 * Object containing all available commands.
 * Each property corresponds to a command module.
 */
export const commands = {
  echo,
  hamster,
  ping,
  rev,
  sort_desc,
  sort_asc,
  ten_queens,
  dice,
  shout,
};
