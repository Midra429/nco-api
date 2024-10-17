import type { JikkyoChannelId, TVerChannelId } from '../types/constants.js'

import { CHANNEL_IDS_JIKKYO_TVER } from '../constants.js'

export const tverToJikkyoChId = (
  tverChId: TVerChannelId
): JikkyoChannelId | null => {
  return CHANNEL_IDS_JIKKYO_TVER.find((v) => v[1] === tverChId)?.[0] ?? null
}
