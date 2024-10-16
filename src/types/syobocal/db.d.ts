import type { SyoboCalChannelId } from '../constants.js'
import type { SyoboCalTitleFull } from './json.js'

export type SyoboCalCommand = keyof SyoboCalDb

// TitleLookup
type SyoboCalTitleXml = SyoboCalTitleFull

type SyoboCalTitleItem = {
  [key in keyof SyoboCalTitleXml]: {
    _text: SyoboCalTitleXml[key]
  }
}

export type SyoboCalTitleXmlRaw = {
  TitleLookupResponse: {
    TitleItems: {
      TitleItem: SyoboCalTitleItem | SyoboCalTitleItem[]
    }
  }
}

// ProgLookup
type SyoboCalProgramXml = {
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
  [key in keyof SyoboCalProgramXml]: {
    _text: SyoboCalProgramXml[key]
  }
}

export type SyoboCalProgramXmlRaw = {
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
      Fields?: (keyof SyoboCalTitleXml)[]
    }
    response: {
      xml: SyoboCalTitleXmlRaw
      json: {
        [TID: string]: SyoboCalTitleXml
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
      Fields?: (keyof SyoboCalProgramXml)[]
      JOIN?: string
      PID?: string | string[]
    }
    response: {
      xml: SyoboCalProgramXmlRaw
      json: {
        [PID: string]: SyoboCalProgramXml
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
