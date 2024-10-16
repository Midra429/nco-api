import type { Extracted } from '@midra/nco-parser/extract'
import type {
  SearchQueryFieldKey,
  SearchData,
} from '../types/niconico/search.js'
import type { BuildSearchQueryArgs } from './lib/buildSearchQuery.js'

import { ncoParser } from '@midra/nco-parser'

import { DANIME_CHANNEL_ID, REGEXP_DANIME_CHAPTER } from '../constants.js'

import { search as niconicoSearch } from '../niconico/index.js'
import { buildSearchQuery } from './lib/buildSearchQuery.js'

const fields = [
  'contentId',
  'title',
  'userId',
  'channelId',
  'viewCounter',
  'lengthSeconds',
  'thumbnailUrl',
  'startTime',
  'commentCounter',
  'categoryTags',
  'tags',
] as const satisfies SearchQueryFieldKey[]

type SearchDataType = NonNullable<
  Awaited<ReturnType<typeof niconicoSearch<(typeof fields)[number]>>>
>['data'][number]

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

const sortingSearchData = ({
  input,
  options,
  data,
}: BuildSearchQueryArgs & {
  data: SearchDataType[]
}) => {
  const contents: {
    [key in 'official' | 'danime' | 'chapter' | 'szbh']: SearchDataType[]
  } = {
    official: [],
    danime: [],
    chapter: [],
    szbh: [],
  }

  const extracted: Extracted = {
    normalized: ncoParser.normalize(input.rawText, {
      remove: {
        bracket: true,
      },
    }),
    title: input.title ?? null,
    season:
      input.seasonText != null && input.seasonNumber != null
        ? {
            text: input.seasonText,
            number: input.seasonNumber,
            kansuji: null,
            prefix: null,
            suffix: null,
            range: [0, 0],
          }
        : null,
    episode:
      input.episodeText != null && input.episodeNumber != null
        ? {
            text: input.episodeText,
            number: input.episodeNumber,
            kansuji: null,
            prefix: null,
            suffix: null,
            range: [0, 0],
          }
        : null,
    subtitle: input.subtitle ?? null,
  }

  // 仕分け作業
  for (const val of data) {
    if (val.channelId) {
      // dアニメ(分割)
      if (
        val.channelId === DANIME_CHANNEL_ID &&
        REGEXP_DANIME_CHAPTER.test(val.title) &&
        !REGEXP_DANIME_CHAPTER.test(input.rawText)
      ) {
        const { groups } = val.title.match(REGEXP_DANIME_CHAPTER)!

        if (
          options?.chapter &&
          ncoParser.compare(extracted, groups!.title, true)
        ) {
          const chapterNum = Number(groups!.chapter)

          contents.chapter[chapterNum - 1] = val
        }

        continue
      }

      // dアニメ
      if (val.channelId === DANIME_CHANNEL_ID) {
        if (options.danime && ncoParser.compare(extracted, val.title, true)) {
          contents.danime.push(val)
        }

        continue
      }

      // 公式
      if (options.official && ncoParser.compare(extracted, val.title, true)) {
        contents.official.push(val)

        continue
      }
    } else if (val.userId) {
      // コメント専用
      if (
        val.tags &&
        /(^|\s)(コメント専用動画|SZBH方式)(\s|$)/i.test(val.tags)
      ) {
        if (options?.szbh && ncoParser.compare(extracted, val.title, true)) {
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

export const search = async (args: BuildSearchQueryArgs) => {
  const { input, options } = args

  let data: SearchDataType[] = []

  // 1回目
  const searchQuery1 = buildSearchQuery(args)

  if (searchQuery1.jsonFilter) {
    const res = await niconicoSearch({
      ...searchQuery1,
      fields,
    })

    if (res?.data) {
      data.push(...res.data)
    }
  }

  const sorted1 = sortingSearchData({
    ...args,
    data,
  })

  // 2回目 (公式, dアニメ)
  if (options.official && !sorted1.official.length && !sorted1.danime.length) {
    const searchQuery2 = buildSearchQuery({
      ...args,
      options: {
        official: true,
        danime: true,
        userAgent: args.options.userAgent,
      },
    })

    const q = ncoParser.normalizeAll(
      [
        input.title,
        input.seasonNumber && 1 < input.seasonNumber && input.seasonText,
        input.episodeText,
        input.subtitle,
      ]
        .filter(Boolean)
        .join(' ') || input.rawText,
      {
        remove: {
          space: false,
        },
      }
    )

    const res = await niconicoSearch({
      ...searchQuery2,
      q,
      fields,
    })

    if (res?.data) {
      data.push(...res.data)
    }
  }

  // 重複除去
  data = data.filter((val, idx, ary) => {
    return ary.findIndex((v) => v.contentId === val.contentId) === idx
  })

  return sortingSearchData({
    ...args,
    data,
  })
}
