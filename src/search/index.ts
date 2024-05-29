import type { SearchData } from '../types/niconico/search'

import { DANIME_CHANNEL_ID } from '../constants'
import { compare } from '@midra/nco-parser'
import { search as niconicoSearchApi } from '../niconico'
import { buildSearchQuery } from './lib/buildSearchQuery'

const validateChapters = (
  chapters: SearchData<'lengthSeconds'>[],
  duration?: number
) => {
  const total = chapters.reduce((p, c) => p + c.lengthSeconds, 0)

  return (
    chapters.every((_, idx, ary) => ary.at(idx - 1)) &&
    (!duration || (total - 5 <= duration && duration <= total + 5))
  )
}

export const search = async (...args: Parameters<typeof buildSearchQuery>) => {
  const [title, options] = args

  const response = await niconicoSearchApi({
    ...buildSearchQuery(...args),
    fields: [
      'contentId',
      'title',
      'userId',
      'channelId',
      'lengthSeconds',
      'tags',
    ],
  })

  if (response) {
    const contents: {
      [key in 'normal' | 'chapter' | 'szbh']: typeof response.data
    } = {
      normal: [],
      chapter: [],
      szbh: [],
    }

    // 仕分け作業
    for (const val of response.data) {
      if (val.channelId) {
        const matchSplit = val.title.match(
          /^(?<title>.+)Chapter\.(?<chapter>[1-9])$/
        )

        // dアニメストア・分割 (ログイン必須)
        if (val.channelId === DANIME_CHANNEL_ID && matchSplit) {
          if (
            !options?.guest &&
            options?.chapter &&
            compare(title, matchSplit.groups!.title)
          ) {
            const chapterNum = Number(matchSplit.groups!.chapter)

            contents.chapter[chapterNum - 1] = val
          }

          continue
        }

        // 有料 (ログイン必須)
        if (
          val.channelId === DANIME_CHANNEL_ID ||
          (val.tags &&
            /(^|\s)プレミアム限定動画(\s|$)/i.test(val.tags) &&
            !/(^|\s)プレミアム限定動画（お試し）(\s|$)/i.test(val.tags))
        ) {
          if (!options?.guest && compare(title, val.title)) {
            contents.normal.push(val)
          }

          continue
        }

        // 通常
        if (compare(title, val.title)) {
          contents.normal.push(val)

          continue
        }
      } else if (val.userId) {
        // コメント専用動画
        if (
          val.tags &&
          /(^|\s)(コメント専用動画|SZBH方式)(\s|$)/i.test(val.tags)
        ) {
          if (options?.szbh && compare(title, val.title)) {
            contents.szbh.push(val)
          }

          continue
        }
      }
    }

    if (!validateChapters(contents.chapter)) {
      contents.chapter = []
    }

    return contents
  }

  return null
}
