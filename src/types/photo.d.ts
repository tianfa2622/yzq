// 搜索类型
export interface searchData {
  size: number
  current: number
}
export interface selectOne {
  id: number
}

// 返回数据类型
export interface Row {
  id: number
  tpmc: string
  sbsj: string
  sbjgYbxsd: string
  sbjgJgfx: string
  sbsb: string
}

export interface insertDate {
  id: number
  tpmc: string
  sbsj: string
  sbjgYbxsd: string
  sbjgJgfx: string
  sbsb: string
}

// 表格数据类型
export type Rows = Row[]
