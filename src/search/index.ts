import type {
  SearchQueryFieldKey,
  SearchData,
} from '../types/niconico/search.js'
import type { BuildSearchQueryArgs } from './lib/buildSearchQuery.js'

import { DANIME_CHANNEL_ID } from '../constants.js'
import { ncoParser } from '@midra/nco-parser'
import { search as niconicoSearch } from '../niconico/index.js'
import { buildSearchQuery } from './lib/buildSearchQuery.js'

const REGEXP_DANIME_CHAPTER = /^(?<title>.+)Chapter\.(?<chapter>[1-9])$/

const QUERY_FIELDS = [
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
] as const satisfies SearchQueryFieldKey[]

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

  const searchQuery = buildSearchQuery(args)

  if (!searchQuery.jsonFilter) {
    return null
  }

  const q2 = ncoParser.normalizeAll(
    [
      input.title,
      input.seasonNumber && 1 < input.seasonNumber && input.seasonText,
      input.episodeText,
      input.subtitle,
    ]
      .filter(Boolean)
      .join(' ')
      .trim() || input.rawText,
    {
      remove: {
        space: false,
      },
    }
  )

  const responseData = (
    await Promise.all([
      niconicoSearch({
        ...searchQuery,
        fields: QUERY_FIELDS,
      }),
      niconicoSearch({
        ...searchQuery,
        q: q2,
        fields: QUERY_FIELDS,
      }),
    ])
  )
    .flatMap((res) => res?.data || [])
    .filter((val, idx, ary) => {
      return ary.findIndex((v) => v.contentId === val.contentId) === idx
    })

  if (!responseData.length) {
    return null
  }

  const contents: {
    [key in 'normal' | 'danime' | 'szbh' | 'chapter']: typeof responseData
  } = {
    normal: [],
    danime: [],
    szbh: [],
    chapter: [],
  }

  // 仕分け作業
  for (const val of responseData) {
    if (val.channelId) {
      // dアニメストア・分割 (ログイン必須)
      if (
        val.channelId === DANIME_CHANNEL_ID &&
        REGEXP_DANIME_CHAPTER.test(val.title) &&
        !REGEXP_DANIME_CHAPTER.test(input.rawText)
      ) {
        const { groups } = val.title.match(REGEXP_DANIME_CHAPTER)!

        if (
          options?.chapter &&
          ncoParser.compare(input.rawText, groups!.title, true)
        ) {
          const chapterNum = Number(groups!.chapter)

          contents.chapter[chapterNum - 1] = val
        }

        continue
      }

      // dアニメストア
      if (val.channelId === DANIME_CHANNEL_ID) {
        if (ncoParser.compare(input.rawText, val.title, true)) {
          contents.danime.push(val)
        }

        continue
      }

      // 通常
      if (ncoParser.compare(input.rawText, val.title, true)) {
        contents.normal.push(val)

        continue
      }
    } else if (val.userId) {
      // コメント専用動画
      if (
        val.tags &&
        /(^|\s)(コメント専用動画|SZBH方式)(\s|$)/i.test(val.tags)
      ) {
        if (
          options?.szbh &&
          ncoParser.compare(input.rawText, val.title, true)
        ) {
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
