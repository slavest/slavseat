import {
  Controller,
  Get,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { AzureProfile } from '../../libs/strategy/azure.strategy';
import { OAuthState } from './auth.interface';
import { MicrosoftGuard } from './guard/microsoft.guard';

@Controller('/api/auth')
export class AuthController {
  @Get('microsoft')
  @UseGuards(MicrosoftGuard)
  async azureAdLogin() {}

  @Get('microsoft/callback')
  @UseGuards(MicrosoftGuard)
  async azureAdLoginCallback(
    @Req() req: Request,
    @Query('state') state: string,
  ) {
    console.log(state);
    const { redirectBackTo } = JSON.parse(state) as OAuthState;

    // 로그인 후 처리할 로직을 작성합니다.
    return { user: req.user, redirectBackTo };
  }
}
