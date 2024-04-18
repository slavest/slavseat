export interface TokenBaseInfo {
  id: number;
  email: string;
}

export interface Payload extends TokenBaseInfo {
  exp: number;
  iat: number;
}
