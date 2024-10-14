import type { SYOBOCAL_CATEGORIES } from '../../constants.js'
import type { SyoboCalChannelId } from '../constants.js'

export type SyoboCalReqCommand = keyof SyoboCalJson

export type SyoboCalTitleFull = {
  TID: string
  Title: string
  ShortTitle: string
  TitleYomi: string
  TitleEN: string
  Cat: `${keyof typeof SYOBOCAL_CATEGORIES}`
  FirstCh: string
  FirstYear: string
  FirstMonth: string
  FirstEndYear: string
  FirstEndMonth: string
  TitleFlag: string

  Keywords: string
  UserPoint: string
  UserPointRank: string
  TitleViewCount: string

  Comment: string
  SubTitles: string
}

export type SyoboCalTitleLarge = Omit<
  SyoboCalTitleFull,
  'Comment' | 'SubTitles'
>

export type SyoboCalTitleMedium = Omit<
  SyoboCalTitleLarge,
  'Keywords' | 'UserPoint' | 'UserPointRank' | 'TitleViewCount'
> & {
  Links: [url: string, name: string][]
}

export type SyoboCalTitleSearch = Omit<SyoboCalTitleMedium, 'Links'> & {
  Comment: string
  Search: 1
  Programs?: SyoboCalProgram[]
}

export type SyoboCalProgram = {
  PID: string
  TID: string
  ChID: SyoboCalChannelId
  ChName: string
  ChEPGURL: string
  Count: string
  StTime: string
  EdTime: string
  SubTitle2: string
  ProgComment: string
  ConfFlag: null
}

export type SyoboCalJson = {
  TitleFull: {
    parameters: {
      TID: string | string[]
    }
    response: {
      Titles: {
        [TID: string]: SyoboCalTitleFull
      }
    }
  }

  TitleLarge: {
    parameters: {
      TID: string | string[]
    }
    response: {
      Titles: {
        [TID: string]: SyoboCalTitleLarge
      }
    }
  }

  TitleMedium: {
    parameters: {
      TID: string | string[]
    }
    response: {
      Titles: {
        [TID: string]: SyoboCalTitleMedium
      }
    }
  }

  ProgramByPID: {
    parameters: {
      PID: string | string[]
      TID?: string | string[]
      ChID?: SyoboCalChannelId | SyoboCalChannelId[]
    }
    response: {
      Programs: {
        [PID: string]: SyoboCalProgram
      }
    }
  }

  ProgramByCount: {
    parameters: {
      TID: string | string[]
      Count: number | number[]
      ChID?: SyoboCalChannelId | SyoboCalChannelId[]
    }
    response: {
      Programs: {
        [PID: string]: SyoboCalProgram
      }
    }
  }

  ProgramByDate: {
    parameters: {
      /**
       * @description `YYYY-MM-DD` で日付、`/^-(\d+)d$/` でn日前
       */
      Start: string
      /**
       * @description Startからの日数(1～32)
       */
      Days: number
      TID?: string | string[]
      ChID?: SyoboCalChannelId | SyoboCalChannelId[]
    }
    response: {
      Programs: {
        [PID: string]: SyoboCalProgram
      }
    }
  }

  SubTitles: {
    parameters: {
      TID: string | string[]
      Count?: number | number[]
    }
    response: {
      SubTitles: {
        [TID: string]: {
          [Count: string]: string
        }
      }
    }
  }

  // ChFilter: {
  //   parameters: {}
  //   response: {}
  // }

  // ChIDFilter: {
  //   parameters: {}
  //   response: {}
  // }

  TitleSearch: {
    parameters: {
      Search: string
      Limit?: number
    }
    response: {
      Titles: {
        [TID: string]: SyoboCalTitleSearch
      }
    }
  }
}

export type SyoboCalParameters<Command extends SyoboCalReqCommand> =
  SyoboCalJson[Command]['parameters']

export type SyoboCalResponse<Command extends SyoboCalReqCommand> =
  SyoboCalJson[Command]['response']
