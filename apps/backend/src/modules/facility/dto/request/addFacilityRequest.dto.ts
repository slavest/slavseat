import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';

import { Facility } from '../../entity/facility.entity';

class FacilityDto extends OmitType(Facility, [
  'id',
  'floor',
] as const) {}

export class AddFacilityRequestDto {
  @ApiProperty({ title: '시설을 추가할 층의 아이디' })
  @IsNumber()
  floorId: number;

  @ApiProperty({
    type: FacilityDto,
    isArray: true,
    title: '추가할 시설물 정보',
  })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => FacilityDto)
  facilities: FacilityDto[];
}
