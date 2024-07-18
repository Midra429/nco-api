import type { Episode } from '../types/fod/episode'

import { getCookie } from '../utils/getCookie'

const API_BASE_URL = 'https://i.fod.fujitv.co.jp/apps/api/episode/detail'

export const episode = async (id: string): Promise<Episode | null> => {
  const token = getCookie('CT')

  if (token) {
    const url = new URL(API_BASE_URL)

    url.searchParams.set('ep_id', id)
    url.searchParams.set('is_premium', 'false')
    url.searchParams.set('dv_type', 'web')

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
  }

  return null
}
