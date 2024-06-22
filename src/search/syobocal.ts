import { ncoParser } from '@midra/nco-parser'

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
  const { workTitle, season, episode } = ncoParser.extract(title)
  const epNum = ep ?? episode?.number

  if (!workTitle || !epNum) {
    return null
  }

  const normalizedWorkTitle = ncoParser
    .normalizeAll(workTitle, { space: false })
    .toUpperCase()

  // 検索
  const searchResponse = await syobocalJson(
    ['TitleSearch'],
    {
      Search: normalizedWorkTitle,
      Limit: 10,
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
      } = ncoParser.extract(val.Title.replace(/\(第[2-9]クール\)$/g, ''))

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

  if (!Programs) {
    return null
  }

  const TID = SubTitles && Object.keys(SubTitles)[0]
  const subTitleResult = TID && SubTitles[TID][epNum]
  const programResults = Object.values(Programs)

  return {
    title: searchResults.find((v) => v.TID === TID)!,
    subTitle: subTitleResult,
    subTitleCount: epNum,
    program: programResults,
  }
}
