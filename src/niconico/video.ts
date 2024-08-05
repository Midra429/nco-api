import type {
  VideoResponse,
  VideoResponseOk,
  VideoData,
} from '../types/niconico/video.js'

const API_BASE_URL = 'https://www.nicovideo.jp/watch/'
// const API_BASE_URL = 'https://www.nicovideo.jp/api/watch/v3/'
// const API_BASE_URL_GUEST = 'https://www.nicovideo.jp/api/watch/v3_guest/'

const isResponseOk = (json: VideoResponse): json is VideoResponseOk => {
  return json.meta.status === 200
}

// const genId = (len: number = 10): string => {
//   const alphanumeric =
//     '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

//   return [...Array(len)]
//     .map(() => alphanumeric[~~(Math.random() * alphanumeric.length)])
//     .join('')
// }

export const video = async (
  contentId: string
  // guest: boolean = false
): Promise<VideoData | null> => {
  if (/^[a-z]{2}\d+$/.test(contentId)) {
    const url = new URL(contentId, API_BASE_URL)

    url.searchParams.set('responseType', 'json')

    // const time = Date.now().toString()
    // const actionTrackId = `${genId()}_${time}`

    // url.searchParams.set('t', time)
    // url.searchParams.set('actionTrackId', actionTrackId)

    try {
      const response = await fetch(url, {
        // headers: {
        //   'X-Frontend-Id': '6',
        //   'X-Frontend-Version': '0',
        // },
      })
      const json: VideoResponse = await response.json()

      if (!isResponseOk(json)) {
        throw new Error(
          `${json.meta.status} ${json.meta.code}: ${json.data.response}`
        )
      }

      return json.data.response
    } catch (err) {
      console.error('[nco-api/niconico/video]', err)
    }
  }

  return null
}

export const multipleVideo = (
  contentIds: string[]
  // guest: boolean = false
): Promise<(VideoData | null)[]> => {
  return Promise.all(contentIds.map((contentId) => video(contentId)))
}
