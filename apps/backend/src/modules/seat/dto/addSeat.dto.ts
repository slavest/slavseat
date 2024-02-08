import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';

import { Seat } from '../entity/seat.entity';

class SeatDto extends PickType(Seat, ['label', 'x', 'y'] as const) {
  @ApiProperty()
  @IsNumber()
  floorId: number;
}

export class AddSeatDto {
  @ApiProperty({ type: SeatDto, isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SeatDto)
  seats: SeatDto[];
}
