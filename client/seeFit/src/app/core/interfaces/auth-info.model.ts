export interface AuthInfo {
  id: string;
  role: string;
  acessToken: string;
  refreshToken?: string;
  avatar?: string;
  name: string;
  email: string;
}

export interface LangInfo {
  name: string;
  id: string;
}
