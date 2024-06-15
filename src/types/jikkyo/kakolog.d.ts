import type {
  JIKKYO_CHANNELS_DTV,
  JIKKYO_CHANNELS_BS_CS,
  JIKKYO_CHANNELS,
} from '../../constants'

/**
 * 実況ID (地デジ)
 */
export type JikkyoDtvId = keyof typeof JIKKYO_CHANNELS_DTV

/**
 * 実況ID (BS, CS)
 */
export type JikkyoBsCsId = keyof typeof JIKKYO_CHANNELS_BS_CS

/**
 * 実況ID
 */
export type JikkyoId = keyof typeof JIKKYO_CHANNELS

/**
 * レスポンスのフォーマット
 */
export type JikkyoKakologFormat = 'xml' | 'json'

/**
 * パラメータ
 */
export type JikkyoKakologParams<Format extends JikkyoKakologFormat> = {
  starttime: number
  endtime: number
  format: Format
}

/**
 * コメントデータ
 */
export type JikkyoKakologChatData = {
  /**
   * コメントのスレッド ID
   */
  thread: string

  /**
   * コメント番号（コメ番）
   */
  no: string

  /**
   * スレッド ID から起算したコメントの再生位置
   * @description 1/100秒
   */
  vpos: string

  /**
   * コメント投稿時間の UNIX タイムスタンプ
   */
  date: string

  /**
   * コメント投稿時間の小数点以下の時間
   * @description コメント投稿時間の正確なタイムスタンプは\
   * date: 1606431600・date_usec: 257855 なら 1606431600.257855 のようになる
   */
  date_usec: string

  /**
   * ユーザー ID
   * @description コマンドに 184 が指定されている場合は匿名化される
   */
  user_id: string

  /**
   * コメントのコマンド
   * @description 184, red naka big など
   */
  mail: string

  /**
   * コメントしたユーザーがプレミアム会員であれば 1
   */
  premium?: '1'

  /**
   * 匿名コメントであれば 1
   */
  anonymity?: '1'

  /**
   * コメント本文
   * @description AA など、まれに複数行コメントがあるので注意
   */
  content: string
}

export type JikkyoKakologResponseJsonOk = {
  packet: {
    chat: JikkyoKakologChatData
  }[]
}

export type JikkyoKakologResponseJsonError = {
  error: string
}

export type JikkyoKakologResponseOk<Format extends JikkyoKakologFormat> =
  | (Format extends 'xml' ? string : never)
  | (Format extends 'json' ? JikkyoKakologResponseJsonOk : never)

export type JikkyoKakologResponseError<Format extends JikkyoKakologFormat> =
  | (Format extends 'xml' ? undefined : never)
  | (Format extends 'json' ? JikkyoKakologResponseJsonError : never)

export type JikkyoKakologResponse<Format extends JikkyoKakologFormat> =
  | JikkyoKakologResponseOk<Format>
  | JikkyoKakologResponseError<Format>
