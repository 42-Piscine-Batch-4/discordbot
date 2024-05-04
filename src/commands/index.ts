/**
 * index.ts
 *
 * This file serves as the entry point for accessing all commands within the "commands" folder.
 * It exports an object containing all available commands, allowing easy access to each command module.
 */

import * as echo from "./echo";
import * as hamster from "./hamster";
import * as fetch from "./fetch";
import * as ping from "./ping";
import * as rev from "./rev";
import * as honkai_gacha from "./honkai_gacha";
import * as sort_asc from "./sort_asc";
import * as sort_desc from "./sort_desc";
import * as ten_queens from "./ten_queens";
import * as dice from "./dice";
import * as shout from "./shout";
import * as calc from "./calc";
import * as rps from "./rps";
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
  honkai_gacha,
};
