import axios from '/@/utils/http'
import { searchData, Row, Rows, updateObj, bjslType, bjqyType } from '/@/types/alarm'
import { RecordsResponse, ResponseWrop } from '/@/types/response-warp'
// // 封装搜索接口
// export class apiAll{
//   /**
//    * @description 查询分类的信息
//    * @param {object}  所要查询的字段
//    * @return {HttpResponse} result
//    */
//   static async searchAll(params:search):Promise<HttpResponce>{
//     return axios('/qzlx/selectQzlx',{
//       method:'get',
//       responseType:'json',
//       params:{
//         ...params
//       }
//     })
//   }
//

/**
 * @description 查询报警处理的信息
 * @param {object} 所要查询的字段
 * @return {RecordsResponse<Rows>} result
 */
export function searchAll(params: searchData) {
  return axios.get<any, RecordsResponse<Rows>>('/dbbjsj/selectDbbjsj', {
    params: params
  })
}

/**
 * @description 根据ID查询报警处理的信息
 * @param {number} 所要查询的id
 * @return {RecordsResponse<Row>} result
 */
export function searchOne(id: number) {
  return axios.get<any, ResponseWrop<Row>>('/dbbjsj/selectDbbjsjOne', {
    params: {
      id: id
    }
  })
}

/**
 * @description 修改安检处理过程描述
 * @param {object} 所要编辑的字段
 * @return {ResponseWrop} result
 */
export function update(data: updateObj) {
  return axios.put<any, ResponseWrop>('/dbbjsj/updateAjclgc', data)
}

/**
 * @description 报警数量统计
 * @return {ResponseWrop<bjslType>} result
 */
export function selectbjsl() {
  return axios.get<any, ResponseWrop<bjslType>>('/dbbjsj/selectbjsl')
}

/**
 * @description 报警数量统计
 * @return {ResponseWrop<bjqyType>} result
 */
export function selectbjqy() {
  return axios.get<any, ResponseWrop<bjqyType>>('/dbbjsj/selectDbbjsjMbqy')
}
