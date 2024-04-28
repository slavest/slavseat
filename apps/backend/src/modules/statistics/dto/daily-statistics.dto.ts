import { ApiProperty } from '@nestjs/swagger';
import { Model } from '@slavseat/types';

export class DailyStatisticsDto implements Model.DailyStatistics {
  @ApiProperty({ description: '날짜' })
  date: Date;

  @ApiProperty({ description: '예약 수' })
  count: number;
}
