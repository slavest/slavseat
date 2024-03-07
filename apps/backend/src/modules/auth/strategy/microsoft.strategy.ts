import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { UserService } from 'src/modules/user/user.service';

import { OAuthProfile } from '../auth.interface';

export interface MicrosoftProfile {
  email: string;
  family_name: string;
  given_name: string;
  name: string;
  oid: string;
}

@Injectable()
export class MicrosoftStrategy {
  logger = new Logger(MicrosoftStrategy.name);

  clientID: string;
  clientSecret: string;
  callbackURL: string;
  tenantID: string;
  scope: string[];

  authorizationURL: string;
  tokenURL: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    this.clientID = configService.getOrThrow('MS_CLIENT_ID');
    this.clientSecret = configService.getOrThrow('MS_CLIENT_SECRET');
    this.callbackURL = configService.getOrThrow('MS_CALLBACK_URL');
    this.tenantID = configService.get('MS_TENANT_ID');
    this.scope = [
      'openid',
      'profile',
      'email',
      'user.Read',
      'offline_access',
    ];

    const AZURE_BASE_URL = `https://login.microsoftonline.com/${
      this.tenantID || 'common'
    }`;
    this.authorizationURL = `${AZURE_BASE_URL}/oauth2/v2.0/authorize`;
    this.tokenURL = `${AZURE_BASE_URL}/oauth2/v2.0/token`;
  }

  getParameter() {
    return {
      redirect_uri: this.callbackURL,
      client_id: this.clientID,
      scope: this.scope.join(' '),
      response_type: 'code',
    };
  }

  getAuthorizationURLWithParams(params: object = {}) {
    return `${this.authorizationURL}?${this.toQueryString({
      ...this.getParameter(),
      ...params,
    })}`;
  }

  async getProfileByCode(code: string): Promise<OAuthProfile> {
    const accessToken = await this.getAccessToken(code);
    const profile = this.getProfileFromToken(accessToken);

    return profile;
  }

  private async getAccessToken(code: string) {
    const res = await axios.post<{ id_token: string }>(
      `${this.tokenURL}`,
      {
        ...this.getParameter(),
        code,
        grant_type: 'authorization_code',
        client_secret: this.clientSecret,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return res.data.id_token;
  }

  private getProfileFromToken(accessToken: string): OAuthProfile {
    try {
      const [_, payload] = accessToken.split('.');
      const profile = JSON.parse(
        Buffer.from(payload, 'base64').toString(),
      ) as MicrosoftProfile;

      return {
        name: profile.name,
        email: profile.email,
        providerId: profile.oid,
      };
    } catch (e) {
      this.logger.error(`Cannot parse ${accessToken}, ${e}`);
      throw Error('Cannot Parse OAuth Profile');
    }
  }

  private toQueryString(query: Record<string, string>) {
    return Object.entries(query)
      .map(([k, v]) =>
        encodeURI(
          `${k}=${typeof v === 'object' ? JSON.stringify(v) : v}`,
        ),
      )
      .join('&');
  }
}
