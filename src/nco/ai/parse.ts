import type { ParseResult } from '../../types/nco/ai.js'

const API_BASE_URL = 'https://nco.midra.me/api/ai/parse'

export const parse = async (
  input: string,
  userAgent: string
): Promise<ParseResult | null> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'User-Agent': userAgent,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input }),
    })
    const json: ParseResult | null = await response.json()

    return json
  } catch (err) {
    console.error('[nco-api/nco/ai/parse]', err)
  }

  return null
}
