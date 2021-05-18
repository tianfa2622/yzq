import { ResponseWrop, RecordsResponse } from '/@/types/response-warp'
// 搜索类型
export interface searchData {
  size: number
  current: number
  enabled: number
  keywords?: string
}
export interface selectOne {
  id: number
}

// 返回数据类型
export interface Row {
  id: number
  name: string
  password: string
  username: string
  phone: number
  organization: any
  enabled: boolean
  roles: roles[]
  authorities: authorities[]
  accountNonExpired: boolean
  accountNonLocked: boolean
  credentialsNonExpired: boolean
  deleted: boolean
}

export interface authorities {
  authority: string
}

export interface roles {
  id: number
  name: string
  explanation: string
  deleted: boolean
}

export interface resetM {
  id: number
}

// 表格数据类型
export type Rows = Row[]
export type uersResponses = RecordsResponse<Rows>
