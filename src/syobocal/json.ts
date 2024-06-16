import type {
  SyoboCalRequestCommand,
  SyoboCalParameters,
  SyoboCalResponse,
} from '../types/syobocal/json'

const API_BASE_URL = 'https://cal.syoboi.jp/json.php'

export const json = async <Command extends SyoboCalRequestCommand>(
  command: Command,
  params: SyoboCalParameters[Command]
): Promise<SyoboCalResponse[Command] | null> => {
  const url = new URL(API_BASE_URL)

  url.searchParams.set('Req', command)

  for (const key in params) {
    const val = params[key] as string | string[] | number
    url.searchParams.set(key, Array.isArray(val) ? val.join() : val.toString())
  }

  try {
    const response = await fetch(url)
    const json: SyoboCalResponse[Command] = await response.json()

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
