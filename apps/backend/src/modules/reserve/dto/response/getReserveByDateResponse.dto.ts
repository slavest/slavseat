import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Facility } from 'src/modules/facility/entity/facility.entity';
import { FloorSummaryDto } from 'src/modules/floor/dto/floorSummary.dto';

import { Reserve } from '../../entity/reserve.entity';

class FacilitySummaryWithFloorDto extends OmitType(Facility, [
  'floor',
]) {
  @ApiProperty({ type: FloorSummaryDto, description: '층 정보' })
  floor: FloorSummaryDto;
}

export class GetReserveByDateResponseDto extends OmitType(Reserve, [
  'facility',
]) {
  @ApiProperty({
    type: FacilitySummaryWithFloorDto,
    description: '시설물 정보',
  })
  facility: FacilitySummaryWithFloorDto;
}
