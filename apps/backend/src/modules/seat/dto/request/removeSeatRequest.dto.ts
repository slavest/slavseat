import { PickType } from '@nestjs/swagger';

import { Seat } from '../../entity/seat.entity';

export class RemoveSeatRequestDto extends PickType(Seat, [
  'id',
] as const) {}
