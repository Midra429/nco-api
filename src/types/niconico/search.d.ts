import type { NICONICO_GENRES } from '../../constants.js'

/**
 * スナップショット検索API v2
 * @see https://site.nicovideo.jp/search-api-docs/snapshot
 */

/**
 * フィールド
 */
export type SearchFields = {
  /**
   * コンテンツID。\
   * `https://nico.ms/`の後に連結することでコンテンツへのURLになります。
   */
  'contentId': string

  /** タイトル */
  'title': string

  /** コンテンツの説明文。 */
  'description': string

  /** ユーザー投稿動画の場合、投稿者のユーザーID */
  'userId': number

  /** チャンネル動画の場合、チャンネルID */
  'channelId': number

  /** 再生数 */
  'viewCounter': number

  /** マイリスト数またはお気に入り数。 */
  'mylistCounter': number

  /** いいね！数 */
  'likeCounter': number

  /** 再生時間(秒) */
  'lengthSeconds': number

  /** サムネイルのURL */
  'thumbnailUrl': string

  /** コンテンツの投稿時間。 */
  'startTime': string

  /** 最新のコメント */
  'lastResBody': string

  /** コメント数 */
  'commentCounter': number

  /** 最終コメント時間 */
  'lastCommentTime': number

  /** カテゴリタグ */
  'categoryTags': string

  /** タグ(空白区切り) */
  'tags': string

  /** タグ完全一致(空白区切り) */
  'tagsExact': string

  /** ジャンル */
  'genre': string

  /** ジャンル完全一致 */
  'genre.keyword': (typeof NICONICO_GENRES)[number]
}

export type SearchFieldKey = keyof SearchFields

export type SearchQueryFieldKey = Exclude<
  SearchFieldKey,
  'tagsExact' | 'genre.keyword'
>

export type SearchQueryFiltersKey = Exclude<
  SearchFieldKey,
  | 'title'
  | 'description'
  | 'userId'
  | 'channelId'
  | 'thumbnailUrl'
  | 'lastResBody'
>

export type SearchQuerySortKey = Extract<
  SearchFieldKey,
  `${string}${'Counter' | 'Seconds' | 'Time'}`
>

export type SearchQuerySort = `${'-' | '+'}${SearchQuerySortKey}`

/**
 * クエリパラメータ
 */
export type SearchQuery<FieldKey extends SearchQueryFieldKey = never> = {
  /**
   * 検索キーワードです。
   * @example 'ゲーム'
   */
  q: string

  /**
   * 検索対象のフィールドです。\
   * キーワード検索の場合、`['title', 'description', 'tags']`を指定してください。\
   * タグ検索（キーワードに完全一致するタグがあるコンテンツをヒット）の場合、`['tagsExact']`を指定してください。\
   * キーワード無し検索の場合は省略できます。
   * @example ['title', 'description', 'tags']
   */
  targets?: SearchFieldKey[]

  /**
   * レスポンスに含みたいヒットしたコンテンツのフィールドです。
   * @example ['contentId', 'title', 'description', 'tags']
   */
  fields?: FieldKey[]

  /**
   * 検索結果をフィルタの条件にマッチするコンテンツだけに絞ります。
   */
  filters?: SearchQueryFilters

  /**
   * OR や AND の入れ子など複雑なフィルター条件を使う場合のみに使用します。\
   * OR / AND / NOT 単体で使用する場合は`filters`を使ってください。
   */
  jsonFilter?: SearchQueryJsonFilter

  /**
   * ソート順をソートの方向の記号とフィールド名を連結したもので指定します。\
   * ソートの方向は昇順または降順かを`'+'`か`'-'`で指定してください。
   */
  _sort: SearchQuerySort

  /**
   * 返ってくるコンテンツの取得オフセット。最大:100,000
   * @default 0
   * @example 10
   */
  _offset?: number

  /**
   * 返ってくるコンテンツの最大数。最大:100
   * @default 10
   * @example 10
   */
  _limit?: number

  /**
   * サービスまたはアプリケーション名。最大:40文字
   * @example 'apiguide'
   */
  _context: string
}

/**
 * フィルター
 */
export type SearchQueryFilters = {
  [key in SearchQueryFiltersKey]?:
    | SearchFields[key][]
    | {
        /** `gt <` (超過) */
        gt?: SearchFields[key]
        /** `< lt` (未満) */
        lt?: SearchFields[key]
        /** `gte <=` (以上) */
        gte?: SearchFields[key]
        /** `<= lte` (以下) */
        lte?: SearchFields[key]
      }
}

/**
 * JSONフィルター
 */
export type SearchQueryJsonFilter =
  | {
      [key in SearchQueryFiltersKey]:
        | {
            type: 'equal'

            /** 対象にしたいフィールド */
            field: key

            /** 対象にしたい値 */
            value: SearchFields[key]
          }
        | {
            type: 'range'

            /** 対象にしたいフィールド */
            field: key

            /** 範囲の始点の値 */
            from: SearchFields[key]

            /** 範囲の終点の値 */
            to: SearchFields[key]

            /** `from`の値を範囲に含めるか */
            include_lower?: boolean

            /** `to`の値を範囲に含めるか */
            include_upper?: boolean
          }
    }[SearchQueryFiltersKey]
  | {
      type: 'or' | 'and'

      /** JSONフィルターの配列 */
      filters: SearchQueryJsonFilter[]
    }
  | {
      type: 'not'

      /** JSONフィルター */
      filter: SearchQueryJsonFilter
    }

/**
 * レスポンス
 */
export type SearchResponse<FieldKey extends SearchQueryFieldKey = never> =
  | SearchResponseOk<FieldKey>
  | SearchResponseError

/**
 * レスポンス (成功)
 */
export type SearchResponseOk<FieldKey extends SearchQueryFieldKey = never> = {
  /**
   * レスポンスのメタ情報フィールド
   */
  meta: {
    /** HTTPステータス */
    status: 200

    /** リクエストID */
    id: string

    /** ヒット件数 */
    totalCount: number
  }

  /**
   * ヒットしたコンテンツ。\
   * 要素の内容はパラメータ`fields`によって異なります
   */
  data: SearchData<FieldKey>[]
}

/**
 * レスポンス (エラー)
 */
export type SearchResponseError = {
  /**
   * レスポンスのメタ情報フィールド
   */
  meta: {
    /** HTTPステータス */
    status: number

    /** エラーコード */
    errorCode: string

    /** エラー内容 */
    errorMessage: string
  }
}

/**
 * コンテンツ
 */
export type SearchData<FieldKey extends SearchQueryFieldKey = never> = {
  [key in FieldKey]: key extends
    | 'userId'
    | 'channelId'
    | 'lastResBody'
    | 'lastCommentTime'
    | 'categoryTags'
    | 'tags'
    | 'genre'
    ? SearchFields[key] | null
    : SearchFields[key]
}
