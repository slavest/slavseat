import { ApiProperty } from '@nestjs/swagger';

export class GetSeatByFloorRequestDto {
  @ApiProperty()
  floorId: number;
}
