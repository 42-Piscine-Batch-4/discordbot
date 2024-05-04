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

// Import the "fetch" command
import * as fetch from "./fetch";

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

// Import the "calc" command
import * as calc from "./calc";

// Import the "rps" command
import * as rps from "./rps";

// Import the "display_image" command
import * as display_image from "./display_image";

/**
 * Object containing all available commands.
 * Each property corresponds to a command module.
 */
export const commands = {
  echo,
  fetch,
  hamster,
  ping,
  rev,
  sort_desc,
  sort_asc,
  ten_queens,
  dice,
  shout,
  calc,
  rps,
  display_image,
};
