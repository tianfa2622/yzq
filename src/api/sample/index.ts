import axios from '/@/utils/http'
// import { HttpResponce } from '/@/utils/http';
import { RecordsResponse, ResponseWrop } from '/@/types/response-warp'
import { searchData, Row, Rows, Pictures } from '/@/types/sample'

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
 * @description 查询样本管理的信息
 * @param {object} 所要查询的字段
 * @return {RecordsResponse<Rows>} result
 */
export function searchAll(params: searchData) {
  return axios.get<any, RecordsResponse<Rows>>('/Sample/selectAllQzlrxx', {
    params: params
  })
}

/**
 * @description 根据ID查询样本管理的信息
 * @param {number} 所要查询的id
 * @return {RecordsResponse<Row>} result
 */
export function searchOne(id: number) {
  return axios.get<any, ResponseWrop<Row>>('/Sample/selectOneQzlrxx', {
    params: {
      id: id
    }
  })
}

/**
 * @description 修改样本管理
 * @param {object} 所要修改的字段
 * @return {ResponseWrop} result
 */
export function update(data: Row) {
  return axios.put<any, ResponseWrop>('/Sample/updateByIdQzlrxx', data)
}

/**
 * @description 新增样本管理
 * @param {object} 所要新增的字段
 * @return {ResponseWrop} result
 */
export function insert(data: Row) {
  return axios.post<any, ResponseWrop>('/Sample/insertQzlrxx', data)
}

/**
 * @description 根据id删除枪支分类
 * @param {number} 所要删除的id
 * @return {ResponseWrop} result
 */
export function del(id: number) {
  return axios.delete<any, ResponseWrop>('/Sample/deleteQzlrxx', {
    params: {
      id: id
    }
  })
}

/**
 * @description 上传图片
 * @param {object} 参数
 */
export function uploadTp(data: Pictures) {
  return axios.post<any>('/qzlx/deleteQzlx', data)
}

/**
 * @description 根据ID查询图片
 * @param {number} 所要查询的id
 */
export function searchTp(id: number) {
  return axios.get('/Sample/showImage', {
    params: {
      id: id
    }
  })
}

/**
 * @description 各单位录入样本数统计
 *
 */
export function searchYbstj() {
  return axios.get<any, ResponseWrop<Rows>>('/Sample/queryAllLrdwQzlrxx')
}

/**
 * @description 查询样本总数
 *
 */
export function searchYbzs() {
  return axios.get<any>('/Sample/querySumQzlrxx')
}
