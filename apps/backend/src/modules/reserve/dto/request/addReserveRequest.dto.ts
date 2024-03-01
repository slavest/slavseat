import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

import { Reserve } from '../../entity/reserve.entity';

export class AddReserveRequestDto extends PickType(Reserve, [
  'start',
  'end',
  'always',
]) {
  @ApiProperty({ description: '시설물 아이디' })
  @IsNumber()
  facilityId: number;

  @ApiProperty({ description: '유저 아이디' })
  @IsString()
  user: string;
}
