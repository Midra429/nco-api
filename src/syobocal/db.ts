import type {
  SyoboCalCommand,
  SyoboCalParameters,
  SyoboCalResponseXml,
  SyoboCalResponseJson,
} from '../types/syobocal/db.js'

import { xml2json } from 'xml-js'
import { logger } from '../utils/logger.js'

const API_BASE_URL = 'https://cal.syoboi.jp/db.php'

export const db = async <Command extends SyoboCalCommand>(
  command: Command,
  params: SyoboCalParameters<Command>,
  options?: {
    userAgent?: string
  }
): Promise<SyoboCalResponseJson<Command> | null> => {
  const url = new URL(API_BASE_URL)

  url.searchParams.set('Command', command)

  for (const key in params) {
    const val = params[key] as string | string[] | number
    url.searchParams.set(key, Array.isArray(val) ? val.join() : val.toString())
  }

  const headers = new Headers()

  if (options?.userAgent) {
    headers.set('X-User-Agent', options.userAgent)
  }

  try {
    const response = await fetch(url, { headers })
    const text = await response.text()

    const xml: SyoboCalResponseXml<Command> = JSON.parse(
      xml2json(text, { compact: true })
    )

    if (xml) {
      switch (command) {
        case 'TitleLookup': {
          const titleItem = (xml as SyoboCalResponseXml<'TitleLookup'>)
            .TitleLookupResponse.TitleItems.TitleItem

          return (
            Array.isArray(titleItem)
              ? Object.fromEntries(
                  titleItem.map((item) => [
                    item.TID._text,
                    Object.fromEntries(
                      Object.entries(item).map(([key, val]) => [key, val._text])
                    ),
                  ])
                )
              : Object.fromEntries([
                  [
                    titleItem.TID._text,
                    Object.fromEntries(
                      Object.entries(titleItem).map(([key, val]) => [
                        key,
                        val._text,
                      ])
                    ),
                  ],
                ])
          ) as SyoboCalResponseJson<'TitleLookup'>
        }

        case 'ProgLookup': {
          const progItem = (xml as SyoboCalResponseXml<'ProgLookup'>)
            .ProgLookupResponse.ProgItems.ProgItem

          return (
            Array.isArray(progItem)
              ? Object.fromEntries(
                  progItem.map((item) => [
                    item.PID._text,
                    Object.fromEntries(
                      Object.entries(item).map(([key, val]) => [key, val._text])
                    ),
                  ])
                )
              : Object.fromEntries([
                  [
                    progItem.PID._text,
                    Object.fromEntries(
                      Object.entries(progItem).map(([key, val]) => [
                        key,
                        val._text,
                      ])
                    ),
                  ],
                ])
          ) as SyoboCalResponseJson<'ProgLookup'>
        }
      }
    }
  } catch (err) {
    logger.error('syobocal/db:', err)
  }

  return null
}
