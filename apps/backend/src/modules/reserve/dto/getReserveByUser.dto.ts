import { PickType } from '@nestjs/swagger';

import { Reserve } from '../entities/reserve.entity';

export class GetREserveByUser extends PickType(Reserve, [
  'user',
] as const) {}
