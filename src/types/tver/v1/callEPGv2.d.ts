import type { TVerChannelId } from '../../constants.js'

export type EPGv2Response = {
  api_version: string
  code: number
  message: string
  type: string
  result: EPGv2Result
}

export type EPGv2Result = {
  date: string
  area: string
  type: 'ota' | 'bs'
  contents: Content[]
  genreColor: GenreColor[]
  allowViewDate: string[]
}

export type Content = {
  broadcaster: Broadcaster
  programs: Program[]
}

export type Broadcaster = {
  id: TVerChannelId
  name: string
  label: string
}

export type Program = {
  seriesTitle: string
  title: string
  startAt: number
  endAt: number
  genre: Genre
  icon: Icon
  seriesID?: string
  liveEpisodeID?: string
}

export type Genre =
  | ''
  | '0x0' // ニュース／報道
  | '0x1' // スポーツ
  | '0x2' // 情報／ワイドショー
  | '0x3' // ドラマ
  | '0x4' // 音楽
  | '0x5' // バラエティ
  | '0x6' // 映画
  | '0x7' // アニメ／特撮
  | '0x8' // ドキュメンタリー／教養
  | '0x9' // 劇場／公演
  | '0xA' // 趣味／教育
  | '0xB' // 福祉
  | '0xC' //
  | '0xD' //
  | '0xE' //
  | '0xF' // その他

export type Icon = {
  /** 新番組 */
  new: boolean
  /** 再放送 */
  revival: boolean
  /** 最終回 */
  last: boolean
}

export type GenreColor = {
  genre: Genre
  name: string
  color: string
}
