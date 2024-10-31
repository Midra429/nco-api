export type VideoResponse = VideoResponseOk | VideoResponseError

export type VideoResponseOk = {
  meta: {
    status: 200
    code: string
  }
  data: {
    metadata: unknown
    googleTagManager: unknown
    response: VideoData
  }
}

export type VideoResponseError = {
  meta: {
    status: number
    code: string
  }
  data: {
    metadata: unknown
    response: {
      statusCode: number
      errorCode: string
      reasonCode: string
    }
  }
}

export type VideoData = {
  ads: null
  category: null
  channel: Channel | null
  client: Client
  comment: DataComment
  community: null
  easyComment: EasyComment
  external: External | null
  genre: DataGenre
  marquee: Marquee | null
  media: Media
  okReason: OkReason
  owner: DataOwner | null
  payment: Payment
  pcWatchPage: PcWatchPage | null
  player: Player
  ppv: Ppv | null
  ranking: Ranking
  series: Series | null
  smartphone: null
  system: System
  tag: Tag
  video: DataVideo
  videoAds: VideoAds
  videoLive: VideoLive | null
  viewer: DataViewer | null
  waku: Waku
}

export type Channel = {
  id: string
  name: string
  isOfficialAnime: boolean
  isDisplayAdBanner: boolean
  thumbnail: ChannelThumbnail
  viewer: ChannelViewer | null
}

export type ChannelThumbnail = {
  url: string
  smallUrl: string
}

export type ChannelViewer = {
  follow: Follow
}

export type Follow = {
  isFollowed: boolean
  isBookmarked: boolean
  token: string
  tokenTimestamp: number
}

export type Client = {
  nicosid: string
  watchId: string
  watchTrackId: string
}

export type DataComment = {
  server: Server
  keys: Keys
  layers: Layer[]
  threads: Thread[]
  ng: Ng
  isAttentionRequired: boolean
  nvComment: NvComment
}

export type Keys = {
  userKey: string
}

export type Layer = {
  index: number
  isTranslucent: boolean
  threadIds: ThreadId[]
}

export type ThreadId = {
  id: number
  fork: number
  forkLabel: Fork
}

export type Fork = 'owner' | 'main' | 'easy'

export type Ng = {
  ngScore: NgScore
  channel: []
  owner: []
  viewer: NgViewer | null
}

export type NgScore = {
  isDisabled: boolean
}

export type NgViewer = {
  revision: number
  count: number
  items: ViewerItem[]
}

export type ViewerItem = {
  type: 'word' | 'id' | 'command'
  source: string
  registeredAt: string
}

export type NvComment = {
  threadKey: string
  server: string
  params: Params
}

export type Params = {
  targets: Target[]
  language: 'ja-jp'
}

export type Target = {
  id: string
  fork: Fork
}

export type Server = {
  url: string
}

export type Thread = {
  id: number
  fork: number
  forkLabel: Fork
  videoId: string
  isActive: boolean
  isDefaultPostTarget: boolean
  isEasyCommentPostTarget: boolean
  isLeafRequired: boolean
  isOwnerThread: boolean
  isThreadkeyRequired: boolean
  threadkey: null | string
  is184Forced: boolean
  hasNicoscript: boolean
  label: ThreadLabel
  postkeyStatus: number
  server: string
}

export type ThreadLabel =
  | 'owner'
  | 'default'
  | 'community'
  | 'easy'
  | 'extra-community'
  | 'extra-easy'

export type EasyComment = {
  phrases: Phrase[]
}

export type Phrase = {
  text: string
  nicodic: Nicodic | null
}

export type Nicodic = {
  title: string
  viewTitle: string
  summary: string
  link: string
}

export type External = {
  commons: Commons
  ichiba: Ichiba
}

export type Commons = {
  hasContentTree: boolean
}

export type Ichiba = {
  isEnabled: boolean
}

export type DataGenre = {
  key: string
  label: GenreEnum
  isImmoral: boolean
  isDisabled: boolean
  isNotSet: boolean
}

export type GenreEnum =
  | '未設定'
  | 'エンターテイメント'
  | 'ラジオ'
  | '音楽・サウンド'
  | 'ダンス'
  | '動物'
  | '自然'
  | '料理'
  | '旅行・アウトドア'
  | '乗り物'
  | 'スポーツ'
  | '社会・政治・時事'
  | '技術・工作'
  | '解説・講座'
  | 'アニメ'
  | 'ゲーム'
  | 'その他'
  | 'R-18'

export type Marquee = {
  isDisabled: boolean
  tagRelatedLead: null
}

export type Media = {
  domand: Domand | null
  delivery: null
  deliveryLegacy: null
}

export type Domand = {
  videos: VideoElement[]
  audios: Audio[]
  isStoryboardAvailable: boolean
  accessRightKey: string
}

export type Audio = {
  id: AudioId
  isAvailable: boolean
  bitRate: number
  samplingRate: number
  integratedLoudness: number
  truePeak: number
  qualityLevel: number
  loudnessCollection: LoudnessCollection[]
}

export type AudioId =
  | 'audio-aac-64kbps'
  | 'audio-aac-128kbps'
  | 'audio-aac-192kbps'

export type LoudnessCollection = {
  type: LoudnessCollectionType
  value: number
}

export type LoudnessCollectionType =
  | 'video'
  | 'pureAdPreroll'
  | 'houseAdPreroll'
  | 'networkAdPreroll'
  | 'pureAdMidroll'
  | 'houseAdMidroll'
  | 'networkAdMidroll'
  | 'pureAdPostroll'
  | 'houseAdPostroll'
  | 'networkAdPostroll'
  | 'nicoadVideoIntroduce'
  | 'nicoadBillboard'
  | 'marquee'

export type VideoElement = {
  id: VideoId
  isAvailable: boolean
  label: VideoLabel
  bitRate: number
  width: number
  height: number
  qualityLevel: number
  recommendedHighestAudioQualityLevel: number
}

export type VideoId =
  | 'video-h264-144p'
  | 'video-h264-360p-lowest'
  | 'video-h264-360p'
  | 'video-h264-480p'
  | 'video-h264-720p'
  | 'video-h264-1080p'

export type VideoLabel = '低画質' | '144p' | '360p' | '480p' | '720p' | '1080p'

export type OkReason = 'PURELY' | 'PAYMENT_PREVIEW_SUPPORTED'

export type DataOwner = {
  id: number
  nickname: string
  iconUrl: string
  channel: null
  live: null
  isVideosPublic: boolean
  isMylistsPublic: boolean
  videoLiveNotice: null
  viewer: null
}

export type Payment = {
  video: PaymentVideo
  preview: Preview
}

export type Preview = {
  ppv: Ichiba
  admission: Ichiba
  continuationBenefit: Ichiba
  premium: Ichiba
}

export type PaymentVideo = {
  isPpv: boolean
  isAdmission: boolean
  isContinuationBenefit: boolean
  isPremium: boolean
  watchableUserType: CommentableUserTypeForPayment
  commentableUserType: CommentableUserTypeForPayment
  billingType: BillingType
}

export type BillingType = 'free' | 'custom'

export type CommentableUserTypeForPayment = 'all' | 'purchaser'

export type PcWatchPage = {
  tagRelatedBanner: null
  videoEnd: VideoEnd
  showOwnerMenu: boolean
  showOwnerThreadCoEditingLink: boolean
  showMymemoryEditingLink: boolean
}

export type VideoEnd = {
  bannerIn: null
  overlay: null
}

export type Player = {
  initialPlayback: null
  comment: PlayerComment
  layerMode: number
}

export type PlayerComment = {
  isDefaultInvisible: boolean
}

export type Ppv = {
  accessFrom: null
}

export type Ranking = {
  genre: RankingGenre | null
  popularTag: PopularTag[]
}

export type RankingGenre = {
  rank: number
  genre: GenreEnum
  dateTime: string
}

export type PopularTag = {
  tag: string
  regularizedTag: string
  rank: number
  genre: GenreEnum
  dateTime: string
}

export type Series = {
  id: number
  title: string
  description: string
  thumbnailUrl: string
  video: SeriesVideo
}

export type SeriesVideo = {
  prev: First | null
  next: First
  first: First
}

export type First = {
  'type': string
  'id': string
  'title': string
  'registeredAt': string
  'count': Count
  'thumbnail': FirstThumbnail
  'duration': number
  'shortDescription': string
  'latestCommentSummary': string
  'isChannelVideo': boolean
  'isPaymentRequired': boolean
  'playbackPosition': number | null
  'owner': FirstOwner
  'requireSensitiveMasking': boolean
  'videoLive': null
  'isMuted': boolean
  '9d091f87': boolean
  'acf68865': boolean
}

export type Count = {
  view: number
  comment: number
  mylist: number
  like: number
}

export type FirstOwner = {
  ownerType: string
  type: string
  visibility: string
  id: string
  name: string
  iconUrl: string
}

export type FirstThumbnail = {
  url: string
  middleUrl: string
  largeUrl: string
  listingUrl: string
  nHdUrl: string
}

export type System = {
  serverTime: string
  isPeakTime: boolean
  isStellaAlive: boolean
}

export type Tag = {
  items: TagItem[]
  hasR18Tag: boolean
  isPublishedNicoscript: boolean
  edit: Edit
  viewer: Edit | null
}

export type Edit = {
  isEditable: boolean
  uneditableReason: UneditableReason
  editKey: null | string
}

export type UneditableReason = 'PREMIUM_ONLY' | 'NEED_LOGIN' | 'USER_FORBIDDEN'

export type TagItem = {
  name: string
  isCategory: boolean
  isCategoryCandidate: boolean
  isNicodicArticleExists: boolean
  isLocked: boolean
}

export type DataVideo = {
  'id': string
  'title': string
  'description': string
  'count': Count
  'duration': number
  'thumbnail': VideoThumbnail
  'rating': Rating
  'registeredAt': string
  'isPrivate': boolean
  'isDeleted': boolean
  'isNoBanner': boolean
  'isAuthenticationRequired': boolean
  'isEmbedPlayerAllowed': boolean
  'isGiftAllowed': boolean
  'viewer': VideoViewer | null
  'watchableUserTypeForPayment': CommentableUserTypeForPayment
  'commentableUserTypeForPayment': CommentableUserTypeForPayment
  '9d091f87': boolean
}

export type Rating = {
  isAdult: boolean
}

export type VideoThumbnail = {
  url: string
  middleUrl: null | string
  largeUrl: null | string
  player: string
  ogp: string
}

export type VideoViewer = {
  isOwner: boolean
  like: Like
}

export type Like = {
  isLiked: boolean
  count: null
}

export type VideoAds = {
  additionalParams: VideoAdsAdditionalParams
  items: VideoAdsItem[]
  reason: null | string
}

export type VideoAdsAdditionalParams = {
  videoId: string
  videoDuration: number
  isAdultRatingNG: boolean
  isAuthenticationRequired: boolean
  isR18: boolean
  nicosid: string
  lang: 'ja-jp'
  watchTrackId: string
  channelId?: string
  genre?: string
  gender?: string
  age?: number
}

export type VideoAdsItem = {
  type: LinearTypeEnum
  timingMs: number | null
  additionalParams: ItemAdditionalParams
}

export type ItemAdditionalParams = {
  linearType: LinearTypeEnum
  adIdx: number
  skipType: number
  skippableType: number
  pod: number
}

export type LinearTypeEnum = 'preroll' | 'midroll' | 'postroll'

export type VideoLive = {
  programId: string
  beginAt: string
  endAt: string
}

export type DataViewer = {
  id: number
  nickname: string
  isPremium: boolean
  allowSensitiveContents: boolean
  existence: Existence
}

export type Existence = {
  age: number
  prefecture: string
  sex: string
}

export type Waku = {
  information: null
  bgImages: any[]
  addContents: null
  addVideo: null
  tagRelatedBanner: TagRelatedBanner
  tagRelatedMarquee: null
}

export type TagRelatedBanner = {
  title: string
  imageUrl: string
  description: string
  isEvent: boolean
  linkUrl: string
  linkType: LinkType
  linkOrigin: string
  isNewWindow: boolean
}

export type LinkType = 'video' | 'link' | 'live'
