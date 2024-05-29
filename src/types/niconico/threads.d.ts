import type { V1Thread } from '@xpadev-net/niconicomments'

export type Threads = {
  meta: ThreadsMeta
  data?: ThreadsData
}

export type ThreadsMeta = {
  status: number
  errorCode?: string
}

export type ThreadsData = {
  globalComments: {
    id: string
    count: number
  }[]
  threads: V1Thread[]
}
