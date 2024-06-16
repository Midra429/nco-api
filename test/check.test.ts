import { describe, test, expect } from '@jest/globals'

import { ncoParser } from '@midra/nco-parser'
import { ncoApi } from '../src'
import { applyNgSetting } from '../src/utils/applyNgSetting'
import { syobocalToJikkyoChId } from '../src/utils/syobocalToJikkyoChId'

describe('check', () => {
  // test('nco-parser', () => {
  //   const TITLES = [
  //     [
  //       '魔法科高校の劣等生 第3シーズン 01「ダブル・セブン編Ⅰ」',
  //       '魔法科高校の劣等生 3期 01 ダブル・セブン編Ⅰ',
  //     ],
  //     [
  //       '陰の実力者になりたくて！ 2nd season #01「無法都市」',
  //       '陰の実力者になりたくて！ 2nd season(第2期) #01 無法都市',
  //     ],
  //   ]

  //   expect(TITLES.every(([a, b]) => ncoParser.compare(a, b))).toBe(true)
  // })

  // test('search', async () => {
  //   // const TITLE = 'ささやくように恋を唄う 第１話 「屋上と、ギターと、先輩と。」'

  //   // const TITLE = '映画「五等分の花嫁」'

  //   const TITLE =
  //     'アニメ『アイドルマスター シャイニーカラーズ』 第1話「一人分の空、一枚の羽」'

  //   // const TITLE =
  //   //   '無職転生Ⅱ ～異世界行ったら本気だす～ 第18話「ターニングポイント3」'

  //   // const TITLE = 'TVアニメ「カノジョも彼女」Season 2　第10話　カノジョの決意'

  //   const contents = await ncoApi.search(TITLE, {
  //     // duration: 1420,
  //     guest: true,
  //     chapter: true,
  //     szbh: true,
  //   })

  //   if (contents) {
  //     console.table(contents.normal)
  //     console.table(contents.chapter)
  //     console.table(contents.szbh)

  //     const contentIds = Object.values(contents)
  //       .flat()
  //       .map((v) => v.contentId)

  //     const videos = await ncoApi.niconico.multipleVideo(contentIds, true)

  //     const threads = await Promise.all(
  //       videos.map(async (videoData) => {
  //         if (!videoData) return null

  //         const threadsData = await ncoApi.niconico.threads(
  //           videoData.comment.nvComment
  //         )

  //         return (
  //           threadsData && applyNgSetting(threadsData, videoData.comment.ng)
  //         )
  //       })
  //     )

  //     threads.forEach((val) => {
  //       console.log(
  //         val?.threads.map((v) => ({
  //           id: v.id,
  //           fork: v.fork,
  //           commentCount: v.commentCount,
  //         }))
  //       )
  //     })
  //   }
  // })

  test('jikkyo', async () => {
    const TITLE = 'お兄ちゃんはおしまい！ #01 まひろとイケないカラダ'

    const { workTitle, season, episode } = ncoParser.extract(TITLE)

    if (workTitle && episode) {
      const searchResponse = await ncoApi.syobocal.json('TitleSearch', {
        Search: ncoParser.normalize(workTitle, { symbol: true }),
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

      console.log('searchResult:', searchResult)

      if (searchResult) {
        const programResponse = await ncoApi.syobocal.json('ProgramByCount', {
          Count: episode.number,
          TID: searchResult.TID,
        })

        const programResults =
          programResponse &&
          Object.values(programResponse.Programs).filter((val) => {
            return syobocalToJikkyoChId(val.ChID)
          })

        console.log('programResults:', programResults)

        if (programResults?.length) {
          const kakologs = await Promise.all(
            programResults.map((val) => {
              const jkChId = syobocalToJikkyoChId(val.ChID)!

              return ncoApi.jikkyo.kakolog(
                jkChId,
                {
                  starttime: parseInt(val.StTime),
                  endtime: parseInt(val.EdTime),
                  format: 'json',
                },
                true
              )
            })
          )

          console.log(
            'kakologs:',
            kakologs.map((val) => {
              return (
                val && {
                  id: val.id,
                  commentCount: val.commentCount,
                  comments: val.comments.slice(0, 50).map((v) => v.body),
                }
              )
            })
          )

          return expect(!!kakologs.flatMap((v) => v ?? []).length)
        }
      }
    }

    return expect(false)
  }, 10000)
})
