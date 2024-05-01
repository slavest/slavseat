import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AdminGuard } from '../admin/guard/admin.guard';
import { AuthUserGuard } from '../auth/guard/auth-user.guard';
import { DailyStatisticsDto } from './dto/daily-statistics.dto';
import { GetStatisticsWithDateRangeDto } from './dto/request/getStatisticsWithDateRange.dto';
import { StatisticsService } from './statistics.service';

@ApiTags('통계 API')
@Controller('/api/statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('/reserve/daily')
  @UseGuards(AuthUserGuard)
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: '예약 통계' })
  @ApiOkResponse({ type: DailyStatisticsDto })
  getRecentDailyReserveStatistics(
    @Query() getStatisticsWithDateRangeDto: GetStatisticsWithDateRangeDto,
  ) {
    return this.statisticsService.getReserveStatistics(
      getStatisticsWithDateRangeDto.start,
      getStatisticsWithDateRangeDto.end,
    );
  }

  @Get('/reserve-transaction/daily')
  @UseGuards(AuthUserGuard)
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: '예약 트랜젝션 통계' })
  @ApiOkResponse({ type: DailyStatisticsDto })
  getRecentDailyReserveTransactionStatistics(
    @Query() getStatisticsWithDateRangeDto: GetStatisticsWithDateRangeDto,
  ) {
    return this.statisticsService.getReserveTransactionStatistics(
      getStatisticsWithDateRangeDto.start,
      getStatisticsWithDateRangeDto.end,
    );
  }
}
