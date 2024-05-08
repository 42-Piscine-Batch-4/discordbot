import mydayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"

mydayjs.extend(timezone)
mydayjs.extend(utc)
mydayjs.tz.setDefault("Asia/Singapore")

/** Takes a Unix timestamp and formats it with our default timezone (Asia/Singapore)
 */
const formatTime = (date: number) => {
  return mydayjs(date).format("D MMM YYYY, hh:mm A")
}

export { mydayjs as default, formatTime }
