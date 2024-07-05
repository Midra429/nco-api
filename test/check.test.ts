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
    // const title = 'お兄ちゃんはおしまい！ #01 まひろとイケないカラダ'
    // const title = '僕のヒーローアカデミア　第7期 第144話 DIVISION'
    // const title =
    //   '無職転生Ⅱ ～異世界行ったら本気だす～ 2期 第0話 守護術師フィッツ'
    // const title =
    //   '魔王学院の不適合者 Ⅱ ～史上最強の魔王の始祖、転生して子孫たちの学校へ通う～ 第18話'
    const title = '響け！ユーフォニアム３ 第8話 なやめるオスティナート'

    const result = await ncoApi.searchSyobocal({ title })

    console.log(result)

    expect(!!result).toBe(true)
  }, 10000)
})
