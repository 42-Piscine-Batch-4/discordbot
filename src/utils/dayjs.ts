import mydayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"

mydayjs.extend(timezone)
mydayjs.extend(utc)
mydayjs.tz.setDefault("Asia/Singapore")

export default mydayjs
