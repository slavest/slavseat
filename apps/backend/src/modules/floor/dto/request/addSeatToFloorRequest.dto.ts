import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddSeatToFloorDto {
  @ApiProperty()
  @IsNumber()
  floorId: number;

  @ApiProperty()
  @IsNumber()
  seatId: number;
}
