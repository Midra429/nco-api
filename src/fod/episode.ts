import type { Episode } from '../types/fod/episode'

const API_BASE_URL = 'https://i.fod.fujitv.co.jp/apps/api/episode/detail'

export const episode = async (
  id: string,
  token: string
): Promise<Episode | null> => {
  const url = new URL(API_BASE_URL)

  url.searchParams.set('ep_id', id)
  url.searchParams.set('is_premium', 'false')

  try {
    const response = await fetch(url, {
      headers: {
        'X-Authorization': `Bearer ${token}`,
      },
    })
    const json: Episode = await response.json()

    if (json) {
      return json
    }
  } catch (err) {
    console.error('[nco-api/fod/episode]', err)
  }

  return null
}
