// 搜索类型
export interface searchData {
  size: number
  current: number
  qzlbjbm?: string
  qzlx?: string | number
  qzmc?: string
  qzxh?: string
}
// 返回数据类型
export interface Row {
  id?: number
  qzlbjbm: string
  qzlx: string | number
  qzxh: string
  qzmc: string
  delete?: boolean
}

// 表格数据类型
export type Rows = Row[]

// export type searchDatas = search[]
