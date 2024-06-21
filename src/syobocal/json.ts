import type { UnionToIntersection } from 'utility-types'
import type {
  SyoboCalRequestCommand,
  SyoboCalParameters,
  SyoboCalResponse,
} from '../types/syobocal/json'

const API_BASE_URL = 'https://cal.syoboi.jp/json.php'

export const json = async <Command extends SyoboCalRequestCommand>(
  commands: Command[],
  params: SyoboCalParameters<Command>,
  options?: {
    useragent?: string
  }
): Promise<UnionToIntersection<SyoboCalResponse<Command>> | null> => {
  const url = new URL(API_BASE_URL)

  url.searchParams.set('Req', commands.join())

  for (const key in params) {
    const val = params[key] as string | string[] | number
    url.searchParams.set(key, Array.isArray(val) ? val.join() : val.toString())
  }

  const headers = new Headers()

  if (options?.useragent) {
    headers.set('User-Agent', options.useragent)
  }

  try {
    const response = await fetch(url, { headers })
    const json = await response.json()

    if (
      !(
        ('Titles' in json && json['Titles']) ||
        ('Programs' in json && json['Programs']) ||
        ('SubTitles' in json && json['SubTitles'])
      )
    ) {
      throw new Error(`${response.status} ${response.statusText}`)
    }

    return json
  } catch (err) {
    console.error('[nco-api/syobocal/json]', err)
  }

  return null
}
