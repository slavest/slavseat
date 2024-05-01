import { PickType } from '@nestjs/swagger';

import { Floor } from '../../entity/floor.entity';

export class CreateFloorRequestDto extends PickType(Floor, [
  'name',
  'order',
  'disabled',
] as const) {}
