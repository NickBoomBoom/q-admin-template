export interface User {
  token: string;
  id: number;
  username: string;
  nickname: string;
  isAdmin: boolean,
  permissions: any,
}