import type { SyoboCalChannelId } from '../constants'

export type SyoboCalRequestCommand = keyof SyoboCalParameters

export type SyoboCalParameters = {
  TitleFull: {
    TID: string | string[]
  }
  TitleLarge: SyoboCalParameters['TitleFull']
  TitleMedium: SyoboCalParameters['TitleFull']

  ProgramByPID: {
    PID: string
    TID?: string
    ChID?: SyoboCalChannelId
  }

  ProgramByCount: {
    TID: string
    Count: number
    ChID?: SyoboCalChannelId
  }

  ProgramByDate: {
    /**
     * @description `YYYY-MM-DD` で日付、`/^-(\d+)d$/` でn日前
     */
    Start: string
    /**
     * @description Startからの日数(1～32)
     */
    Days: number
    TID?: string
    ChID?: SyoboCalChannelId
  }

  SubTitles: {
    TID: string
    Count?: number
  }

  ChFilter: {}

  ChIDFilter: {}

  TitleSearch: {
    Search: string
    Limit: number
  }
}

export type SyoboCalResponse = {
  TitleFull: {
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

  TitleLarge: {
    Titles: {
      [TID: string]: Omit<
        SyoboCalResponse['TitleFull']['Titles'][string],
        'Comment' | 'SubTitles'
      >
    }
  }

  TitleMedium: {
    Titles: {
      [TID: string]: Omit<
        SyoboCalResponse['TitleLarge']['Titles'][string],
        'Keywords' | 'UserPoint' | 'UserPointRank' | 'TitleViewCount'
      > & {
        Links: [url: string, name: string][]
      }
    }
  }

  ProgramByPID: {
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

  ProgramByCount: SyoboCalResponse['ProgramByPID']

  ProgramByDate: SyoboCalResponse['ProgramByPID']

  SubTitles: {
    SubTitles: {
      [TID: string]: {
        [Count: string]: string
      }
    }
  }

  ChFilter: {}

  ChIDFilter: {}

  TitleSearch: {
    Titles: {
      [TID: string]: Omit<
        SyoboCalResponse['TitleMedium']['Titles'][string],
        'Links'
      > & {
        Comment: string
        Search: 1
      }
    }
  }
}
