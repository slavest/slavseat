import { ApiProperty } from '@nestjs/swagger';

export class RemoveReserveResponseDto {
  @ApiProperty({ description: '삭제된 데이터 수' })
  removed: number;
}
