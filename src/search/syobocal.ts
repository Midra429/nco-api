import type { SyoboCalChannelId } from '../types/constants.js'

import { ncoParser } from '@midra/nco-parser'
import { similarity } from '@midra/nco-parser/utils/similarity'

import { CHANNEL_IDS_JIKKYO_SYOBOCAL } from '../constants.js'

import { json as syobocalJson } from '../syobocal/index.js'

const normalizeScTitle = (title: string) => {
  return title.replace(/\(第?[2-9](nd|rd|th)?クール\)$/g, '')
}

export const syobocal = async (
  input: {
    title?: string | null
    seasonNumber?: number | null
    episodeNumber?: number | null
    subtitle?: string | null
  },
  options: {
    channelIds?: SyoboCalChannelId[]
    userAgent?: string
  } = {}
) => {
  const { title, seasonNumber, episodeNumber, subtitle } = input
  const { channelIds, userAgent } = options

  if (!title || episodeNumber == null) {
    return null
  }

  const searchWord = ncoParser.normalizeAll(
    // ローマ数字削除
    title.replace(/[\u2160-\u217f]/g, ''),
    {
      adjust: {
        letterCase: 'upper',
      },
      remove: {
        space: false,
      },
    }
  )

  // 検索
  const searchResponse = await syobocalJson(
    ['TitleSearch'],
    {
      Search: searchWord,
      Limit: 15,
    },
    { userAgent }
  )

  if (!searchResponse) {
    return null
  }

  // 検索結果を軽くフィルタ
  const searchResultTitles = Object.values(searchResponse.Titles)

  const searchResults: typeof searchResultTitles = []
  const searchResultsPartial: typeof searchResultTitles = []

  const workTitleNormalized = ncoParser.normalize(title, {
    remove: {
      bracket: true,
    },
  })

  searchResultTitles.forEach((val) => {
    const { normalized: scNormalized, title: scTitle } = ncoParser.extract(
      normalizeScTitle(val.Title)
    )

    if (
      // タイトルが一致
      ncoParser.compare(title, scNormalized) ||
      // 作品名が一致
      (scTitle && ncoParser.compare(title, scTitle))
    ) {
      searchResults.push(val)

      return
    }

    if (
      // タイトルが一致 (一部)
      scNormalized.includes(workTitleNormalized) ||
      workTitleNormalized.includes(scNormalized)
    ) {
      searchResultsPartial.push(val)

      return
    }
  })

  const searchResultsAll = [...searchResults, ...searchResultsPartial]

  if (!searchResultsAll.length) {
    return null
  }

  // サブタイトルと放送情報を取得
  const { SubTitles, Programs } =
    (await syobocalJson(
      ['SubTitles', 'ProgramByCount'],
      {
        TID: searchResultsAll.map((v) => v.TID),
        Count: episodeNumber,
        ChID: channelIds ?? CHANNEL_IDS_JIKKYO_SYOBOCAL.map((v) => v[1]),
      },
      { userAgent }
    )) ?? {}

  if (!Programs) {
    return null
  }

  let tid: string | null = null

  if (searchResults.length === 1 && !searchResultsPartial.length) {
    tid = searchResults[0].TID
  } else if (SubTitles) {
    // サブタイトル比較
    if (subtitle) {
      const subtitleNormalized = ncoParser.normalizeAll(subtitle)

      for (const val of Object.entries(SubTitles)) {
        const scSubtitleNormalized = ncoParser.normalizeAll(
          val[1][episodeNumber]
        )

        if (
          0.85 <= similarity(subtitleNormalized, scSubtitleNormalized) ||
          subtitleNormalized.includes(scSubtitleNormalized) ||
          scSubtitleNormalized.includes(subtitleNormalized)
        ) {
          tid = val[0]

          break
        }
      }
    }

    if (!tid) {
      // 作品名比較
      for (const val of searchResults) {
        if (!(val.TID in SubTitles)) {
          continue
        }

        const {
          normalized: scNormalized,
          title: scTitle,
          season: scSeason,
        } = ncoParser.extract(normalizeScTitle(val.Title))

        if (
          (ncoParser.compare(title, scNormalized, true) ||
            (scTitle && ncoParser.compare(title, scTitle, true))) &&
          (seasonNumber ?? null) === (scSeason?.number ?? null)
        ) {
          tid = val.TID

          break
        }
      }
    }
  }

  if (!tid) {
    return null
  }

  return {
    title: searchResultsAll.find((v) => v.TID === tid)!,
    subtitle: SubTitles?.[tid]?.[episodeNumber] ?? null,
    programs: Object.values(Programs).filter((v) => v.TID === tid),
  }
}
