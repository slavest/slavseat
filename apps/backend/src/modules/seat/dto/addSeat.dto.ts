import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { Seat } from '../entities/seat.entity';

class SeatDto extends PickType(Seat, ['label', 'x', 'y'] as const) {}

export class AddSeatDto {
  @ApiProperty({ type: SeatDto, isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SeatDto)
  seats: SeatDto[];
}
