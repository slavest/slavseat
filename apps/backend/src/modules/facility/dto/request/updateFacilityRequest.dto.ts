import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { Facility } from '../../entity/facility.entity';

class FacilityDto extends OmitType(Facility, ['floor'] as const) {}

export class UpdateFacilityRequestDto {
  @ApiProperty({ type: FacilityDto, isArray: true })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => FacilityDto)
  facilities: FacilityDto[];
}
