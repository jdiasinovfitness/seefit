import { GymnList } from './core.model';

export interface AuthInfo {
  userId: string;
  accessToken: string;
  refreshToken?: string;
  avatar?: string;
  name: string;
  email: string;
  role: string;
  language: string;
}

export interface RefreshInfo {
  access_token: string;
}

export interface LangInfo {
  name: string;
  id: string;
}
