import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';

import { Facility } from '../../entity/facility.entity';

class FacilityDto extends OmitType(Facility, [
  'id',
  'floor',
] as const) {}

export class AddFacilityRequestDto {
  @ApiProperty()
  @IsNumber()
  floorId: number;

  @ApiProperty({ type: FacilityDto, isArray: true })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => FacilityDto)
  facilities: FacilityDto[];
}
