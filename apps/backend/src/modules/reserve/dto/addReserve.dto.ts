import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

import { Reserve } from '../entities/reserve.entity';

export class AddReserveDto extends PickType(Reserve, [
  'start',
  'end',
]) {
  @ApiProperty()
  @IsNumber()
  seatId: number;

  @ApiProperty()
  @IsString()
  user: string;
}
