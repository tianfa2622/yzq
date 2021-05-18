import axios from '/@/utils/http'
import { searchData, Row, Rows } from '/@/types/statistical'
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
 * @description 导出统计分析数据
 * @param {object} 所要查询的字段
 * @return {} result
 */
export function exportAll(params: searchData) {
  return axios.get<any>('/bgbjtj/exportBgbjtj', {
    params: params
  })
}

/**
 * @description 数据预览和过检包裹统计
 * @param {object} 所要查询的字段
 * @return {any,RecordsResponse<Rows>} result
 */
export function selectBgtj(params: searchData) {
  return axios.get<any, RecordsResponse<Rows>>('/bgbjtj/selectBgtj', {
    params: params
  })
}

/**
 * @description 获取报警类别和总数
 * @param
 * @return {any, ResponseWrop<Rows>} result
 */
export function selectBjlbSum() {
  return axios.get<any, ResponseWrop<any>>('/bgbjtj/selectBjlbSum')
}
