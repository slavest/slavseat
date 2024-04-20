import { ApiProperty, IntersectionType, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { Floor } from '../../entity/floor.entity';

export class UpdateFloorDto extends IntersectionType(
  PickType(Floor, ['id']),
  PartialType(OmitType(Floor, ['facilities', 'image'])),
) {}

export class UpdateFloorsRequestDto {
  @ApiProperty({ type: UpdateFloorDto, isArray: true, description: '수정할 층 정보' })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => UpdateFloorDto)
  floors: UpdateFloorDto[];
}
