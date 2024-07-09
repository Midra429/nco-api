import { ncoParser } from '@midra/nco-parser'
import { similarity } from '@midra/nco-parser/utils/similarity'
import { romanNum as removeRomanNum } from '@midra/nco-parser/normalize/lib/remove/romanNum'

import { CHANNEL_IDS_JIKKYO_SYOBOCAL } from '../constants'

import { json as syobocalJson } from '../syobocal'

export const syobocal = async ({
  title,
  ep,
  userAgent,
}: {
  title: string
  ep?: number
  userAgent?: string
}) => {
  const { workTitle, season, episode, subTitle } = ncoParser.extract(title)
  const epNum = ep ?? episode?.number

  if (!workTitle || epNum == null) {
    return null
  }

  const searchWord = removeRomanNum(
    ncoParser.normalizeAll(workTitle, {
      adjust: {
        letterCase: 'upper',
      },
      remove: {
        space: false,
      },
    })
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
  const searchResults = Object.values(searchResponse.Titles).filter((val) => {
    const { normalized: scNormalized, workTitle: scWorkTitle } =
      ncoParser.extract(
        val.Title.replace(/\(第?[2-9](nd|rd|th)?クール\)$/g, '')
      )

    return (
      ncoParser.compare(workTitle, scNormalized) ||
      (scWorkTitle && ncoParser.compare(workTitle, scWorkTitle))
    )
  })

  if (!searchResults.length) {
    return null
  }

  // サブタイトルと放送情報を取得
  const { SubTitles, Programs } =
    (await syobocalJson(
      ['SubTitles', 'ProgramByCount'],
      {
        TID: searchResults.map((v) => v.TID),
        Count: epNum,
        ChID: CHANNEL_IDS_JIKKYO_SYOBOCAL.map((v) => v[1]),
      },
      { userAgent }
    )) ?? {}

  if (!Programs) {
    return null
  }

  let tid: string | null = null

  if (searchResults.length === 1) {
    tid = searchResults[0].TID
  } else if (SubTitles) {
    // サブタイトル比較
    if (subTitle) {
      const normalizedSubTitle = ncoParser.normalizeAll(subTitle)

      for (const val of Object.entries(SubTitles)) {
        if (
          0.95 <=
          similarity(normalizedSubTitle, ncoParser.normalizeAll(val[1][epNum]))
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
          workTitle: scWorkTitle,
          season: scSeason,
        } = ncoParser.extract(
          val.Title.replace(/\(第?[2-9](nd|rd|th)?クール\)$/g, '')
        )

        if (
          ncoParser.compare(workTitle, scNormalized, false) ||
          (scWorkTitle &&
            ncoParser.compare(workTitle, scWorkTitle, false) &&
            season?.number === scSeason?.number)
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
    title: searchResults.find((v) => v.TID === tid)!,
    subTitle: SubTitles?.[tid][epNum] ?? null,
    subTitleCount: epNum,
    programs: Object.values(Programs).filter((v) => v.TID === tid),
  }
}
