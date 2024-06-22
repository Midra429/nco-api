import type { Program } from '../types/abema/program'

const API_BASE_URL = 'https://api.p-c3-e.abema-tv.com/v1/video/programs/'

export const program = async (id: string) => {
  const token = localStorage.getItem('abm_token')

  if (token) {
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

      if (!json) {
        throw new Error(`${response.status} ${response.statusText}`)
      }

      return json
    } catch (err) {
      console.error('[nco-api/abema/program]', err)
    }
  }

  return null
}
