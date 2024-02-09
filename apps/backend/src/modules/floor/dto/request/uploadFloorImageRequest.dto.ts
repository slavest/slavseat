import { ApiProperty } from '@nestjs/swagger';

export class UploadFloorImageRequestDto {
  @ApiProperty()
  floorId: number;
}
