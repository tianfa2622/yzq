import { ResponseWrop, RecordsResponse } from '/@/types/response-warp'
// 搜索类型
export interface searchData {
  size?: number
  current?: number
  explanation?: string
}
export interface selectOne {
  id: number
}

// 返回所有菜单
export interface AllMenus {
  id: number
  url: string
  path: string
  component: any
  name: string
  iconcls: any
  keepAlive: any
  requiredAuth: any
  parentId: any
  enabled: boolean
  children: children | null
  roles: any
}

export type children = AllMenus[]

// 返回数据类型
export interface Row {
  id: number
  name: string
  explanation: string
  deleted: boolean
}

// 表格数据类型
export type Rows = Row[]
export type roleResponses = RecordsResponse<Rows>
