import axios from '/@/utils/http'
import { searchData, selectOne, Row, Rows, roleResponses, children } from '/@/types/system/role'
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
 * @description 查询所有角色的信息
 */
export function searchAll(params: searchData) {
  return axios.get<any, roleResponses>('/roleController/getAllRoles', {
    params: params
  })
}

/**
 * @description 删除用户
 */
export function del(id: number) {
  return axios.delete<any, ResponseWrop<{}>>(`/roleController/deleteRole/${id}`)
}

/**
 * @description 查询所有菜单
 */
export function selectAllMenu() {
  return axios.get<any, ResponseWrop<children>>(`/roleController/getAllMenus`)
}

/**
 * @description 根据角色id查询菜单id
 */
export function selectMenuId(id: number) {
  return axios.get<any, ResponseWrop<[]>>(`/roleController/deleteRole/${id}`)
}

/**
 * @description 根据用户id查询菜单列表
 */
export function selectMenuList(id?: number) {
  return axios.get<any, ResponseWrop<[]>>(`/roleController/getMenus`)
}

/**
 * @description 添加角色
 */
export function insertRole(data: Row) {
  return axios.post<any, ResponseWrop<{}>>('/roleController/insertRole', data)
}

/**
 * @description 更新菜单
 */
export function updateMenu(map: any) {
  return axios.put<any, ResponseWrop<{}>>('/roleController/updateMenu', map)
}
