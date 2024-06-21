import { ncoParser } from '@midra/nco-parser'

import { CHANNEL_IDS_JIKKYO_SYOBOCAL } from '../constants'

import { json as syobocalJson } from '../syobocal'

export const syobocal = async (title: string, ep?: number) => {
  const { workTitle, season, episode } = ncoParser.extract(title)
  const epNum = episode?.number ?? ep

  if (!workTitle || !epNum) {
    return null
  }

  // しょぼいカレンダー 検索
  const searchResponse = await syobocalJson(['TitleSearch'], {
    Search: ncoParser.normalizeAll(workTitle, { space: false }),
    Limit: 5,
  })

  const searchResult =
    searchResponse &&
    Object.values(searchResponse.Titles).find((val) => {
      const {
        normalized: scNormalized,
        workTitle: scWorkTitle,
        season: scSeason,
      } = ncoParser.extract(val.Title)

      return (
        workTitle === scNormalized ||
        (workTitle === scWorkTitle && season?.number === scSeason?.number)
      )
    })

  if (!searchResult) {
    return null
  }

  const { SubTitles, Programs } =
    (await syobocalJson(['SubTitles', 'ProgramByCount'], {
      TID: searchResult.TID,
      Count: epNum,
      ChID: CHANNEL_IDS_JIKKYO_SYOBOCAL.map((v) => v[1]),
    })) ?? {}

  if (!Programs) {
    return null
  }

  const subTitleResult = SubTitles?.[searchResult.TID][epNum]
  const programResults = Object.values(Programs)

  return {
    title: searchResult,
    subTitle: subTitleResult,
    subTitleCount: epNum,
    program: programResults,
  }
}
