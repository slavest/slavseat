import { ApiProperty } from '@nestjs/swagger';

export class RemoveReserveResponseDto {
  @ApiProperty()
  removed: number;
}
