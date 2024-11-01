export type ChannelVideoDAnimeLinksResponse =
  | ChannelVideoDAnimeLinksResponseOk
  | ChannelVideoDAnimeLinksResponseError

export type ChannelVideoDAnimeLinksResponseOk = {
  meta: {
    status: 200
  }
  data: {
    items: Item[]
  }
}

export type ChannelVideoDAnimeLinksResponseError = {
  meta: {
    status: number
    errorCode?: string
    errorMessage?: string
    errorDetails?: Record<string, string[]>
  }
}

export type Item = {
  channel: Channel
  isChannelMember: boolean
  linkedVideoId: string
}

export type Channel = {
  id: number
  name: string
  description: string
  isFree: boolean
  screenName: string
  ownerName: string
  isAdult: boolean
  price: number
  bodyPrice: number
  url: string
  thumbnailUrl: string
  thumbnailSmallUrl: string
  canAdmit: boolean
}
