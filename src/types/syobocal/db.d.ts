import type { SyoboCalChannelId } from '../constants.js'
import type { SyoboCalTitleFull } from './json.js'

export type SyoboCalCommand = keyof SyoboCalDb

export type SyoboCalTitleJson = SyoboCalTitleFull

export type SyoboCalProgramJson = {
  LastUpdate: string
  PID: string
  TID: string
  StTime: string
  StOffset: string
  EdTime: string
  Count: string
  SubTitle: string
  ProgComment: string
  Flag: string
  Deleted: string
  Warn: string
  ChID: SyoboCalChannelId
  Revision: string
}

type SyoboCalTitleItem = {
  [key in keyof SyoboCalTitleJson]: {
    _text: SyoboCalTitleJson[key]
  }
}

export type SyoboCalTitleXml = {
  TitleLookupResponse: {
    TitleItems: {
      TitleItem: SyoboCalTitleItem | SyoboCalTitleItem[]
    }
  }
}

type SyoboCalProgItem = {
  [key in keyof SyoboCalProgramJson]: {
    _text: SyoboCalProgramJson[key]
  }
}

export type SyoboCalProgramXml = {
  ProgLookupResponse: {
    ProgItems: {
      ProgItem: SyoboCalProgItem | SyoboCalProgItem[]
    }
  }
}

export type SyoboCalDb = {
  TitleLookup: {
    parameters: {
      TID?: string | string[]
      LastUpdate?: string
      Fields?: (keyof SyoboCalTitleJson)[]
    }
    response: {
      xml: SyoboCalTitleXml
      json: {
        [TID: string]: SyoboCalTitleJson
      }
    }
  }

  ProgLookup: {
    parameters: {
      TID?: string | string[]
      ChID?: SyoboCalChannelId | SyoboCalChannelId[]
      StTime?: string
      Range?: string
      Count?: number | number[]
      LastUpdate?: string
      Fields?: (keyof SyoboCalProgramJson)[]
      JOIN?: string
      PID?: string | string[]
    }
    response: {
      xml: SyoboCalProgramXml
      json: {
        [PID: string]: SyoboCalProgramJson
      }
    }
  }
}

export type SyoboCalParameters<Command extends SyoboCalCommand> =
  SyoboCalDb[Command]['parameters']

export type SyoboCalResponseXml<Command extends SyoboCalCommand> =
  SyoboCalDb[Command]['response']['xml']

export type SyoboCalResponseJson<Command extends SyoboCalCommand> =
  SyoboCalDb[Command]['response']['json']
