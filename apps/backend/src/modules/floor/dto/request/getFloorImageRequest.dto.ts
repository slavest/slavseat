import { ApiProperty } from '@nestjs/swagger';

export class GetFloorImageRequestDto {
  @ApiProperty()
  floorId: number;
}
