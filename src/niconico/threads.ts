import type { Threads, ThreadsData } from '../types/niconico/threads.js'
import type { NvComment } from '../types/niconico/video.js'

import { logger } from '../utils/logger.js'

type RequestBody = {
  params: NvComment['params']
  threadKey: NvComment['threadKey']
  additionals: {
    when?: number
    res_from?: number
  }
}

const isResponseOk = (json: Threads): json is Required<Threads> => {
  return json.meta.status === 200
}

export const threads = async (
  request: {
    nvComment: NvComment | null
    additionals?: RequestBody['additionals']
  },
  credentials?: RequestInit['credentials']
): Promise<ThreadsData | null> => {
  const { nvComment, additionals } = request

  if (nvComment) {
    const url = new URL('/v1/threads', nvComment.server)

    const body: RequestBody = {
      params: {
        ...nvComment.params,
        targets: nvComment.params.targets.filter(
          (v) => !v.fork.includes('easy')
        ),
      },
      threadKey: nvComment.threadKey,
      additionals: additionals ?? {},
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'X-Frontend-Id': '6',
          'X-Frontend-Version': '0',
        },
        credentials,
        body: JSON.stringify(body),
      })
      const json: Threads = await response.json()

      if (!isResponseOk(json)) {
        throw new Error(`${json.meta.status} ${json.meta.errorCode}`)
      }

      return json.data
    } catch (err) {
      logger.error('niconico/threads:', err)
    }
  }

  return null
}

export const multipleThreads = (
  nvComments: (NvComment | null)[],
  additionals?: RequestBody['additionals']
): Promise<(ThreadsData | null)[]> => {
  return Promise.all(
    nvComments.map((nvComment) => threads({ nvComment, additionals }))
  )
}
