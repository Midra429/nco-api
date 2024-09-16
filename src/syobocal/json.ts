import type { UnionToIntersection } from 'utility-types'
import type {
  SyoboCalRequestCommand,
  SyoboCalParameters,
  SyoboCalResponse,
} from '../types/syobocal/json.js'

import { logger } from '../utils/logger.js'

const API_BASE_URL = 'https://cal.syoboi.jp/json.php'

export const json = async <Command extends SyoboCalRequestCommand>(
  commands: Command[],
  params: SyoboCalParameters<Command>,
  options?: {
    userAgent?: string
  }
): Promise<UnionToIntersection<SyoboCalResponse<Command>> | null> => {
  const url = new URL(API_BASE_URL)

  url.searchParams.set('Req', commands.join())

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
    const json = await response.json()

    if (
      ('Titles' in json && json['Titles']) ||
      ('Programs' in json && json['Programs']) ||
      ('SubTitles' in json && json['SubTitles'])
    ) {
      return json
    }
  } catch (err) {
    logger.error('syobocal/json:', err)
  }

  return null
}
