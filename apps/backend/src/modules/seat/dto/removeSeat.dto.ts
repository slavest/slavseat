import { PickType } from '@nestjs/swagger';

import { Seat } from '../entity/seat.entity';

export class RemoveSeatDto extends PickType(Seat, ['id'] as const) {}
