import type { Title, TitleStage } from '../types/unext/title.js'

import { logger } from '../utils/logger.js'

const API_BASE_URL = 'https://cc.unext.jp'

const query = `query cosmo_getTitle(
  $id: ID!
  $episodeCode: ID!
) {
  webfront_title_stage(id: $id) {
    id
    titleName
    episode(id: $episodeCode) {
      id
      displayNo
      episodeName
      duration
    }
  }
}`

export const title = async (variables: {
  id: string
  episodeCode: string
}): Promise<TitleStage | null> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        operationName: 'cosmo_getTitle',
        query,
        variables,
      }),
    })
    const json: Title = await response.json()

    if (json.data.webfront_title_stage) {
      return json.data.webfront_title_stage
    }
  } catch (err) {
    logger.error('unext/title:', err)
  }

  return null
}
