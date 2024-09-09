import type { SearchData } from '../types/niconico/search.js'
import type { BuildSearchQueryArgs } from './lib/buildSearchQuery.js'

import { DANIME_CHANNEL_ID } from '../constants.js'
import { ncoParser } from '@midra/nco-parser'
import { search as niconicoSearch } from '../niconico/index.js'
import { buildSearchQuery } from './lib/buildSearchQuery.js'

const REGEXP_DANIME_CHAPTER = /^(?<title>.+)Chapter\.(?<chapter>[1-9])$/

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

export const search = async (args: BuildSearchQueryArgs) => {
  const { input, options } = args
  const { rawText } = input

  const searchQuery = buildSearchQuery(args)

  if (!searchQuery.jsonFilter) {
    return null
  }

  const response = await niconicoSearch({
    ...searchQuery,
    fields: [
      'contentId',
      'title',
      'userId',
      'channelId',
      'viewCounter',
      'lengthSeconds',
      'thumbnailUrl',
      'startTime',
      'commentCounter',
      'tags',
    ],
  })

  if (!response) {
    return null
  }

  const contents: {
    [key in 'normal' | 'danime' | 'szbh' | 'chapter']: typeof response.data
  } = {
    normal: [],
    danime: [],
    szbh: [],
    chapter: [],
  }

  // 仕分け作業
  for (const val of response.data) {
    if (val.channelId) {
      // dアニメストア・分割 (ログイン必須)
      if (
        val.channelId === DANIME_CHANNEL_ID &&
        REGEXP_DANIME_CHAPTER.test(val.title) &&
        !REGEXP_DANIME_CHAPTER.test(rawText)
      ) {
        const { groups } = val.title.match(REGEXP_DANIME_CHAPTER)!

        if (
          options?.chapter &&
          ncoParser.compare(rawText, groups!.title, true)
        ) {
          const chapterNum = Number(groups!.chapter)

          contents.chapter[chapterNum - 1] = val
        }

        continue
      }

      // dアニメストア
      if (val.channelId === DANIME_CHANNEL_ID) {
        if (ncoParser.compare(rawText, val.title, true)) {
          contents.danime.push(val)
        }

        continue
      }

      // 通常
      if (ncoParser.compare(rawText, val.title, true)) {
        contents.normal.push(val)

        continue
      }
    } else if (val.userId) {
      // コメント専用動画
      if (
        val.tags &&
        /(^|\s)(コメント専用動画|SZBH方式)(\s|$)/i.test(val.tags)
      ) {
        if (options?.szbh && ncoParser.compare(rawText, val.title, true)) {
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
