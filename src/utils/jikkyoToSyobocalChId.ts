import type { JikkyoChannelId, SyoboCalChannelId } from '../types/constants.js'

import { CHANNEL_IDS_JIKKYO_SYOBOCAL } from '../constants.js'

export const jikkyoToSyobocalChId = (
  jkChId: JikkyoChannelId
): SyoboCalChannelId | null => {
  return CHANNEL_IDS_JIKKYO_SYOBOCAL.find((v) => v[0] === jkChId)?.[1] ?? null
}
