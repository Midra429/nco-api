import type {
  VideoResponse,
  VideoResponseOk,
  VideoData,
} from '../types/niconico/video.js'

import { logger } from '../utils/logger.js'

const API_BASE_URL = 'https://www.nicovideo.jp/watch/'

const isResponseOk = (json: VideoResponse): json is VideoResponseOk => {
  return json.meta.status === 200
}

export const video = async (
  contentId: string,
  credentials?: RequestInit['credentials']
): Promise<VideoData | null> => {
  if (/^[a-z]{2}\d+$/.test(contentId)) {
    const url = new URL(contentId, API_BASE_URL)

    url.searchParams.set('responseType', 'json')

    try {
      const response = await fetch(url, {
        mode: 'cors',
        credentials,
      })
      const json: VideoResponse = await response.json()

      if (!isResponseOk(json)) {
        throw new Error(
          `${json.meta.status} ${json.meta.code}: ${json.data.response}`
        )
      }

      return json.data.response
    } catch (err) {
      logger.error('niconico/video:', err)
    }
  }

  return null
}

export const multipleVideo = (
  contentIds: string[],
  credentials?: RequestInit['credentials']
): Promise<(VideoData | null)[]> => {
  return Promise.all(
    contentIds.map((contentId) => video(contentId, credentials))
  )
}
