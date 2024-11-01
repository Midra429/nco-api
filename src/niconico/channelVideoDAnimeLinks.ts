import type {
  ChannelVideoDAnimeLinksResponse,
  ChannelVideoDAnimeLinksResponseOk,
} from '../types/niconico/channelVideoDAnimeLinks.js'

import { logger } from '../utils/logger.js'

const API_BASE_URL =
  'https://public-api.ch.nicovideo.jp/v1/user/channelVideoDAnimeLinks'

const isResponseOk = (
  json: ChannelVideoDAnimeLinksResponse
): json is ChannelVideoDAnimeLinksResponseOk => {
  return json.meta.status === 200
}

export const channelVideoDAnimeLinks = async (videoId: string) => {
  const url = new URL(API_BASE_URL)

  url.searchParams.set('videoId', videoId)

  try {
    const response = await fetch(url, {
      headers: {
        'X-Frontend-Id': '6',
      },
      mode: 'cors',
      credentials: 'include',
    })
    const json: ChannelVideoDAnimeLinksResponse = await response.json()

    if (isResponseOk(json)) {
      return json.data.items[0]
    }
  } catch (err) {
    logger.error('niconico/channelVideoDAnimeLinks:', err)
  }

  return null
}
