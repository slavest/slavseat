import { OmitType } from '@nestjs/swagger';
import { Model } from '@slavseat/types';

import { Floor } from '../entity/floor.entity';

export class FloorSummaryDto
  extends OmitType(Floor, ['image'] as const)
  implements Model.FloorSummary {}
