export type Metadata = {
  version?: string
  trackIds?: TrackIds
  video?: Video
}

export type TrackIds = {
  nextEpisode: number
  episodeSelector: number
}

export type Video = {
  title: string
  synopsis: string
  matchScore: MatchScore
  rating: string
  artwork: Artwork[]
  boxart: Artwork[]
  storyart: Artwork[]
  type: string
  unifiedEntityId: string
  id: number
  userRating: UserRating
  skipMarkers: SkipMarkers
  currentEpisode?: number
  hiddenEpisodeNumbers: boolean
  requiresAdultVerification: boolean
  requiresPin: boolean
  requiresPreReleasePin: boolean
  seasons?: Season[]
  merchedVideoId: null
  cinematch: Cinematch
  start?: number
  end?: number
  year?: number
  creditsOffset?: number
  runtime?: number
  displayRuntime?: number
  autoplayable?: boolean
  liveEvent?: LiveEvent
  taglineMessages?: TaglineMessages
  bookmark?: Bookmark
  hd?: boolean
  stills?: Artwork[]
}

export type Artwork = {
  w: number
  h: number
  url: string
}

export type Bookmark = {
  watchedDate: number
  offset: number
}

export type Cinematch = {
  type: string
  value: string
}

export type LiveEvent = {
  hasLiveEvent: boolean
}

export type MatchScore = {
  isNewForPvr: boolean
  computeId: string
  trackingInfo: TrackingInfo
}

export type TrackingInfo = {
  matchScore: string
  tooNewForMatchScore: string
  matchRequestId: string
}

export type Season = {
  year: number
  shortName: string
  longName: string
  hiddenEpisodeNumbers: boolean
  title: string
  id: number
  seq: number
  episodes: Episode[]
}

export type Episode = {
  start: number
  end: number
  synopsis: string
  episodeId: number
  liveEvent: LiveEvent
  taglineMessages: TaglineMessages
  requiresAdultVerification: boolean
  requiresPin: boolean
  requiresPreReleasePin: boolean
  creditsOffset: number
  runtime: number
  displayRuntime: number
  watchedToEndOffset: number
  autoplayable: boolean
  title: string
  id: number
  bookmark: Bookmark
  skipMarkers: SkipMarkers
  hd: boolean
  thumbs: Artwork[]
  stills: Artwork[]
  seq: number
  hiddenEpisodeNumbers: boolean
}

export type SkipMarkers = {
  credit: Credit
  recap: Credit
}

export type Credit = {
  start: number | null
  end: number | null
}

export type TaglineMessages = {
  tagline: string
  classification: Classification
}

export type Classification = 'REGULAR' | 'MOST_LIKED'

export type UserRating = {
  type: string
  userRating: number
}
