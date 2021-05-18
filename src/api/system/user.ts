import axios from '/@/utils/http'
import { searchData, selectOne, Row, Rows, resetM, uersResponses } from '/@/types/user'
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
 * @description 查询用户管理的信息
 * @param {object} 所要查询的字段
 * @return  result 这个也是
 */
export function searchAll(params: searchData) {
  return axios.get<any, uersResponses>('/adminController/getAllAdmins', {
    params: params
  })
}

/**
 * @description 删除用户
 * @param {number}
 * @return  result
 */
export function del(id: number) {
  return axios.delete<any, ResponseWrop<{}>>(`/adminController/getAllAdmins/${id}`)
}

/**
 * @description 设置角色
 */
export function setRole(data: any) {
  return axios.put<any, ResponseWrop<{}>>('/adminController/addRole', data)
}

/**
 * @description 添加用户
 */
export function insertAdmin(data: Row) {
  return axios.post<any, ResponseWrop<{}>>('/adminController/insertAdmin', data)
}

/**
 * @description 重置密码
 */
export function resetMM(id: selectOne) {
  return axios.get<any, ResponseWrop<{}>>('/adminController/insertAdmin', {
    params: {
      id: id
    }
  })
}

/**
 * @description 更新用户
 */
export function updateAdmin(data: Row) {
  return axios.put<any, ResponseWrop<{}>>('/adminController/updateAdmin', data)
}

/**
 * @description 更新用户状态
 */
export function updateState(data: any) {
  return axios.put<any, ResponseWrop<{}>>('/adminController/updateState', data)
}
