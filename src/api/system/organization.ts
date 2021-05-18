import axios from '/@/utils/http'
import { searchData, Row, Rows, organizationResponses } from '/@/types/system/organization'
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
 * @description 查询组织的信息
 */
export function searchAll(params: searchData) {
  return axios.get<any, organizationResponses>('/dictionaryController/getAllOrg', {
    params: params
  })
}

/**
 * @description 删除组织的信息
 */
export function del(id: number) {
  return axios.get<any, ResponseWrop<{}>>(`/dictionaryController/deleteOrg/${id}`)
}

/**
 * @description 新增组织
 */
export function insert(data: any) {
  return axios.post<any, ResponseWrop<{}>>('/dictionaryController/insertOrg', data)
}

/**
 * @description 修改组织
 */
export function update(data: any) {
  return axios.put<any, ResponseWrop<{}>>('/dictionaryController/updateOrg', data)
}

/**
 * @description 更改组织状态
 */
export function updateState(data: any) {
  return axios.put<any, ResponseWrop<{}>>('/dictionaryController/updateOrgState', data)
}
