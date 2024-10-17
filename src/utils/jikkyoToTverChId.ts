import type { JikkyoChannelId, TVerChannelId } from '../types/constants.js'

import { CHANNEL_IDS_JIKKYO_TVER } from '../constants.js'

export const jikkyoToTverChId = (
  jkChId: JikkyoChannelId
): TVerChannelId | null => {
  return CHANNEL_IDS_JIKKYO_TVER.find((v) => v[0] === jkChId)?.[1] ?? null
}
