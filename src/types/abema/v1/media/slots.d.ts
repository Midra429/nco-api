export type Slots = {
  slot: Slot
}

export type Slot = {
  id: string
  title: string
  startAt: number
  endAt: number
  programs: Program[]
  tableStartAt: number
  tableEndAt: number
  highlight: string
  detailHighlight?: string
  content: string
  displayProgramId: string
  mark: Mark
  flags: Flags
  channelId: string
  timeshiftEndAt: number
  slotGroup?: SlotGroup
  hashtag?: string
  links: null
  sharedLink: SharedLink
  playback: Playback
  externalContent: ExternalContent
  reservable: boolean
  download: Download
  chasePlayback: Playback
  broadcastRegionPolicies: BroadcastRegionPolicies
  timelineThumbComponent: TimelineThumbComponent
  chasePlayFeatureAuthorityIds: string[]
}

export type BroadcastRegionPolicies = {
  linear: number
  timeshift: number
}

export type Playback = {
  hls: string
  dash: string
  dashIPTV: string
  arin?: string
}

export type Download = {
  enable: boolean
}

export type ExternalContent = {
  buttonText: string
  marks: Marks
}

export type Marks = {}

export type Flags = {
  timeshift: boolean
  chasePlay: boolean
  archiveComment: boolean
}

export type Mark = {
  newcomer?: boolean
  recommendation?: boolean
}

export type Program = {
  id: string
  episode: Episode
  credit: Credit
  series: Series
  providedInfo: ProvidedInfo
}

export type Credit = {
  casts: string[]
  crews: string[]
  copyrights: string[]
}

export type Episode = {
  sequence: number
}

export type ProvidedInfo = {
  thumbImg: string
  sceneThumbImgs: string[]
  updatedAt: number
}

export type Series = {
  id: string
  themeColor: Marks
  genreId: string
  subGenreIds: string[]
  updatedAt: number
}

export type SharedLink = {
  twitter: string
  facebook: string
  google: string
  line: string
  copy: string
  screen: string
  instagram: string
}

export type SlotGroup = {
  id: string
  lastSlotId: string
  title: string
  thumbComponent: ThumbComponent
  expireAt: number
}

export type ThumbComponent = {
  urlPrefix: string
  filename: string
  extension: string
}

export type TimelineThumbComponent = {
  urlPrefix: string
  extension: string
}
