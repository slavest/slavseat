import { IntersectionType, OmitType, PartialType, PickType } from '@nestjs/swagger';

import { Floor } from '../../entity/floor.entity';

export class UpdateFloorRequestDto extends IntersectionType(
  PickType(Floor, ['id']),
  OmitType(PartialType(Floor), ['image', 'facilities']),
) {}
