import { zeroPadding } from './zeroPadding'

export const toISOStringTz = (date: Date) => {
  const year = date.getFullYear().toString()
  const month = zeroPadding((date.getMonth() + 1).toString(), 2)
  const day = zeroPadding(date.getDate().toString(), 2)
  const hour = zeroPadding(date.getHours().toString(), 2)
  const min = zeroPadding(date.getMinutes().toString(), 2)
  const sec = zeroPadding(date.getSeconds().toString(), 2)

  const tz = -date.getTimezoneOffset()
  const sign = 0 <= tz ? '+' : '-'
  const tzHour = zeroPadding((tz / 60).toString(), 2)
  const tzMin = zeroPadding((tz % 60).toString(), 2)

  return `${year}-${month}-${day}T${hour}:${min}:${sec}${sign}${tzHour}:${tzMin}`
}
