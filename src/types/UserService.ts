export interface SignInResponse extends Response {
  result: Record<string, unknown>
  accessToken: string
  refreshToken: string
}
