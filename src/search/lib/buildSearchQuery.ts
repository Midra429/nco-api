import type {
  SearchQuery,
  SearchQueryJsonFilter,
} from '../../types/niconico/search.js'

import { ncoParser } from '@midra/nco-parser'
import { symbol as removeSymbol } from '@midra/nco-parser/normalize/lib/remove/symbol'

export type BuildSearchQueryOptions = {
  /** 動画の長さ */
  duration?: number
  /** 未ログイン */
  guest?: boolean
  /** dアニメストア・分割 (ログイン必須) */
  chapter?: boolean
  /** コメント専用動画 */
  szbh?: boolean
  /** User-Agent */
  userAgent?: string
}

/**
 * JSONフィルター (通常)
 */
const getJsonFilterNormal = ({
  duration,
  guest,
}: BuildSearchQueryOptions): SearchQueryJsonFilter => {
  const andFilters: SearchQueryJsonFilter[] = [
    {
      type: 'equal',
      field: 'genre.keyword',
      value: 'アニメ',
    },
  ]

  if (duration) {
    andFilters.push({
      type: 'range',
      field: 'lengthSeconds',
      from: duration - 15,
      to: duration + 15,
      include_lower: true,
      include_upper: true,
    })
  }

  if (guest) {
    andFilters.push({
      type: 'not',
      filter: {
        type: 'equal',
        field: 'tagsExact',
        value: 'dアニメストア',
      },
    })
  }

  return 1 < andFilters.length
    ? {
        type: 'and',
        filters: andFilters,
      }
    : andFilters[0]
}

/**
 * JSONフィルター (コメント専用動画)
 */
const getJsonFilterSzbh = ({
  duration,
  szbh,
}: BuildSearchQueryOptions): SearchQueryJsonFilter | null => {
  if (!szbh) return null

  const andFilters: SearchQueryJsonFilter[] = [
    {
      type: 'or',
      filters: [
        {
          type: 'equal',
          field: 'tagsExact',
          value: 'コメント専用動画',
        },
        {
          type: 'equal',
          field: 'tagsExact',
          value: 'SZBH方式',
        },
      ],
    },
  ]

  if (duration) {
    andFilters.push({
      type: 'range',
      field: 'lengthSeconds',
      from: duration - 5,
      to: duration + 65,
      include_lower: true,
      include_upper: true,
    })
  }

  return 1 < andFilters.length
    ? {
        type: 'and',
        filters: andFilters,
      }
    : andFilters[0]
}

/**
 * JSONフィルター (dアニメストア・分割)
 */
const getJsonFilterChapter = ({
  guest,
  chapter,
}: BuildSearchQueryOptions): SearchQueryJsonFilter | null => {
  if (guest || !chapter) return null

  return {
    type: 'and',
    filters: [
      {
        type: 'equal',
        field: 'genre.keyword',
        value: 'アニメ',
      },
      {
        type: 'equal',
        field: 'tagsExact',
        value: 'dアニメストア',
      },
    ],
  }
}

export const buildSearchQuery = ({
  title,
  ...options
}: { title: string } & BuildSearchQueryOptions): Pick<
  SearchQuery,
  'q' | 'targets' | 'jsonFilter' | '_sort' | '_limit' | '_context'
> => {
  options.duration &&= Math.round(options.duration)

  const extracted = ncoParser.extract(title)
  const { season, episode } = extracted
  let { normalized, workTitle, subTitle } = extracted

  normalized = removeSymbol(normalized)
  workTitle &&= removeSymbol(workTitle)
  subTitle &&= removeSymbol(subTitle)

  const keywords: string[] = []

  if (workTitle) {
    keywords.push(workTitle)
  }

  if (season) {
    const { number, kansuji } = season

    keywords.push(
      [
        `${number}期`,
        `${kansuji}期`,
        `第${number}シリーズ`,
        `第${kansuji}シリーズ`,
        `第${number}シーズン`,
        `第${kansuji}シーズン`,
        `シーズン${number}`,
        `season${number}`,
        `"${number}${['st', 'nd', 'rd'][number - 1] ?? 'th'} season"`,
      ].join(' OR ')
    )
  }

  if (episode) {
    const { number, kansuji } = episode

    keywords.push(
      [
        `${number}話`,
        `${kansuji}話`,
        `エピソード${number}`,
        `episode${number}`,
        `ep${number}`,
        `#${number}`,
        `"${subTitle}"`,
      ]
        .flatMap((v) => v || [])
        .join(' OR ')
    )
  }

  /**
   * 検索キーワード
   */
  const q: SearchQuery['q'] = keywords.join(' ') || normalized

  const orFilters: SearchQueryJsonFilter[] = [
    getJsonFilterNormal(options),
    getJsonFilterSzbh(options),
    getJsonFilterChapter(options),
  ].flatMap((v) => v || [])

  /**
   * JSONフィルター
   */
  const jsonFilter: SearchQuery['jsonFilter'] =
    1 < orFilters.length
      ? {
          type: 'or',
          filters: orFilters,
        }
      : orFilters[0]

  return {
    q,
    targets: ['title'],
    jsonFilter,
    _sort: '-startTime',
    _limit: 20,
    _context: options.userAgent || 'nco-api',
  }
}
