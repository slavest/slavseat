export interface OAuthState {
  redirectBackTo: string;
}

export interface Payload {
  id: number;
  email: string;
  exp: number;
  iat: number;
}

export interface OAuthProfile {
  email: string;
  name: string;
  providerId: string;
}
