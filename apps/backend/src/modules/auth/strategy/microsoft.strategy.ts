import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from '@slavseat/types';
import { Request } from 'express';
import {
  AzureProfile,
  Strategy,
} from 'src/libs/strategy/azure.strategy';

@Injectable()
export class MicrosoftStrategy extends PassportStrategy(
  Strategy,
  'microsoft',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.getOrThrow('MS_CLIENT_ID'),
      clientSecret: configService.getOrThrow('MS_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow('MS_CALLBACK_URL'),
      tenantID: configService.getOrThrow('MS_TENANT_ID'),
      scope: ['openid', 'profile', 'email', 'user.Read'],
      state: false,
    });
  }

  authenticate(req: Request, options: any) {
    options.state = req.query.redirectBackTo;
    super.authenticate(req, options);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: AzureProfile,
    done: (err?: Error, profile?: Model.UserSummary) => void,
  ): Promise<any> {
    try {
      const user: Model.UserSummary = {
        name: profile.name,
        email: profile.email,
        providerId: profile.puid,
      };

      done(null, user);
    } catch (error) {
      done(error, undefined);
    }
  }
}
