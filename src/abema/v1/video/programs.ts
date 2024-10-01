import type { Program } from '../../../types/abema/v1/video/programs.js'

import { logger } from '../../../utils/logger.js'

const API_BASE_URL = 'https://api.p-c3-e.abema-tv.com/v1/video/programs/'

export const programs = async (
  id: string,
  token: string
): Promise<Program | null> => {
  const url = new URL(id, API_BASE_URL)

  url.searchParams.set('division', '0')
  url.searchParams.set('include', 'tvod')

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const json: Program = await response.json()

    if (json) {
      return json
    }
  } catch (err) {
    logger.error('abema/v1/video/programs:', err)
  }

  return null
}
