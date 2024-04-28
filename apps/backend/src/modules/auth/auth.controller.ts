import { Controller, Get, Post, Query, Res, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';

import { RefreshToken } from '../jwt/decorator/refresh-token.decorator';
import { JwtRefreshGuard } from '../jwt/guard/jwt-refresh.guard';
import { JwtService } from '../jwt/jwt.service';
import { User } from '../user/entity/user.entity';
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from './auth.constant';
import { OAuthState } from './auth.interface';
import { AuthService } from './auth.service';
import { AuthUser } from './decorator/auth-user.decorator';
import { OAuthStateDto } from './dto/oauth-state.dto';
import { AuthUserGuard } from './guard/auth-user.guard';

@ApiTags('인증')
@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('logout')
  @ApiOperation({ summary: '로그아웃' })
  @ApiOkResponse()
  logout(@Res() res: Response) {
    res.cookie(ACCESS_TOKEN_COOKIE, '');
    res.cookie(REFRESH_TOKEN_COOKIE, '');
    return res.end();
  }

  @Get('microsoft')
  @ApiOperation({
    summary: 'Microsoft OAuth 로그인',
  })
  async azureAdLogin(@Res() res: Response, @Query() oauthState: OAuthStateDto) {
    const authorizationURL = this.authService.getAuthorizationURL('microsoft', {
      state: oauthState,
    });

    res.redirect(authorizationURL);
    return res.end();
  }

  @Get('/microsoft/callback')
  @ApiOperation({ summary: 'Microsoft OAuth Callback' })
  async azureAdLoginCallback(
    @Res() res: Response,
    @Query('code') code: string,
    @Query('state') state: string,
  ) {
    const { redirectBackTo } = JSON.parse(state) as OAuthState;

    const user = await this.authService.getOAuthUser('microsoft', code);

    const accessToken = this.jwtService.createAccessToken(user);
    const refreshToken = this.jwtService.createRefreshToken(user);

    res.cookie(ACCESS_TOKEN_COOKIE, accessToken, {
      expires: new Date(Date.now() + this.jwtService.getAccesExpires() * 1000),
    });
    res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + this.jwtService.getRefreshExpires() * 1000),
    });
    res.redirect(redirectBackTo);
    return res.end();
  }

  @Get('me')
  @UseGuards(AuthUserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '사용자 프로필 조회' })
  @ApiOkResponse({ type: User })
  async me(@AuthUser() user: User) {
    return user;
  }

  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  @ApiCookieAuth()
  @ApiOperation({
    summary: 'Access Token 재발급',
    description: 'Cookie에 accessToken을 포함하여 응답합니다.',
  })
  @ApiOkResponse()
  async issueAccessToken(@Res() res: Response, @RefreshToken() refreshToken: string) {
    const accessToken = this.jwtService.createAccessTokenFromRefreshToken(refreshToken);

    res.cookie(ACCESS_TOKEN_COOKIE, accessToken, {
      expires: new Date(Date.now() + this.jwtService.getAccesExpires() * 1000),
    });
    return res.end();
  }
}
