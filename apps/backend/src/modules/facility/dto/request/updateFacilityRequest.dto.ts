import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { Facility } from '../../entity/facility.entity';

class UpdateFacilityDto extends OmitType(Facility, [
  'floor',
] as const) {}

export class UpdateFacilityRequestDto {
  @ApiProperty({
    type: UpdateFacilityDto,
    isArray: true,
    description: '수정할 시설물 정보',
  })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => UpdateFacilityDto)
  facilities: UpdateFacilityDto[];
}
