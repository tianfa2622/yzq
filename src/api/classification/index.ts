import axios from '/@/utils/http'
// import { HttpResponce } from '/@/utils/http';
import { searchData, Row, Rows } from '/@/types/classification'
import { RecordsResponse, ResponseWrop } from '/@/types/response-warp'
// /**
//  * @interface search -搜索参数
//  * @property {string} qzbm -枪支编码
//  * @property {string} qzlx -枪支类型
//  * @property {string} qzxh -枪支型号
//  * @property {string} qzmc -枪支名称
//  * @property {number} current -页数
//  * @property {number} size -每页条数
//  */
// interface search {
//   qzlbjbm:string
//   qzlx:string
//   qzxh:string
//   qzmc:string
//   current:number
//   size:number
// }
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
 * @description 查询枪支分类的信息
 * @param {object} 所要查询的字段
 */
export function searchAll(params: searchData) {
  return axios.get<any, RecordsResponse<Rows>>('/qzlx/selectQzlx', {
    params: params
  })
}

/**
 * @description 根据ID查询枪支分类的信息
 * @param {number} 所要查询的id
 */
export function searchOne(id: number) {
  return axios.get<any, ResponseWrop<Row>>('/qzlx/selectQzlxById', {
    params: {
      id: id
    }
  })
}

/**
 * @description 编辑枪支分类
 * @param {object} 所要编辑的字段
 */
export function update(data: Row) {
  return axios.put<any, ResponseWrop>('/qzlx/updateQzlx', data)
}

/**
 * @description 新增枪支分类
 * @param {object} 所要编辑的字段
 */
export function insert(data: Row) {
  return axios.post<any, ResponseWrop>('/qzlx/insertQzlx', data)
}

/**
 * @description 根据id删除枪支分类
 * @param {number} 所要删除的id
 */
export function del(id: number) {
  return axios.delete<any, ResponseWrop>('/qzlx/deleteQzlx', {
    params: {
      id: id
    }
  })
}

/**
 * @description 导入枪支分类
 * @param {object} 所要导入的数据
 */
// export function theImport(data: flie) {
//   return axios.post('/qzlx/deleteQzlx', data)
// }
