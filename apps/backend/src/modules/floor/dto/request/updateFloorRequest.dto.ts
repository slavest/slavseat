import { OmitType, PartialType, PickType } from '@nestjs/swagger';

import { Floor } from '../../entity/floor.entity';

export class UpdateFloorRequestParamDto extends PickType(Floor, ['id']) {}

export class UpdateFloorRequestBodyDto extends PartialType(
  OmitType(Floor, ['id', 'facilities', 'image']),
) {}
