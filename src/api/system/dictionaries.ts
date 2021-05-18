import axios from '/@/utils/http'
import { searchData, Row, Rows, dictionariesResponses } from '/@/types/system/dictionaries'
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
 * @description 查询字典的信息
 */
export function searchAll(params: searchData) {
  return axios.get<any, dictionariesResponses>('/dictionaryController/getAllDic', {
    params: params
  })
}

/**
 * @description 删除字典的信息
 */
export function del(id: number) {
  return axios.get<any, ResponseWrop<{}>>(`/dictionaryController/deleteDic/${id}`)
}

/**
 * @description 新增字典
 */
export function insert(data: any) {
  return axios.post<any, ResponseWrop<{}>>('/dictionaryController/insertDic', data)
}

/**
 * @description 修改字典
 */
export function update(data: any) {
  return axios.put<any, ResponseWrop<{}>>('/dictionaryController/updateDic', data)
}

/**
 * @description 更改字典状态
 */
export function updateState(data: any) {
  return axios.put<any, ResponseWrop<{}>>('/dictionaryController/updateDicState', data)
}
