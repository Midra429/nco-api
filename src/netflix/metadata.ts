import type { Metadata, Video } from '../types/netflix/metadata.js'

import { logger } from '../utils/logger.js'

const API_BASE_URL =
  'https://www.netflix.com/nq/website/memberapi/release/metadata'

export const metadata = async (
  movieid: string | number
): Promise<Video | null> => {
  const url = new URL(API_BASE_URL)

  url.searchParams.set('movieid', movieid.toString())
  url.searchParams.set('_', Date.now().toString())

  try {
    const response = await fetch(url)
    const json: Metadata = await response.json()

    if (json.video) {
      return json.video
    }
  } catch (err) {
    logger.error('netflix/metadata:', err)
  }

  return null
}
