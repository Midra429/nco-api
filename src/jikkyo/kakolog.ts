import type {
  JikkyoId,
  JikkyoKakologFormat,
  JikkyoKakologParams,
  JikkyoKakologResponse,
  JikkyoKakologResponseOk,
} from '../types/jikkyo/kakolog'
import type { V1Thread } from '@xpadev-net/niconicomments'
import { toISOStringTz } from '../utils/toISOStringTz'

const API_BASE_URL = 'https://jikkyo.tsukumijima.net/api/kakolog/'

const isResponseJsonOk = (
  json: JikkyoKakologResponse<'json'>
): json is JikkyoKakologResponseOk<'json'> => {
  return 'packet' in json && !('error' in json)
}

export const kakolog = async <
  Format extends JikkyoKakologFormat,
  Result extends
    | (Compat extends true ? V1Thread : never)
    | (Compat extends false ? JikkyoKakologResponseOk<Format> : never),
  Compat extends boolean = false
>(
  jikkyoId: JikkyoId,
  params: JikkyoKakologParams<Format>,
  compatV1Thread?: Compat
): Promise<Result | null> => {
  if (params.starttime < params.endtime) {
    const url = new URL(jikkyoId, API_BASE_URL)

    const starttime =
      params.starttime instanceof Date
        ? params.starttime.getTime() / 1000
        : params.starttime
    const endtime =
      params.endtime instanceof Date
        ? params.endtime.getTime() / 1000
        : params.endtime
    const format = compatV1Thread ? 'json' : params.format

    url.searchParams.set('starttime', starttime.toString())
    url.searchParams.set('endtime', endtime.toString())
    url.searchParams.set('format', format)

    try {
      const response = await fetch(url)

      switch (format) {
        case 'xml': {
          const xml: JikkyoKakologResponse<'xml'> = await response.text()

          if (!xml) {
            throw new Error(`${response.status} ${response.statusText}`)
          }

          return xml as Result
        }
        case 'json': {
          const json: JikkyoKakologResponse<'json'> = await response.json()

          if (!isResponseJsonOk(json)) {
            throw new Error(
              `${response.status} ${response.statusText}: ${json.error}`
            )
          }

          if (compatV1Thread) {
            const starttime_ms = starttime * 1000

            const comments: V1Thread['comments'] = json.packet.map(
              ({ chat }, idx) => {
                const date_ms = Math.trunc(
                  parseInt(chat.date) * 1000 + parseInt(chat.date_usec) / 1000
                )
                const vposMs = date_ms - starttime_ms

                return {
                  id: chat.thread,
                  no: idx + 1,
                  vposMs: vposMs,
                  body: chat.content,
                  commands: chat.mail?.split(' ') ?? [],
                  userId: chat.user_id,
                  isPremium: chat.premium === '1',
                  score: 0,
                  postedAt: toISOStringTz(new Date(date_ms)),
                  nicoruCount: 0,
                  nicoruId: null,
                  source: 'truck',
                  isMyPost: false,
                }
              }
            )

            const v1Thread: V1Thread = {
              id: `jikkyo-${starttime}-${endtime}`,
              fork: 'jikkyo',
              commentCount: comments.length,
              comments,
            }

            return v1Thread as Result
          } else {
            return json as Result
          }
        }
      }
    } catch (err) {
      console.error('[nco-api/jikkyo/kakolog]', err)
    }
  }

  return null
}
