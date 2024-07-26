import type { Video, DataVideo } from '../types/dmmTv/video.js'

const API_BASE_URL = 'https://api.tv.dmm.com/graphql'

const query =
  'query GetVideo($seasonId: ID!, $contentId: ID!, $device: Device!, $playDevice: PlayDevice!, $isLoggedIn: Boolean!, $isContentId: Boolean!) {\nvideo(id: $seasonId) {\nid\nseasonType\nhasBookmark @include(if: $isLoggedIn)\ntitleName\nseasonName\nhighlight(format: HTML)\ndescription(format: HTML)\nnotices(format: HTML)\npackageImage\nproductionYear\nisNewArrival\ncustomTag\nisPublic\nisExclusive\nisBeingDelivered\nviewingTypes\nurl\nstartPublicAt\ncampaign {\nid\nname\nendAt\nisLimitedPremium\n__typename\n}\nrating {\ncategory\n__typename\n}\ncasts {\ncastName\nactorName\nperson {\nid\n__typename\n}\n__typename\n}\nstaffs {\nroleName\nstaffName\nperson {\nid\n__typename\n}\n__typename\n}\ncategories {\nname\nid\n__typename\n}\ngenres {\nname\nid\n__typename\n}\ncopyright\nrelatedItems(device: $device) {\nvideos {\nseasonId\nvideo {\nid\ntitleName\npackageImage\nisNewArrival\ncustomTag\nisExclusive\nrating {\ncategory\n__typename\n}\n__typename\n}\n__typename\n}\nbooks {\nseriesId\ntitle\nthumbnail\nurl\n__typename\n}\nmono {\nbanner\nurl\n__typename\n}\nscratch {\nbanner\nurl\n__typename\n}\nonlineCrane {\nbanner\nurl\n__typename\n}\n__typename\n}\n... on VideoSeason {\n__typename\nmetaDescription: description(format: PLAIN)\nkeyVisualImage\nkeyVisualWithoutLogoImage\nreviewSummary {\naveragePoint\nreviewerCount\nreviewCommentCount\n__typename\n}\nrelatedSeasons {\nid\ntitle\n__typename\n}\nnextDeliveryEpisode {\nisBeforeDelivered\nstartDeliveryAt\n__typename\n}\ncontinueWatching @include(if: $isLoggedIn) {\nid\nresumePoint\ncontentId\ncontent {\nepisodeImage\ndrmLevel {\nhasStrictProtection\n__typename\n}\nepisodeTitle\nepisodeNumber\nepisodeNumberName\nfreeProduct {\ncontentId\n__typename\n}\nviewingRights(device: $playDevice) {\nisStreamable\n__typename\n}\nppvProducts {\nid\ncontentId\nisOnSale\nisBeingDelivered\nisBundleParent\nisPurchased @include(if: $isLoggedIn)\nprice {\nprice\nsalePrice\n__typename\n}\n__typename\n}\nsvodProduct {\nstartDeliveryAt\n__typename\n}\n__typename\n}\n__typename\n}\npriceSummary {\nlowestPrice\nhighestPrice\ndiscountedLowestPrice\nisLimitedPremium\n__typename\n}\nepisode(id: $contentId) @include(if: $isContentId) {\nid\nepisodeTitle\nepisodeImage\nepisodeNumber\nepisodeNumberName\nepisodeDetail\ndrmLevel {\nhasStrictProtection\n__typename\n}\nplayInfo {\nhighestQuality\nisSupportHDR\nhighestAudioChannelLayout\nduration\naudioRenditions\ntextRenditions\nresumePartNumber @include(if: $isLoggedIn)\nparts {\ncontentId\nnumber\nduration\nresumePoint @include(if: $isLoggedIn)\n__typename\n}\n__typename\n}\nviewingRights(device: $playDevice) {\nisDownloadable\nisStreamable\n__typename\n}\nppvExpiration @include(if: $isLoggedIn) {\nexpirationType\nviewingExpiration\nviewingStartExpiration\nstartDeliveryAt\n__typename\n}\nfreeProduct {\ncontentId\n__typename\n}\nppvProducts {\nid\ncontentId\nisOnSale\nisBeingDelivered\nisBundleParent\nisPurchased @include(if: $isLoggedIn)\nprice {\nprice\nsalePrice\n__typename\n}\n__typename\n}\nsvodProduct {\nstartDeliveryAt\n__typename\n}\npriceSummary {\nlowestPrice\nhighestPrice\ndiscountedLowestPrice\nisLimitedPremium\n__typename\n}\n__typename\n}\nepisodes(type: MAIN, first: 1) {\nedges {\nnode {\nid\nsampleMovie\nepisodeTitle\nepisodeNumber\nepisodeNumberName\ndrmLevel {\nhasStrictProtection\n__typename\n}\nplayInfo {\nhighestQuality\nisSupportHDR\nhighestAudioChannelLayout\nduration\naudioRenditions\ntextRenditions\nresumePartNumber @include(if: $isLoggedIn)\nparts {\nnumber\nresumePoint @include(if: $isLoggedIn)\n__typename\n}\n__typename\n}\nviewingRights(device: $playDevice) {\nisDownloadable\nisStreamable\ndownloadableFiles @include(if: $isLoggedIn) {\nquality {\nname\ndisplayName\ndisplayPriority\n__typename\n}\ntotalFileSize\nparts {\npartNumber\nfileSize\n__typename\n}\n__typename\n}\n__typename\n}\nppvExpiration @include(if: $isLoggedIn) {\nexpirationType\nviewingExpiration\nviewingStartExpiration\nstartDeliveryAt\n__typename\n}\nfreeProduct {\ncontentId\n__typename\n}\nppvProducts {\nid\ncontentId\nisOnSale\nisBeingDelivered\nisBundleParent\nisPurchased @include(if: $isLoggedIn)\nprice {\nprice\nsalePrice\n__typename\n}\n__typename\n}\nsvodProduct {\nstartDeliveryAt\n__typename\n}\npriceSummary {\nlowestPrice\nhighestPrice\ndiscountedLowestPrice\nisLimitedPremium\n__typename\n}\n__typename\n}\n__typename\n}\ntotal\n__typename\n}\npurchasedContents(first: 1) @include(if: $isLoggedIn) {\nedges {\nnode {\nid\n__typename\n}\n__typename\n}\ntotal\n__typename\n}\nspecialEpisode: episodes(type: SPECIAL, first: 1) {\ntotal\n__typename\n}\npvEpisode: episodes(type: PV, first: 1) {\nedges {\nnode {\nid\nsampleMovie\nplayInfo {\nduration\n__typename\n}\n__typename\n}\n__typename\n}\ntotal\n__typename\n}\n}\n... on VideoLegacySeason {\n__typename\nmetaDescription: description(format: PLAIN)\npackageLargeImage\nreviewSummary {\naveragePoint\nreviewerCount\nreviewCommentCount\n__typename\n}\nsampleMovie {\nurl\nthumbnail\n__typename\n}\nsamplePictures {\nimage\nimageLarge\n__typename\n}\nsampleMovie {\nurl\nthumbnail\n__typename\n}\nreviewSummary {\naveragePoint\n__typename\n}\npriceSummary {\nlowestPrice\nhighestPrice\ndiscountedLowestPrice\nisLimitedPremium\n__typename\n}\ncontinueWatching @include(if: $isLoggedIn) {\npartNumber\nresumePoint\ncontentId\ncontent {\ndrmLevel {\nhasStrictProtection\n__typename\n}\nplayInfo {\nparts {\ncontentId\n__typename\n}\n__typename\n}\nviewingRights(device: $playDevice) {\nisStreamable\n__typename\n}\nfreeProduct {\ncontentId\n__typename\n}\n__typename\n}\n__typename\n}\ncontent {\nid\ncontentType\ndrmLevel {\nhasStrictProtection\n__typename\n}\nviewingRights(device: $playDevice) {\nisStreamable\nisDownloadable\ndownloadableFiles @include(if: $isLoggedIn) {\nquality {\nname\ndisplayName\ndisplayPriority\n__typename\n}\ntotalFileSize\nparts {\npartNumber\nfileSize\n__typename\n}\n__typename\n}\nwindowsURLSchemes: appURLSchemes(app: WINDOWS_VR) @include(if: $isLoggedIn) {\npartNumber\nurl\n__typename\n}\niosURLSchemes: appURLSchemes(app: IOS_VR) @include(if: $isLoggedIn) {\npartNumber\nurl\n__typename\n}\nandroidURLSchemes: appURLSchemes(app: ANDROID_VR) @include(if: $isLoggedIn) {\npartNumber\nurl\n__typename\n}\n__typename\n}\nplayInfo {\nduration\naudioRenditions\ntextRenditions\nhighestQuality\nisSupportHDR\nhighestAudioChannelLayout\nparts {\ncontentId\nnumber\n__typename\n}\n__typename\n}\nppvExpiration @include(if: $isLoggedIn) {\nexpirationType\nviewingExpiration\nviewingStartExpiration\nstartDeliveryAt\n__typename\n}\nfreeProduct {\ncontentId\n__typename\n}\nppvProducts {\nid\ncontentId\nisOnSale\nisBeingDelivered\nisBundleParent\nisPurchased @include(if: $isLoggedIn)\nprice {\nprice\nsalePrice\n__typename\n}\n__typename\n}\nsvodProduct {\nstartDeliveryAt\n__typename\n}\npriceSummary {\nlowestPrice\nhighestPrice\ndiscountedLowestPrice\nisLimitedPremium\n__typename\n}\n__typename\n}\nseries {\nid\nname\n__typename\n}\n}\n... on VideoStageSeason {\nid\n__typename\nmetaDescription: description(format: PLAIN)\nkeyVisualImage\nkeyVisualWithoutLogoImage\nreviewSummary {\naveragePoint\nreviewerCount\nreviewCommentCount\n__typename\n}\npriceSummary {\nlowestPrice\nhighestPrice\ndiscountedLowestPrice\nisLimitedPremium\n__typename\n}\nallPerformances {\nperformanceDate\ncontents {\nid\nepisodeTitle\npriority\nstartLivePerformanceAt\nppvProducts {\nid\ncontentId\nisOnSale\nisBeingDelivered\nisBundleParent\nisPurchased @include(if: $isLoggedIn)\nprice {\nprice\nsalePrice\n__typename\n}\n__typename\n}\npriceSummary {\nlowestPrice\nhighestPrice\ndiscountedLowestPrice\nisLimitedPremium\n__typename\n}\n__typename\n}\n__typename\n}\npurchasedContents(first: 1) @include(if: $isLoggedIn) {\nedges {\nnode {\nid\n__typename\n}\n__typename\n}\ntotal\n__typename\n}\n}\n... on VideoSpotLiveSeason {\n__typename\nmetaDescription: description(format: PLAIN)\nkeyVisualImage\nkeyVisualWithoutLogoImage\nepisodes(type: MAIN, first: 1) {\nedges {\nnode {\ndrmLevel {\nhasStrictProtection\n__typename\n}\nid\nepisodeTitle\nepisodeNumber\nepisodeNumberName\nviewingRights(device: $playDevice) {\nisStreamable\n__typename\n}\nppvExpiration @include(if: $isLoggedIn) {\nexpirationType\nviewingExpiration\nviewingStartExpiration\nstartDeliveryAt\n__typename\n}\nfreeProduct {\ncontentId\n__typename\n}\nppvProducts {\nid\ncontentId\nisOnSale\nisBeingDelivered\nisBundleParent\nisPurchased @include(if: $isLoggedIn)\nprice {\nprice\nsalePrice\n__typename\n}\n__typename\n}\nsvodProduct {\nstartDeliveryAt\n__typename\n}\nplayInfo {\naudioRenditions\ntextRenditions\nduration\nhighestQuality\nisSupportHDR\nhighestAudioChannelLayout\n__typename\n}\npriceSummary {\nlowestPrice\nhighestPrice\ndiscountedLowestPrice\nisLimitedPremium\n__typename\n}\n__typename\n}\n__typename\n}\n__typename\n}\n}\n__typename\n}\n}'

export const video = async (variables: {
  seasonId: string
  contentId: string
  device?: string
  playDevice?: string
  isLoggedIn?: boolean
  isContentId?: boolean
}): Promise<DataVideo | null> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        operationName: 'GetVideo',
        query,
        variables: {
          device: 'BROWSER',
          playDevice: 'BROWSER',
          isLoggedIn: false,
          isContentId: true,
          ...variables,
        },
      }),
    })
    const json: Video = await response.json()

    if (json.data.video) {
      return json.data.video
    }
  } catch (err) {
    console.error('[nco-api/dmmTv/video]', err)
  }

  return null
}
