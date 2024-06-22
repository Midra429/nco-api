import type { Part, PartData } from '../types/danime/part'

const API_BASE_URL = 'https://animestore.docomo.ne.jp/animestore/rest/WS010105'

export const part = async (partId: string): Promise<PartData | null> => {
  const url = new URL(API_BASE_URL)

  url.searchParams.set('viewType', '5')
  url.searchParams.set('partId', partId)

  try {
    const response = await fetch(url)
    const json: Part = await response.json()

    if (json.data) {
      return json.data
    }
  } catch (err) {
    console.error('[nco-api/danime/part]', err)
  }

  return null
}
