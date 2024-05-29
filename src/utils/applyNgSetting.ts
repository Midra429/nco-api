import type { ThreadsData } from '../types/niconico/threads'
import type { Ng, ViewerItem } from '../types/niconico/video'

export const applyNgSetting = (
  threadsData: ThreadsData,
  ng: Ng
): ThreadsData => {
  if (ng.viewer?.items) {
    const ngItems: {
      [key in ViewerItem['type']]: string[]
    } = {
      // コメント
      word: [],
      // ユーザーID
      id: [],
      // コマンド
      command: [],
    }

    for (const item of ng.viewer.items) {
      ngItems[item.type].push(item.source)
    }

    for (const thread of threadsData.threads) {
      thread.comments = thread.comments.filter((comment) => {
        const isNg =
          ngItems.word.some((v) => comment.body.includes(v)) ||
          ngItems.id.includes(comment.userId) ||
          comment.commands.some((v) => ngItems.command.includes(v))

        if (isNg) {
          thread.commentCount--
        }

        return !isNg
      })
    }
  }

  return threadsData
}
