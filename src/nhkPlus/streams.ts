import type { NhkAreaId } from '../types/constants.js'
import type {
  StreamsResponse,
  Body as StreamBody,
} from '../types/nhkPlus/streams.js'

import { logger } from '../utils/logger.js'

const API_BASE_URL = 'https://api-plus.nhk.jp/r5/pl2/streams/4/'

export const streams = async (
  streamId: string,
  areaId?: NhkAreaId
): Promise<StreamBody | null> => {
  const url = new URL(streamId, API_BASE_URL)

  url.searchParams.set('area_id', areaId ?? '130')

  try {
    const response = await fetch(url)
    const json: StreamsResponse = await response.json()

    if (json.body[0]) {
      return json.body[0]
    }
  } catch (err) {
    logger.error('nhkPlus/streams:', err)
  }

  return null
}
