import { ResponseWrop, RecordsResponse } from '/@/types/response-warp'
// 搜索类型
export interface searchData {
  size: number
  current: number
  azddXzqhdm?: string
  deleted?: boolean
  dqjd?: number
  dqwd?: number
  id?: number
  sbbc?: string
  sbbs?: string
  sblxdm?: string
  sbmc?: string
  sbscsmc: string
  sbxh?: string
  sfbhxjdm?: boolean
  yycjdm?: string
}

// 返回所有数据
export interface Row {
  id: number
  azddXzqhdm: string
  sfbhxjdm: boolean
  sbbs: string
  sbmc: string
  sbscsmc: string
  sbxh: string
  sblxdm: string
  yycjdm: string
  dqjd: number
  dqwd: number
  deleted: boolean
}

export type Rows = Row[]

// 返回数据类型
// export interface Row {
//   id: number
//   name: string
//   explanation: string
//   deleted: boolean
// }

// 订阅管理
export interface subscriptionData {
  czlx: number
  dybt: string
  dylb: number
  dyqxdw: string
  dyqxrxm: string
  dyzt: number
  dyzylj: string
  id: number
  jssj: string
  kssj: string
  ly: string
  qxsj: string
  qxyy: string
  sqrdwmc: string
  sqrxm: string
  xxjsdz: string
  xxsbjgsj: number
}

// 表格数据类型
// export type Rows = Row[]
export type equipmentResponses = RecordsResponse<Rows>
