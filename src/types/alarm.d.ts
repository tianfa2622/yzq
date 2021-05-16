// 搜索类型
export interface searchData {
  size: number
  current: number
  ajbjdsr?: string
  bjlbdm?: string | number
  bjsjRqsj?: string
  jcmbid?: string
  mbqy?: string
  mbsl?: string | number
  sbbs?: string
  sbtdh?: string
  sjbs?: string
  tdbs?: string
  wpxsd?: string
  wxwplx?: string | number
}
// 返回数据类型
export interface Row {
  id?: number
  size: number
  current: number
  ajbjdsr?: string
  bjtp?: string
  ajclgc?: string
  bjlbdm?: string | number
  bjsjRqsj?: string
  jcmbid?: string | number
  mbqy?: string
  mbcd?: number | string
  mbkd?: number | string
  mbsl?: string | number
  sbbs?: string
  sbtdh?: string
  sjbs?: string
  tdbs?: string
  zsjhzb?: number | string
  zsjzzb?: number | string
  wpxsd?: string | number
  wxwplx?: string | number
  delete?: boolean
}

export interface updateObj {
  id: number
  ajclgc: string
}

export interface bjslType {
  id: number | null
  tjsj: string
  bgsl: null
  bjsl: number
  zssqsl: null
  fzssqsl: null
  zsbqsl: null
  fzsbqsl: null
}

export interface bjqyType {
  bjdd: string
  bjcs: number
}

// 表格数据类型
export type Rows = Row[]
