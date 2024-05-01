import { ApiProperty } from '@nestjs/swagger';

export class UpdateFloorResponseDto {
  @ApiProperty({ description: '수정된 데이터 수' })
  updated: number;
}
