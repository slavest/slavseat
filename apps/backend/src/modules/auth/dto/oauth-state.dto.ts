import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { OAuthState } from '../auth.interface';

export class OAuthStateDto implements OAuthState {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '로그인 후 되돌아갈 URL' })
  redirectBackTo: string;
}
