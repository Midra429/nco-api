import type { SyoboCalChannelId } from '../constants'

export type SyoboCalRequestCommand = keyof SyoboCalJson

type SyoboCalJson = {
  TitleFull: {
    parameters: {
      TID: string | string[]
    }
    response: {
      Titles: {
        [TID: string]: {
          TID: string
          Title: string
          ShortTitle: string
          TitleYomi: string
          TitleEN: string
          Cat: string
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
      }
    }
  }

  TitleLarge: {
    parameters: SyoboCalJson['TitleFull']['parameters']
    response: {
      Titles: {
        [TID: string]: Omit<
          SyoboCalJson['TitleFull']['response']['Titles'][string],
          'Comment' | 'SubTitles'
        >
      }
    }
  }

  TitleMedium: {
    parameters: SyoboCalJson['TitleFull']['parameters']
    response: {
      Titles: {
        [TID: string]: Omit<
          SyoboCalJson['TitleLarge']['response']['Titles'][string],
          'Keywords' | 'UserPoint' | 'UserPointRank' | 'TitleViewCount'
        > & {
          Links: [url: string, name: string][]
        }
      }
    }
  }

  ProgramByPID: {
    parameters: {
      PID: string
      TID?: string
      ChID?: SyoboCalChannelId | SyoboCalChannelId[]
    }
    response: {
      Programs: {
        [PID: string]: {
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
      }
    }
  }

  ProgramByCount: {
    parameters: {
      TID: string
      Count: number
      ChID?: SyoboCalChannelId | SyoboCalChannelId[]
    }
    response: SyoboCalJson['ProgramByPID']['response']
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
      TID?: string
      ChID?: SyoboCalChannelId | SyoboCalChannelId[]
    }
    response: SyoboCalJson['ProgramByPID']['response']
  }

  SubTitles: {
    parameters: {
      TID: string
      Count?: number
    }
    response: {
      SubTitles: {
        [TID: string]: {
          [Count: string]: string
        }
      }
    }
  }

  ChFilter: {
    parameters: {}
    response: {}
  }

  ChIDFilter: {
    parameters: {}
    response: {}
  }

  TitleSearch: {
    parameters: {
      Search: string
      Limit: number
    }
    response: {
      Titles: {
        [TID: string]: Omit<
          SyoboCalJson['TitleMedium']['response']['Titles'][string],
          'Links'
        > & {
          Comment: string
          Search: 1
        }
      }
    }
  }
}

export type SyoboCalParameters<Command extends SyoboCalRequestCommand> =
  SyoboCalJson[Command]['parameters']

export type SyoboCalResponse<Command extends SyoboCalRequestCommand> =
  SyoboCalJson[Command]['response']
