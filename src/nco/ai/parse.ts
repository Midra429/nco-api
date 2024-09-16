import type { ParseResult } from '../../types/nco/ai.js'

import { logger } from '../../utils/logger.js'

const API_BASE_URL = 'https://nco.midra.me/api/ai/parse'

export const parse = async (
  input: string,
  userAgent: string
): Promise<ParseResult | null> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'X-User-Agent': userAgent,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input }),
    })

    if (response.ok) {
      const json: ParseResult | null = await response.json()

      return json
    }
  } catch (err) {
    logger.error('nco/ai/parse:', err)
  }

  return null
}
