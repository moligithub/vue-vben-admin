export interface LoginParams {
  account: string;
  password: string;
  code?: string;
  origin?: string;
  timestamp?: number;
  tsa_ticket?: string;
  goHome?: boolean;
  mode?: string;
}

export interface LoginResult {
  token: string;
  userInfo: UserInfo;
}

export interface UserInfo {
  id: string;
  account: string;
  name: string;
  avatar: string;
  prevLogin?: number;
  prevLoginTime?: string;
  prevLoginIPAddress?: string;
  prevLoginIPAddressName?: string;
  systemId?: string;
  portalId?: string;
}
