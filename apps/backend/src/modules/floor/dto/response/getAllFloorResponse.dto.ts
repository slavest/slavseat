import { Model } from '@slavseat/types';

import { FloorSummaryDto } from '../floorSummary.dto';

export class GetAllFloorResponseDto
  extends FloorSummaryDto
  implements Model.FloorSummary {}
