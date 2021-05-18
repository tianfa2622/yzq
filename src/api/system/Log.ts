import axios from '/@/utils/http'
import { searchData, LogResponse } from '/@/types/system/log'
import { RecordsResponse, ResponseWrop } from '/@/types/response-warp'

/**
 * @description 查询设备的信息
 */
export function searchAll(params: searchData) {
  return axios.get<any, LogResponse>('/logController/getAllLog', {
    params: params
  })
}
