import { ResponseWrop, RecordsResponse } from '/@/types/response-warp'
export interface searchData {
  keyword: string
}
interface Row {
  id: number
  account: string
  organization: any
  ipAddr: string
  operation: string
  createTime: string
}
export type Rows = Row[]
export type LogResponse = RecordsResponse<Rows>
