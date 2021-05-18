// 搜索类型
export interface searchData {
  size?: number
  current?: number
  kssj?: string
  jssj?: string
}

// 返回数据类型
export interface Row {
  id?: number
  tjsj?: string
  bgsl?: string | number
  bjsl?: string | number
  zssqsl?: string | number
  fzssqsl?: string | number
  zsbqsl?: string | number
  fzsbqsl?: string | number
}

export interface Pictures {
  id?: number
  file: any
}

// 表格数据类型
export type Rows = Row[]
