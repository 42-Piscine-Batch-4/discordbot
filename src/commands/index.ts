/**
 * index.ts
 *
 * This file serves as the entry point for accessing all commands within the "commands" folder.
 * It exports an object containing all available commands, allowing easy access to each command module.
 */

import * as celsius from "./celsius"
import * as member_count from "./member_count"
import * as avatar from "./avatar"
import * as caesar from "./caesar"
import * as calc from "./calc"
import * as dice from "./dice"
import * as display_image from "./display_image"
import * as echo from "./echo"
import * as fetch from "./fetch"
import * as hamster from "./hamster"
import * as honkai_gacha from "./honkai_gacha"
import * as icon_42 from "./icon_42"
import * as last from "./last"
import * as palindrome from "./palindrome"
import * as ping from "./ping"
import * as rev from "./rev"
import * as rps from "./rps"
import * as shout from "./shout"
import * as sort_asc from "./sort_asc"
import * as sort_desc from "./sort_desc"
import * as ten_queens from "./ten_queens"
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
  icon_42,
  display_image,
  honkai_gacha,
  avatar,
  palindrome,
  last,
  caesar,
  member_count,
  celsius,
}
