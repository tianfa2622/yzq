import axios from '/@/utils/http'
import {
  searchData,
  Row,
  Rows,
  equipmentResponses,
  subscriptionData
} from '/@/types/system/equipment'
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
 * @description 查询设备的信息
 */
export function searchAll(params: searchData) {
  return axios.get<any, equipmentResponses>('/equipment/getAllAjsb', {
    params: params
  })
}

/**
 * @description 注册设备
 */
export function RegDevice(data: any) {
  return axios.post<any, ResponseWrop<{}>>('/equipment/insertAjsb', data)
}

/**
 * @description 订阅管理
 */
export function subscription(data: subscriptionData) {
  return axios.post<any, ResponseWrop<{}>>('/equipment/subscription', data)
}

/**
 * @description 修改设备
 */
export function update(data: any) {
  return axios.put<any, ResponseWrop<{}>>('/equipment/updateAjsb', data)
}
