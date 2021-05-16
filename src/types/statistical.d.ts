// 搜索类型
export interface searchData {
  size: number
  current: number
  kssj?: string
  jssj?: string
}

// 返回数据类型
export interface Row {
  id?: number
  qzmc?: string
  qzlx?: string | number
  xgybtp?: string
  kjgybtp?: string
  yblx?: string | number
  lrly?: string
  lrdw?: string | number
  lrsj?: string
  del?: boolean
  ybtjs?: any | null
  sums?: any | null
}

export interface Pictures {
  id?: number
  file: any
}

// 表格数据类型
export type Rows = Row[]
