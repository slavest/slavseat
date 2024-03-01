import { ApiProperty } from '@nestjs/swagger';

export class UpdateFacilityResponseDto {
  @ApiProperty({ title: '수정된 데이터 수' })
  updated: number;
}
