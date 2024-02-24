import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GetFloorImageRequestDto {
  @IsNumber()
  @ApiProperty()
  floorId: number;
}
