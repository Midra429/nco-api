import type { SyoboCalChannelId } from '../constants.js'
import type { SyoboCalTitleFull } from './json.js'

export type SyoboCalCommand = keyof SyoboCalDb

// TitleLookup
type SyoboCalTitleDb = SyoboCalTitleFull

type SyoboCalTitleItem = {
  [key in keyof SyoboCalTitleDb]: {
    _text: SyoboCalTitleDb[key]
  }
}

export type SyoboCalTitleDbRaw = {
  TitleLookupResponse: {
    TitleItems: {
      TitleItem: SyoboCalTitleItem | SyoboCalTitleItem[]
    }
  }
}

// ProgLookup
type SyoboCalProgramDb = {
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

type SyoboCalProgItem = {
  [key in keyof SyoboCalProgramDb]: {
    _text: SyoboCalProgramDb[key]
  }
}

export type SyoboCalProgramDbRaw = {
  ProgLookupResponse: {
    ProgItems: {
      ProgItem: SyoboCalProgItem | SyoboCalProgItem[]
    }
  }
}

type SyoboCalDb = {
  TitleLookup: {
    parameters: {
      TID?: string | string[]
      LastUpdate?: string
      Fields?: (keyof SyoboCalTitleDb)[]
    }
    response: {
      xml: SyoboCalTitleDbRaw
      json: {
        [TID: string]: SyoboCalTitleDb
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
      Fields?: (keyof SyoboCalProgramDb)[]
      JOIN?: string
      PID?: string | string[]
    }
    response: {
      xml: SyoboCalProgramDbRaw
      json: {
        [PID: string]: SyoboCalProgramDb
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
