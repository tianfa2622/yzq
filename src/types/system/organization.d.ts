import { ResponseWrop, RecordsResponse } from '/@/types/response-warp'
// 搜索类型
export interface searchData {
  size: number
  current: number
  deleted?: number
  id?: number
  name?: string
  number?: string
  state?: number
  type?: number
}

// 返回所有数据
export interface Row {
  deleted: boolean
  id: number
  name: string
  number: string
  state: boolean
  type: string
}

export type Rows = Row[]

// 返回数据类型
// export interface Row {
//   id: number
//   name: string
//   explanation: string
//   deleted: boolean
// }

// 表格数据类型
// export type Rows = Row[]
export type organizationResponses = RecordsResponse<Rows>
