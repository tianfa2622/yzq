import { ResponseWrop } from '/@/types/response-warp'
export interface Account {
  username: string
  password: string
}
interface LoginRes {
  tokenHead: string
  token: string
}
export type LoginResponse = ResponseWrop<LoginRes>
