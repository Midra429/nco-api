import type {
  JikkyoId,
  JikkyoKakologFormat,
  JikkyoKakologParams,
  JikkyoKakologResponse,
  JikkyoKakologResponseOk,
} from '../types/jikkyo/kakolog'

const API_BASE_URL = 'https://jikkyo.tsukumijima.net/api/kakolog/'

const isResponseJsonOk = (
  json: JikkyoKakologResponse<'json'>
): json is JikkyoKakologResponseOk<'json'> => {
  return 'packet' in json && !('error' in json)
}

export const kakolog = async <Format extends JikkyoKakologFormat>(
  jikkyoId: JikkyoId,
  params: JikkyoKakologParams<Format>
): Promise<JikkyoKakologResponseOk<Format> | null> => {
  if (params.starttime < params.endtime) {
    const url = new URL(jikkyoId, API_BASE_URL)

    url.searchParams.set('starttime', params.starttime.toString())
    url.searchParams.set('endtime', params.endtime.toString())
    url.searchParams.set('format', params.format)

    try {
      const response = await fetch(url)

      switch (params.format) {
        case 'xml': {
          const xml: JikkyoKakologResponse<'xml'> = await response.text()

          if (!xml) {
            throw new Error(`${response.status} ${response.statusText}`)
          }

          return xml as JikkyoKakologResponseOk<Format>
        }
        case 'json': {
          const json: JikkyoKakologResponse<'json'> = await response.json()

          if (!isResponseJsonOk(json)) {
            throw new Error(
              `${response.status} ${response.statusText}: ${json.error}`
            )
          }

          return json as JikkyoKakologResponseOk<Format>
        }
      }
    } catch (err) {
      console.error('[nco-api/jikkyo/kakolog]', err)
    }
  }

  return null
}
