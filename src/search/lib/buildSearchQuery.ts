import type {
  SearchQuery,
  SearchQueryJsonFilter,
} from '../../types/niconico/search.js'

import { number2kanji } from '@geolonia/japanese-numeral'
import { ncoParser } from '@midra/nco-parser'

import { zeroPadding } from '../../utils/zeroPadding.js'

export type BuildSearchQueryInput = {
  rawText: string
  title?: string | null
  seasonText?: string | null
  seasonNumber?: number | null
  episodeText?: string | null
  episodeNumber?: number | null
  subtitle?: string | null
  duration: number
}

export type BuildSearchQueryOptions = {
  /** 公式 */
  official?: boolean
  /** dアニメ */
  danime?: boolean
  /** dアニメ(分割) */
  chapter?: boolean
  /** コメント専用 */
  szbh?: boolean
  /** User-Agent */
  userAgent?: string
}

export type BuildSearchQueryArgs = {
  input: BuildSearchQueryInput
  options: BuildSearchQueryOptions
}

/**
 * JSONフィルター (公式, dアニメ)
 */
const getJsonFilterOfficial = ({
  input,
  options,
}: BuildSearchQueryArgs): SearchQueryJsonFilter | null => {
  if (!options.official && !options.danime) return null

  const andFilters: SearchQueryJsonFilter[] = [
    {
      type: 'equal',
      field: 'genre.keyword',
      value: 'アニメ',
    },
  ]

  if (input.duration) {
    andFilters.push({
      type: 'range',
      field: 'lengthSeconds',
      from: input.duration - 15,
      to: input.duration + 15,
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
 * JSONフィルター (コメント専用)
 */
const getJsonFilterSzbh = ({
  input,
  options,
}: BuildSearchQueryArgs): SearchQueryJsonFilter | null => {
  if (!options.szbh) return null

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

  if (input.duration) {
    andFilters.push({
      type: 'range',
      field: 'lengthSeconds',
      from: input.duration - 5,
      to: input.duration + 65,
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
 * JSONフィルター (dアニメ(分割))
 */
const getJsonFilterChapter = ({
  options,
}: BuildSearchQueryArgs): SearchQueryJsonFilter | null => {
  if (!options.chapter) return null

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

export const buildSearchQuery = (
  args: BuildSearchQueryArgs
): Pick<
  SearchQuery,
  'q' | 'targets' | 'jsonFilter' | '_sort' | '_limit' | '_context'
> => {
  const { input, options } = args
  let { seasonText, seasonNumber, episodeText, episodeNumber } = input

  input.duration &&= Math.round(input.duration)

  const normalized = ncoParser.normalizeAll(input.rawText, {
    remove: {
      space: false,
    },
  })

  const title =
    input.title &&
    ncoParser.normalizeAll(input.title, {
      remove: {
        space: false,
      },
    })

  const subtitle =
    input.subtitle &&
    ncoParser.normalizeAll(input.subtitle, {
      remove: {
        space: false,
      },
    })

  const keywords: string[] = []

  if (title) {
    keywords.push(title)
  }

  // if (seasonText != null && seasonNumber != null) {
  //   const seasonKansuji =
  //     Number.isInteger(seasonNumber) && number2kanji(seasonNumber)

  //   const seasonKeywords = [
  //     `${seasonNumber}期`,
  //     seasonKansuji && `${seasonKansuji}期`,
  //     `第${seasonNumber}シリーズ`,
  //     seasonKansuji && `第${seasonKansuji}シリーズ`,
  //     `第${seasonNumber}シーズン`,
  //     seasonKansuji && `第${seasonKansuji}シーズン`,
  //     `シーズン${seasonNumber}`,
  //     `season${seasonNumber}`,
  //     `"${seasonNumber}${['st', 'nd', 'rd'][seasonNumber - 1] ?? 'th'} season"`,
  //   ]

  //   if (!/期|シリーズ|シーズン|season/.test(seasonText)) {
  //     seasonKeywords.push(
  //       seasonText.includes(' ') ? `"${seasonText}"` : seasonText
  //     )
  //   }

  //   keywords.push([...new Set(seasonKeywords)].filter(Boolean).join(' OR '))
  // }

  if (episodeText != null && episodeNumber != null) {
    const episodeKansuji =
      Number.isInteger(episodeNumber) && number2kanji(episodeNumber)

    const episodeKeywords = [
      // `${episodeNumber}話`,
      // episodeKansuji && `${episodeKansuji}話`,
      // `エピソード${episodeNumber}`,
      // `episode${episodeNumber}`,
      // `ep${episodeNumber}`,
      // `#${episodeNumber}`,
      // `#${zeroPadding(episodeNumber, 2)}`,
      // episodeText.includes(' ') ? `"${episodeText}"` : episodeText,

      title && !subtitle?.includes(title)
        ? [
            `${episodeNumber}話`,
            episodeKansuji && `${episodeKansuji}話`,
            `エピソード${episodeNumber}`,
            `episode${episodeNumber}`,
            `ep${episodeNumber}`,
            `#${episodeNumber}`,
            `#${zeroPadding(episodeNumber, 2)}`,
            episodeText.includes(' ') ? `"${episodeText}"` : episodeText,

            subtitle && `"${subtitle}"`,
          ]
        : [episodeNumber, episodeKansuji],
    ].flat()

    keywords.push([...new Set(episodeKeywords)].filter(Boolean).join(' OR '))
  }

  /**
   * 検索キーワード
   */
  const q: SearchQuery['q'] = keywords.join(' ') || normalized

  const orFilters: SearchQueryJsonFilter[] = [
    getJsonFilterOfficial(args),
    getJsonFilterSzbh(args),
    getJsonFilterChapter(args),
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
