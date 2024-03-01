import { ApiProperty } from '@nestjs/swagger';

export class RemoveFacilityResponseDto {
  @ApiProperty({ title: '삭제된 데이터 수' })
  removed: number;
}
