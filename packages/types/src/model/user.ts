export interface UserSummary {
  name: string;
  email: string;
  providerId?: string;
}
export interface UserInfo extends UserSummary {
  id: number;
}
