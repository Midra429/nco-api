import type {
  EPGv2Response,
  EPGv2Result,
} from '../../types/tver/v1/callEPGv2.js'

import { logger } from '../../utils/logger.js'

const API_BASE_URL = 'https://service-api.tver.jp/api/v1/callEPGv2'

const getCurrentDate = () => {
  const date = new Date()

  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return `${year}/${month}/${day}`
}

export type CallEPGv2Params = {
  date?: string
  area?: string
  type?: 'ota' | 'bs'
}

export const callEPGv2 = async (
  params: CallEPGv2Params
): Promise<EPGv2Result | null> => {
  const url = new URL(API_BASE_URL)

  url.searchParams.set('date', params.date ?? getCurrentDate())
  url.searchParams.set('area', params.area ?? '23')
  url.searchParams.set('type', params.type ?? 'ota')

  try {
    const response = await fetch(url, {
      headers: {
        'x-tver-platform-type': 'web',
      },
    })
    const json: EPGv2Response = await response.json()

    if (json.result) {
      return json.result
    }
  } catch (err) {
    logger.error('tver/v1/callEPGv2:', err)
  }

  return null
}
