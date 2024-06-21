import type { JikkyoChannelId } from '../types/constants'
import type {
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

/**
 * コマンド付きコメント判定
 */
const isCommentWithCommand = (cmt: string) => /\/[a-z]+ /.test(cmt)

export const kakolog = async <
  Format extends JikkyoKakologFormat,
  Result extends
    | (Compat extends true ? V1Thread : never)
    | (Compat extends false ? JikkyoKakologResponseOk<Format> : never),
  Compat extends boolean = false
>(
  jkChId: JikkyoChannelId,
  params: JikkyoKakologParams<Format>,
  options?: {
    compatV1Thread?: Compat
    useragent?: string
  }
): Promise<Result | null> => {
  if (params.starttime < params.endtime) {
    const url = new URL(jkChId, API_BASE_URL)

    const starttime =
      params.starttime instanceof Date
        ? params.starttime.getTime() / 1000
        : params.starttime
    const endtime =
      params.endtime instanceof Date
        ? params.endtime.getTime() / 1000
        : params.endtime
    const format = options?.compatV1Thread ? 'json' : params.format

    url.searchParams.set('starttime', starttime.toString())
    url.searchParams.set('endtime', endtime.toString())
    url.searchParams.set('format', format)

    const headers = new Headers()

    if (options?.useragent) {
      headers.set('User-Agent', options.useragent)
    }

    try {
      const response = await fetch(url, { headers })

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

          if (options?.compatV1Thread) {
            const starttime_ms = starttime * 1000

            const comments: V1Thread['comments'] = json.packet.flatMap(
              ({ chat }, idx) => {
                if (isCommentWithCommand(chat.content)) {
                  return []
                }

                const date_ms = Math.trunc(
                  parseInt(chat.date) * 1000 +
                    (chat.date_usec ? parseInt(chat.date_usec) / 1000 : 0)
                )
                const vposMs = date_ms - starttime_ms

                return {
                  id: `${chat.thread}:${chat.no}`,
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
              id: `${jkChId}:${starttime}-${endtime}`,
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
