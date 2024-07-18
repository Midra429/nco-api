export type Episode = {
  ep_id: string
  lu_id: string
  lu_title: string
  subtitle_options: SubtitleOption[]
  coin: number
  price: number
  ep_title: string
  ep_no: number
  disp_ep_no: string
  duration: string
  broadcast_end: string
  ep_description: string
  packs: any[]
  persons: Person[]
  share_url: string
  sales_type: string[]
  is_teaser: boolean
  is_live: boolean
  is_download: boolean
  is_sold_together: boolean
  is_vm: boolean
  genre: Genre
  minogashi_pairing_ep_id: string
  ep_release_date: string
  ppv_status: string
  priority_number: number
  sort_number: number
  purchase_end: string
  ep_hash_id: string
}

export type Genre = {
  genre_id: string
  genre_name: string
  genre_eng_name: string
}

export type Person = {
  person_id: string
  person_name: string
}

export type SubtitleOption = {
  ep_id: string
  subtitle_option: string
  ep_title: string
  ep_hash_id: string
}
