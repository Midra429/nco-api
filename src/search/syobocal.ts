import { ncoParser } from '@midra/nco-parser'
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

  if (!workTitle || !epNum) {
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

  const searchResults =
    searchResponse &&
    Object.values(searchResponse.Titles).filter((val) => {
      const {
        normalized: scNormalized,
        workTitle: scWorkTitle,
        season: scSeason,
      } = ncoParser.extract(
        val.Title.replace(/\(第?[2-9](nd|rd|th)?クール\)$/g, '')
      )

      return (
        (workTitle === scNormalized || workTitle === scWorkTitle) &&
        season?.number === scSeason?.number
      )
    })

  if (!searchResults?.length) {
    return null
  }

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

  const TID = SubTitles && Object.keys(SubTitles)[0]
  const subTitleResult = TID && SubTitles[TID][epNum]
  const programResults = Programs && Object.values(Programs)

  if (
    season &&
    subTitleResult &&
    subTitle &&
    ncoParser.normalizeAll(subTitleResult) !== ncoParser.normalizeAll(subTitle)
  ) {
    return null
  }

  if (!programResults) {
    return null
  }

  return {
    title: searchResults.find((v) => v.TID === TID)!,
    subTitle: subTitleResult,
    subTitleCount: epNum,
    program: programResults,
  }
}
