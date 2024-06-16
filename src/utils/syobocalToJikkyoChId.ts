import type { JikkyoChannelId, SyoboCalChannelId } from '../types/constants'

import { CHANNEL_IDS_JIKKYO_SYOBOCAL } from '../constants'

export const syobocalToJikkyoChId = (
  scChId: SyoboCalChannelId
): JikkyoChannelId | null => {
  return CHANNEL_IDS_JIKKYO_SYOBOCAL.find((v) => v[1] === scChId)?.[0] ?? null
}
