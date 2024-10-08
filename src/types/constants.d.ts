import type {
  NICONICO_GENRES,
  JIKKYO_CHANNELS_DTV,
  JIKKYO_CHANNELS_BS_CS,
  JIKKYO_CHANNELS,
  SYOBOCAL_CHANNELS,
} from '../constants.js'

/**
 * ニコニコ動画のジャンル
 */
export type NiconicoGenre = (typeof NICONICO_GENRES)[number]

/**
 * ニコニコ実況のチャンネルID (地デジ)
 */
export type JikkyoDtvChannelId = keyof typeof JIKKYO_CHANNELS_DTV

/**
 * ニコニコ実況のチャンネルID (BS, CS)
 */
export type JikkyoBsCsChannelId = keyof typeof JIKKYO_CHANNELS_BS_CS

/**
 * ニコニコ実況のチャンネルID
 */
export type JikkyoChannelId = keyof typeof JIKKYO_CHANNELS

/**
 * しょぼいカレンダーのチャンネルID
 */
export type SyoboCalChannelId = keyof typeof SYOBOCAL_CHANNELS
