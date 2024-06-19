import type { V1Thread } from '@xpadev-net/niconicomments'

export type NgSetting = {
  word: string[]
  id: string[]
  command: string[]
}

export const applyNgSetting = (
  threads: V1Thread[],
  ngSetting: NgSetting
): V1Thread[] => {
  const applied: V1Thread[] = []

  for (const thread of threads) {
    let commentCount = thread.commentCount

    const comments = thread.comments.flatMap((cmt) => {
      const isNg =
        ngSetting.word.some((v) => cmt.body.includes(v)) ||
        ngSetting.id.includes(cmt.userId) ||
        cmt.commands.some((v) => ngSetting.command.includes(v))

      if (isNg) {
        commentCount--

        return []
      }

      return cmt
    })

    applied.push({ ...thread, comments })
  }

  return threads
}
