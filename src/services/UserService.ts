import type { SignInResponse } from '../types/UserService'
import { axiosInstance } from '../utils/axios'

class UserService {
  // 유저 로그인
  public static async login(
    empNo: string,
    password: string
  ): Promise<SignInResponse> {
    const response = await axiosInstance.post<SignInResponse>(
      '/api/auth/login',
      {
        empNo,
        password,
      }
    )

    localStorage.setItem('SKoroAccessToken', response.data.accessToken)
    localStorage.setItem('SKoroRefreshToken', response.data.refreshToken)

    console.log('UserService.signIn response:', response.data)
    return response.data
  }

  // 유저 로그아웃
  public static async logout(): Promise<void> {
    const response = await axiosInstance.post(
      '/api/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('SKoroAccessToken')}`,
        },
      }
    )
    console.log('UserService.logout response:', response.data)
  }
}

export default UserService
