import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format } from 'date-fns';
import { Repository } from 'typeorm';

import { Reserve } from '../reserve/entity/reserve.entity';
import { DailyStatisticsDto } from './dto/daily-statistics.dto';

@Injectable()
export class StatisticsService {
  constructor(@InjectRepository(Reserve) private readonly reserveRepository: Repository<Reserve>) {}

  async getReserveStatistics(start: Date, end: Date) {
    const from = format(start, 'yyyy-MM-dd');
    const to = format(end.getTime() + 1000 * 60 * 60 * 24, 'yyyy-MM-dd'); // 0,0,0 시간 보정

    const result: DailyStatisticsDto[] = await this.reserveRepository
      .createQueryBuilder()
      .select('COUNT(*)', 'count')
      .addSelect('DATE(start)', 'date')
      .where('start >= :from and end <= :to', { from, to })
      .andWhere('always is :always', { always: false })
      .groupBy('date')
      .orderBy('date', 'ASC')
      .execute();

    return result;
  }

  async getReserveTransactionStatistics(start: Date, end: Date) {
    const from = format(start, 'yyyy-MM-dd');
    const to = format(end.getTime() + 1000 * 60 * 60 * 24, 'yyyy-MM-dd');

    const result: DailyStatisticsDto[] = await this.reserveRepository
      .createQueryBuilder()
      .select('COUNT(*)', 'count')
      .addSelect('DATE(createdAt)', 'date')
      .where('createdAt >= :from', { from })
      .andWhere('createdAt <= :to', { to })
      .andWhere('always is :always', { always: false })
      .groupBy('date')
      .orderBy('date', 'ASC')
      .execute();

    return result;
  }
}
