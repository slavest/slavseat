import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

import { Reserve } from '../../entity/reserve.entity';

export class AddReserveRequestDto extends PickType(Reserve, [
  'start',
  'end',
  'always',
]) {
  @ApiProperty()
  @IsNumber()
  seatId: number;

  @ApiProperty()
  @IsString()
  user: string;
}
