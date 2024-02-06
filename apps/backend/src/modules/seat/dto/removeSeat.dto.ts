import { PickType } from '@nestjs/swagger';

import { Seat } from '../entities/seat.entity';

export class RemoveSeatDto extends PickType(Seat, ['id'] as const) {}
