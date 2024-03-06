import { Strategy } from 'passport-oauth2';

export declare class CustomStrategy<T> extends Strategy {
  params: Record<string, any>;

  getParameter(): Record<string, any>;
  getAuthorizationURL(): string;
  getProfile(code: string, redirect_uri: string): Promise<T>;
}
