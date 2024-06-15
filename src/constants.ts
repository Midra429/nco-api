/** dアニメストア ニコニコ支店のチャンネルID */
export const DANIME_CHANNEL_ID = 2632720

/**
 * ニコニコ実況のチャンネル一覧 (地デジ)
 */
export const JIKKYO_CHANNELS_DTV = {
  jk1: 'NHK総合',
  jk2: 'NHK Eテレ',
  jk4: '日本テレビ',
  jk5: 'テレビ朝日',
  jk6: 'TBSテレビ',
  jk7: 'テレビ東京',
  jk8: 'フジテレビ',
  jk9: 'TOKYO MX',
  jk10: 'テレ玉',
  jk11: 'tvk',
  jk12: 'チバテレビ',
} as const

/**
 * ニコニコ実況のチャンネル一覧 (BS, CS)
 */
export const JIKKYO_CHANNELS_BS_CS = {
  jk101: 'NHK BS1',
  jk103: 'NHK BSプレミアム',
  jk141: 'BS日テレ',
  jk151: 'BS朝日',
  jk161: 'BS-TBS',
  jk171: 'BSテレ東',
  jk181: 'BSフジ',
  jk191: 'WOWOW PRIME',
  jk192: 'WOWOW LIVE',
  jk193: 'WOWOW CINEMA',
  jk211: 'BS11',
  jk222: 'BS12 トゥエルビ',
  jk236: 'BSアニマックス',
  jk252: 'WOWOW PLUS',
  jk260: 'BS松竹東急',
  jk263: 'BSJapanext',
  jk265: 'BSよしもと',
  jk333: 'AT-X',
} as const

/**
 * ニコニコ実況のチャンネル一覧
 */
export const JIKKYO_CHANNELS = {
  ...JIKKYO_CHANNELS_DTV,
  ...JIKKYO_CHANNELS_BS_CS,
} as const
