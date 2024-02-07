import { PickType } from '@nestjs/mapped-types';

import { Floor } from '../entity/floor.entity';

export class CreateFloorDto extends PickType(Floor, [
  'name',
] as const) {}
