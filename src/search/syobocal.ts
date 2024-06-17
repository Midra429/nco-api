import { ncoParser } from '@midra/nco-parser'
import { json as syobocalJson } from '../syobocal'
import { syobocalToJikkyoChId } from '../utils/syobocalToJikkyoChId'

export const syobocal = async (title: string) => {
  const { workTitle, season, episode } = ncoParser.extract(title)

  if (!workTitle || !episode) {
    return null
  }

  // しょぼいカレンダー 検索
  const searchResponse = await syobocalJson('TitleSearch', {
    Search: ncoParser.normalizeAll(workTitle, { space: false }),
    Limit: 10,
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

  const [subTitlesResponse, programResponse] = await Promise.all([
    // しょぼいカレンダー サブタイトル 取得
    syobocalJson('SubTitles', {
      TID: searchResult.TID,
      Count: episode.number,
    }),
    // しょぼいカレンダー 放送時間 取得
    syobocalJson('ProgramByCount', {
      TID: searchResult.TID,
      Count: episode.number,
    }),
  ])

  const subTitleResult =
    subTitlesResponse?.SubTitles[searchResult.TID][episode.number]

  const programResults =
    programResponse &&
    Object.values(programResponse.Programs).filter((val) => {
      return syobocalToJikkyoChId(val.ChID)
    })

  if (!programResults) {
    return null
  }

  return {
    title: searchResult,
    subTitle: subTitleResult,
    subTitleCount: episode.number,
    program: programResults,
  }
}
