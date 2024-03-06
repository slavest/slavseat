import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-azure-ad';

@Injectable()
export class MicrosoftStrategy extends PassportStrategy(
  Strategy,
  'azure-ad',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('AZURE_AD_CLIENT_ID'),
      clientSecret: configService.get('AZURE_AD_CLIENT_SECRET'),
      callbackURL: configService.get('AZURE_AD_CALLBACK_URL'),
      identityMetadata: `https://login.microsoftonline.com/${configService.get(
        'AZURE_AD_TENANT_ID',
      )}/v2.0/.well-known/openid-configuration`,
      responseType: 'code',
      responseMode: 'query',
      scope: ['openid', 'profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    params: any,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      const user = {
        id: profile.id,
        email: profile.emails[0].value,
        displayName: profile.displayName,
        // 필요한 사용자 정보를 추가로 가져올 수 있습니다.
      };
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
}
