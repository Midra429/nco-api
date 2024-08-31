import type {
  SearchQuery,
  SearchQueryJsonFilter,
} from '../../types/niconico/search.js'

import { ncoParser } from '@midra/nco-parser'
import { symbol as removeSymbol } from '@midra/nco-parser/normalize/lib/remove/symbol'

import { zeroPadding } from '../../utils/zeroPadding.js'

export type BuildSearchQueryOptions = {
  /** 動画の長さ */
  duration?: number
  /** 未ログイン */
  // guest?: boolean
  /** 通常 / dアニメストア */
  normal?: boolean
  /** コメント専用動画 */
  szbh?: boolean
  /** dアニメストア・分割 (ログイン必須) */
  chapter?: boolean
  /** User-Agent */
  userAgent?: string
}

/**
 * JSONフィルター (通常 / dアニメストア)
 */
const getJsonFilterNormal = ({
  duration,
  // guest,
  normal,
}: BuildSearchQueryOptions): SearchQueryJsonFilter | null => {
  if (!normal) return null

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

  // if (guest) {
  //   andFilters.push({
  //     type: 'not',
  //     filter: {
  //       type: 'equal',
  //       field: 'tagsExact',
  //       value: 'dアニメストア',
  //     },
  //   })
  // }

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
  // guest,
  chapter,
}: BuildSearchQueryOptions): SearchQueryJsonFilter | null => {
  if (!chapter) return null

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
  rawText,
  ...options
}: { rawText: string } & BuildSearchQueryOptions): Pick<
  SearchQuery,
  'q' | 'targets' | 'jsonFilter' | '_sort' | '_limit' | '_context'
> => {
  options.duration &&= Math.round(options.duration)

  const extracted = ncoParser.extract(rawText)
  const { season, episode } = extracted
  let { normalized, title, subtitle } = extracted

  normalized = removeSymbol(normalized)
  title &&= removeSymbol(title)
  subtitle &&= removeSymbol(subtitle)

  const keywords: string[] = []

  if (title) {
    keywords.push(title)
  }

  // if (season) {
  //   const { number, kansuji, text } = season

  //   const seasonKeywords = [
  //     `${number}期`,
  //     kansuji && `${kansuji}期`,
  //     `第${number}シリーズ`,
  //     kansuji && `第${kansuji}シリーズ`,
  //     `第${number}シーズン`,
  //     kansuji && `第${kansuji}シーズン`,
  //     `シーズン${number}`,
  //     `season${number}`,
  //     `"${number}${['st', 'nd', 'rd'][number - 1] ?? 'th'} season"`,
  //   ]

  //   if (!/期|シリーズ|シーズン|season/.test(text)) {
  //     seasonKeywords.push(text.includes(' ') ? `"${text}"` : text)
  //   }

  //   keywords.push([...new Set(seasonKeywords)].filter(Boolean).join(' OR '))
  // }

  if (episode) {
    const { text, number, kansuji } = episode

    const episodeKeywords = [
      `${number}話`,
      kansuji && `${kansuji}話`,
      `エピソード${number}`,
      `episode${number}`,
      `ep${number}`,
      `#${number}`,
      `#${zeroPadding(number, 2)}`,
      text.includes(' ') ? `"${text}"` : text,
      // subtitle && `"${subtitle}"`,
    ]

    keywords.push([...new Set(episodeKeywords)].filter(Boolean).join(' OR '))
  }

  /**
   * 検索キーワード
   */
  const q: SearchQuery['q'] = keywords.join(' ') || normalized

  const orFilters: SearchQueryJsonFilter[] = [
    getJsonFilterNormal(options),
    getJsonFilterSzbh(options),
    getJsonFilterChapter(options),
  ].filter((v) => v !== null)

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
    _limit: 50,
    _context: options.userAgent || 'nco-api',
  }
}
