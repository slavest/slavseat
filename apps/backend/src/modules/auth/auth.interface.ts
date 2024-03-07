export interface OAuthState {
  redirectBackTo: string;
}

export interface Payload {
  id: number;
  email: string;
  exp: number;
  iat: number;
}
