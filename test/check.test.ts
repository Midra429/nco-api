import { describe, test, expect } from '@jest/globals'

import { ncoParser } from '@midra/nco-parser'
import { ncoApi } from '../dist/index.js'
import { applyNgSetting } from '../dist/utils/applyNgSetting.js'
import { syobocalToJikkyoChId } from '../dist/utils/syobocalToJikkyoChId.js'

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
  //   const TITLE = 'うらら迷路帖 一占 少女と占い、時々おなか'
  //   const contents = await ncoApi.search({
  //     rawText: TITLE,
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
  //     const videos = await ncoApi.niconico.multipleVideo(contentIds)
  //     const threads = await Promise.all(
  //       videos.map(async (videoData) => {
  //         if (!videoData) return null
  //         const threadsData = await ncoApi.niconico.threads(
  //           videoData.comment.nvComment
  //         )
  //         return threadsData
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
  // test('search', async () => {
  //   const videoData = await ncoApi.niconico.video('sm43887707')
  //   console.log('videoData:', videoData)
  //   if (videoData) {
  //     const threadsData = await ncoApi.niconico.threads(
  //       videoData.comment.nvComment
  //     )
  //     console.log(
  //       'threadsData:',
  //       threadsData?.threads.map((v) => ({
  //         id: v.id,
  //         fork: v.fork,
  //         commentCount: v.commentCount,
  //       }))
  //     )
  //   }
  // })
  // test('jikkyo', async () => {
  //   // const title = 'お兄ちゃんはおしまい！ #01 まひろとイケないカラダ'
  //   // const title = '僕のヒーローアカデミア　第7期 第144話 DIVISION'
  //   // const title =
  //   //   '無職転生Ⅱ ～異世界行ったら本気だす～ 2期 第0話 守護術師フィッツ'
  //   // const title =
  //   //   '魔王学院の不適合者 Ⅱ ～史上最強の魔王の始祖、転生して子孫たちの学校へ通う～ 第18話'
  //   // const title = '響け！ユーフォニアム３ 第8話 なやめるオスティナート'
  //   // const title = 'となりの妖怪さん 第8話 　'
  //   // const title =
  //   //   '新米オッサン冒険者、最強パーティに死ぬほど鍛えられて無敵になる。 第2話'
  //   // const title = '杖と剣のウィストリア シーズン1, 第ニ話 不屈のごとく'
  //   // const title = 'SHY 第13話 ヒーローズ・ハイ'
  //   const title = '僕の心のヤバイやつ 2期 karte13 僕らは探している'
  //   const extracted = ncoParser.extract(title)
  //   const result = await ncoApi.searchSyobocal({
  //     title: extracted.title,
  //     seasonNumber: extracted.season?.number,
  //     episodeNumber: extracted.episode?.number,
  //     subtitle: extracted.subtitle,
  //   })
  //   console.log('result:', result)
  //   expect(!!result).toBe(true)
  // }, 10000)

  test('syobocal/db', async () => {
    const response = await ncoApi.syobocal.db('ProgLookup', {
      TID: '5028',
    })

    console.log('syobocal/db:', response)
  })
})
