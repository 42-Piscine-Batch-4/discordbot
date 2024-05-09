/**
 * index.ts
 *
 * This file serves as the entry point for accessing all commands within the "commands" folder.
 * It exports an object containing all available commands, allowing easy access to each command module.
 */

import * as avatar from "./avatar"
import * as bedtime from "./bedtime"
import * as caesar from "./caesar"
import * as calc from "./calc"
import * as dice from "./dice"
import * as display_image from "./display_image"
import * as echo from "./echo"
import * as fetch from "./fetch"
import * as find_members from "./find_members"
import * as hamster from "./hamster"
import * as honkai_gacha from "./honkai_gacha"
import * as horoscope from "./horoscope"
import * as icon_42 from "./icon_42"
import * as last from "./last"
import * as member_count from "./member_count"
import * as nggyu from "./nggyu"
import * as palindrome from "./palindrome"
import * as ping from "./ping"
import * as rev from "./rev"
import * as rps from "./rps"
import * as shout from "./shout"
import * as sort_asc from "./sort_asc"
import * as sort_desc from "./sort_desc"
import * as temperature from "./temperature"
import * as ten_queens from "./ten_queens"

/**
 * Object containing all available commands.
 * Each property corresponds to a command module.
 */
export const commands = {
  avatar,
  bedtime,
  caesar,
  calc,
  dice,
  display_image,
  echo,
  fetch,
  find_members,
  hamster,
  honkai_gacha,
  horoscope,
  icon_42,
  last,
  member_count,
  nggyu,
  palindrome,
  ping,
  rev,
  rps,
  shout,
  sort_asc,
  sort_desc,
  ten_queens,
  temperature,
}
