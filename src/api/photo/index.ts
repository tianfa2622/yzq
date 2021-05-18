import axios from '/@/utils/http'
// import { HttpResponce } from '/@/utils/http';
import { searchData, Row, Rows, selectOne, insertDate } from '/@/types/photo'
import { RecordsResponse, ResponseWrop } from '/@/types/response-warp'

/**
 * @description 分页查询所有
 * @param {object} 所要查询的字段
 */
export function searchAll(params: searchData) {
  return axios.get<any, RecordsResponse<Rows>>('/kjgtxsb/selectAll', {
    params: params
  })
}

/**
 * @description 根据ID查询图像识别的信息
 * @param {number} 所要查询的id
 */
export function searchOne(id: number) {
  return axios.get<any, ResponseWrop<Row>>('/kjgtxsb/selectOne', {
    params: {
      id: id
    }
  })
}

/**
 * @description 新增图像识别
 * @param {object} 所要编辑的字段
 */
export function insert(data: insertDate) {
  return axios.post<any, ResponseWrop>('/kjgtxsb/insert', data)
}
