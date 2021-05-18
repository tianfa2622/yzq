import axios from '/@/utils/http'
import { Account, LoginResponse } from '/@/types/system/login'
import { ResponseWrop } from '/@/types/response-warp'

export function login(account: Account) {
  return axios.post<any, LoginResponse>('/loginController/login', account)
}

export function logout() {
  return axios.post<any, ResponseWrop<{}>>('/loginController/logout')
}
