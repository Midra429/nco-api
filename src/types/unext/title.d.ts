export type Title = {
  data: {
    webfront_title_stage: TitleStage
  }
}

export type TitleStage = {
  id: string
  titleName: string
  episode: Episode
}

export type Episode = {
  id: string
  displayNo: string
  episodeName: string
  duration: number
}
