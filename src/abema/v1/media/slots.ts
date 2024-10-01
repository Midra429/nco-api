import type { Slots, Slot } from '../../../types/abema/v1/media/slots.js'

import { logger } from '../../../utils/logger.js'

const API_BASE_URL = 'https://api.p-c3-e.abema-tv.com/v1/media/slots/'

export const slots = async (
  id: string,
  token: string
): Promise<Slot | null> => {
  const url = new URL(id, API_BASE_URL)

  url.searchParams.set('include', 'payperview')

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const json: Slots = await response.json()

    if (json) {
      return json.slot
    }
  } catch (err) {
    logger.error('abema/v1/media/slots:', err)
  }

  return null
}
