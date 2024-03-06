import * as OAuth2 from 'passport-oauth2';

export interface AzureProfile {
  email: string;
  family_name: string;
  given_name: string;
  name: string;
  puid: string;
}

interface AzureStrategyOptions {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
  tenantID: string;
}

export class Strategy extends OAuth2.Strategy {
  constructor(options: AzureStrategyOptions, verify: any) {
    const AZURE_BASE_URL = `https://login.microsoftonline.com/${options.tenantID}`;

    const authorizationURL = `${AZURE_BASE_URL}/oauth2/v2.0/authorize`;
    const tokenURL = `${AZURE_BASE_URL}/oauth2/v2.0/token`;
    super({ ...options, authorizationURL, tokenURL }, verify);
    this.name = 'azure';
  }

  userProfile(
    accessToken: string,
    done: (err?: Error, profile?: AzureProfile) => void,
  ): void {
    try {
      const [_, body] = accessToken.split('.');

      done(
        null,
        JSON.parse(
          Buffer.from(body, 'base64').toString(),
        ) as AzureProfile,
      );
    } catch (e) {
      done(e, null);
    }
  }
}
