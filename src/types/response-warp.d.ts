export interface ResponseWrop<T = any> {
  code: 0 | 1
  message: string
  data: T
}

export interface RecordsWrap<T = any> {
  records: T
  total: number
  size: number
  current: number
  searchCount: boolean
  pages: number | string
}

export type RecordsResponse<T = any> = ResponseWrop<RecordsWrap<T>>
