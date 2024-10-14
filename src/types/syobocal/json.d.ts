import type { SyoboCalChannelId } from '../constants.js'

export type SyoboCalRequestCommand = keyof SyoboCalJson

type TitleFull = {
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

type TitleLarge = Omit<TitleFull, 'Comment' | 'SubTitles'>

type TitleMedium = Omit<
  TitleLarge,
  'Keywords' | 'UserPoint' | 'UserPointRank' | 'TitleViewCount'
> & {
  Links: [url: string, name: string][]
}

type TitleSearch = Omit<TitleMedium, 'Links'> & {
  Comment: string
  Search: 1
  Programs?: Program[]
}

type Program = {
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

type SyoboCalJson = {
  TitleFull: {
    parameters: {
      TID: string | string[]
    }
    response: {
      Titles: {
        [TID: string]: TitleFull
      }
    }
  }

  TitleLarge: {
    parameters: {
      TID: string | string[]
    }
    response: {
      Titles: {
        [TID: string]: TitleLarge
      }
    }
  }

  TitleMedium: {
    parameters: {
      TID: string | string[]
    }
    response: {
      Titles: {
        [TID: string]: TitleMedium
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
        [PID: string]: Program
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
        [PID: string]: Program
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
        [PID: string]: Program
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
      Limit?: number
    }
    response: {
      Titles: {
        [TID: string]: TitleSearch
      }
    }
  }
}

export type SyoboCalParameters<Command extends SyoboCalRequestCommand> =
  SyoboCalJson[Command]['parameters']

export type SyoboCalResponse<Command extends SyoboCalRequestCommand> =
  SyoboCalJson[Command]['response']
