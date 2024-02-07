import { PickType } from '@nestjs/swagger';

import { Reserve } from '../entity/reserve.entity';

export class GetREserveByUser extends PickType(Reserve, [
  'user',
] as const) {}
