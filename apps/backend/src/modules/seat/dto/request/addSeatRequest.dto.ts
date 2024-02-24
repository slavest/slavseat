import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { Facility } from 'src/modules/facility/entity/facility.entity';

import { Seat } from '../../entity/seat.entity';

class GridObjectDto extends OmitType(Facility, [
  'id',
  'type',
  'floor',
] as const) {}

class SeatDto {
  @ApiProperty()
  @IsNumber()
  floorId: number;

  @ApiProperty()
  @ValidateNested()
  @Type(() => GridObjectDto)
  gridObject: GridObjectDto;
}

export class AddSeatRequestDto {
  @ApiProperty({ type: SeatDto, isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SeatDto)
  seats: SeatDto[];
}
